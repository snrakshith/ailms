import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const get = (file) => readFileSync(file, 'utf8');
test('Cypress is fully removed and Playwright is wired', () => {
  const app = JSON.parse(get('apps/web/package.json'));
  assert.equal(app.scripts.e2e, 'playwright test');
  assert.equal(app.devDependencies.cypress, undefined);
  assert.ok(app.devDependencies['@playwright/test']);
  assert.ok(existsSync('apps/web/playwright.config.ts'));
  assert.ok(!existsSync('apps/web/cypress.config.ts'));
  assert.ok(!get('.github/workflows/e2e.yml').includes('cypress'));
});
test('security jobs include explicit SAST, SCA, DAST and credential scanning', () => {
  assert.match(get('.github/workflows/codeql.yml'), /security-extended/);
  assert.match(get('.github/workflows/sca.yml'), /trivy-action/);
  assert.match(get('.github/workflows/sca.yml'), /pnpm audit/);
  assert.match(get('.github/workflows/dast.yml'), /run-zap\.sh/);
  assert.match(get('.github/workflows/secrets.yml'), /trufflehog-check/);
});
test('DAST cannot silently target arbitrary production host and uploads reports', () => {
  const dast = get('scripts/security/run-zap.sh');
  assert.match(dast, /127\.0\.0\.1:8080/);
  assert.match(dast, /CASHFREE_ENABLED/);
  assert.match(dast, /zap-report-gate/);
  assert.match(get('.github/workflows/dast.yml'), /upload-artifact/);
});
