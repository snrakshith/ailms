import { AsyncLocalStorage } from 'node:async_hooks';
export type RequestContext = { requestId: string; tenantId?: string; userId?: string };
export const requestContext = new AsyncLocalStorage<RequestContext>();
export const currentContext = () => requestContext.getStore();
