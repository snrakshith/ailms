# AI Quest — P1 Developer Setup

This guide covers the React + Node.js + MongoDB learning platform and the new mobile-portable packages. See [P1 scope and status](P1-IMPLEMENTATION.md) for honest verification status.

## Local development

1. Install Node >=22.12, npm 10+ and Docker Compose.
2. Copy `.env.example` to `.env`. Replace `JWT_SECRET` and `METRICS_TOKEN` with strong distinct random values. The host-mode Redis URL is `redis://127.0.0.1:6379`.
3. Run `pnpm install && pnpm run infra:up && pnpm run dev`.
4. Open http://localhost:5173 for the public homepage; sign in/register then use `/app` for the private dashboard; API is http://localhost:4000; readiness is http://localhost:4000/health/ready.
5. Register, complete onboarding, pass lessons, use `/review`, `/labs`, `/portfolio`, `/privacy`.

If using Docker for **all** services, run `pnpm run docker:up` after setting secrets and open http://localhost:8080. Docker Compose uses service addresses `mongo`/`redis`, not `localhost`.

## Learning labs

- The **Python challenge** is a formative browser lab. The page creates a `sandbox="allow-scripts"` iframe with an opaque origin. Inside it, a disposable worker loads Pyodide v0.27.7 from jsDelivr. No Python is executed on the API server and no XP is awarded for browser tests.
- The **vector lab** uses deterministic lexical vectors, not neural embeddings.
- The **metrics lab** demonstrates threshold effects and accuracy/precision/recall/F1.
- The **live model comparison** tab is disabled until two model IDs and an LLM API key are provided.

## Content authoring

1. Register separate author and reviewer accounts.
2. Add the emails to `CONTENT_AUTHORS` and `CONTENT_REVIEWERS` in `.env`; restart API.
3. Open `/studio` as the author. Select a lesson and edit the JSON-based content fields (title, description, objectives, sections, questions).
4. Save draft → Submit for review.
5. Reviewer logs in separately and publishes the new immutable version (or requests changes).
6. Reload lesson view to see the new published content. Existing completions are retained.

Without staff allowlists, lesson content remains read-only. Never put answer keys in the frontend or portable `learning-core` package.

## React Native adapter

The `@aiquest/client-sdk` exposes native login/register/refresh/logout and learning APIs. Authentication uses an access token (30 min) with one-time rotating refresh tokens (30 days). Store both in native secure storage, never AsyncStorage. See [portable architecture](PORTABLE-ARCHITECTURE.md).

## Verification

```bash
pnpm run test:core
pnpm run typecheck
pnpm run test
pnpm run build
node tests/integration/learning-smoke.mjs
node tests/integration/p1-smoke.mjs
pnpm run e2e
```

The two integration smoke scripts require a running API plus MongoDB. The P1 suite creates and subsequently deletes its own test user. For CI, provide a private test database and isolated credentials.

**Packaging limitation:** The npm registry was unreachable during artifact generation. Only dependency-light checks completed in this execution environment; full installation/build/browser verification is required on your machine.

## One-time learning-pass checkout

Cashfree is disabled by default, so local learners can access all course content. To activate a paid Generative AI learning track, configure Cashfree sandbox keys in `.env`, set `CASHFREE_ENABLED=true`, then restart the API. Visit `/billing` to use the hosted checkout. The same environment keys are passed to the API container by Compose. See [Cashfree payments setup and webhook runbook](CASHFREE-PAYMENTS.md).

Before merging, run `pnpm run format` once for the inherited source, and commit the formatting diff; then use `pnpm run verify` for formatting, lint, type safety, tests, security rules and builds. CI includes the same quality gates, plus CodeQL and Playwright workflows. See [Quality and release requirements](QUALITY-AND-LAUNCH-GATES.md).


## Public marketing website and Google login

The marketing pages are implemented in React and backed only by `apps/web/src/features/marketing/content/site-content.ts`. Update that file for all text, navigation, FAQ, pricing copy and full journal articles. Routes: `/`, `/pricing`, `/faq`, `/blog` and `/blog/:slug`.

For Google Identity Services set `GOOGLE_CLIENT_ID` and `VITE_GOOGLE_CLIENT_ID` (same Google Web OAuth client ID) in root `.env`, add your authorized JavaScript origins in Google Cloud, restart API and Vite, and use the official Google sign-in button. Existing password accounts must explicitly link Google through Settings while authenticated. Google-only users can reverify Google during account deletion.

Read [Public marketing and Google authentication guide](PUBLIC-SITE-AND-GOOGLE-AUTH.md) for complete setup, CSP and testing steps. Run `pnpm run test:marketing` for dependency-free content validation.
