# Deployment and operations runbook

## Local Compose

Use `docker/compose.yaml` for a demonstration. It includes MongoDB, Redis, API, event worker and web Nginx. Change secrets from examples. HTTP cookies are deliberately used only for localhost.

## Kubernetes

1. Build and publish immutable API and Web images using Dockerfile targets.
2. Provision private MongoDB and Redis with TLS/auth and verified backup/restore procedures.
3. Store credentials in `sapling-runtime` via External Secrets or your platform's secret manager.
4. Configure TLS ingress, DNS, `origin`, image tags and health probes.
5. Run `helm template sapling deploy/helm/sapling` and review generated resources before install.
6. Install the chart and verify the web shell, API readiness, task flow, metrics and audit events.
7. Configure monitoring, alert destinations, log aggregation and on-call runbooks.
8. Use staged traffic, deployment health checks, rollback and release-version correlation.

## Incident handling

- **API not ready:** inspect `/health/ready`, Mongo connection, Redis and startup logs. Do not bypass readiness.
- **Elevated 5xx:** inspect request ID / trace context, service error logs and upstream latency.
- **Login failures:** verify origin, CSRF, cookie secure settings, JWT_SECRET, system time and database index.
- **Queue backlog:** inspect worker restarts, Redis availability, failures and DLQ strategy (not yet included).
- **Stale task UI:** 15-second list cache with tenant generation invalidation; inspect Redis availability and mutation logs.

## Observability

Set OTEL_ENABLED=true with a collector endpoint. For sample Prometheus stack, write the METRICS_TOKEN into the ignored `docker/metrics.token` file and use a strong Grafana admin password. See `observability/README.md`.
