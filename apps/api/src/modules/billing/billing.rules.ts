/** Portable monetary and entitlement rules. No framework or environment dependencies. */
export const PREMIUM_PRODUCT_ID = 'genai-track-pass' as const;
export const PREMIUM_PATH_ID = 'genai-engineering' as const;
export const CASHFREE_API_VERSION = '2025-01-01' as const;
export function rupeesToPaise(amount: number): number {
  if (!Number.isFinite(amount)) throw new Error('Invalid payment amount');
  const paise = Math.round(amount * 100);
  if (Math.abs(amount * 100 - paise) > 0.000001 || paise < 100) throw new Error('Invalid payment precision or minimum');
  return paise;
}
export function providerOrderMatches(
  expected: {orderId:string;amountPaise:number;currency:string},
  received: {order_id:string;order_amount:number;order_currency:string;order_status:string},
):boolean {
  return received.order_id===expected.orderId && received.order_currency===expected.currency &&
    Number.isFinite(received.order_amount) && Math.round(received.order_amount*100)===expected.amountPaise &&
    received.order_status==='PAID';
}
export function requiresPremium(pathId:string):boolean { return pathId===PREMIUM_PATH_ID; }

/** A settled paid row cannot be demoted by delayed webhook events. */
export function shouldGrantAccess(status:string,matchedProviderPaid:boolean):boolean{
 return status==='paid'||matchedProviderPaid;
}
