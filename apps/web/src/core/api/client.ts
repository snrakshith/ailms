import type {ApiError} from '@sapling/contracts';
import {config} from '../../config/env';

let csrfToken:string|undefined;
export class ApiRequestError extends Error {
 constructor(public status:number, public code:string, detail:string){super(detail);}
}
export async function ensureCsrf():Promise<string>{
 if(csrfToken)return csrfToken;
 const response=await fetch(`${config.apiBase}/auth/csrf`,{credentials:'include'});
 if(!response.ok)throw new Error('Unable to establish secure session');
 const body=await response.json() as {token:string};csrfToken=body.token;return csrfToken;
}
export async function api<T>(path:string,options:RequestInit & {timeoutMs?:number}={}):Promise<T>{
 const method=(options.method??'GET').toUpperCase();
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),options.timeoutMs??12000);
 const headers=new Headers(options.headers);
 if(options.body)headers.set('Content-Type','application/json');
 headers.set('x-request-id',crypto.randomUUID());
 // Browser-generated W3C trace context is correlated by OpenTelemetry HTTP instrumentation.
 const traceId=crypto.randomUUID().replace(/-/g,'');
 const spanId=crypto.randomUUID().replace(/-/g,'').slice(0,16);
 headers.set('traceparent',`00-${traceId}-${spanId}-01`);
 try {
  if(!['GET','HEAD'].includes(method))headers.set('x-csrf-token',await ensureCsrf());
  const response=await fetch(`${config.apiBase}${path}`,{...options,credentials:'include',headers,signal:options.signal??controller.signal});
  if(response.status===204)return undefined as T;
  if(!response.ok){
   const body=await response.json().catch(()=>({})) as Partial<ApiError>;
   throw new ApiRequestError(response.status,body.title??'request_failed',body.detail??`Request failed (${response.status})`);
  }
  return await response.json() as T;
 }finally{clearTimeout(timeout);}
}
