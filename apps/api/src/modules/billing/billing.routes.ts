import { Router, type RequestHandler } from 'express';
import { z } from 'zod';
import { checkoutRateLimit } from '../../infrastructure/security/rate-limit.js';
import { checkoutSchema } from '@sapling/contracts';
import { requireAuth } from '../../infrastructure/security/session.js';
import { validateBody } from '../../core/contracts/validate.js';
import { HttpError } from '../../core/errors/http-error.js';
import { env } from '../../config/env.js';
import { cashfreeEnabled, verifyCashfreeWebhook } from './cashfree.provider.js';
import { billingOverview, createCheckout, myOrder, reconcileOrder } from './billing.service.js';
import { PaymentOrderModel } from './billing.models.js';
import { buildPaymentReceipt } from './invoice.service.js';
const validOrderId = /^aq_[a-f0-9]{32}$/;
const eventSchema = z
  .object({
    type: z.string(),
    data: z.object({ order: z.object({ order_id: z.string() }) }).passthrough(),
  })
  .passthrough();

export const cashfreeWebhook: RequestHandler = async (req, res) => {
  if (!cashfreeEnabled()) throw new HttpError(503, 'Payments unavailable', 'payments_unavailable');
  const raw = req.body;
  if (
    !Buffer.isBuffer(raw) ||
    !verifyCashfreeWebhook(
      req.get('x-webhook-timestamp'),
      req.get('x-webhook-signature'),
      raw,
      env.CASHFREE_CLIENT_SECRET ?? '',
    )
  )
    throw new HttpError(401, 'Invalid Cashfree webhook signature', 'invalid_webhook_signature');
  let event: unknown;
  try {
    event = JSON.parse(raw.toString('utf8'));
  } catch {
    throw new HttpError(400, 'Invalid webhook JSON', 'invalid_webhook');
  }
  const parsed = eventSchema.safeParse(event);
  if (!parsed.success) {
    res.status(200).json({ received: true, handled: false });
    return;
  }
  if (parsed.data.type !== 'PAYMENT_SUCCESS_WEBHOOK') {
    res.status(200).json({ received: true, handled: false });
    return;
  }
  const orderId = parsed.data.data.order.order_id;
  if (!validOrderId.test(orderId)) {
    res.status(200).json({ received: true, handled: false });
    return;
  }
  // Do not grant access based only on webhook content: verify the live provider order.
  const local = await PaymentOrderModel.exists({ orderId });
  if (local) await reconcileOrder(orderId);
  res.status(200).json({ received: true });
};
export function createBillingRouter() {
  const router = Router();
  router.use(requireAuth);
  router.get('/me', async (req, res) =>
    res.json({ data: await billingOverview(req.principal!.id) }),
  );
  router.post('/orders', checkoutRateLimit, validateBody(checkoutSchema), async (req, res) => {
    res.setHeader('cache-control', 'no-store');
    res.status(201).json({
      data: await createCheckout(req.principal!, req.body.idempotencyKey, req.body.customerPhone),
    });
  });
  router.get('/orders/:id/invoice', async (req, res) => {
    const id = String(req.params.id);
    if (!validOrderId.test(id)) throw new HttpError(404, 'Order not found', 'not_found');
    const pdf = await buildPaymentReceipt(req.principal!.id, id);
    res.setHeader('content-type', 'application/pdf');
    res.setHeader('cache-control', 'private, no-store');
    res.setHeader('content-disposition', `attachment; filename="aiquest-receipt-${id}.pdf"`);
    res.send(pdf);
  });
  router.get('/orders/:id', async (req, res) => {
    const id = String(req.params.id);
    if (!validOrderId.test(id)) throw new HttpError(404, 'Order not found', 'not_found');
    res.json({ data: await myOrder(req.principal!.id, id, false) });
  });
  router.post('/orders/:id/verify', checkoutRateLimit, async (req, res) => {
    const id = String(req.params.id);
    if (!validOrderId.test(id)) throw new HttpError(404, 'Order not found', 'not_found');
    res.json({ data: await myOrder(req.principal!.id, id, true) });
  });
  return router;
}
