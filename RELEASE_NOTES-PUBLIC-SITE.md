# AI Quest v1.2 — Public website, editorial content and Google authentication

Date: 2026-11-23

## Summary

An integrated public React site now introduces AI Quest to software developers transitioning into AI. The previously protected `/` dashboard is moved to `/app`. Existing private learning routes, billing, assessments, platform-independent learning logic, and the Cashfree API remain intact.

### Marketing implementation

- Public home, pricing, FAQ, journal index and three complete articles.
- Reusable public header, mobile menu, beta announcement and footer.
- Restrained light-first visual system, responsive desktop/mobile layouts and modern editorial typography.
- Static marketing source-of-truth: `apps/web/src/features/marketing/content/site-content.ts` (no CMS or marketing endpoints).
- Editorial market outlook references Stanford HAI AI Index 2026 and WEF Future of Jobs 2025.
- Free lesson teaser on the public homepage and the protected learner dashboard.
- Document titles and marketing page descriptions updated.

### Identity and authorization

- Email/password login and registration redesigned into a cohesive accessible split layout.
- Google Identity Services login in browser, verified Google ID tokens on Node API.
- Explicit account linking for existing password users; never automatic email-based account merging.
- Google-only accounts use Google re-verification for account deletion.
- Native Google sign-in endpoint and portable SDK method for future React Native.
- Protected route redirects preserve a safely whitelisted destination after sign-in.
- Root Vite env loading, Docker build args and deployment CSP updated for Google login.

### Quality and portability

- Root `test:marketing` command and PR CI step validate public content consistency, article uniqueness, prices, and links.
- Cypress public route tests updated; authenticated learner journey test adapted to new signup label.
- Existing Prettier, ESLint, TypeScript, Vitest, CodeQL and build workflows retained.
- Business rules, lesson progress, Google identity validation and billing remain backend/shared SDK responsibilities; React components are purely presentation and transport adapters.

## Execution evidence

- Offline learning-core checks: **passed**.
- Marketing content checks: **passed**.
- Static security-invariant checks: **passed**.
- TypeScript/TSX syntax parser: **passed**.
- Relative module import resolution: **passed**.
- Marketing CSS parse: **passed**.
- YAML syntax (Compose/CI workflows): **passed**.
- Full npm install, typecheck, lint, Prettier check, unit suite, React build, real Google auth, DB integration, Cypress, Cashfree sandbox: **not executed in the packaging environment** (dependencies unavailable; Google OAuth and payment credentials not configured).

**Release status:** development/testing baseline only; not a production-ready or live-payments-certified release. Read `docs/PUBLIC-SITE-AND-GOOGLE-AUTH.md` and `docs/QUALITY-AND-LAUNCH-GATES.md` before deployment.
