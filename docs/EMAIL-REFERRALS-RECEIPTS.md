# Transactions, referrals and receipts

## SES and templates

Set `SES_ENABLED=true`, `SES_FROM_EMAIL=verified@your-domain`, `AWS_REGION=ap-south-1`; use an AWS workload identity or IAM credentials with least-privilege `ses:SendEmail`. Verify sender and DKIM/SPF/DMARC; SES sandbox recipients must be verified. With queue enabled, BullMQ retries transactional email jobs on worker failures. Templates in `modules/notifications/templates.ts` are `welcome`, `lesson-complete`, `purchase-confirmation` and `referral-qualified`. Messages are transactional, not marketing subscriptions; email contents HTML-escape user fields. Provider configuration is disabled by default and must be validated in AWS before live use.

The worker runs `pnpm --filter @sapling/api worker` locally or `node dist/workers/worker.js` in the API Docker image. Production requires `QUEUE_ENABLED=true` when SES is enabled. Persistent outbox reconciliation and bounce suppression remain future hardening items, and AWS service health is outside our control.

## Referrals

Learner `/referrals` screen displays a stable code and shareable invite URL. `/register?ref=CODE` passes the normalized code to the backend. Google sign-up may claim a referral within 24 hours through `/referrals/claim`. Server checks code existence and prevents self-referral. Attribution is unique per new learner. A referral qualifies after the invited learner first passes an assessed lesson, not on raw page views or a login. No referral cash/XP incentive is promised; prevent abuse with signup rate limits and review multi-account fraud before incentives are introduced.

## Receipts

`GET /api/v1/billing/orders/:id/invoice` requires authentication, owner matching and a `paid` order with `paidAt`. It generates a PDF showing order ID, verified paid timestamp, product and amount. The Billing history UI shows **Download receipt (PDF)** for paid orders only. The PDF states that it is **not a GST tax invoice**. To issue statutory invoices, implement the merchant's legally validated numbering sequence, place of supply, buyer data, GST/tax breakdowns and refund/credit note system after tax/legal review.
