import mongoose,{Schema} from 'mongoose';
const codeSchema=new Schema({userId:{type:String,required:true,unique:true},code:{type:String,required:true,unique:true}}, {timestamps:true});
const attributionSchema=new Schema({referredId:{type:String,required:true,unique:true},referrerId:{type:String,required:true,index:true},code:{type:String,required:true},qualifiedAt:{type:Date,default:null}}, {timestamps:true});
export const ReferralCodeModel=mongoose.model('ReferralCode',codeSchema);
export const ReferralAttributionModel=mongoose.model('ReferralAttribution',attributionSchema);
