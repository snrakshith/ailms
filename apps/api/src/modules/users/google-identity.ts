import {randomUUID} from 'node:crypto';
import {createRemoteJWKSet,jwtVerify} from 'jose';
import {env} from '../../config/env.js';
import {HttpError} from '../../core/errors/http-error.js';
import {UserModel} from '../../infrastructure/database/mongodb/models.js';
import {publicUser} from './users.repository.js';
import {queueEmail} from '../notifications/notifications.service.js';

// Google Identity Services returns an ID token, not an access token. Validate
// signature, issuer, audience, expiry and verified email at the API boundary.
const googleKeys=createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
export async function verifiedGoogleIdentity(credential:string){
 if(!env.GOOGLE_CLIENT_ID)throw new HttpError(503,'Google sign-in is not configured','google_unavailable');
 let payload;
 try{
  const verified=await jwtVerify(credential,googleKeys,{issuer:['https://accounts.google.com','accounts.google.com'],audience:env.GOOGLE_CLIENT_ID,algorithms:['RS256']});
  payload=verified.payload;
 }catch{throw new HttpError(401,'Google identity verification failed','google_invalid_token');}
 if(typeof payload.sub!=='string'||!payload.sub||typeof payload.email!=='string'||payload.email_verified!==true){
  throw new HttpError(401,'Google did not provide a verified identity','google_unverified');
 }
 return {subject:payload.sub,email:payload.email.toLowerCase(),name:typeof payload.name==='string'&&payload.name.trim()?payload.name.trim().slice(0,80):payload.email.split('@')[0]};
}

/** Google identifiers are stable subjects, not email addresses. */
export async function signInWithGoogle(credential:string){
 const identity=await verifiedGoogleIdentity(credential);
 const linked=await UserModel.findOne({googleSubject:identity.subject});
 if(linked)return publicUser(linked);
 const emailAccount=await UserModel.findOne({email:identity.email});
 if(emailAccount){
  // Avoid implicitly merging a password account and a federated identity.
  // An authenticated user can link them via the explicit /google/link endpoint.
  throw new HttpError(409,'An account already exists with this email. Sign in with your password, then link Google in Settings.','google_link_required');
 }
 try{
  const created=await UserModel.create({name:identity.name,email:identity.email,googleSubject:identity.subject,tenantId:randomUUID(),role:'owner'});
  void queueEmail('welcome',created.email,{name:created.name},`welcome:${String(created._id)}`).catch(()=>{});
  return publicUser(created);
 }catch(error){
  if((error as {code?:number}).code===11000)throw new HttpError(409,'Account already exists. Please sign in and link Google in Settings.','google_link_required');
  throw error;
 }
}

export async function linkGoogleToUser(userId:string,credential:string){
 const identity=await verifiedGoogleIdentity(credential);
 const account=await UserModel.findById(userId);
 if(!account)throw new HttpError(401,'Sign in required','unauthorized');
 if(account.email.toLowerCase()!==identity.email)throw new HttpError(403,'Google email must match your account email','google_email_mismatch');
 const linked=await UserModel.findOne({googleSubject:identity.subject});
 if(linked&&String(linked._id)!==userId)throw new HttpError(409,'Google account is already linked elsewhere','google_already_linked');
 if(account.googleSubject&&account.googleSubject!==identity.subject)throw new HttpError(409,'This account is linked to a different Google identity','google_already_linked');
 account.googleSubject=identity.subject;
 try{await account.save();}catch(error){if((error as {code?:number}).code===11000)throw new HttpError(409,'Google account already linked','google_already_linked');throw error;}
 return publicUser(account);
}
