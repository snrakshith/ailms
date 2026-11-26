import {Router} from 'express';
import {requireAuth} from '../../infrastructure/security/session.js';
import {referralOverview,validateReferral,attributeReferral} from './referral.service.js';
import {UserModel} from '../../infrastructure/database/mongodb/models.js';
import {HttpError} from '../../core/errors/http-error.js';
import {z} from 'zod';
import {validateBody} from '../../core/contracts/validate.js';
export function createReferralRouter(){const router=Router();router.use(requireAuth);router.get('/me',async(req,res)=>{res.setHeader('cache-control','no-store');res.json({data:await referralOverview(req.principal!.id)});});
 router.post('/claim',validateBody(z.object({code:z.string().regex(/^[A-Z2-9]{6,12}$/)}).strict()),async(req,res)=>{
  const user=await UserModel.findById(req.principal!.id).lean();
  if(!user||Date.now()-new Date(user.createdAt).getTime()>24*60*60*1000)throw new HttpError(409,'Referral codes can only be claimed within 24 hours of registration','referral_window_closed');
  const referrerId=await validateReferral(req.body.code);await attributeReferral(req.principal!.id,referrerId,req.body.code);res.status(204).end();
 });return router;}
