import {describe,it,expect} from 'vitest';
import {canAuthor,canReview} from '../src/modules/content/content.service.js';
import type {User} from '@sapling/contracts';
const user=(email:string):User=>({id:'x',name:'Learner',email,tenantId:'t',role:'owner'});
describe('content publish permissions',()=>{
 it('does not equate tenant owner with curriculum author or reviewer',()=>{
  const priorAuthors=process.env.CONTENT_AUTHORS,priorReviewers=process.env.CONTENT_REVIEWERS;
  try{
   process.env.CONTENT_AUTHORS='writer@example.org';process.env.CONTENT_REVIEWERS='reviewer@example.org';
   expect(canAuthor(user('student@example.org'))).toBe(false);
   expect(canReview(user('writer@example.org'))).toBe(false);
   expect(canAuthor(user('WRITER@example.org'))).toBe(true);
   expect(canReview(user('REVIEWER@example.org'))).toBe(true);
  }finally{if(priorAuthors===undefined)delete process.env.CONTENT_AUTHORS;else process.env.CONTENT_AUTHORS=priorAuthors;
   if(priorReviewers===undefined)delete process.env.CONTENT_REVIEWERS;else process.env.CONTENT_REVIEWERS=priorReviewers;}
 });
});
