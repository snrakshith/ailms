# Quality and test strategy

## Included test implementation

- API: Vitest contract schemas, retry and circuit breaker, bulkhead concurrency test.
- Cross-stack: standalone integration smoke script covers CSRF rejection and tenant ID isolation; contract smoke checks OpenAPI routes; a k6 load-smoke script provides health-route performance baseline.
- Web: Vitest + React Testing Library Button, axe-core basic accessibility, API error shape.
- Playwright: public marketing/pricing/FAQ/blog; protected-route/CSRF rejection; register → onboard → graded lesson → progress; logout, on Chromium, Firefox, WebKit.
- Storybook: button variants and a11y addon.
- CI: typecheck, unit test, build, pnpm audit, two Docker build checks, browser E2E job.
- Lighthouse CI config: login page accessibility, best practices, FCP budget (run with Lighthouse CLI separately).

## Suggested additional acceptance coverage before real production launch

- MongoDB integration tests with isolated test database, cross-tenant forbidden access and CSRF tampering.
- Deployment verification after real DNS/TLS/ingress setup.
- Visual baselines for main pages, cross-browser matrix, keyboard and screen-reader manual review.
- k6 load/stress/soak tests using representative task counts and traffic patterns.
- Chaos testing for MongoDB, Redis and worker crashes; audit/event failure injection.
- Security findings remediation, authenticated staging DAST and dependency license policy in addition to the new SAST/SCA/DAST gates.

## Manual verification

1. Start Docker stack, visit `/health/ready`, confirm HTTP 200.
2. Register account A, create task; register account B and confirm A's task is not returned.
3. Mutating request without valid CSRF must fail HTTP 403.
4. Open Activity and verify task actions, switch theme/locale, sign out.
5. Stop MongoDB and verify readiness returns 503.

## CI limitations of provided bundle

The code was generated offline without npm dependency installation or an actual test run. The initial generated lockfile is therefore missing; run `pnpm install` to resolve versions, then commit `pnpm-lock.yaml` and change CI from `pnpm install` to `pnpm install --frozen-lockfile`. Validate the project under your pinned Node runtime before release.
