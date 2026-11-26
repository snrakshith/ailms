# Single-delivery coverage matrix (not a staged roadmap)

All four previously discussed phase categories are represented in this ZIP. This is a consolidated technical starter, not a claim that every optional vendor integration is connected or that it has passed production verification.

| Capability              | React implementation                                  | Express implementation                             | Delivery/operations                            |
| ----------------------- | ----------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------- |
| Application foundation  | Providers, router, layouts, typed forms               | HTTP bootstrap, Zod config, errors, feature routes | npm workspaces, README, local setup            |
| UI design system        | Tokens, responsive shell, Button Storybook            | —                                                  | Accessibility story checks                     |
| State and contracts     | Query client, typed fetch, shared Zod types           | Zod request validation, OpenAPI summary            | Shared `packages/contracts`                    |
| Security                | Cookie session, CSRF token client, routing UX guard   | JWT, HMAC CSRF, tenant scopes, rate-limit, Helmet  | Threat model, Docker headers, Helm secrets     |
| Observability           | Web Vitals, Sentry adapter, traceparent               | Pino, Prometheus, OTEL SDK                         | Prometheus, Tempo, Grafana, Collector config   |
| Resilience              | Abort deadlines, error/loading/empty UI               | Retry, breaker, bulkhead, shutdown                 | Health probes, HPA, runbooks                   |
| Database/cache          | Typed task UI and API                                 | MongoDB models, Redis generation cache             | Compose database/cache, seed utility           |
| Background processing   | Activity display                                      | BullMQ worker, audit insert                        | Worker service in Compose/Helm                 |
| Configuration and flags | Vite public config, typed sample flags, theme/locales | Zod environment, production invariants             | Local env examples, managed-secret conventions |
| Performance             | Lazy routes, vendor chunks, optional PWA shell        | Connection pool, bounded payloads, metrics         | k6 sample and Lighthouse budget                |
| Testing and quality     | RTL, axe, Playwright, Storybook                       | Unit and contract tests, isolation smoke           | GitHub CI, E2E workflow, check scripts         |
| Deployment/governance   | Nginx web container                                   | Non-root Node container                            | Helm, Terraform ECR example, HLD/LLD/PRD/ADRs  |

## Verification constraints

The source was generated offline. All TypeScript/TSX sources were syntactically parsed, JSON/YAML files parsed, relative import targets verified, and JavaScript smoke files passed `node --check`. No network package install, real TypeScript type checking, live API/browser tests, Docker builds, Helm lint or cloud integration could be run; see `docs/gaps-improvements.md`.
