# LLD — AI Quest learning & identity domain

## 1. Data models and keys

`User` (existing Mongo schema) adds `onboarding`:

```typescript
type LearnerOnboarding = {
  background: 'frontend' | 'backend' | 'fullstack' | 'other';
  familiarity: 'new' | 'exploring' | 'experienced';
  goal: 'ai-foundations' | 'machine-learning' | 'genai-engineering';
  dailyMinutes: 10 | 20 | 30;
};
```

`LessonAttempt` is a historically durable submission result:

| Field | Type | Notes |
|---|---|---|
| `userId`, `lessonId`, `lessonVersion` | string, string, number | Owner/content revision |
| `idempotencyKey` | UUID string | Unique with `userId` |
| `answers` | map of question → chosen option | Never trusted for scoring |
| `correctCount`, `totalQuestions`, `scorePercent`, `passed` | number / boolean | Server-calculated |
| `feedback` | question results | Snapshot of explanations and correct option |
| `attemptedAt` | UTC date | Set by server |

Unique compound index: `(userId, idempotencyKey)`.

`LessonCompletion` is the authoritative reward record:

| Field | Type | Notes |
|---|---|---|
| `userId`, `lessonId` | string | Unique compound index |
| `lessonVersion` | number | Version when first mastered |
| `xp` | number | XP awarded once |
| `completedAt` | UTC date | Drives streak projection |

Unique index `(userId, lessonId)` means a retry or concurrent submission cannot award duplicate XP. Total XP is computed as `sum(completion.xp)`; no shared mutable counter.

## 2. Catalog structure

`catalog.ts` exports three paths and nine lessons. Each lesson contains `id`, `pathId`, `version`, `title`, `description`, `durationMinutes`, `xp`, `objectives`, `sections[]` and three `questions[]` with canonical `correctOptionId` and `explanation`. The catalog is private to the server.

`publicQuestions` removes correct option IDs and explanations before sending a lesson. After submission, feedback reveals the answer and explanation; this is deliberate formative assessment, not high-security certification.

Each path's first lesson is unlocked; lesson N requires completion of lesson N−1 in the same path. **Tracks are independent** in MVP. Content IDs must never be reassigned to new concepts.

## 3. REST interface

All routes are prefixed `/api/v1`. Mutation requests require an `x-csrf-token` matching the issued signed CSRF cookie; all learning routes require a valid signed session.

| Method | Path | Response and constraints |
|---|---|---|
| `POST` | `/auth/register` | Creates user and session; 201 |
| `POST` | `/auth/login` | Valid session cookie |
| `GET` | `/auth/me` | Public learner profile |
| `PUT` | `/auth/onboarding` | Validated `LearnerOnboarding`; responds `{user}` |
| `GET` | `/learning/overview` | Stats, recommended path, path list, last five completions |
| `GET` | `/learning/paths` | `{data: LearningPath[]}` with lesson completion status |
| `GET` | `/learning/paths/:id` | `{data: LearningPath}` or 404 |
| `GET` | `/learning/lessons/:id` | `{data: LessonDetail}`; 403 if locked; no answer key |
| `POST` | `/learning/lessons/:id/submit` | `{data: SubmissionResult}`; 403 if locked; 409 conflicting idempotency key |
| `GET` | `/learning/progress` | `LearningStats` |

### Submission request

```json
{
  "answers": {"q1":"a", "q2":"b", "q3":"c"},
  "idempotencyKey": "f155697c-ac0c-4b44-a47e-cc5e1e8217fe"
}
```

- `answers`: up to 12 map entries; input keys and values up to 80 characters. Unknown choices do not confer correctness.
- Grade: 3 equal-weight questions; score `round(correct/3*100)`; pass at score ≥ 65 (2 of 3).
- Valid submission creates or reuses an attempt keyed by user + UUID. Reusing the key with a different payload returns 409.
- Passed attempt upserts a completion keyed by user + lesson. If new, `awardedXp=50`; otherwise `awardedXp=0` and `alreadyCompleted=true`.
- No penalty or decrement on failed attempts. New retry keys may create new attempts, but not duplicate completion.

### Error handling

The existing Express middleware maps `HttpError` and Zod contract errors to structured HTTP responses. Missing/locked lessons return 404/403. API does not accept `userId`, `score`, `xp` or `completed` from the caller.

## 4. Internal services

- `gradeLesson(lesson, answers)`: pure deterministic assessment.
- `isUnlocked(lesson, completedIds)`: checks immediate path predecessor.
- `formatPaths(completedIds)`: attaches progress percentage and lesson lock flags.
- `summarize(completions)`: derives XP, estimated minutes, UTC streak and complete-path badges.
- `learningOverview(user)`: merges profile goal, curriculum and learner state.
- `submitLearningLesson(userId, lessonId, input)`: guards authorization, writes immutable attempt, unique completion, returns current stats.

## 5. React data flow

`AuthProvider` handles authentication and updated onboarding. Protected routes redirect new accounts to `/onboarding`. Lesson screens use `useLearningLesson(id)` and `useSubmitLesson(id)`. A `LessonScreen` is keyed by lesson ID so answers do not carry between lessons. React Query invalidates learning-related caches after submission. Logout/login clear cached learner data to prevent data leaking across accounts in the same browser tab.

Components: `DashboardPage`, `PathsPage`, `PathDetailPage`, `LessonPage`, `ProgressPage`, `OnboardingPage`, `PathCard`, new `Shell`. CSS lives in `styles/learning.css` to avoid rewriting all starter screens.

