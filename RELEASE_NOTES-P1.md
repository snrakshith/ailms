# AI Quest P1 Release Notes — 2026-11-23

Extended the previous AI Quest full-stack ZIP with the complete requested P1 feature *slices* and cross-platform foundations.

## Major additions

1. **Content studio** with a validated author → independent reviewer → immutable versioned release workflow.
2. **Learning labs** for formative Python challenges in an opaque-origin iframe, gradient descent, text-vector comparison, confusion-matrix simulation and optionally two hosted models.
3. **Spaced revision** with scheduled recall ratings, analytics and stable personalized quiz ordering.
4. **AI tutor hints** with lesson context, local curriculum fallback, optional model provider, per-user/day quotas and token-usage accounting.
5. **Production foundation improvements** including native rotating refresh tokens, live-data export/delete, scoped queries, backup/restore scripts, static security invariants and expanded CI/E2E smoke coverage.
6. **Capstone portfolio** create/edit/submit/publish/unpublish/delete and opt-in public showcase.
7. **React Native readiness** with standalone TypeScript `@aiquest/learning-core`, `@sapling/contracts` and transport-injected `@aiquest/client-sdk` packages.

## What the ZIP does not include

An actual React Native client, hardened multi-tenant code-execution cluster, GPU backend, independent expert certification, or live LLM credentials. Browser exercises are formative; the Node API never runs arbitrary Python. The lexical vector playground is not neural embeddings. Public portfolios are learner self-published, not automatically verified.

## Verification

Offline parser checks passed for 112 TypeScript/TSX files; portable domain math, grading, progression, vector and SDK tests passed; security invariant checks passed; strict TypeScript compile for `learning-core` passed. A Python sandbox worker script was syntax-checked. The full dependency-backed build, database E2E, Docker and external model calls were not runnable due to npm registry DNS restrictions. These remain explicit acceptance gates before production deployment.

See `docs/P1-IMPLEMENTATION.md`, `docs/PORTABLE-ARCHITECTURE.md`, and `docs/GETTING_STARTED.md`.
