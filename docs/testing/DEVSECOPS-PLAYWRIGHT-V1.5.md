# AI Quest v1.5 — DevSecOps & Playwright SOP

## Scope and intended workflow

This change keeps the existing React/Node/TypeScript monorepo and its portable learning core. It **replaces Cypress** with Playwright, and adds real jobs and guard scripts for SAST, SCA, DAST, secrets, and container scans. These are source-level integrations: a passing security audit or running stack has **not** been demonstrated by the authoring environment. The npm registry and Docker daemon are unavailable here.

| Pipeline / stage | Tool | Trigger | What fails a build |
| --- | --- | --- | --- |
| Quality | Prettier, ESLint, TypeScript, Vitest | PR / main | lint, formatting, compilation, unit or HTTP integration test failures |
| Browser E2E | Playwright — Chromium, Firefox, WebKit | PR / main | public, auth, API protection, learning-flow failures |
| SAST | GitHub CodeQL security-extended | PR / main / weekly | scan execution errors; security findings require code-scanning enforcement/triage |
| SCA | pnpm audit and Trivy filesystem | PR / main / weekly | high and critical findings / scanner execution errors |
| Dependency delta | GitHub Dependency Review | PR | new high/critical vulnerable dependency |
| Container vulnerability scan | Trivy API + web images | PR / main | high and critical OS/library findings |
| Secret scanning | staged detector, TruffleHog | pre-commit, pre-push, PR, main | suspected/verified secrets or tool failure |
| DAST | OWASP ZAP baseline + active OpenAPI scan | PR / main / weekly | **medium/high** findings, missing JSON, scan execution failures |

### Install and pin dependencies

Use Node 22+, `corepack enable`, then `pnpm install --no-frozen-lockfile` exactly once in a **network-enabled, trusted** development environment. Review all resolved dependencies, commit the real generated `pnpm-lock.yaml`, and thereafter use `pnpm install --frozen-lockfile` locally and in CI. **The ZIP has no lockfile.** All frozen-lockfile jobs intentionally fail until the genuine lockfile is committed. Never generate an artificial lockfile or bypass the gate.

```bash
corepack enable
pnpm install --no-frozen-lockfile
pnpm --filter @sapling/web exec playwright install --with-deps chromium firefox webkit
pnpm run infra:up
pnpm run build:shared
pnpm run e2e
```

Playwright config is in `apps/web/playwright.config.ts`, and tests are in `apps/web/e2e/`. Config starts the Express API and Vite web server unless `PLAYWRIGHT_EXTERNAL_SERVER=1` is set. It uses a **disposable** MongoDB database and automatically starts no external paid AI, payment or email integrations. Use `pnpm run e2e:ui` from the web package for local interactive debugging. Failure recordings, screenshots and traces are retained only for failed/retried tests, and GitHub uploads results for seven days. Browser binaries are installed in CI with `playwright install --with-deps` (no manual cache).

### Database isolation

Both Playwright and Vitest integration tests write data. Local use requires a disposable DB at `MONGODB_URI=mongodb://localhost:27017/aiquest_playwright_local` and matching API test environment (e.g., `NODE_ENV=test`, `JWT_SECRET` and `METRICS_TOKEN` set to *local test-only* values, `WEB_ORIGIN=http://127.0.0.1:5173`). The CI Playwright job uses `aiquest_playwright_e2e` with separate credentials. **Never point test suites to production or a shared development database**.

### ZAP: controlled dynamic tests

`scripts/security/run-zap.sh` provisions the production-built web and API images with *test-only local* MongoDB and Redis through Docker Compose, then performs:
1. A **passive** web baseline scan at `http://127.0.0.1:8080`.
2. An **active** OpenAPI scan at `http://127.0.0.1:4000/openapi.json`.
3. A strict `zap-report-gate.mjs` check on both JSON results, blocking medium/high findings, malformed reports and operational failures.

The web container is bound to loopback (`127.0.0.1:8080`) during scanning. The runner refuses to scan if Cashfree/SES is enabled or external model/Google credentials are configured; it never takes a URL from a PR as target. Reports go to `reports/zap/` (git-ignored) and are uploaded for seven days. ZAP executes only against the disposable environment; do **not** point active scanning at live merchant/user data. ZAP does not test privileged, logged-in screens with an authenticated session: an **authenticated staging DAST scan remains a follow-up**. For CI reliability, pin the ZAP image to a reviewed digest instead of the default `stable` moving tag before enforcing supply-chain policy.

Local run (in a disposable environment with Docker):

```bash
export JWT_SECRET='disposable-local-secret-abcdefghijklmnopqrstuvwxyz'
export METRICS_TOKEN='disposable-local-metrics-abcdefghijklmnopqrstuvwxyz'
export CASHFREE_ENABLED=false SES_ENABLED=false
bash scripts/security/run-zap.sh
node --test tests/security/zap-report.test.mjs
```

### SAST and SCA policy

CodeQL analyzes JavaScript/TypeScript with `security-extended`. **CodeQL uploading findings is not itself a fail-on-finding gate**; configure code-scanning policy / required security reviews and suppressions in GitHub, and treat new high-severity findings as release blockers. Trivy and `pnpm audit` fail CI on high/critical package, image, or detected configuration vulnerabilities. GitHub Dependency Review blocks vulnerable newly introduced dependencies when dependency graph is available. Vulnerability database or scanner failures fail the jobs; do not set `continue-on-error`.

The supplied YAML currently uses maintained major release tags for some GitHub actions. For hardened enterprise pipelines, replace every third-party action/image ref with a **reviewed immutable SHA/digest** and use Dependabot to update it. Avoid `pull_request_target` for building PR code and avoid passing provider secrets to forks.

### Secret scanning and local gates

Husky pre-commit runs the staged detector, lint-staged ESLint, and Prettier. Husky pre-push runs formatting, lint, type checking, Vitest, source security invariants and TruffleHog history scanning. The CI TruffleHog workflow invokes the same `scripts/security/trufflehog-check.sh` implementation. Its fallback image is version-tagged (`3.100.0`), not floating `latest`; prefer digest-pinning after a reviewed pull. Hooks are bypassable, so **enforce branch protection requiring CI**. If any secret is confirmed, revoke/rotate it, inspect commit history and audit access.

### Required branch protection

Enforce required status checks for Quality, HTTP Integration, Playwright, CodeQL, SCA, TruffleHog, DAST, and container scans; require two reviewers for security-sensitive changes, disallow force push to main, require signed commits if organizational policy allows, and use `CODEOWNERS` for API authorization/payment and pipeline files. Restrict workflow `GITHUB_TOKEN` to read-only by default and avoid untrusted third-party pull-request code with privileged tokens. Set action SHA pinning and environment approvals before production deployments.

### Rollout and remaining limitations

- `pnpm-lock.yaml` is missing because the registry was unreachable; **CI cannot pass yet**.
- Docker, Playwright browsers, ZAP, Trivy, CodeQL, provider sandboxes and database-backed tests have **not run** in the authoring environment.
- Run all GitHub workflows on a fresh PR; remediate reported issues without blanket suppression; run authenticated staging DAST, penetration testing and abuse-case reviews before real-money launch.
- GitHub Code Scanning and Dependency Review may require plan/repository settings; enable the dependency graph and alerting for the repository.
- AWS deployment and secure OIDC credentials remain a separate release plan (see `docs/testing/QUALITY-GATES-V1.4.md`).
