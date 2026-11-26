import {UserModel} from '../../infrastructure/database/mongodb/models.js';
import {onboardingSchema} from '@sapling/contracts';
import type {User} from '@sapling/contracts';
export async function findUserByEmail(email:string) {return UserModel.findOne({email}).select('+passwordHash');}
export async function findUserById(id:string) {return UserModel.findById(id);}
export async function createUser(value:{name:string;email:string;passwordHash:string;tenantId:string}) {
  return UserModel.create({...value,role:'owner'});
}
export function publicUser(value:{_id:unknown;name:string;email:string;tenantId:string;role:string;googleSubject?:string;onboarding?:unknown}):User {
  const onboarding=onboardingSchema.safeParse(value.onboarding);
  return {id:String(value._id),name:value.name,email:value.email,tenantId:value.tenantId,role:value.role as User['role'],googleLinked:Boolean(value.googleSubject),onboarding:onboarding.success?onboarding.data:null};
}
