import {describe,it,expect} from 'vitest';
import {createHmac} from 'node:crypto';
import {checkoutSchema} from '@sapling/contracts';
import {providerOrderMatches,requiresPremium,rupeesToPaise,shouldGrantAccess} from '../src/modules/billing/billing.rules.js';
import {verifyCashfreeWebhook,cashfreeWebhookSignature} from '../src/modules/billing/cashfree.signature.js';

describe('Cashfree learning-pass payment policies',()=>{
 const expected={orderId:'aq_test',amountPaise:49900,currency:'INR'};
 const paid={order_id:'aq_test',order_amount:499,order_currency:'INR',order_status:'PAID'};
 it('only grants when provider amount, currency, ID and state match',()=>{
  expect(providerOrderMatches(expected,paid)).toBe(true);
  expect(providerOrderMatches(expected,{...paid,order_amount:498})).toBe(false);
  expect(providerOrderMatches(expected,{...paid,order_id:'other'})).toBe(false);
  expect(providerOrderMatches(expected,{...paid,order_currency:'USD'})).toBe(false);
  expect(providerOrderMatches(expected,{...paid,order_status:'ACTIVE'})).toBe(false);
 });
 it('keeps premium entitlement scoped to one path and enforces paise precision',()=>{
  expect(requiresPremium('genai-engineering')).toBe(true);
  expect(requiresPremium('ai-foundations')).toBe(false);
  expect(rupeesToPaise(499.50)).toBe(49950);
  expect(()=>rupeesToPaise(499.505)).toThrow();
  expect(shouldGrantAccess('paid',false)).toBe(true);
  expect(shouldGrantAccess('pending',false)).toBe(false);
 });
 it('validates purchase input and rejects client-supplied amount fields',()=>{
  const request={productId:'genai-track-pass',customerPhone:'9876543210',idempotencyKey:'58cf3852-c451-4bdd-abed-1e5a04134fa1'};
  expect(checkoutSchema.safeParse(request).success).toBe(true);
  expect(checkoutSchema.safeParse({...request,amountPaise:1}).success).toBe(false);
  expect(checkoutSchema.safeParse({...request,customerPhone:'123'}).success).toBe(false);
 });
 it('verifies exact raw bytes with Cashfree base64 HMAC and constant-time matching',()=>{
  const raw=Buffer.from('{"type":"PAYMENT_SUCCESS_WEBHOOK","data":{}}');
  const timestamp='1763950000';const key='test-cashfree-secret';
  const expectedSig=createHmac('sha256',key).update(timestamp).update(raw).digest('base64');
  expect(cashfreeWebhookSignature(timestamp,raw,key)).toBe(expectedSig);
  expect(verifyCashfreeWebhook(timestamp,expectedSig,raw,key)).toBe(true);
  expect(verifyCashfreeWebhook(timestamp,expectedSig,Buffer.from(raw.toString()+' '),key)).toBe(false);
  expect(verifyCashfreeWebhook(timestamp,'bad',raw,key)).toBe(false);
  expect(verifyCashfreeWebhook(undefined,expectedSig,raw,key)).toBe(false);
 });
});
