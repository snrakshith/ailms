import {describe,it,expect} from 'vitest';
import {makeReferralCode} from '../src/modules/referrals/referral.logic.js';
describe('portable referral-code generator',()=>{
 it('uses a readable 8-character alphabet without confusing O, I, 0, 1',()=>{
  expect(makeReferralCode(Uint8Array.from([0,1,2,3,4,5,6,7]))).toHaveLength(8);
  expect(makeReferralCode(Uint8Array.from([0,31,32,255]))).toMatch(/^[A-HJ-NP-Z2-9]{4}$/);
 });
});
