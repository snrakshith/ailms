# Engineering quality gates and production-readiness assessment

## Existing source assessment (before payments)

Estimated **product/architecture maturity: 75/100**, **production readiness: 55/100**. These are subjective engineering estimates, not third-party certifications. API, UI, P1 feature modules, tests and docs exist, but there is no recorded successful dependency-backed full build, integrated deployment, billing sandbox run, load test or external security review.

## GitHub checks now configured

- `.github/workflows/ci.yml` — mandatory fail-on-error **Prettier formatting**, **ESLint**, **TypeScript typecheck**, core invariants, **Vitest unit tests**, production bundles, static payment/security invariants, **pnpm audit**; a dependent Docker image build job.
- `.github/workflows/e2e.yml` — Playwright with MongoDB and Redis on PRs/main, Chromium/Firefox/WebKit.
- `.github/workflows/codeql.yml` — weekly/push/PR CodeQL JavaScript+TypeScript analysis.
- `.github/dependabot.yml` — dependency update automation retained from starter.
- `package.json` includes `pnpm run format` to apply Prettier, and `pnpm run format:check` to fail on drift.

**Known limitation:** Source ZIP inherited no `pnpm-lock.yaml`; until generated, CI intentionally fails with `--frozen-lockfile`. On a network-enabled environment, execute `pnpm install`, `pnpm run format`, inspect the formatting diff, `pnpm run format:check`, `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`, `pnpm run build`, `pnpm run security:static`, `pnpm run e2e` and `pnpm audit --audit-level=high`. Commit resulting `pnpm-lock.yaml` and switch CI to `pnpm install --frozen-lockfile` + pnpm caching. Set branch protection for quality/CodeQL/E2E checks.

## Production blockers / readiness checklist

- [ ] Full clean install, lint, typecheck, unit tests, E2E and Docker builds are green on a pinned Node version; lockfile committed.
- [ ] Cashfree SANDBOX success, decline, duplicate webhook, invalid signature, lost redirect, expired order and owner isolation integration tests are green.
- [ ] Live dashboard secrets, permitted merchant domain, public TLS callback, live webhook subscriptions validated.
- [ ] Refunds and chargeback support process, pricing decision, billing legal/tax rules reviewed with finance and legal teams.
- [ ] Security: pentest, CSRF, authorization, quota abuse, package supply chain, webhook replay/resilience tested.
- [ ] Operational: reconciliation of pending orders; refund handling; payment success/error/latency alerts; backups tested.
- [ ] Accessibility and mobile viewport audits on login, dashboard, learning, billing and checkout returns.
- [ ] Database transaction semantics reviewed for payment+entitlement atomicity, and payment outage chaos tests completed.
- [ ] User migration/grandfathering policy agreed for any learners with prior GenAI completions.

**Do not claim production ready until these gates pass.** Code integration and security architecture are not equivalent to operational and merchant readiness.


## Public marketing / Google identity launch gate

- Verify the real Google OAuth Web client ID and allowed JavaScript origins for each environment.
- Run automated email and Google sign-in/linking/Google-only deletion flows, including replay and invalid audience tests.
- Check public article metadata, mobile nav, checkout marketing price parity and legal/support links before taking live payments.
- Run `pnpm run test:marketing`; run full lint, format, type, unit, build, Playwright and security checks in CI.
- Check deployed CSP with Google's Google Identity Services iframe and any required consent UI.

**Security update v1.5:** `.github/workflows/sca.yml` runs pnpm audit + Trivy + Dependency Review; `.github/workflows/dast.yml` runs OWASP ZAP against a disposable local stack; CodeQL uses security-extended; container images are scanned by Trivy. See `docs/testing/DEVSECOPS-PLAYWRIGHT-V1.5.md`.
