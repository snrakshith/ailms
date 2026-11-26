import { SignJWT, jwtVerify } from 'jose';
import type { RequestHandler, Response } from 'express';
import { env } from '../../config/env.js';
import { HttpError } from '../../core/errors/http-error.js';
import { UserModel } from '../database/mongodb/models.js';
import { currentContext } from '../../core/context/request-context.js';
import {sessionVersionMatches} from './session-policy.js';
import {onboardingSchema} from '@sapling/contracts';
import type { User } from '@sapling/contracts';

const secret = new TextEncoder().encode(env.JWT_SECRET);
const cookieOptions = {httpOnly:true,secure:env.COOKIE_SECURE,sameSite:'lax' as const,path:'/api',maxAge:30*60*1000};
export async function setSession(res:Response,user:User):Promise<void> {
  const member = await UserModel.findById(user.id).select('sessionVersion').lean();
  if (!member) throw new HttpError(401,'Account not found','unauthorized');
  const jwt = await new SignJWT({tenantId:user.tenantId,role:user.role,sv:member.sessionVersion??0})
    .setProtectedHeader({alg:'HS256'}).setSubject(user.id).setIssuer('sapling-api')
    .setAudience('sapling-web').setIssuedAt().setExpirationTime('30m').sign(secret);
  res.cookie('session',jwt,cookieOptions);
}
export function clearSession(res:Response) { res.clearCookie('session',{...cookieOptions,maxAge:undefined}); }
export const requireAuth: RequestHandler = async (req,_res,next) => {
  try {
    const mobile=/^Bearer ([^\s]+)$/.exec(req.get('authorization')??'');
    const token = mobile?.[1]??(req.cookies?.session as string | undefined);
    if(!token) throw new HttpError(401,'Sign in required','unauthorized');
    const {payload} = mobile?await verifyMobileAccessToken(token):await jwtVerify(token,secret,{issuer:'sapling-api',audience:'sapling-web'});
    if(!payload.sub || typeof payload.tenantId !== 'string') throw new HttpError(401,'Invalid session','unauthorized');
    const member = await UserModel.findOne({_id:payload.sub,tenantId:payload.tenantId}).lean();
    if(!member || !sessionVersionMatches(payload.sv,member.sessionVersion))
      throw new HttpError(401,'Session expired or revoked','unauthorized');
    const onboarding=onboardingSchema.safeParse(member.onboarding);
    req.principal = {id:String(member._id),name:member.name,email:member.email,tenantId:member.tenantId,role:member.role as User['role'],googleLinked:Boolean(member.googleSubject),onboarding:onboarding.success?onboarding.data:null};
    if(currentContext()) { currentContext()!.tenantId=member.tenantId; currentContext()!.userId=String(member._id); }
    next();
  } catch (error) { next(error instanceof HttpError ? error : new HttpError(401,'Invalid or expired session','unauthorized')); }
};
export const requireRole = (...roles:User['role'][]):RequestHandler => (req,_res,next) =>
  req.principal && roles.includes(req.principal.role) ? next() : next(new HttpError(403,'Forbidden','forbidden'));

/** Short-lived mobile bearer; do not persist in AsyncStorage. Use native secure storage. */
export async function issueMobileAccessToken(user:User):Promise<string>{
 const member = await UserModel.findById(user.id).select('sessionVersion').lean();
 if (!member) throw new HttpError(401,'Account not found','unauthorized');
 return new SignJWT({tenantId:user.tenantId,role:user.role,sv:member.sessionVersion??0})
  .setProtectedHeader({alg:'HS256'}).setSubject(user.id).setIssuer('sapling-api')
  .setAudience('sapling-mobile').setIssuedAt().setExpirationTime('30m').sign(secret);
}
export async function verifyMobileAccessToken(token:string){
 return jwtVerify(token,secret,{issuer:'sapling-api',audience:'sapling-mobile'});
}
