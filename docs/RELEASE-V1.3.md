# AI Quest v1.3 — implementation and release notes

## Scope (source implementation)

| Capability              | Code / route                                                              | Validation boundary                                                                                            |
| ----------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Static marketing SEO    | `scripts/seo/generate.mjs`                                                | Seven build-time HTML routes; canonical metadata, robots, sitemap, JSON-LD, Open Graph; uses `site-content.ts` |
| LLM discovery content   | `/llms.txt`, `/llms-full.txt` after build                                 | Advisory convention, not a search-ranking guarantee                                                            |
| Service status          | `/status`, `/health/live`, `/health/ready`                                | Browser-side health checks; separate hosted incident history not provisioned                                   |
| PostHog experiments     | `core/analytics`, `use-experiment`                                        | Opt-in, one illustrative feature flag `homepage-hero-copy`, variants `control`/`practical`                     |
| Mixpanel                | `core/analytics`                                                          | Opt-in named event capture with anonymous or authenticated ID; consent revocable in Settings                   |
| Sentry browser + API    | `core/observability/browser.ts`, `infrastructure/observability/sentry.ts` | Configurable DSNs; JS error capture; no source map upload yet                                                  |
| SES email notifications | `modules/notifications`                                                   | Optional provider, transactional templates, BullMQ retry worker when enabled                                   |
| Referrals               | `/api/v1/referrals/me`, `/api/v1/referrals/claim`, `/referrals`           | User-owned stable code, registration attribution, qualification after first completed lesson                   |
| Download receipt        | `/api/v1/billing/orders/:id/invoice`                                      | Owner-only, paid-only PDF receipt, **not** a statutory GST invoice                                             |
| Alert banner            | `siteContent.alert`                                                       | Dismissible on marketing and protected pages, accessible controls                                              |
| pnpm migration          | `pnpm-workspace.yaml`, `packageManager`, CI, Docker, scripts              | Unlocked until an actual `pnpm-lock.yaml` is generated                                                         |

## Developer start (Node 22+)

```bash
corepack enable
pnpm install --no-frozen-lockfile
cp .env.local.example .env  # use .env.example for the complete integration catalog
pnpm run infra:up
pnpm run dev
```

`PUBLIC_SITE_URL=https://your-real-domain` **must** be supplied when building the production web bundle; the `SEO_REQUIRE_SITE_URL=1` Docker build argument enforces it for production (`SEO_REQUIRE_SITE_URL=0` allows localhost in development). For a local SEO smoke test: `PUBLIC_SITE_URL=https://example.org pnpm --filter @sapling/web build`.

After the first successful install, commit `pnpm-lock.yaml` and change all CI/Docker installs to `pnpm install --frozen-lockfile`. The source ZIP cannot generate a trustworthy lockfile without resolving the actual dependency tree from the npm registry.

## Environment variables

Web build variables (public values only): `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`, `VITE_MIXPANEL_TOKEN`, `VITE_SENTRY_DSN`, `VITE_STATUS_PAGE_URL`, `VITE_GOOGLE_CLIENT_ID`, and `PUBLIC_SITE_URL`. Server-only: `SES_ENABLED`, `AWS_REGION`, `SES_FROM_EMAIL`, `SENTRY_DSN`, `INVOICE_SELLER_NAME`, `INVOICE_SELLER_ADDRESS`, `INVOICE_SELLER_GSTIN`, existing Cashfree keys and Mongo/Redis settings.

Never expose Cashfree secrets, AWS keys or other server secrets through `VITE_` variables. For SES production use `QUEUE_ENABLED=true` with a worker. Prefer AWS workload identity/IAM roles over static credentials.

## Verified in this artifact environment

- Dependency-free TS/TSX syntax parsing, learning-core algorithms, public content and static security contract checks.
- Email escaping and integration invariants using dependency-free assertions.
- Seven SEO HTML outputs, XML sitemap, `robots.txt`, `llms.txt` and `llms-full.txt` generated against a **test** domain and inspected.
- ZIP archive integrity will be checked when packaged.

## Not yet verified / release blockers

1. Clean `pnpm install` and lockfile generation; full `pnpm run format`, Prettier, ESLint, type checks, Vitest, Vite build, Docker and Cypress workflows.
2. Live AWS SES verified sender, sandbox exit, IAM policy, DKIM/SPF/DMARC, bounce/complaint suppression, retries and recipient testing.
3. Actual PostHog flag experiment creation and exposure reporting, Mixpanel event receipt, Sentry event receipt and source-map uploads; document privacy/consent requirements.
4. External uptime monitor/status page provisioning and public domain plus incident subscriptions.
5. Cashfree sandbox payment and webhook verification, refund path, payment failures and **tax invoice** requirements (GST number, numbering, taxes and buyer/place-of-supply details).
6. Adversarial tests for referral farming/duplicate accounts and billing order/receipt isolation.
7. Security, accessibility, privacy-policy/cookie-policy and legal review before a public paid launch.

**The ZIP is an implementation baseline, not a fully validated production release.**
