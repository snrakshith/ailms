# AI Quest implementation status

Current package: **P1 development implementation**, built on the preceding P0 learning MVP. Do not confuse working source and offline checks with a fully validated production deployment.

The implementation now includes identity, onboarding, 9 core lessons, server-side grading, durable progress, XP, browser learning labs, review scheduling, tutor hints, curriculum editorial workflow, hosted model comparison integration, capstone portfolio, privacy lifecycle, and React Native-compatible TypeScript packages.

For exact scope, boundaries, verification status and test commands, see [P1-IMPLEMENTATION.md](P1-IMPLEMENTATION.md) and [PORTABLE-ARCHITECTURE.md](PORTABLE-ARCHITECTURE.md).

## Important gaps

- Hosted LLM endpoints require provider credentials and live evaluation; fallback hints function without one.
- Formative browser Python does not award server-verified XP; public arbitrary-code execution needs additional isolation/abuse testing.
- No GPU backends, rich multi-author curriculum CMS, expert-reviewed certificates, or independent portfolio grading.
- RN-ready core and SDK are provided, **not a compiled React Native application**.
- Registry DNS was unavailable during packaging, preventing full dependency installation, typecheck, integration tests and deployed app verification.
- The supplied baseline contains no `pnpm-lock.yaml`; create one on a machine that can access npm.
