import {beforeAll,beforeEach,afterAll,describe,it,expect} from 'vitest';
import supertest from 'supertest';
import {randomUUID} from 'node:crypto';
import {createApp} from '../../src/app/app.js';
import {connectDatabase,closeDatabase} from '../../src/infrastructure/database/mongodb/connection.js';
import {UserModel} from '../../src/infrastructure/database/mongodb/models.js';
import {NativeRefreshModel} from '../../src/modules/users/native-auth.models.js';
import {LessonAttemptModel,LessonCompletionModel} from '../../src/modules/learning/learning.models.js';
import {catalog} from '../../src/modules/learning/catalog.js';
import {PaymentOrderModel} from '../../src/modules/billing/billing.models.js';
import {ReferralAttributionModel,ReferralCodeModel} from '../../src/modules/referrals/referral.models.js';

/** These are real HTTP+Mongo contract tests; no external providers are contacted. */
const app=createApp();
const password='SafePassphrase-For-CI-12345';
function newUser(){return {name:'Learning Engineer',email:`learner-${randomUUID()}@example.org`,password};}
async function browserUser(){
 const agent=supertest.agent(app);const csrf=await agent.get('/api/v1/auth/csrf');
 const user=newUser();const created=await agent.post('/api/v1/auth/register').set('x-csrf-token',csrf.body.token).send(user);
 expect(created.status).toBe(201);
 return {agent,csrfToken:csrf.body.token,user,created};
}

beforeAll(async()=>{
 const uri=process.env.MONGODB_URI??'';
 if(!/\/aiquest_[a-z0-9_]*integration(?:\?|$)/i.test(uri))
  throw new Error('Integration tests require a disposable aiquest_*integration MongoDB database');
 await connectDatabase();
});
beforeEach(async()=>{
 await Promise.all([UserModel.deleteMany({}),NativeRefreshModel.deleteMany({}),
 LessonAttemptModel.deleteMany({}),LessonCompletionModel.deleteMany({}),
 PaymentOrderModel.deleteMany({}),ReferralCodeModel.deleteMany({}),ReferralAttributionModel.deleteMany({})]);
});
afterAll(async()=>{await closeDatabase();});

describe('identity and security HTTP contracts',()=>{
 it('blocks unauthenticated resources and rejects cross-site changes',async()=>{
  const unauth=await supertest(app).get('/api/v1/learning/progress');expect(unauth.status).toBe(401);
  const {agent,csrfToken}=await browserUser();
  const cross=await agent.put('/api/v1/auth/onboarding').set('Origin','https://attacker.example').set('x-csrf-token',csrfToken)
   .send({background:'frontend',familiarity:'new',goal:'ai-foundations',dailyMinutes:10});
  expect(cross.status).toBe(403);
  const missing=await agent.put('/api/v1/auth/onboarding').send({background:'frontend'});
  expect(missing.status).toBe(403);
 });
 it('sets HttpOnly cookies, invalidates old JWTs on logout, and rejects wrong credentials',async()=>{
  const {agent,csrfToken,user,created}=await browserUser();
  const rawCookies=created.headers['set-cookie'];
  const cookie=(Array.isArray(rawCookies)?rawCookies:[]).find((v:string)=>v.startsWith('session='));
  expect(cookie).toContain('HttpOnly');
  expect((await agent.get('/api/v1/auth/me')).status).toBe(200);
  expect((await agent.post('/api/v1/auth/logout').set('x-csrf-token',csrfToken)).status).toBe(204);
  const stale=await supertest(app).get('/api/v1/auth/me').set('Cookie',cookie.split(';')[0]);
  expect(stale.status).toBe(401);
  const wrong=await agent.post('/api/v1/auth/login').set('x-csrf-token',csrfToken)
   .send({email:user.email,password:'incorrect'});
  expect(wrong.status).toBe(401);
 });
 it('web sign-out also revokes outstanding native refresh tokens',async()=>{
  const {agent,csrfToken,user}=await browserUser();
  const native=await supertest(app).post('/api/v1/native-auth/login').send({email:user.email,password:user.password});
  expect(native.status).toBe(200);
  expect((await agent.post('/api/v1/auth/logout').set('x-csrf-token',csrfToken)).status).toBe(204);
  expect((await supertest(app).post('/api/v1/native-auth/refresh').send({refreshToken:native.body.refreshToken})).status).toBe(401);
  expect((await supertest(app).get('/api/v1/auth/me').set('Authorization',`Bearer ${native.body.accessToken}`)).status).toBe(401);
 });
 it('rotates native refresh credentials and forbids refresh replay',async()=>{
  const user=newUser();const register=await supertest(app).post('/api/v1/native-auth/register').send(user);
  expect(register.status).toBe(201);
  const token=register.body.refreshToken;
  const first=await supertest(app).post('/api/v1/native-auth/refresh').send({refreshToken:token});
  expect(first.status).toBe(200);expect(first.body.refreshToken).not.toBe(token);
  const replay=await supertest(app).post('/api/v1/native-auth/refresh').send({refreshToken:token});
  expect(replay.status).toBe(401);
  const authorized=await supertest(app).get('/api/v1/auth/me').set('Authorization',`Bearer ${first.body.accessToken}`);
  expect(authorized.status).toBe(200);
 });
});

