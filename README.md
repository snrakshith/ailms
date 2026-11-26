> **Current iteration: v1.5 — DevSecOps (SAST/SCA/DAST/secret scans) and Playwright E2E.**
> Source/configuration changes are integrated; network-backed installation, end-to-end browser runs, Docker and scanning tools remain unverified. A real pnpm lockfile is required before CI can pass.

# AI Quest — Developer-to-AI Learning Platform

**Web-first, mobile-ready TypeScript full stack.** AI Quest helps software developers transition into AI, ML and GenAI with short lessons, interactive practice, formative Python labs, adaptive revision, coaching hints and demonstrable capstone projects. This repository extends the supplied Sapling starter instead of replacing its auth, observability, Docker and deployment scaffolding.

> **Status:** P0 + seven P1/extended feature slices implemented in source. **Development baseline—not production-certified.** Full npm build, live Mongo integration, browser automation and LLM calls could not be executed in this environment because the npm registry was unavailable. See [verification matrix](docs/P1-IMPLEMENTATION.md).

## Public site, login and Google Identity Services

**New public React routes:** `/` marketing homepage, `/pricing`, `/faq`, `/blog`, and `/blog/:slug`. Copy, plans, FAQs, lesson teasers and three original blog posts are maintained in **one file**: `apps/web/src/features/marketing/content/site-content.ts`. No marketing API or CMS is required. The protected dashboard has moved to `/app` (existing learner routes remain protected).

Email/password authentication is retained; optional Google sign-in and explicit account linking use server-verified Google ID tokens and the existing HttpOnly cookie session. Set `GOOGLE_CLIENT_ID` and `VITE_GOOGLE_CLIENT_ID` to the same Google OAuth **Web** client ID in `.env` to enable it. No Google client secret is used by the React client. See [Public site and Google sign-in implementation guide](docs/PUBLIC-SITE-AND-GOOGLE-AUTH.md).

## Features

| Feature                 | What is included                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Identity and onboarding | Web cookie/CSRF auth, 30-minute mobile bearer with rotating 30-day refresh token, developer goals                      |
| Curriculum              | Three paths, nine starter lessons, 27 initial assessment questions, prerequisite unlocking, published content releases |
| Mastery and progress    | Deterministic API grading, retries, once-only XP, completion, streak and mastered paths                                |
| Content studio          | Email-allowlisted author/reviewer workflow, draft review, versioned release, editable structured content               |
| Practice labs           | Gradient descent, browser Python challenges, confusion metrics, lexical vectors                                        |
| Adaptive learning       | Spaced-review queue, repetition ratings, insight cards, stable per-learner quiz ordering                               |
| AI tutor                | Contextual progressive hints, optional OpenAI-compatible LLM, curriculum fallback, 12-hints/day usage cap              |
| Model playground        | Compare educational text similarity and metrics; optional side-by-side hosted model comparison                         |
| Capstone portfolio      | Create/edit/submit projects, explicitly opt into publication, public showcase, unpublish/delete                        |
| Privacy and operations  | Export/delete learner data, backup/restore scripts, test plan, CI build and audit scaffolds                            |

## Getting started

**Prerequisites:** Node.js >=22.12, Corepack/pnpm 10, Docker Compose, a reachable npm registry.

```bash
cp .env.example .env
# Replace JWT_SECRET and METRICS_TOKEN with unique secrets of at least 32 characters.
pnpm install
pnpm run infra:up
pnpm run dev
```

Open **http://localhost:5173** for the public marketing homepage (pricing, FAQ, journal). Use `/register` to sign up, select your developer background, complete an AI Foundations lesson, and try the Review, Labs and Portfolio navigation. The Python sandbox loads pinned Pyodide from the internet on first execution. The AI tutor works without an LLM key using course-based hints.

**All-in-Docker:** after setting secrets in `.env`, run `pnpm run docker:up`, open http://localhost:8080. Compose configures its internal MongoDB and Redis hostnames independently of host development.

### Optional features

- Content Studio: configure `CONTENT_AUTHORS=author@yourdomain.com` and `CONTENT_REVIEWERS=reviewer@yourdomain.com` in `.env`; register both accounts and use `/studio`. The reviewer must be a different person from the draft author.
- Hosted AI tutor: configure `AIQUEST_LLM_KEY`, `AIQUEST_LLM_MODEL`, optionally `AIQUEST_LLM_BASE_URL` (OpenAI-compatible chat completions). Without a key, fallback hints remain functional.
- Side-by-side model comparison: additionally configure `AIQUEST_LLM_COMPARE_MODELS=model-one,model-two`; no secrets are sent to the browser.
- Public capstone: user chooses **Submit**, then explicitly **Publish**; showcase is labeled self-published and unverified.

### Workspace structure

