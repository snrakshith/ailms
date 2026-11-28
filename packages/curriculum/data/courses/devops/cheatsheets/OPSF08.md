# Observability & SRE — quick reference

## Prometheus metrics and PromQL

Counters monotonically increase except resets; gauges represent current values; histograms bucket observations. Rates over counter windows support error ratios. Avoid high-cardinality labels such as request IDs.

**Watch for:** Averages obscure tail latency; dividing by zero needs explicit no-traffic handling.

## Grafana dashboards and alerting

Dashboards combine query panels with labels, time ranges and drilldowns. Alert rules evaluate signals for duration; route notifications with ownership and action links.

**Watch for:** Dashboards are not alert policies; alert on user impact rather than every CPU spike.

## ELK and structured logging

Elasticsearch indexes events, Logstash transforms/ships data and Kibana queries/visualizes it. Structured JSON logs should include timestamp, severity, service and trace ID; redact personal and secret data.

**Watch for:** Do not log authorization headers or unbounded payloads; index retention matters.

## OpenTelemetry and Datadog

OpenTelemetry instrumentation emits vendor-neutral traces, metrics and logs via SDK/collector pipelines. Datadog provides a managed observability platform; exporters and agents route telemetry. Sampling and attributes control cost and privacy.

**Watch for:** Never put secrets in span attributes; avoid baggage with sensitive data.

## SLOs, incidents, Jira and PagerDuty

SLI measures service behavior, SLO targets it, error budget is allowed unreliability. PagerDuty routes on-call alerts; Jira tracks incident follow-up. Incident command coordinates mitigation, communication and blameless review.

**Watch for:** A severity label without an owner and response procedure is not incident management.
