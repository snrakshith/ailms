#!/usr/bin/env node
// Run against a local API started with a reachable MongoDB. No extra npm dependencies.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
const origin = process.env.API_ORIGIN ?? 'http://localhost:4000';
let cookies = {};
function storeCookies(response) {
  for (const item of response.headers.getSetCookie?.() ?? []) {
    const pair = item.split(';')[0];
    const idx = pair.indexOf('=');
    if (idx !== -1) cookies[pair.slice(0, idx)] = pair.slice(idx + 1);
  }
}
async function call(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (Object.keys(cookies).length)
    headers.Cookie = Object.entries(cookies)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  const response = await fetch(`${origin}/api/v1${path}`, { ...options, headers });
  storeCookies(response);
  const json = response.status === 204 ? null : await response.json();
  return { response, json };
}
const csrf = (await call('/auth/csrf')).json.token;
const email = `learning-smoke-${randomUUID()}@example.test`;
const register = await call('/auth/register', {
  method: 'POST',
  headers: { 'x-csrf-token': csrf },
  body: JSON.stringify({ name: 'Learning Smoke', email, password: 'demo-only-password-2026' }),
});
assert.equal(register.response.status, 201, JSON.stringify(register.json));
assert.equal(register.json.user.onboarding, null);
const onboarding = await call('/auth/onboarding', {
  method: 'PUT',
  headers: { 'x-csrf-token': csrf },
  body: JSON.stringify({
    background: 'fullstack',
    familiarity: 'new',
    goal: 'ai-foundations',
    dailyMinutes: 10,
  }),
});
assert.equal(onboarding.response.status, 200, JSON.stringify(onboarding.json));
const lesson = await call('/learning/lessons/ai-vs-software');
assert.equal(lesson.response.status, 200, JSON.stringify(lesson.json));
assert.equal(JSON.stringify(lesson.json).includes('correctOptionId'), false);
const locked = await call('/learning/lessons/data-and-features');
assert.equal(locked.response.status, 403);
const key = randomUUID();
const answers = { q1: 'a', q2: 'b', q3: 'c' };
const body = JSON.stringify({ answers, idempotencyKey: key });
const complete = await call('/learning/lessons/ai-vs-software/submit', {
  method: 'POST',
  headers: { 'x-csrf-token': csrf },
  body,
});
assert.equal(complete.response.status, 200, JSON.stringify(complete.json));
assert.equal(complete.json.data.passed, true);
assert.equal(complete.json.data.awardedXp, 50);
const repeat = await call('/learning/lessons/ai-vs-software/submit', {
  method: 'POST',
  headers: { 'x-csrf-token': csrf },
  body,
});
assert.equal(repeat.response.status, 200);
assert.equal(repeat.json.data.awardedXp, 0);
const overview = await call('/learning/overview');
assert.equal(overview.json.stats.totalXp, 50);
assert.equal(overview.json.stats.completedLessons, 1);
assert.equal((await call('/learning/lessons/data-and-features')).response.status, 200);
console.log(
  'PASS: registration, onboarding, lesson locks, deterministic grading, idempotent XP and progress',
);
