import {createHmac,timingSafeEqual} from 'node:crypto';
/** Cashfree PG uses base64 HMAC SHA-256(timestamp + unmodified raw JSON bytes). */
export function cashfreeWebhookSignature(timestamp:string,rawBody:Buffer,secret:string):string{
 return createHmac('sha256',secret).update(timestamp,'utf8').update(rawBody).digest('base64');
}
export function verifyCashfreeWebhook(timestamp:string|undefined,signature:string|undefined,rawBody:Buffer,secret:string):boolean{
 if(!timestamp || !signature || !/^\d{10,16}$/.test(timestamp) || !secret)return false;
 const expected=Buffer.from(cashfreeWebhookSignature(timestamp,rawBody,secret),'utf8');
 const actual=Buffer.from(signature,'utf8');
 return expected.length===actual.length && timingSafeEqual(expected,actual);
}
