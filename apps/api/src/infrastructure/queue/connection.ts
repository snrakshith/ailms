import {env} from '../../config/env.js';
export function queueConnection(){
 const value=new URL(env.REDIS_URL!);
 return {host:value.hostname,port:Number(value.port||6379),username:decodeURIComponent(value.username)||undefined,password:decodeURIComponent(value.password)||undefined,db:Number(value.pathname.replace('/','')||0),...(value.protocol==='rediss:'?{tls:{}}:{})};
}
