import {randomBytes} from 'node:crypto';
import {env} from '../../config/env.js';
import {HttpError} from '../../core/errors/http-error.js';
import {ReferralAttributionModel,ReferralCodeModel} from './referral.models.js';
import {UserModel} from '../../infrastructure/database/mongodb/models.js';
import {queueEmail} from '../notifications/notifications.service.js';
import {makeReferralCode} from './referral.logic.js';
export async function ensureReferralCode(userId:string){
 const existing=await ReferralCodeModel.findOne({userId});if(existing)return existing.code;
 for(let i=0;i<5;i++){
  const code=makeReferralCode(randomBytes(8));
  try{const saved=await ReferralCodeModel.findOneAndUpdate({userId},{$setOnInsert:{userId,code}},{upsert:true,new:true});if(!saved)throw new Error('Could not create referral code');return saved.code;}
  catch(error){if((error as {code?:number}).code!==11000)throw error;const found=await ReferralCodeModel.findOne({userId});if(found)return found.code;}
 }
 throw new HttpError(503,'Referral codes temporarily unavailable','referral_unavailable');
}
export async function validateReferral(code:string|undefined):Promise<string|undefined>{
 if(!code)return;
 const found=await ReferralCodeModel.findOne({code:code.trim().toUpperCase()});
 if(!found)throw new HttpError(400,'Referral code does not exist','invalid_referral');
 return found.userId;
}
export async function attributeReferral(referredId:string,referrerId:string|undefined,code:string|undefined){
 if(!referrerId||!code)return;
 if(referrerId===referredId)throw new HttpError(400,'Cannot refer yourself','self_referral');
 await ReferralAttributionModel.updateOne({referredId},{$setOnInsert:{referredId,referrerId,code:code.toUpperCase()}},{upsert:true});
}
export async function markReferralQualified(userId:string){
 const row=await ReferralAttributionModel.findOneAndUpdate({referredId:userId,qualifiedAt:null},{$set:{qualifiedAt:new Date()}},{new:true});
 if(!row)return;
 const referrer=await UserModel.findById(row.referrerId).lean();
 if(referrer)await queueEmail('referral-qualified',referrer.email,{name:referrer.name},`referral:${userId}`);
}
export async function referralOverview(userId:string){
 const [code,signups,qualified]=await Promise.all([ensureReferralCode(userId),ReferralAttributionModel.countDocuments({referrerId:userId}),ReferralAttributionModel.countDocuments({referrerId:userId,qualifiedAt:{$ne:null}})]);
 return {code,inviteUrl:`${env.WEB_ORIGIN}/register?ref=${encodeURIComponent(code)}`,signups,qualified};
}
