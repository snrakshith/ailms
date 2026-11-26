import {createServer} from 'node:http';
import {startTelemetry,stopTelemetry} from '../infrastructure/observability/tracing/tracing.js';
await startTelemetry();
const {initializeSentry}=await import('../infrastructure/observability/sentry.js');initializeSentry();
// Load instrumented dependencies only after telemetry SDK registration.
const [{env},{createApp},{logger},{connectDatabase,closeDatabase},{connectCache,disconnectCache},{initJobs,stopJobs},{onShutdown,shutdownAll}] = await Promise.all([
 import('../config/env.js'),import('./app.js'),import('../infrastructure/observability/logging/logger.js'),
 import('../infrastructure/database/mongodb/connection.js'),import('../infrastructure/cache/cache.js'),
 import('../infrastructure/queue/jobs.js'),import('../core/lifecycle/shutdown.js'),
]);
try {await connectDatabase();await connectCache();initJobs();}
catch(error){logger.fatal({err:error},'Dependency initialization failed');process.exitCode=1;await stopTelemetry();process.exit();}
const server=createServer(createApp());
onShutdown('http',()=>new Promise<void>((resolve,reject)=>{
 server.close(error=>error?reject(error):resolve());server.closeIdleConnections();
}));
onShutdown('queue',stopJobs);onShutdown('cache',disconnectCache);onShutdown('database',closeDatabase);onShutdown('telemetry',stopTelemetry);
server.listen(env.API_PORT,'0.0.0.0',()=>logger.info({port:env.API_PORT},'API listening'));
let stopping=false;
async function stop(signal:string){
 if(stopping)return;stopping=true;logger.info({signal},'Shutting down');
 const kill=setTimeout(()=>process.exit(1),15_000);kill.unref();
 await shutdownAll();clearTimeout(kill);process.exit(0);
}
process.on('SIGTERM',()=>{void stop('SIGTERM');});process.on('SIGINT',()=>{void stop('SIGINT');});
process.on('unhandledRejection',error=>{logger.fatal({err:error},'Unhandled rejection');void stop('unhandledRejection');});
process.on('uncaughtException',error=>{logger.fatal({err:error},'Uncaught exception');void stop('uncaughtException');});