```text
apps/web/                    Public React marketing site + private learner interface
apps/api/                    Node.js + Express REST API, MongoDB models
packages/contracts/          Shared Zod API schemas, DTOs and types
packages/learning-core/      Portable, platform-agnostic pure TypeScript algorithms
packages/client-sdk/         Portable fetch-based client used by React; supports native
apps/api/src/modules/learning/catalog.ts  Private answer-key curriculum (server ONLY)
docs/P1-IMPLEMENTATION.md    Detailed P1 scope/acceptance and verification
/docs/PORTABLE-ARCHITECTURE.md React Native integration design and sample
scripts/database/           Backup and explicit destructive restore commands
```

**Mobile portability:** The React web app already consumes the shared API SDK; React Native can consume the exact same domain rules, validation schemas and backend endpoints with a native token/secure-store adapter. We intentionally do not share DOM components, iframe Python runner, or web navigation. **No React Native app is built in this release.**

## Commands and checks

`pnpm run test:marketing` checks public copy, articles, FAQ and pricing data without requiring npm dependencies. GitHub pull-request CI still gates Prettier, ESLint, type checks, unit tests and builds; these require a full dependency installation.

```bash
pnpm run test:core           # Pure algorithm and TS syntax checks
pnpm run typecheck           # Full TypeScript checks (needs pnpm install)
pnpm run test                # Vitest unit tests
pnpm run build               # All contracts, core, SDK, API, web
pnpm run infra:up            # MongoDB + Redis
pnpm run dev                 # React Vite + Express dev servers
node tests/integration/learning-smoke.mjs
node tests/integration/p1-smoke.mjs
pnpm run docker:up
pnpm run docker:down
```

CI also checks dependency vulnerabilities and builds Docker images. The starter doesn't include a lockfile; commit one after successful installation, pin dependency updates, and change CI/build to `pnpm install --frozen-lockfile` before a repeatable production release.

## Read these documents

- [PRD](docs/PRD.md), [HLD](docs/architecture/HLD.md), [LLD](docs/architecture/LLD.md)
- [P1 implementation matrix](docs/P1-IMPLEMENTATION.md) and [portable architecture](docs/PORTABLE-ARCHITECTURE.md)
- [Content authoring](docs/LEARNING-CONTENT-GUIDE.md), [Getting started](docs/GETTING_STARTED.md), [On-call runbook](docs/AIQUEST-RUNBOOK.md)

## Important security distinctions

1. Answer keys and rewards are authoritative on the API. The shared mobile/web core contains grading algorithms **without any canonical question answer data**.
2. Browser Python runs in an **opaque-origin sandbox iframe** with a disposable Web Worker; it is formative, non-graded and must undergo multi-browser security testing before letting users run arbitrary third-party code.
3. The default text-vector playground is a transparent educational lexical model, **not an LLM embedding**. Live model comparison is disabled until configured.
4. Account data deletion removes live database records; operator-controlled logs/backups have a separate retention lifecycle.
5. Production readiness, security assurance, accessibility conformance and learning effectiveness require tests on a real deployment.

The inherited `/tasks` feature remains in the API for template backward compatibility; it is not displayed in the learning application navigation.

## Cashfree payments, licensing and quality checks

Generative AI Engineering is the initial paid path, using Cashfree PG hosted checkout. Free AI Foundations and ML tracks are unaffected. The server controls price and grants the pass only after verified payment. To configure it, follow [Cashfree payment runbook](docs/CASHFREE-PAYMENTS.md). Without credentials the payment UI is visible but checkout is disabled. One-time pass price is an **illustrative value** of INR 499 and can be set using `GENAI_PASS_PRICE_PAISE`.

The CI workflows gate on **Prettier, ESLint, TypeScript, Vitest, builds, SAST (CodeQL), SCA (pnpm audit, Dependency Review and Trivy), DAST (OWASP ZAP), TruffleHog and Playwright E2E**; Trivy also checks both Docker images. See [Quality and launch gates](docs/QUALITY-AND-LAUNCH-GATES.md). The inherited starter had no lockfile, and dependency-backed CI must be run and green before deployment.

## Quality and security improvements (v1.4)

See [quality gates and test guide](docs/testing/QUALITY-GATES-V1.4.md). On a Git checkout, Husky runs staged secret scanning + lint-staged at pre-commit; pre-push runs types, tests, formatting, linting and TruffleHog. Vitest adds HTTP/Mongo integration coverage. CI uses frozen pnpm installs **after a genuine lockfile is committed**. See [release notes](RELEASE_NOTES-V1.4.md).

## v1.5 security and browser validation

Cypress has been removed. Playwright now runs Chromium, Firefox and WebKit browser journeys. DevSecOps pipelines perform CodeQL SAST, pnpm audit/Trivy/Dependency Review SCA, Trivy container scans, TruffleHog secrets scanning, and OWASP ZAP DAST against a test-only Docker Compose stack. **See [v1.5 DevSecOps + Playwright runbook](docs/testing/DEVSECOPS-PLAYWRIGHT-V1.5.md)** and [v1.5 release notes](RELEASE_NOTES-V1.5.md). Generate and commit a real `pnpm-lock.yaml` before enforcing frozen installations.
