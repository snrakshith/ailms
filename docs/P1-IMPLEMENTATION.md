# AI Quest P1 Implementation — November 2026

## Delivery scope

This release extends the supplied React + Node.js Sapling starter. It is a development implementation with meaningful vertical slices for all five selected P1 workstreams and two additional requested features. **It has not undergone production deployment or complete E2E verification in this execution environment.**

| Workstream                             | Implementation included                                                                                                                                                                                                            | Limitations / verification needed                                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P1-01 Reliability & Content Management | Staff-only content studio, strict Zod content schema, draft → independent review → immutable published release, versioned snapshot persistence, refreshed Docker/CI, offline checks, expanded tests                                | Enable separate author/reviewer emails; concurrency and MongoDB transaction resilience should be load-tested; no rich WYSIWYG editor                                           |
| P1-02 Interactive Labs                 | Three Python coding challenges with formative test execution in opaque-origin sandboxed iframe and disposable Web Worker, Pyodide v0.27.7; existing gradient experiment; confusion matrix, cosine similarity lab                   | Requires access to pinned Pyodide CDN; browser code execution is NOT an authoritative grader; GPU or server-side execution is not provisioned                                  |
| P1-03 Adaptive Learning                | Spaced review schedule (SM2-inspired), due feed, progression insights, score-driven revision recommendation, deterministic per-learner assessment ordering                                                                         | Question pool expansion, detailed concept-level diagnostic assessment, A/B evaluation of spaced schedules still future work                                                    |
| P1-04 AI Tutor                         | Contextual progressive hints, curriculum fallback, optional OpenAI-compatible provider, provider timeouts, per-learner daily cap, minimal usage audit                                                                              | LLM requires operator-provided key/model; live model behavior, safety efficacy, cost, and content evaluation must be validated                                                 |
| P1-05 Production Hardening             | Native rotating auth tokens, CSRF for web + signed bearer for mobile, account export/delete, input validation, ownership checks, backup/restore scripts, container security baseline, quality workflow, strict content permissions | Not a penetration test or SOC audit; backup encryption/retention and real recovery tests are operator requirements; SLOs and accessibility need real user/browser verification |
| EXTRA-01 Model Playground              | Text-vector cosine experiment, threshold/metrics simulator, optional side-by-side live provider model comparison with daily quota and latency/token feedback                                                                       | Text vectors are educational lexical vectors, **not neural embeddings**; live models require two configured model IDs                                                          |
| EXTRA-02 Capstones & Portfolio         | Draft/edit/submit/self-publish/unpublish/delete projects; HTTPS link validation, skill tags, reflection, public read-only share page, opt-in publication                                                                           | Public projects are explicitly **self-published/unverified**; no independent expert review, project repository execution or anti-plagiarism evaluation                         |

## Software architecture

- React + TypeScript (web), Express + TypeScript (API), MongoDB (storage).
- `@sapling/contracts` runtime API validation, used across platforms.
- `@aiquest/learning-core` only portable, pure domain math/rules. This package contains **no private answer keys**.
- `@aiquest/client-sdk` fetch transport injection for React, React Native and server-side clients.
- Server authoritative grade + XP awarding; mobile cannot forge completion.
- Browser practice runner isolated in a `sandbox="allow-scripts"` opaque-origin iframe, using a disposable worker. Code is **never executed in the Node API**.

## Endpoints added

`GET /content/me`, `GET /content/lessons`, `GET /content/lessons/:id`, `POST /content/lessons/:id/{draft,review,return,publish}`

`GET /reviews/due`, `GET /reviews/insights`, `POST /reviews/:lessonId`

`GET /labs/challenges`, `POST /labs/compare`, `POST /labs/confusion`

`GET /model-playground/models`, `POST /model-playground/compare`

`GET /tutor/quota`, `POST /tutor/hints`

`GET /portfolio/projects`, `POST /portfolio/projects`, `PUT /portfolio/projects/:id`, `POST /portfolio/projects/:id/{submit,publish,unpublish}`, `DELETE /portfolio/projects/:id`, `GET /public/portfolio/:slug`

`GET /privacy/export`, `DELETE /privacy/account`

`POST /native-auth/{register,login,refresh,logout}`

All paths above are prefixed with `/api/v1`. All learner endpoints require authentication except `/public/portfolio/:slug` and mobile login/register/refresh/logout.

## Runtime configuration

Set `CONTENT_AUTHORS` and `CONTENT_REVIEWERS` to comma-separated email allowlists. An author cannot approve their own draft, even if authorized in both lists. Everyone else receives `403` on editorial endpoints.

Tutor fallback works without an external key. To enable live AI, set `AIQUEST_LLM_KEY`, `AIQUEST_LLM_MODEL`, and optionally `AIQUEST_LLM_BASE_URL`. To enable model comparison, configure `AIQUEST_LLM_COMPARE_MODELS=modelA,modelB`. Do not put secrets in Vite variables.

## Verification matrix

| Check                                                           | Execution status in this environment                                            |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Source parsing for React + API + portable packages              | Passed (112 TypeScript / TSX files at implementation time)                      |
| Deterministic grade, XP prerequisites, streak, review algorithm | Passed with offline checks                                                      |
| Lexical vectors, confusion metrics, gradient steps              | Passed with offline checks                                                      |
| Transport-injected client API and keyless domain package        | Passed with offline checks                                                      |
| Browser iframe/worker JS syntax                                 | Parsed                                                                          |
| `pnpm run typecheck`, full Vitest, Vite production build        | **Not run successfully** (npm registry unavailable, dependencies not installed) |
| Mongo-backed P1 integration smoke                               | Script provided, **not executed**                                               |
| Docker, mobile runtime, external LLM API, Pyodide runtime       | **Not runtime-verified**                                                        |
| Penetration test, accessibility audit, production SLO           | **Not performed**                                                               |

Run these on a network-enabled machine before declaring release readiness:

```bash
pnpm install
pnpm run test:core
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run infra:up
pnpm run dev
node tests/integration/learning-smoke.mjs
node tests/integration/p1-smoke.mjs
pnpm run docker:up
```

After the first successful `pnpm install`, commit a lockfile and migrate CI + Docker to `pnpm install --frozen-lockfile` (reproducible dependency versions). Review external Pyodide distribution and your production CSP. Do not put this release into an untrusted public classroom without adversarial testing.

## Acceptance gate before deployment

1. TypeScript, React, Vitest, integration tests, and both Dockerfiles build without errors.
2. End-to-end browser tests cover registration → lesson → review → tutor → capstone.
3. Independent staff accounts successfully review and publish a changed lesson with correct-version grading.
4. Mobile token rotation and revocation survive concurrency tests.
5. Pyodide sandbox cannot read cookies, local storage, authenticated API data, or parent DOM across browsers.
6. Real automated accessibility checks, cost budget review, abuse detection, and backup restore exercise pass.
