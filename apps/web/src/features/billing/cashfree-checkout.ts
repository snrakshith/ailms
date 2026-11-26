// Browser adapter only. Shared checkout contracts live in client-sdk for React Native reuse.
type CashfreeCheckout={checkout:(args:{paymentSessionId:string;redirectTarget:'_self'})=>Promise<unknown>|unknown};
type CashfreeFactory=(options:{mode:'sandbox'|'production'})=>CashfreeCheckout;
declare global {interface Window {Cashfree?:CashfreeFactory}}
let sdkLoad:Promise<void>|undefined;
export function loadCashfree():Promise<void>{
 if(window.Cashfree)return Promise.resolve();
 if(sdkLoad)return sdkLoad;
 sdkLoad=new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='https://sdk.cashfree.com/js/v3/cashfree.js';
  script.async=true;script.onload=()=>window.Cashfree?resolve():reject(new Error('Cashfree SDK unavailable'));
  script.onerror=()=>reject(new Error('Could not load secure checkout'));
  document.head.appendChild(script);
 }).catch(error=>{sdkLoad=undefined;throw error;});
 return sdkLoad;
}
export async function startCashfreeCheckout(sessionId:string,mode:'sandbox'|'production'){
 await loadCashfree();
 if(!window.Cashfree)throw new Error('Secure checkout is unavailable');
 await window.Cashfree({mode}).checkout({paymentSessionId:sessionId,redirectTarget:'_self'});
}
