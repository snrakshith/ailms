import {env} from '../../../config/env.js';
import {connectDatabase,closeDatabase} from './connection.js';
import {UserModel,TaskModel} from './models.js';
import bcrypt from 'bcryptjs';
import {randomUUID} from 'node:crypto';
if(env.NODE_ENV==='production')throw new Error('Seeding disabled in production');
await connectDatabase();
try {
 const email='demo@sapling.local';
 let user=await UserModel.findOne({email});
 if(!user){user=await UserModel.create({name:'Demo Owner',email,passwordHash:await bcrypt.hash('demo-only-password-2026',12),tenantId:randomUUID(),role:'owner'});}
 await TaskModel.updateOne({tenantId:user.tenantId,title:'Review starter architecture'},{$setOnInsert:{description:'Explore docs, modules and deployment examples',status:'todo',createdBy:String(user._id)}},{upsert:true});
 console.log('Created local demo user demo@sapling.local; replace demo credentials before any exposure.');
}finally{await closeDatabase();}
