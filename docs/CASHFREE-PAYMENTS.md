# Cashfree PG — Hosted Checkout Integration

## Scope and offer

- Initial product: **Generative AI Engineering Pass** (`genai-track-pass`), one-time purchase, INR 499.00 **illustrative** default (`GENAI_PASS_PRICE_PAISE=49900`). No recurring subscriptions are implemented.
- Free tracks: AI Foundations and Machine Learning. **When Cashfree is enabled**, the GenAI track can be previewed, but lessons and server-graded submissions require the entitlement. When Cashfree is disabled, GenAI remains available without payment for local development to avoid breaking the learning MVP.
- Pricing is read from server configuration; never trust browser-supplied amount, currency, or `paid` status.
- Entitlements are stored in MongoDB, keyed by learner and product. The same API/portable SDK works for native and web clients.

## Configure sandbox

1. Create a Cashfree Payment Gateway merchant sandbox account, obtain the **sandbox** client ID and secret. Do not place secrets in Vite's `VITE_*` vars or in Git.
2. Edit the backend `.env` (locally from `.env.example`):

   ```dotenv
   CASHFREE_ENABLED=true
   CASHFREE_ENV=sandbox
   CASHFREE_CLIENT_ID=your-sandbox-app-id
   CASHFREE_CLIENT_SECRET=your-sandbox-secret
   GENAI_PASS_PRICE_PAISE=49900
   WEB_ORIGIN=http://localhost:5173
   ```

3. Optionally configure `CASHFREE_WEBHOOK_URL` to a **public HTTPS address** such as `https://api.example.com/api/v1/billing/webhook`; local loopback cannot receive Cashfree webhooks. Configure the webhook version and payment success events in the Cashfree merchant dashboard as documented by Cashfree. The service also supports explicitly verifying a purchase on the return screen.
4. Run `pnpm install`, `pnpm run infra:up`, and `pnpm run dev`. Sign in, visit `/billing`, enter the test mobile number and launch hosted checkout. Test sandbox failure, success, duplicate delivery, pending, expired and interrupted browser journeys. Do **not** use real card data in sandbox.
5. For live production: set `CASHFREE_ENV=production`, use separate live credentials, `NODE_ENV=production`, `COOKIE_SECURE=true`, HTTPS `WEB_ORIGIN`, and required `CASHFREE_WEBHOOK_URL`. Whitelist the checkout domain with Cashfree and validate TLS, CORS, proxy config and CSP.

## Implemented checkout and fulfilment flow

1. Client sends `POST /api/v1/billing/orders` with `productId`, `customerPhone`, UUID `idempotencyKey` (with auth + CSRF for browser; bearer for mobile). Nothing from client controls the price.
2. Server stores a local order with MongoDB unique keys, asks Cashfree `POST /pg/orders` using `x-api-version: 2025-01-01`, and returns **only** order ID, session ID, environment.
3. Web: Cashfree JS v3 `Cashfree({mode}).checkout({paymentSessionId,redirectTarget:'_self'})`. Native client can consume the same order/session endpoint with Cashfree's mobile SDK.
4. Provider sends webhook to `POST /api/v1/billing/webhook`. The route receives **raw bytes**, validates Cashfree `x-webhook-timestamp` and `x-webhook-signature` using base64 HMAC-SHA256 over `timestamp + raw body`. It ignores unrelated events.
5. For success notifications, server calls `GET /pg/orders/{id}`, compares **order ID, currency, price and PAID status**, and then grants an idempotent entitlement. Do not use the redirect or browser result as proof of payment.
6. Return screen `POST /api/v1/billing/orders/{id}/verify` is owner-only and also checks Cashfree. `GET /api/v1/billing/me` and `GET /api/v1/billing/orders/{id}` are authenticated and private.
7. Entitlement is checked by server for GenAI lesson reading and submission. Learner access survives browser logout and future React Native adoption.

## Safety and operations

- Webhooks MUST bypass CSRF but MUST verify the provider signature; no session cookies are required. The signature uses unmodified request bytes, not parsed JSON.
- Avoid relying on delivery ordering; paid orders must never revert to pending/failed. A success webhook can arrive more than once. Local verification also works if a webhook is delayed.
- Never expose Cashfree secrets, payment session IDs in analytics, card information or personally identifying checkout details in logs.
- The app never collects card numbers; Cashfree hosts checkout. The mobile phone goes directly to the provider in order creation and is not stored in local payment records.
- `privacy/export` includes payments and entitlements. On learner deletion, entitlements are removed, financial records are pseudonymized and retained for accounting/reconciliation; investigate post-deletion late settlements and refunds.
- **Not implemented:** refunds, partial refunds, reconciliation scheduler, GST/tax invoice issuance, dispute lifecycle, pricing catalog admin, subscriptions, promotions/coupons, settlement accounting, merchant reconciliation dashboard. These are release gates if the business requires them.
- **Before live launch:** Cashfree merchant activation, real webhook callback validation, end-to-end sandbox tests, refunds/support policy and links, tax/legal review, monitoring/alerts and finance review, business approval of list price and access terms. A signed webhook alone is not sufficient; always query Cashfree.

References: https://www.cashfree.com/docs/api-reference/payments/latest/orders/create-order ; https://www.cashfree.com/docs/payments/overview ; https://www.cashfree.com/devstudio/preview/pg/web/checkout
