# AI Quest developer and on-call runbook

## Bring up from scratch

1. Install Node 22.12+ and Docker with Compose.
2. Copy `.env.example` → `.env`; replace all sample secrets. `MONGODB_URI` is a host-local URI in the example. Local Compose services map MongoDB on 127.0.0.1:27017.
3. Run `pnpm install`, `pnpm run infra:up`, `pnpm run dev`.
4. Verify `GET http://localhost:4000/health/live` and `GET http://localhost:4000/health/ready` return healthy.
5. Register, complete onboarding and pass `ai-vs-software` to validate Mongo progress and frontend state.
6. Run the learning API integration smoke test: `node tests/integration/learning-smoke.mjs`.

## Diagnosing common failures

| Symptom                                | Likely cause                                      | Check/action                                                     |
| -------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| App stays on loading                   | API not running, CORS origin or Mongo unavailable | Check browser Network, API logs and `/health/ready`              |
| 503 readiness                          | Mongo disconnected, optional Redis unavailable    | `docker compose -f docker/compose.yaml ps`; verify `MONGODB_URI` |
| 403 CSRF                               | Missing CSRF cookie/header or wrong origin        | Fetch `/auth/csrf`, inspect cookies, match `WEB_ORIGIN`          |
| 401 after login                        | Session cookie rejected or expired                | Confirm same-site origin, JWT secret and cookie settings         |
| New account redirected to onboarding   | Normal: profile not yet saved                     | Complete onboarding, refresh if needed                           |
| Lesson returns 403                     | Prior lesson in that path not mastered            | Visit roadmap, pass prerequisite                                 |
| Duplicate XP concern                   | Retry succeeded or race                           | Verify unique `(userId,lessonId)` index and completion count     |
| Browser shows stale other learner data | React Query cache issue                           | Clear query cache on all authentication changes; code does this  |
| GitHub Actions fail to install         | Missing registry access or dependency problem     | `pnpm install` and commit lockfile after success                 |

## Data recovery and operations

- Backup and restore MongoDB per the hosting provider's policy; include `User`, `LessonAttempt`, and `LessonCompletion` collections.
- `User` stores credential hash and onboarding; protect both. Mongo index `LessonCompletion(userId,lessonId)` is essential for once-only XP.
- Never purge lesson completions casually: these form the durable reward ledger.
- Check API logs for request ID; inherited telemetry and metrics facilities may be configured in production.
- Disable unrestricted access to `/internal/metrics`; retain the starter's metrics token controls.

## Release checklist

- [ ] Install dependencies and commit a generated lockfile.
- [ ] Pass static typechecking, unit tests, build, Playwright and integration smoke.
- [ ] Verify API cookies are Secure behind HTTPS and reverse proxy settings are correct.
- [ ] Verify database unique indexes exist and backups are restorable.
- [ ] Review curriculum facts, UX copy, access controls and privacy policy.
- [ ] Run concurrency tests against duplicate attempts and XP updates.
- [ ] Review/adjust inherited Helm and Terraform rather than assuming ready for release.

## P1 operational checks

- `/health/ready` verifies MongoDB/cache; run `pnpm run test:core` for portable rules and `node tests/integration/p1-smoke.mjs` for auth, review, lab, tutor fallback, portfolio and privacy flows.
- No reviewer can publish their own draft. If users get `403` from `/content/lessons`, confirm they are explicitly listed in `CONTENT_AUTHORS`/`CONTENT_REVIEWERS` and the process has been restarted.
- If Python labs fail, inspect browser Console and CSP. `pyodide.sandbox.html` must be rendered with `sandbox="allow-scripts"`, must have opaque `null` origin, and must load Pyodide 0.27.7 from jsDelivr. Do not put API tokens in its messages.
- If LLM hints fall back to curriculum, check `AIQUEST_LLM_KEY`, `AIQUEST_LLM_MODEL`, provider network health, rate limit 12/day, 9-second timeout. Avoid logging prompt content, secrets, or raw learner data.
- Live model comparison requires two IDs in `AIQUEST_LLM_COMPARE_MODELS`, plus key. A 503 is expected without configuration; 429 indicates per-learner daily quota.
- MongoDB backups: export to secure encrypted storage with `MONGODB_URI=<uri> BACKUP_DIR=/secure/backups bash scripts/database/backup.sh`. A destructive restore requires `MONGODB_URI=<target> RESTORE_ARCHIVE=<path> CONFIRM_RESTORE=YES_I_ACCEPT_DATA_LOSS bash scripts/database/restore.sh`. Test restore only in a separate environment; never restore over live production without an approved change procedure.
- Native tokens: access TTL 30 minutes; refresh 30 days with one-time rotation. After account deletion, all refresh records are removed and access tokens cannot authenticate because the user no longer exists.
- Deletion scope: live database collections are cleaned and author attribution anonymized. Set explicit offsite backup/log retention and deletion policies independently.