describe('learning, grading and isolation API contracts',()=>{
 it('never sends answer keys, grades server-side, awards XP only once',async()=>{
  const {agent,csrfToken}=await browserUser();
  const lesson=catalog[0].lessons[0];
  const fetched=await agent.get(`/api/v1/learning/lessons/${lesson.id}`);
  expect(fetched.status).toBe(200);
  expect(JSON.stringify(fetched.body)).not.toContain('correctOptionId');
  const answers=Object.fromEntries(lesson.questions.map(q=>[q.id,q.correctOptionId]));
  const payload={answers,idempotencyKey:randomUUID()};
  const submitted=await agent.post(`/api/v1/learning/lessons/${lesson.id}/submit`).set('x-csrf-token',csrfToken).send(payload);
  expect(submitted.status).toBe(200);expect(submitted.body.data.passed).toBe(true);
  expect(submitted.body.data.awardedXp).toBe(lesson.xp);
  const replay=await agent.post(`/api/v1/learning/lessons/${lesson.id}/submit`).set('x-csrf-token',csrfToken).send(payload);
  expect(replay.status).toBe(200);expect(replay.body.data.awardedXp).toBe(0);
  expect((await agent.get('/api/v1/learning/progress')).body.totalXp).toBe(lesson.xp);
  const mismatch=await agent.post(`/api/v1/learning/lessons/${lesson.id}/submit`).set('x-csrf-token',csrfToken)
   .send({...payload,answers:{...answers,[lesson.questions[0].id]:'wrong'}});
  expect(mismatch.status).toBe(409);
 });
 it('keeps progress separate for different learners',async()=>{
  const first=await browserUser();const second=await browserUser();
  const lesson=catalog[0].lessons[0];
  const answers=Object.fromEntries(lesson.questions.map(q=>[q.id,q.correctOptionId]));
  await first.agent.post(`/api/v1/learning/lessons/${lesson.id}/submit`).set('x-csrf-token',first.csrfToken)
   .send({answers,idempotencyKey:randomUUID()});
  expect((await first.agent.get('/api/v1/learning/progress')).body.completedLessons).toBe(1);
  expect((await second.agent.get('/api/v1/learning/progress')).body.completedLessons).toBe(0);
  expect((await second.agent.get('/api/v1/billing/me')).status).toBe(200);
 });
});


describe('billing and referral authorization',()=>{
 it("refuses another learner\'s paid receipt and rejects unconfirmed receipts",async()=>{
  const owner=await browserUser();const other=await browserUser();
  const orderId=`aq_${randomUUID().replace(/-/g,'')}`;
  const ownerId=owner.created.body.user.id;
  const order={orderId,userId:ownerId,tenantId:owner.created.body.user.tenantId,productId:'genai-track-pass',
   idempotencyKey:randomUUID(),amountPaise:49900,currency:'INR',status:'pending'};
  await PaymentOrderModel.create(order);
  expect((await owner.agent.get(`/api/v1/billing/orders/${orderId}/invoice`)).status).toBe(409);
  expect((await other.agent.get(`/api/v1/billing/orders/${orderId}/invoice`)).status).toBe(404);
  await PaymentOrderModel.updateOne({orderId},{$set:{status:'paid',paidAt:new Date()}});
  const receipt=await owner.agent.get(`/api/v1/billing/orders/${orderId}/invoice`);
  expect(receipt.status).toBe(200);
  expect(receipt.headers['content-type']).toMatch(/application\/pdf/);
 });
 it('qualifies referral after invited learner passes a lesson',async()=>{
  const referrer=await browserUser();
  const referral=await referrer.agent.get('/api/v1/referrals/me');
  expect(referral.status).toBe(200);
  const invitee=await browserUser();
  const claim=await invitee.agent.post('/api/v1/referrals/claim').set('x-csrf-token',invitee.csrfToken)
   .send({code:referral.body.data.code});
  expect(claim.status).toBe(204);
  const lesson=catalog[0].lessons[0];
  const answers=Object.fromEntries(lesson.questions.map(q=>[q.id,q.correctOptionId]));
  await invitee.agent.post(`/api/v1/learning/lessons/${lesson.id}/submit`).set('x-csrf-token',invitee.csrfToken)
    .send({answers,idempotencyKey:randomUUID()});
  // Qualification can run in background; wait for its persisted state, not a fixed timeout.
  await expect.poll(async()=>{
   const row=await ReferralAttributionModel.findOne({referredId:invitee.created.body.user.id}).lean();
   return Boolean(row?.qualifiedAt);
  },{timeout:5000,interval:100}).toBe(true);
 });
});
