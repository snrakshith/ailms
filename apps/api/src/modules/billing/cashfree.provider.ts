export { cashfreeWebhookSignature, verifyCashfreeWebhook } from './cashfree.signature.js';
import { env } from '../../config/env.js';
import { HttpError } from '../../core/errors/http-error.js';
import { CASHFREE_API_VERSION } from './billing.rules.js';

export type CashfreeOrder = {
  order_id: string;
  order_amount: number;
  order_currency: string;
  order_status: string;
  payment_session_id?: string;
  cf_order_id?: string;
};
const base = () =>
  env.CASHFREE_ENV === 'production' ? 'https://api.cashfree.com' : 'https://sandbox.cashfree.com';
export function cashfreeEnabled(): boolean {
  return env.CASHFREE_ENABLED;
}
export async function requestCashfree(
  path: string,
  method: 'GET' | 'POST',
  body?: unknown,
  requestId?: string,
): Promise<CashfreeOrder> {
  if (!cashfreeEnabled() || !env.CASHFREE_CLIENT_ID || !env.CASHFREE_CLIENT_SECRET)
    throw new HttpError(503, 'Payments are not configured', 'payments_unavailable');
  let response: Response;
  try {
    response = await fetch(`${base()}${path}`, {
      method,
      signal: AbortSignal.timeout(10000),
      headers: {
        'content-type': 'application/json',
        'x-client-id': env.CASHFREE_CLIENT_ID,
        'x-client-secret': env.CASHFREE_CLIENT_SECRET,
        'x-api-version': CASHFREE_API_VERSION,
        ...(requestId ? { 'x-idempotency-key': requestId } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  } catch {
    throw new HttpError(
      502,
      'Payment provider is temporarily unavailable',
      'payment_provider_unavailable',
    );
  }
  if (!response.ok)
    throw new HttpError(
      502,
      `Payment provider request failed (${response.status})`,
      'payment_provider_error',
    );
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new HttpError(502, 'Invalid provider response', 'payment_provider_error');
  }
  if (
    !data ||
    typeof data !== 'object' ||
    !('order_id' in data) ||
    typeof data.order_id !== 'string'
  )
    throw new HttpError(502, 'Incomplete provider response', 'payment_provider_error');
  return data as CashfreeOrder;
}
