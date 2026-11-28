#!/usr/bin/env node
/** Dependency-free baseline checks. Not a security audit, SAST, or penetration test. */
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
const coreFiles = (await readdir('packages/learning-core/src')).join(' ');
assert.ok(
  !coreFiles.includes('catalog.ts'),
  'Private catalog must never be in portable learning-core',
);
const core = await readFile('packages/learning-core/src/index.ts', 'utf8');
assert.ok(!core.includes('catalog.js'), 'Private answer keys must not ship in core exports');
const studio = await readFile('apps/api/src/modules/content/content.service.ts', 'utf8');
assert.match(studio, /authorId:\{\$ne:userId\}/, 'Require an independent editor/reviewer');
const native = await readFile('apps/api/src/infrastructure/security/csrf.ts', 'utf8');
assert.match(
  native,
  /verifyMobileAccessToken/,
  'Native bearer must be verified before CSRF exemption',
);
const client = await readFile('apps/web/src/features/experience/pages/labs-page.tsx', 'utf8');
assert.match(
  client,
  /iframe\.sandbox\.add\('allow-scripts'\)/,
  'Python lab must load only inside sandbox iframe',
);
assert.match(client, /event\.origin!==['"]null['"]/, 'Python lab must verify opaque origin');
const csp = await readFile('docker/nginx.conf', 'utf8');
assert.match(csp, /worker-src 'self' blob:/, 'CSP must allow blob workers inside isolated sandbox');
assert.match(csp, /frame-ancestors 'none'/, 'Prevent clickjacking');
const env = await readFile('.env.example', 'utf8');
assert.ok(!/AIQUEST_LLM_KEY=\S+/.test(env), 'No live LLM key should be bundled');
const billing = await readFile('apps/api/src/modules/billing/billing.routes.ts', 'utf8');
assert.match(billing, /verifyCashfreeWebhook/, 'Cashfree raw signatures must be checked');
assert.match(billing, /reconcileOrder/, 'Cashfree webhook must verify live provider order');
const orderService = await readFile('apps/api/src/modules/billing/billing.service.ts', 'utf8');
assert.match(
  orderService,
  /providerOrderMatches/,
  'Grant only on matching provider-verified amounts',
);
const google = await readFile('apps/api/src/modules/users/google-identity.ts', 'utf8');
assert.match(
  google,
  /jwtVerify\(credential,googleKeys/,
  'Google ID tokens must be verified server-side',
);
assert.match(
  google,
  /google_link_required/,
  'Password accounts must require explicit Google linking',
);
assert.match(
  google,
  /payload\.email_verified!==true/,
  'Federated identities require verified emails',
);
assert.match(csp, /https:\/\/accounts\.google\.com/, 'Google login requires CSP allowlisting');
console.log(
  'PASS: basic isolation, secret, workflow and sandbox invariants. Manual/security audit still required.',
);
