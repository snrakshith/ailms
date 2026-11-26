import type {RequestHandler} from 'express';
import {taskQuerySchema,createTaskSchema,updateTaskSchema} from '@sapling/contracts';
import {listTasks,insertTask,updateTask,deleteTask} from './tasks.repository.js';
import {cacheGet,cachePut,taskCacheGeneration,invalidateTenantTasks} from '../../infrastructure/cache/cache.js';
import {recordAudit} from '../../infrastructure/events/audit.js';
import {emitJob} from '../../infrastructure/queue/jobs.js';

export const list:RequestHandler=async(req,res)=>{
  const principal=req.principal!;const query=taskQuerySchema.parse(req.query);
  const generation=await taskCacheGeneration(principal.tenantId);
  const key=`tasks:${principal.tenantId}:${generation}:${query.status??'all'}:${query.cursor??'first'}:${query.limit}`;
  const cached=await cacheGet(key);
  // A tenant generation number invalidates all paginated/filter combinations after each mutation.
  if(cached){res.json(cached);return;}
  const result=await listTasks(principal.tenantId,query);
  await cachePut(key,result,15);
  res.json(result);
};
export const create:RequestHandler=async(req,res)=>{
  const principal=req.principal!;const input=createTaskSchema.parse(req.body);
  const created=await insertTask(principal.tenantId,principal.id,input);
  await invalidateTenantTasks(principal.tenantId);
  await recordAudit({tenantId:principal.tenantId,actorId:principal.id,action:'task.created',entityType:'task',entityId:created.id});
  await emitJob('task.created',{tenantId:principal.tenantId,taskId:created.id});
  res.status(201).json({data:created});
};
export const update:RequestHandler=async(req,res)=>{
  const principal=req.principal!;const input=updateTaskSchema.parse(req.body);
  const result=await updateTask(principal.tenantId,String(req.params.id),input);
  await invalidateTenantTasks(principal.tenantId);
  await recordAudit({tenantId:principal.tenantId,actorId:principal.id,action:'task.updated',entityType:'task',entityId:result.id});
  res.json({data:result});
};
export const remove:RequestHandler=async(req,res)=>{
  const principal=req.principal!;const id=String(req.params.id);
  await deleteTask(principal.tenantId,id);
  await invalidateTenantTasks(principal.tenantId);
  await recordAudit({tenantId:principal.tenantId,actorId:principal.id,action:'task.deleted',entityType:'task',entityId:id});
  res.status(204).end();
};
