# Security threat model

## Assets and trust boundaries

User passwords, signed sessions, per-tenant documents, audit history, and infrastructure credentials. Boundaries: browser, API, MongoDB, Redis, queue workers, telemetry receiver, container platform.

## Implemented controls

- Cookie session: HttpOnly, SameSite=Lax, short expiry, issuer/audience/subject verified.
- Signed CSRF double submit + request origin check for mutating calls.
- Backend authorization and tenant scoping (UI rendering is not authorization).
- Zod input validation and 100KB JSON body limits.
- Helmet headers and configurable CORS origin.
- Per-instance rate limiting, error redaction, Pino sensitive-field redaction.
- Non-root Node Docker image; Kubernetes pod privilege restrictions.
- Metrics protected by bearer token; no production Swagger UI.

## Production risks requiring further action

| Risk                                | Mitigation before public release                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------- |
| Distributed brute-force             | Shared Redis rate-limit store, per-account throttling, abuse monitoring                     |
| Refresh sessions and stolen cookies | Rotating opaque sessions, revocation store, device management, MFA                          |
| Account takeover                    | Email verification, reset workflow, secure notification providers                           |
| Password hashing cost               | Benchmark bcrypt, consider Argon2id and upgrade strategy                                    |
| Public exposure of MongoDB/Redis    | Private network, authentication, TLS, service-specific credentials                          |
| Stale cache                         | Verify generation-based invalidation across replicas and fault conditions                   |
| Cross-service async events          | Transactional outbox, idempotent consumer and DLQ monitoring                                |
| Telemetry PII                       | Scrub user fields, configure data retention, consent and region policies                    |
| Supply chain                        | Commit lockfile, pnpm install --frozen-lockfile, SBOM, scan/sign images, pin actions by SHA |
| CSP with telemetry                  | Restrict connect-src to configured collector domain (currently broad `https:`)              |
| Frontend scripts                    | Audited third-party scripts and strict CSP nonces/hash policy                               |
| Multi-tenant authorization          | Negative tests for every route and cross-tenant ID                                          |

## Operations

Store JWT_SECRET and METRICS_TOKEN in a secret manager, rotate on schedule, never log them, and use external-managed TLS. The `.env.*.example` credentials are illustrative and must never be deployed. Browser JavaScript receives no authentication secret.
