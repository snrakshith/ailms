import {Router} from 'express';
import {AuditModel} from '../../infrastructure/database/mongodb/models.js';
import {requireAuth,requireRole} from '../../infrastructure/security/session.js';
export function createAuditRouter(){
 const router=Router();router.use(requireAuth,requireRole('owner'));
 router.get('/',async(req,res)=>{
   const events=await AuditModel.find({tenantId:req.principal!.tenantId}).sort({at:-1}).limit(50).lean();
   res.json({data:events.map(event=>({id:String(event._id),action:event.action,entityId:event.entityId,at:event.at}))});
 });return router;
}
