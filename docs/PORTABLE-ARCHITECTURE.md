# Portable Foundations — React Web to React Native

## Non-negotiable boundary

The product is **web-first, not web-only**. Business rules, platform contracts, data validation, grading algorithms, learning sequencing, spaced repetition, mathematics, and the API client must not import React, browser globals, Node.js, Express, database objects, or device APIs. Presentational components remain platform-specific.

```
packages/contracts              Runtime API schemas + shared TS types
packages/learning-core          Portable PURE rules, schedulers, evaluation metrics
packages/client-sdk             Portable transport-injected API actions
            |                            |
      React + Vite                 React Native app (future)
            |                            |
           Cookie + CSRF      Secure-store tokens + Bearer auth
            \____________________________/
                         |
              Node.js Express API
              (authoritative grading)
                         |
          MongoDB persistence + content releases
```

**Security boundary:** Published lesson content and private answer keys live in `apps/api/src/modules/learning/catalog.ts` and MongoDB releases, never in `@aiquest/learning-core`. The portable `gradeAnswers` algorithm requires explicit answer data, but does not ship that answer data. React Native should never compute authoritative grades, rewards, or unlocked status.

### Package responsibilities

| Package                  | Permitted dependencies     | Key exports                                                                                                                                  |
| ------------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `@sapling/contracts`     | Zod, TypeScript            | Login/onboarding/lesson types, editor, capstones, reviews validation                                                                         |
| `@aiquest/learning-core` | TypeScript only            | `gradeAnswers`, `lessonUnlocked`, `calculateUtcStreak`, `planReview`, `compareTexts`, `confusionMatrix`, `presentQuestions`, `gradientSteps` |
| `@aiquest/client-sdk`    | TypeScript types only      | `createAiQuestClient`, `createFetchTransport`, native identity methods                                                                       |
| `apps/api`               | Node.js, Express, Mongoose | Private answer keys, persisted grading, XP, editors, AI gateway                                                                              |
| `apps/web`               | React, Vite                | Browser views, cookies/CSRF, Pyodide iframe, navigation                                                                                      |

### React Native consumption example (illustrative)

```ts
import { createAiQuestClient, createFetchTransport } from '@aiquest/client-sdk';
import { planReview, confusionMatrix } from '@aiquest/learning-core';

// Supply SecureStore/Keychain (e.g. Expo SecureStore) from the mobile app.
let accessToken = ''; // Load from a secure device keystore on app startup.
const transport = createFetchTransport('https://api.example.com/api/v1', fetch, () =>
  accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
);
const api = createAiQuestClient(transport);

const auth = await api.nativeLogin('developer@example.com', 'password-from-login-screen');
accessToken = auth.accessToken;
// Store auth.accessToken and auth.refreshToken in iOS Keychain / Android Keystore.
// Before expiry: const updated=await api.nativeRefresh(savedRefreshToken);
const paths = await api.paths();
const lesson = await api.lesson(paths.data[0].lessons![0].id);
const due = await api.dueReviews();
```

**Never** store refresh tokens in AsyncStorage, logs, crash reports, or unencrypted local caches. Access tokens expire in 30 minutes; rotating refresh tokens expire after 30 days and must be replaced atomically in secure storage. The refresh token cannot be used twice. Re-authentication is required after expiry, logout or revocation. Public mobile releases also require a real sign-in abuse-control and device-security review.

### Reused features

- Same learning paths and lesson API contracts on all clients.
- Same progression and quiz-order policy; no duplicate implementations in React Native.
- Same review-scheduler math and model playground numeric exercises.
- Same tutor quota and capstone submissions through shared SDK methods and REST paths.
- Different renderers only: `react-router-dom` vs React Navigation, browser editor vs native code editor, browser Pyodide vs a dedicated safe mobile runtime.

### Platform responsibilities that must NOT be shared

- Secure credential storage, session renewal scheduling, push notifications, network reachability/offline queue.
- View/navigation components, web-worker/iframe features, native permissions, camera, code editor.
- Device-specific accessibility gestures and layout.

### Mobile launch acceptance checklist

1. Build a separate RN client consuming workspaces or published packages without React DOM.
2. Implement secure-store token lifecycle, refresh-token rotation, and retry-on-401 without logging secrets.
3. Add native navigation/presentation, responsive layouts and screen-reader checks.
4. Decide on safe mobile code execution; **do not embed arbitrary Python into the native JS engine**.
5. Run account isolation, credential recovery, logout, review and progress integration tests on iOS and Android.
6. Add end-to-end mobile automation and offline recovery only when tested.

The shared logic and API are implemented; an actual React Native application is **not** included in this ZIP.

## Portable billing

`@sapling/contracts` defines `CheckoutInput`, `CheckoutSession`, `PaymentOrder`, and `BillingOverview`. `@aiquest/client-sdk` exposes provider-agnostic API methods, including one-time checkout session creation and server verification. The Cashfree JS SDK is **only** used from `apps/web/src/features/billing/cashfree-checkout.ts`; React Native can use the provider's native SDK without duplicating pricing, entitlement, signature, or fulfilment logic. All payment secrets stay on Node.js.
