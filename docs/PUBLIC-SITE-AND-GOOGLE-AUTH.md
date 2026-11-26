# Public marketing website and Google authentication — implementation guide

**Scope:** React-first public marketing surface in the existing TypeScript monorepo, separate from authenticated learner experiences. New website routes are client-side React routes and **do not use a marketing CMS or marketing backend**.

## Route map

| URL                                                                               | Accessibility             | Source                                                                                            |
| --------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------- |
| `/`                                                                               | Public                    | React landing page — hero, curriculum, features, lesson preview, FAQ, journal, beta header/footer |
| `/pricing`                                                                        | Public                    | Free Explorer and one-time GenAI pass offer                                                       |
| `/faq`                                                                            | Public                    | FAQ list using native accessible `<details>`                                                      |
| `/blog`                                                                           | Public                    | Editorial index                                                                                   |
| `/blog/:slug`                                                                     | Public                    | Static article in content file; three substantial starter articles                                |
| `/login`, `/register`                                                             | Public                    | Responsive email/password and Google Identity Services authentication                             |
| `/showcase/:slug`                                                                 | Public                    | Previously implemented opt-in public learner showcase                                             |
| `/app`                                                                            | Authenticated + onboarded | Learning dashboard, including a free lesson teaser                                                |
| `/onboarding`                                                                     | Authenticated             | Learner background, learning goal, daily minutes                                                  |
| `/paths`, `/paths/:pathId`, `/learn/:lessonId`                                    | Authenticated + onboarded | Existing curriculum and lessons                                                                   |
| `/billing`, `/billing/return`                                                     | Authenticated + onboarded | Server-owned Cashfree payments                                                                    |
| `/progress`, `/review`, `/labs`, `/portfolio`, `/studio`, `/settings`, `/privacy` | Authenticated + onboarded | Existing learning tools and account sections                                                      |

A protected-route request sends a logged-out visitor to `/login?next=...`. The redirect target is restricted to an explicit list of internal learner routes, eliminating arbitrary external redirects. New users are sent through onboarding before accessing the learning dashboard.

## Change all public content in one place

`apps/web/src/features/marketing/content/site-content.ts`

The exported `siteContent` constant owns the following marketing content: brand, beta text, navigation, hero, benefit lists, curriculum cards, lesson preview, FAQ entries, pricing copy, footer links and full blog articles. The components render directly from that data. Editing it and rebuilding the React app updates the marketing website without a database migration.

**Important payment boundary:** The public `₹499` figure is an **illustrative marketing price**. It must agree with the server's `GENAI_PASS_PRICE_PAISE` at release. The server continues to determine the actual charged amount and entitlement. Consider removing the public numeric price if pricing varies by country, cohort or campaign. The checkout page fetches the real price from `/api/v1/billing/me`.

The articles are editorial drafts to review before publication. Market-outlook articles contain reference links to Stanford AI Index 2026 and WEF Future of Jobs research; no fabricated testimonials, performance claims or hiring promises are used. Update dates, references, legal links and support contact details before live launch.

## Google sign-in setup

1. Create a **Google OAuth 2.0 Web client** in Google Cloud Console and configure the consent/branding screens according to Google requirements.
2. Add `http://localhost:5173` as an Authorized JavaScript origin for development; use the exact HTTPS website origin in production. For Docker's local frontend, also add `http://localhost:8080` as appropriate to your Google configuration.
3. Copy `.env.example` to `.env` and set BOTH:
   - `GOOGLE_CLIENT_ID=<your Google Web OAuth client ID>` for the Node API.
   - `VITE_GOOGLE_CLIENT_ID=<the same Google Web OAuth client ID>` for the React web client.
4. Restart `pnpm run dev` (or rebuild Docker's web image). Vite reads the root monorepo `.env` through the explicit `envDir` setting. Public `VITE_` variables are compiled into the browser bundle: **never put OAuth client secrets or API keys in them.**
5. Sign in through Google's officially rendered button. A credential is POSTed to `/api/v1/auth/google`, where the Node API validates Google's signature, token lifetime, issuer, audience, verified email and immutable `sub` identifier using `jose`'s remote JWKS validation. The API then issues the same HttpOnly session as email login.
6. For an existing password account with the same email, **do not silently link**. Sign in using the password, open **Settings → Sign in with Google**, and explicitly link the matching verified Google identity through `/api/v1/auth/google/link`.

**Mobile ready:** A future React Native app can use native Google Sign-In to obtain a compatible Google ID token and call `nativeGoogleLogin(credential)` through `@aiquest/client-sdk`. The `POST /api/v1/native-auth/google` endpoint issues bearer/rotating refresh credentials. Use secure native storage. For mobile clients, ensure the returned ID token's audience matches `GOOGLE_CLIENT_ID`; never weaken audience checking to accept arbitrary client IDs.

**Google-only users:** They have no password. They can verify again with Google to delete their account under `/privacy`, or use the same verified subject to sign in subsequently. Password sign-in intentionally does not work for an account created without a password.

## Security and operational notes

- A server-verified Google ID token is required; email or profile data supplied directly by a browser is never sufficient.
- Google's stable `sub` claim is used as the federated login identifier. MongoDB enforces a unique sparse index. Verified email comparison is only used during _explicit_, already-authenticated account linking.
- Login/register/Google endpoints share auth rate limits; state-changing web API requests use CSRF validation. Sessions are HttpOnly, `SameSite=Lax`, and `Secure` in production.
- Nginx CSP permits Google's `gsi/client` script and Google iframe, while retaining the existing Cashfree, Python lab and general CSP protections. Review actual CSP browser reports with the deployed domains before launch.
- Google provider initialization and configuration require a network connection, an OAuth client ID, and a Google-hosted JavaScript library. Without configuration, email sign-in remains functional and the UI explicitly says Google is unconfigured.
- React's public pages are SPA routes with a single HTML shell. They are static from an application-data perspective, **but this is not pre-rendering or server-side rendering**. Consider static generation / metadata per article for search indexing later.
- The beta footer contains no invented support address. Before taking live payments, publish real support, refund, privacy and terms pages.

## Verification

```bash
pnpm run test:marketing  # dependency-free content and article integrity checks, Node 22
pnpm run test:core       # learning algorithms and source parser
pnpm run typecheck      # requires pnpm install
pnpm run test           # Vitest, requires pnpm install
pnpm run build          # full bundles, requires pnpm install
pnpm run e2e            # Playwright, running API + Mongo + web required
```

Suggested manual review: mobile/tablet/desktop breakpoints; keyboard tab order; reduced motion; FAQ expand/collapse; article/route links; protected page redirect preservation; email sign-up and sign-in; Google new account; existing account link flow; Google-only account deletion; Cashfree plan display; disabled-payment environment; browser CSP and cross-origin restrictions.
