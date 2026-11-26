import {randomUUID} from 'node:crypto';
import bcrypt from 'bcryptjs';
import type {LoginInput,RegisterInput} from '@sapling/contracts';
import {HttpError} from '../../core/errors/http-error.js';
import {createUser,findUserByEmail,publicUser} from './users.repository.js';
import {attributeReferral,validateReferral} from '../referrals/referral.service.js';
import {queueEmail} from '../notifications/notifications.service.js';

export async function registerUser(input:RegisterInput) {
  const existing=await findUserByEmail(input.email);
  if(existing) throw new HttpError(409,'This email is already registered','email_taken');
  const referrerId=await validateReferral(input.referralCode);
  const passwordHash=await bcrypt.hash(input.password,12);
  try {const created=await createUser({name:input.name,email:input.email,passwordHash,tenantId:randomUUID()});
    await attributeReferral(String(created._id),referrerId,input.referralCode);
    void queueEmail('welcome',created.email,{name:created.name},`welcome:${String(created._id)}`).catch(()=>{});
    return publicUser(created);}
  catch(error){if((error as {code?:number}).code===11000)throw new HttpError(409,'This email is already registered','email_taken');throw error;}
}
export async function loginUser(input:LoginInput){
  const existing=await findUserByEmail(input.email.toLowerCase());
  const valid=existing && typeof existing.passwordHash==='string' && await bcrypt.compare(input.password,existing.passwordHash);
  if(!valid || !existing) throw new HttpError(401,'Invalid email or password','invalid_credentials');
  return publicUser(existing);
}
