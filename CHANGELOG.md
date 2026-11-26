# Changelog

## 1.4.0 — 2026-11-23
- Added Vitest HTTP/Mongo integration testing for identity, CSRF, payment receipts, progress, XP, and referral qualification.
- Integrated Husky staged checks and pre-push TruffleHog, with matching GitHub Actions and coverage gates.
- Added revocable session generations and invalidation of outstanding native refresh tokens on web sign-out.
- Documented AWS infrastructure security checklist, pnpm lockfile bootstrap, and remaining release blockers.


## 1.3.0 — 2026-11-23
- Added build-time prerendered public HTML, SEO and OpenGraph metadata, sitemap, robots, structured data, and llms.txt/llms-full.txt.
- Introduced public service status with readiness/live checks and independent monitor linking.
- Integrated consent-controlled PostHog experiments and Mixpanel analytics, plus configurable Sentry API/browser reporting.
- Added AWS SES transactional templates and queued delivery, referral attribution and qualification, PDF payment receipts, and centralized announcement banner.
- Migrated scripts, workspaces, CI and Docker setup to pnpm; real lockfile generation and end-to-end verification remain pending network-enabled dependency resolution.


## 1.0.0 — 2026-11-10
- Consolidated full-stack React and Express TypeScript template with sample task workspace, security, observability hooks, worker, Docker/Helm and docs.
- Initial authored release; integration verification pending external package registry access.
