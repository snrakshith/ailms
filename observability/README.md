# Observability integration

API instrumentation: JSON logs (Pino), W3C trace context, Prometheus HTTP histograms, Node OpenTelemetry auto-instrumentation. Browser instrumentation: Web Vitals + opt-in Sentry DSN. `OTEL_ENABLED=true` activates trace export.

The optional Docker observability stack provisions collector, Tempo, Prometheus and Grafana. Set a strong `METRICS_TOKEN` and create `docker/metrics.token` containing only its value before enabling scrape. Keep the file untracked.

Production logs are emitted to stdout for a platform log shipper (e.g. Alloy/Fluent Bit -> Loki). A log-shipper deployment and pager/alert destination are environment-specific and not preconfigured. Grafana dashboards and alerting require production-specific sources and credential management.

## Optional Compose profile

From the repository root, with `GRAFANA_ADMIN_PASSWORD` exported and `docker/metrics.token` created, run:

```bash
docker compose -f docker/compose.yaml -f observability/compose.observability.yaml up --build -d
```

This enables OTEL exporter on the API service and starts Tempo, Prometheus and Grafana on loopback ports. View the Sapling HTTP dashboard in Grafana at http://localhost:3000. For a real rollout, use non-default credentials and TLS, bind collection endpoints only on trusted networks, and configure log shipping separately.
