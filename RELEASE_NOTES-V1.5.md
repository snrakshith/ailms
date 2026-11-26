# AI Quest v1.5 — DevSecOps and Playwright

**Changes:** Completely removed Cypress runtime/config/tests, added `@playwright/test@1.65.1` with Chromium/Firefox/WebKit suites for public pages, auth security, anonymous API/CSRF access and the complete developer-to-AI lesson journey including logout. Playwright reports traces/screenshots/videos on failures.

**Security pipelines:** CodeQL security-extended SAST; Trivy + pnpm audit + dependency review SCA; Trivy scans on both API/web container images; OWASP ZAP public baseline + active OpenAPI DAST in a disposable Docker Compose stack; TruffleHog history scan; Husky staged and pre-push gates retained. ZAP medium/high report gate has standalone tests; DAST cannot run with live Cashfree/SES/LLM credentials.

**Unverified:** The execution environment cannot access the npm registry or Docker daemon. Full pnpm/Playwright/Vitest E2E, CodeQL, Trivy, ZAP and image builds have _not_ been executed. A real pnpm lockfile is still required and CI will intentionally fail without it. SHA/digest pinning and authenticated staging DAST are additional production hardening work.

See `docs/testing/DEVSECOPS-PLAYWRIGHT-V1.5.md` for commands and required branch protection.
