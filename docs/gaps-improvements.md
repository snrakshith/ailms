# Known implementation gaps (P1)

This ZIP contains code for all five P1 workstreams and the model playground and capstones. It is not independently production-verified.

- Run `pnpm install`, lock dependencies, `pnpm run verify`, the database-backed `p1-smoke` suite, Playwright and Docker on a network-connected machine.
- Replace the opaque-origin iframe lab's CDN dependency with pinned self-hosted Pyodide assets and run browser security tests.
- Publish richer question banks and personalized examples; current per-learner variants randomize question/option order without changing canonical content.
- Grade learner code only using a dedicated hardened server runner if XP should depend on source execution; do not trust browser outputs.
- Complete LLM safety evaluations, provider error/cost monitoring and model policy review.
- Audit account deletion across logs/backups, demonstrate encrypted restore in staging, add optimistic concurrency for simultaneous review ratings.
- Create a React Native app with platform-specific views and secure token persistence. Shared packages and native API are implemented, not the RN app.
