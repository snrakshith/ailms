# Backend architecture and implementation

## A–L capabilities delivered together
A. Observability: request IDs, JSON logs, histogram metrics, optional OpenTelemetry and trace context.
B. Security: signed cookie sessions, CSRF, Zod, rate limiting, access guards, sensitive-field redaction.
C. API: Express 5 routers, standardized problem+json errors, OpenAPI and typed contracts.
D. Resilience: retry/backoff, deadline, circuit breaker, bulkhead, graceful shutdown.
E. Data: MongoDB+Mongoose default, Redis cache and generation-based invalidation.
F. Async: BullMQ queue, retrying worker and audit activity records.
G. Configuration: Zod-validated env, local `.env` examples, production cookie requirements.
H. Multi-tenancy: signed user context plus tenant ID filters for all task reads/writes.
I. Quality: Vitest primitives, cross-tenant smoke tests, k6 basic performance scripts.
J. CI and release: Docker build, GitHub Actions, Helm and Terraform registry example.
K. Performance: bounded DB pool, request size ceilings, tenant cache, event-loop process metrics.
L. Governance: versioning, API docs, security review and runbooks.

## Module conventions
A simple feature has `routes`, `service`, and `repository` files. Introduce richer DDD domain and application layers only when business complexity requires them. Technical providers live under `infrastructure`; framework-independent errors/context/contracts under `core`.

## Reliability guarantees
Tenant filtering is performed at the database level, not in browser state. Task write, audit insert and BullMQ event publishing are **not transactional**. When designing money movement or business-critical workflows, implement Mongo transactions, transactional outbox, and worker idempotency.
