# AI Quest v1.4 — Quality, security, and test gates

## Goals

Quality checks run **both locally and in CI**. Git hooks are defense-in-depth: developers can skip hooks, so branch protection must require CI.

| Stage           | Controls                                                                                                               | Typical cost      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `pre-commit`    | zero-dependency staged secret detector, lint-staged, ESLint `--fix`, Prettier                                          | seconds           |
| `pre-push`      | format, lint, types, Vitest unit, static security, TruffleHog committed-history scan                                   | minutes           |
| CI PR           | frozen pnpm, format, lint, types, unit coverage, build, audit, CodeQL, TruffleHog, Mongo integration tests, Playwright | full verification |
| Deployment gate | provider sandbox validations, security review, backup restoration, smoke tests                                         | release-specific  |

## Install

1. `corepack enable` and `pnpm install --no-frozen-lockfile`. **Commit `pnpm-lock.yaml`.** This ZIP does not include one because the dependency registry was inaccessible. CI intentionally uses `--frozen-lockfile` and will fail until a real lockfile has been generated.
2. `pnpm run prepare` activates Husky **inside a Git checkout** (ZIP extraction does not create `.git`).
3. Install TruffleHog CLI from the upstream project, or ensure Docker is available. The pre-push hook **fails closed** when neither is available. Full-history scanning can be slow; CI also scans the pushed range.
4. `pnpm run test:unit`, `pnpm run test:coverage`, `pnpm run test:integration`, `pnpm run e2e`.

## Tests

- Vitest unit suite: shared contracts, lesson grading/unlocking, payment matching/signatures, content author/reviewer permissions, session revocation generation, referral codes, resilience primitives.
- Vitest integration suite: actual Express HTTP + MongoDB including cookies/CSRF, sign-in/sign-out, mobile token rotation, authorized access, assessment idempotency, XP, multi-learner isolation, PDF receipt scoping, and referrals. The test environment increases the auth limiter allowance to prevent aggregate test-case interference; verify production rate limiting separately.
- Vitest UI component tests: existing API and accessible component checks; Playwright provides browser workflows.
- Coverage uses v8, text + lcov reports. Unit thresholds target **selected critical pure functions** (not the entire product). Avoid presenting that percentage as full application coverage.

## Local MongoDB integration tests

`pnpm run infra:up` then:

```sh
export NODE_ENV=test
export MONGODB_URI='mongodb://localhost:27017/aiquest_v14_integration'
export JWT_SECRET='only-for-local-test-not-production-secret-0123456789'
export METRICS_TOKEN='local-metrics-test-only-not-production-0123456789'
export WEB_ORIGIN='http://localhost:5173'
pnpm run test:integration
```

**Warning:** The integration suite clears test collections. Use only a disposable database, not production or shared development records. A dedicated database name is mandatory.

## Security decisions and remaining gaps

- Access tokens have a session generation. Web sign-out increments it, invalidating all earlier browser **and native access** tokens. Web sign-out also revokes outstanding native refresh tokens. Native sign-out currently revokes the supplied refresh token, but other active native access tokens remain valid until their short expiry; build a device/session inventory and per-device revocation for fine-grained control.
- Credentials are environment-injected; AWS should use Secrets Manager + IAM roles/OIDC instead of static keys.
- In-memory rate limiters are insufficient for distributed AWS ECS/ALB replicas; implement Redis-backed rate limiting or AWS WAF before go-live.
- TruffleHog is pattern/verification-based; it does not detect every secret or remove exposed credentials. Always rotate confirmed leaked keys and remove them from Git history as appropriate.
- CodeQL, dependency audit, and Sentry help detection, but do not replace an independent security review, DAST, and penetration testing.
- Cashfree signature unit tests do not constitute provider-certified payment tests. Sandbox end-to-end reconciliation, refunds, invoicing, and webhook retries remain release blockers.
- GitHub branch protection must require Quality and Build, Browser E2E, CodeQL, and TruffleHog statuses.

## AWS deployment-oriented checklist (not provisioned)

ECS Fargate services in private subnets behind ALB + WAF, ECR immutable image digests, GitHub OIDC role with short-lived AWS credentials, Secrets Manager, MongoDB Atlas or managed compatible service, ElastiCache, SES, CloudWatch/OTel/Sentry, backup restoration tests, least-privilege IAM, and multi-AZ availability. Use environment-specific infrastructure-as-code and deployment approvals; no cloud resources are created by this ZIP.
