import { randomUUID } from 'node:crypto';
import type { User } from '@sapling/contracts';
import { env } from '../../config/env.js';
import { HttpError } from '../../core/errors/http-error.js';
import { EntitlementModel, PaymentOrderModel } from './billing.models.js';
import {
  CASHFREE_API_VERSION,
  PREMIUM_PRODUCT_ID,
  providerOrderMatches,
  requiresPremium,
} from './billing.rules.js';
import { cashfreeEnabled, requestCashfree } from './cashfree.provider.js';
import { UserModel } from '../../infrastructure/database/mongodb/models.js';
import { queueEmail } from '../notifications/notifications.service.js';

export async function hasPremium(userId: string): Promise<boolean> {
  return Boolean(await EntitlementModel.exists({ userId, productId: PREMIUM_PRODUCT_ID }));
}
/** Single, backend-owned access policy for lessons, assessments and tutor hints. */
export async function assertLearningEntitlement(userId: string, pathId: string): Promise<void> {
  if (cashfreeEnabled() && requiresPremium(pathId) && !(await hasPremium(userId)))
    throw new HttpError(
      402,
      'Unlock the Generative AI Engineering Pass to access this content',
      'purchase_required',
    );
}
export function publicProduct() {
  return {
    id: PREMIUM_PRODUCT_ID,
    title: 'Generative AI Engineering Pass',
    description: 'One-time access to the full Generative AI learning track. No recurring billing.',
    amountPaise: env.GENAI_PASS_PRICE_PAISE,
    currency: 'INR' as const,
    kind: 'one_time' as const,
  };
}
export async function billingOverview(userId: string) {
  const [owned, orders] = await Promise.all([
    hasPremium(userId),
    PaymentOrderModel.find({ userId }).sort({ createdAt: -1 }).limit(20).lean(),
  ]);
  return {
    enabled: cashfreeEnabled(),
    environment: env.CASHFREE_ENV,
    product: { ...publicProduct(), owned },
    orders: orders.map((o) => ({
      orderId: o.orderId,
      productId: o.productId,
      amountPaise: o.amountPaise,
      currency: o.currency,
      status: o.status,
      createdAt: o.createdAt.toISOString(),
    })),
  };
}
export async function createCheckout(user: User, idempotencyKey: string, customerPhone: string) {
  if (!cashfreeEnabled())
    throw new HttpError(503, 'Checkout is not enabled yet', 'payments_unavailable');
  if (await hasPremium(user.id))
    throw new HttpError(409, 'You already own this learning pass', 'already_owned');
  const product = publicProduct();
  let row = await PaymentOrderModel.findOne({ userId: user.id, idempotencyKey });
  if (!row) {
    try {
      row = await PaymentOrderModel.create({
        orderId: `aq_${randomUUID().replace(/-/g, '')}`,
        userId: user.id,
        tenantId: user.tenantId,
        productId: product.id,
        idempotencyKey,
        amountPaise: product.amountPaise,
        currency: product.currency,
        status: 'creating',
      });
    } catch (error) {
      if ((error as { code?: number }).code !== 11000) throw error;
      row = await PaymentOrderModel.findOne({ userId: user.id, idempotencyKey });
    }
  }
  if (!row) throw new HttpError(503, 'Could not create order', 'payment_creation_failed');
  if (row.productId !== product.id)
    throw new HttpError(409, 'Idempotency conflict', 'idempotency_conflict');
  if (row.status === 'paid') throw new HttpError(409, 'Order is already paid', 'already_owned');
  if (row.status === 'expired' || row.status === 'failed')
    throw new HttpError(409, 'Create a new order for another attempt', 'order_closed');
  if (row.paymentSessionId)
    return {
      orderId: row.orderId,
      paymentSessionId: row.paymentSessionId,
      environment: env.CASHFREE_ENV,
    };
  // Repeated calls use one Cashfree order and the same provider idempotency UUID.
  const response = await requestCashfree(
    '/pg/orders',
    'POST',
    {
      order_id: row.orderId,
      order_amount: row.amountPaise / 100,
      order_currency: row.currency,
      customer_details: {
        customer_id: user.id,
        customer_email: user.email,
        customer_name: user.name,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `${env.WEB_ORIGIN}/billing/return?order_id=${encodeURIComponent(row.orderId)}`,
        ...(env.CASHFREE_WEBHOOK_URL ? { notify_url: env.CASHFREE_WEBHOOK_URL } : {}),
      },
      order_note: 'AI Quest Generative AI Engineering Pass',
    },
    idempotencyKey,
  );
  if (
    response.order_id !== row.orderId ||
    response.order_currency !== row.currency ||
    Math.round(response.order_amount * 100) !== row.amountPaise ||
    !response.payment_session_id
  )
    throw new HttpError(
      502,
      'Provider order response did not match local amount or ID',
      'payment_integrity_error',
    );
  await PaymentOrderModel.updateOne(
    { _id: row._id, status: 'creating' },
    {
      $set: {
        status: 'pending',
        paymentSessionId: response.payment_session_id,
        providerOrderId: response.cf_order_id,
      },
    },
  );
  return {
    orderId: row.orderId,
    paymentSessionId: response.payment_session_id,
    environment: env.CASHFREE_ENV,
  };
}
async function ensureEntitlement(row: {
  userId: string;
  tenantId: string;
  productId: string;
  orderId: string;
}) {
  if (row.userId.startsWith('deleted:')) return; // retain the paid record for refund/chargeback review
  try {
    await EntitlementModel.updateOne(
      { userId: row.userId, productId: row.productId },
      {
        $setOnInsert: {
          userId: row.userId,
          tenantId: row.tenantId,
          productId: row.productId,
          orderId: row.orderId,
          grantedAt: new Date(),
        },
      },
      { upsert: true },
    );
  } catch (error) {
    if ((error as { code?: number }).code !== 11000) throw error;
  }
}
export async function reconcileOrder(orderId: string) {
  const row = await PaymentOrderModel.findOne({ orderId });
  if (!row) return null;
  if (row.status === 'paid') {
    await ensureEntitlement(row);
    return row;
  }
  const cf = await requestCashfree(`/pg/orders/${encodeURIComponent(orderId)}`, 'GET');
  if (
    providerOrderMatches(
      { orderId: row.orderId, amountPaise: row.amountPaise, currency: row.currency },
      cf,
    )
  ) {
    // Once paid, never roll status back; the entitlement is idempotent by user+product and order ID.
    const settled = await PaymentOrderModel.updateOne(
      { orderId, status: { $ne: 'paid' } },
      { $set: { status: 'paid', paidAt: new Date() } },
    );
    await ensureEntitlement(row);
    if (settled.modifiedCount === 1) {
      void UserModel.findById(row.userId)
        .lean()
        .then(
          (user) =>
            user &&
            queueEmail(
              'purchase-confirmation',
              user.email,
              { name: user.name },
              `purchase:${orderId}`,
            ),
        )
        .catch(() => {});
    }
  } else if (
    cf.order_id === row.orderId &&
    cf.order_currency === row.currency &&
    Math.round(cf.order_amount * 100) === row.amountPaise &&
    cf.order_status === 'EXPIRED'
  ) {
    await PaymentOrderModel.updateOne(
      { orderId, status: { $ne: 'paid' } },
      { $set: { status: 'expired' } },
    );
  }
  return PaymentOrderModel.findOne({ orderId });
}
export async function myOrder(userId: string, orderId: string, refresh: boolean) {
  const found = await PaymentOrderModel.findOne({ userId, orderId });
  if (!found) throw new HttpError(404, 'Order not found', 'not_found');
  const row = refresh ? await reconcileOrder(orderId) : found;
  return {
    orderId: row!.orderId,
    status: row!.status,
    productId: row!.productId,
    amountPaise: row!.amountPaise,
    currency: row!.currency,
  };
}
export function getPaymentProviderVersion() {
  return CASHFREE_API_VERSION;
}
