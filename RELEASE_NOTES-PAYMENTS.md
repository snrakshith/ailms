# AI Quest v1.1 — Cashfree, minimalist UI and CI quality gates

Built incrementally on AI Quest P1 / the user-provided Sapling full-stack template. No redesign of backend language or replacement of shared learning rules.

## Product functionality added

- **Cashfree PG one-time payments:** sandbox/live environment, backend order creation and configuration-controlled INR price, hosted web checkout with Cashfree JS v3, status/return UI.
- **Security:** raw-body signed webhook validation, independent Cashfree order verification, owner-scoped order history and status, product entitlement with unique constraints, idempotent purchases and paid status protection, payment request rate-limiting.
- **Entitlements:** Generative AI Engineering learning path becomes paid when Cashfree is enabled, with a previewable roadmap and locked lessons/graded assessments/tutor hints; foundations/ML remain free. When disabled, all tracks remain usable for development.
- **Mobile portability:** `@sapling/contracts` and `@aiquest/client-sdk` expose the same checkout/status APIs to React web or React Native. Cashfree web checkout stays in a web adapter.
- **Privacy:** owned orders and entitlements exported; payment records pseudonymized on account deletion for accounting; paid entitlements not granted to deleted learners.
- **UI refresh:** light-first typography-led, toned-down accents, no neon hero gradient, restrained cards, accessible payment states, responsive billing layout.
- **GitHub:** PR/push gates for Prettier, ESLint, TypeScript, tests, security static, audit, production builds and Docker; browser Cypress and CodeQL are separate workflows.

## Acceptance testing

Passed: syntax parse for 124 TS/TSX files, standalone learning-core logic checks, static security rules and basic Cashfree HMAC/amount matching smoke tests.

Not executed: npm-dependent full build, Lint/Prettier, database integration, real Cashfree sandbox/production payments, UI browser tests, Docker deployment, merchant domain validation. The npm registry was unreachable while generating the ZIP. Before merging/releasing, install dependencies, run `npm run format` to normalize the inherited formatting, commit a generated lockfile, run full quality gates and Cashfree integration tests. See `docs/QUALITY-AND-LAUNCH-GATES.md`.

## Known out of scope

Subscriptions, refunds, tax invoices, chargeback management, full scheduled reconciliation/settlements, business/admin catalog pricing UI, historical-learner migration policy, and mobile app UI.