## 6. Security decisions and future changes

- Sessions: inherited 30-minute signed HttpOnly cookie; CSRF protection on all non-read `/api/v1` routes.
- Authorization: API obtains user ID from verified cookie; progress queries never accept user-provided account IDs.
- Once-per-lesson reward requires MongoDB unique indexes, present in schema; ensure index creation in every deployment.
- Streaks currently use UTC days for reproducibility; time zones require persisted learner locale or timezone in P1.
- No remote model calls, arbitrary script execution, raw HTML ingestion or embedding store in MVP. Add dedicated services, quotas and a threat model before enabling them.
- Product analytics and subject-level adaptive mastering require a new event model; current completion is lesson-level, not a proof of independent skill competence.

## 7. Verification

Run `pnpm run test`, `pnpm run typecheck`, `pnpm run build` after installing dependencies; `node tests/integration/learning-smoke.mjs` against a live Mongo-backed API. See [status](../IMPLEMENTATION_STATUS.md) for what's been validated in the delivery environment.

---

# P1 LLD addendum — extended contracts and persistence

## Content publication

`ContentDraft` (`lessonId` unique, `authorId`, `reviewStatus`, lesson content) → `ContentRelease` (`lessonId + version` unique, `authorId`, `publishedBy`, immutable lesson snapshot). Only configured author emails may save/submit; only configured reviewer emails may return/publish. The same individual **cannot** publish their own draft. Strict Zod schema rejects duplicate option IDs, missing correct option, oversized sections, malformed question lists. Public lesson loader chooses the highest published release and removes answer keys from DTO. Grades use the **same effective published lesson** and persist its version per attempt. Concurrent publications are blocked by unique version index.

## Adaptive review

`ReviewState` (`userId + lessonId` unique, `repetitions`, `ease`, `intervalDays`, `dueAt`) and `ReviewEvent` (`userId + idempotencyKey` unique). Only completed lessons can be rated. The platform-neutral `planReview(previous,rating,now)` schedules future review. `GET /reviews/due` returns due and `GET /reviews/insights` aggregates upcoming/next review. Event idempotency blocks duplicated retries; concurrent **different** event keys for the same lesson should be serialized with an optimistic version counter before high-scale production usage.

## AI gateway

`TutorQuota` (`userId + UTC day` unique, `count`, `modelTokens`), `TutorEvent` (metadata only), `ModelComparisonQuota` (`userId + UTC day`). Tutor consumes at most 12 hints per day and limits output to 1100 chars, provider call to 9 seconds. Model comparison allows 4 comparisons/day and queries two operator-configured provider model IDs, with individual 15-second timeouts. No provider API keys appear in frontend code or response bodies. Operational usage/price accounting requires live-provider integration tests.

## Portable code evaluation

`packages/learning-core/src/rules.ts` implements pure scoring, lesson prerequisite sequencing, streaks, and completion percentage. `packages/learning-core/src/algorithms.ts` implements vector similarity, tokenization, confusion metrics, gradient descent, per-learner quiz option ordering and review scheduling. They have no Node or browser dependencies. The private catalog lives under `apps/api` to prevent shipping answer keys in client bundles. `packages/client-sdk/src/index.ts` contains injected fetch transport and REST actions.

Formative Python labs use a sandboxed `iframe` with an opaque origin and a disposable worker. The iframe's message handler validates `source`, `nonce` and message type; it removes the iframe and worker after completion or timeout. The backend never evaluates user source. No verified XP is issued from browser-run test results.

## Capstones and privacy

`CapstoneProject` (`userId`, `slug`, `status=draft|submitted|published`, title, summary, HTTPS URLs, track, skills, reflection, timestamps). All mutation queries filter by the authenticated user. Public `GET` requires `status=published`; showcase warns that it is self-published, not assessed. Users may unpublish and delete. Privacy export omits password hash; deletion verifies password and explicit phrase, then deletes live learner records, quotas, projects and native refresh records, and anonymizes content-release author attribution. Logs and operator backups require separate retention controls.

`NativeRefreshToken` stores only a SHA-256 digest of the opaque refresh token with 30-day expiry. Refresh atomically revokes the old digest and issues a new access/refresh pair. Web cookie CSRF remains enforced; native endpoints return no cookie and authenticated native writes require a verified mobile-audience bearer token.


## Billing LLD

- `billing.rules.ts`: pure immutable product/price/entitlement predicates; never import React here.
- `cashfree.signature.ts`: pure HMAC signature verification over timestamp and raw request Buffer.
- `cashfree.provider.ts`: Cashfree REST adapter; sandbox and live environments are separate.
- `billing.models.ts`: `PaymentOrder` with unique `orderId` and `(userId,idempotencyKey)`; `Entitlement` with unique `(userId,productId)` and `orderId`.
- `billing.service.ts`: order creation, server-side fixed pricing, idempotency, provider reconciliation, entitlement and access policy.
- `billing.routes.ts`: private authenticated purchase/status endpoints plus public **signed** raw-body webhook, mounted ahead of JSON/CSRF middleware.
- `client-sdk`: framework-neutral `billing`, `checkout`, `paymentOrder`, `verifyPayment` methods.
- React: `/billing` for purchase and history, `/billing/return` for verified status. Cashfree's JS checkout stays in a browser adapter; native apps use their own provider SDK with identical backend API.

Idempotency is achieved via MongoDB unique keys. Payment->entitlement is not a multi-document transaction in this version; idempotent retry on verified order is the recovery path. A durable reconciliation job and transaction semantics must be validated before production.
