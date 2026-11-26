import mongoose,{Schema} from 'mongoose';
const paymentOrderSchema=new Schema({
 orderId:{type:String,required:true,unique:true},userId:{type:String,required:true,index:true},
 tenantId:{type:String,required:true},productId:{type:String,required:true},
 idempotencyKey:{type:String,required:true},amountPaise:{type:Number,required:true,min:100},
 currency:{type:String,required:true,enum:['INR']},status:{type:String,required:true,enum:['creating','pending','paid','expired','failed'],default:'creating'},
 paymentSessionId:{type:String},providerOrderId:{type:String},paidAt:{type:Date},
}, {timestamps:true,versionKey:false});
paymentOrderSchema.index({userId:1,idempotencyKey:1},{unique:true});
paymentOrderSchema.index({userId:1,createdAt:-1});
const entitlementSchema=new Schema({
 userId:{type:String,required:true,index:true},tenantId:{type:String,required:true},productId:{type:String,required:true},
 orderId:{type:String,required:true,unique:true},grantedAt:{type:Date,required:true,default:Date.now},
},{versionKey:false});
entitlementSchema.index({userId:1,productId:1},{unique:true});
export const PaymentOrderModel=mongoose.model('PaymentOrder',paymentOrderSchema);
export const EntitlementModel=mongoose.model('Entitlement',entitlementSchema);
