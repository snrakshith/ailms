import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { siteContent } from '../../apps/web/src/features/marketing/content/site-content.ts';
import { renderEmail } from '../../apps/api/src/modules/notifications/templates.ts';
const read = (f) => readFile(f, 'utf8');
const workspaces = await read('pnpm-workspace.yaml');
assert.match(workspaces, /apps\/\*/);
assert.match(workspaces, /packages\/\*/);
const root = JSON.parse(await read('package.json'));
assert.match(root.packageManager, /^pnpm@/);
assert.ok(!('workspaces' in root));
assert.match(root.scripts.verify, /test:release/);
for (const pkg of ['apps/api/package.json', 'apps/web/package.json']) {
  const manifest = JSON.parse(await read(pkg));
  for (const [name, version] of Object.entries(manifest.dependencies))
    if (name.startsWith('@aiquest/') || name.startsWith('@sapling/'))
      assert.equal(version, 'workspace:*');
}
const app = await read('apps/api/src/app/app.ts');
assert.match(app, /createReferralRouter/);
const invoice = await read('apps/api/src/modules/billing/billing.routes.ts');
assert.match(invoice, /buildPaymentReceipt/);
const receipt = await read('apps/api/src/modules/billing/invoice.service.ts');
assert.match(receipt, /order\.status\s*!==\s*'paid'/);
const billing = await read('apps/api/src/modules/billing/billing.service.ts');
assert.match(billing, /settled\.modifiedCount\s*===\s*1/);
const signup = await read('apps/api/src/modules/users/users.service.ts');
assert.match(signup, /validateReferral/);
assert.match(signup, /attributeReferral/);
const learn = await read('apps/api/src/modules/learning/learning.service.ts');
assert.match(learn, /markReferralQualified/);
const consent = await read('apps/web/src/core/analytics/analytics.ts');
assert.match(consent, /analyticsConsent\(\)\s*!==\s*'yes'/);
assert.match(consent, /autocapture\s*:\s*false/);
assert.match(consent, /disable_session_recording\s*:\s*true/);
assert.match(
  await read('apps/api/src/modules/notifications/notifications.service.ts'),
  /SESv2Client/,
);
assert.match(await read('apps/api/src/workers/worker.ts'), /sendEmail/);
assert.match(await read('apps/web/src/features/billing/billing-page.tsx'), /Download receipt/);
assert.ok(siteContent.alert.enabled);
assert.ok(siteContent.footer.columns.some((c) => c.links.some((l) => l.href === '/status')));
assert.ok(siteContent.articles.length >= 3);
const tpl = renderEmail(
  'lesson-complete',
  { name: '<script>alert(1)</script>', lesson: 'ML & AI' },
  'https://example.org',
);
assert.ok(!tpl.html.includes('<script>alert(1)</script>'));
assert.ok(tpl.html.includes('&lt;script&gt;'));
assert.match(tpl.text, /ML &amp; AI|ML & AI/);
const purchase = renderEmail('purchase-confirmation', { name: 'Example' }, 'https://example.org');
assert.match(purchase.text, /\/billing/);
assert.match(purchase.subject, /learning pass/);
const google = await read('apps/api/src/modules/referrals/referral.routes.ts');
assert.match(google, /24\s*\*\s*60\s*\*\s*60\s*\*\s*1000/);
console.log(
  'PASS: pnpm workspace, portable integration contracts, referral lifecycle, paid receipt gate, opt-in analytics and transactional email templates',
);
