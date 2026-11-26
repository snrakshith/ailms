import {Worker} from 'bullmq';
import {env} from '../config/env.js';
import {logger} from '../infrastructure/observability/logging/logger.js';
import {queueConnection} from '../infrastructure/queue/connection.js';
import {sendEmail} from '../modules/notifications/notifications.service.js';
import type {TemplateName} from '../modules/notifications/templates.js';
if(!env.REDIS_URL || !env.QUEUE_ENABLED)throw new Error('QUEUE_ENABLED=true and REDIS_URL required');
const worker=new Worker('sapling-events',async job=>{
 if(job.name==='transactional-email'){
   const {template,to,data}=job.data as {template:TemplateName;to:string;data:Record<string,string>};
   await sendEmail(template,to,data);return;
 }
 logger.info({jobId:job.id,event:job.name,tenantId:job.data.tenantId},'Processed domain event');
},{connection:queueConnection(),concurrency:5});
worker.on('failed',(job,error)=>logger.error({err:error,jobId:job?.id},'Job failed'));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{void worker.close().then(()=>process.exit(0));});
