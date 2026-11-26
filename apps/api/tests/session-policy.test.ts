import {describe,it,expect} from 'vitest';
import {sessionVersionMatches} from '../src/infrastructure/security/session-policy.js';
describe('session revocation guard',()=>{
 it('accepts only matching safe numeric generations',()=>{
  expect(sessionVersionMatches(0,undefined)).toBe(true);
  expect(sessionVersionMatches(2,2)).toBe(true);
  expect(sessionVersionMatches(0,1)).toBe(false);
  expect(sessionVersionMatches(undefined,0)).toBe(false);
  expect(sessionVersionMatches('1',1)).toBe(false);
  expect(sessionVersionMatches(-1,-1)).toBe(false);
  expect(sessionVersionMatches(1.2,1.2)).toBe(false);
 });
});
