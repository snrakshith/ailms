# Observability & SRE

Study in this order; each section contains an independent lesson.

# Prometheus metrics and PromQL

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF08-L01`

## Learning objectives

- Explain the mechanism behind Prometheus metrics and PromQL.
- Implement or demonstrate: Compute request error ratio and design a latency histogram query.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Counters monotonically increase except resets; gauges represent current values; histograms bucket observations. Rates over counter windows support error ratios. Avoid high-cardinality labels such as request IDs.

## Worked example

Calculate 5xx fraction as sum(rate(errors[5m])) / sum(rate(requests[5m])) on consistent counters.

## Common failure mode

Averages obscure tail latency; dividing by zero needs explicit no-traffic handling.

## Implementation snippet

Try the lab before opening the solution.

```bash
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))
```

Executable reference: see lab and solution files.

## Hands-on exercise

Compute request error ratio and design a latency histogram query.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Prometheus metrics and PromQL using the worked scenario.

## Knowledge check

1. Explain the mechanism of Prometheus metrics and PromQL using the worked scenario.
2. What failure should you watch for in Prometheus metrics and PromQL, and how would you detect or prevent it?

## Review resources

- https://prometheus.io/docs/prometheus/latest/querying/basics/

---

# Grafana dashboards and alerting

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF08-L02`

## Learning objectives

- Explain the mechanism behind Grafana dashboards and alerting.
- Implement or demonstrate: Create a RED dashboard for rate, errors and duration with alert annotation.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Dashboards combine query panels with labels, time ranges and drilldowns. Alert rules evaluate signals for duration; route notifications with ownership and action links.

## Worked example

A 5-minute sustained error-rate alert is less noisy than one transient failure.

## Common failure mode

Dashboards are not alert policies; alert on user impact rather than every CPU spike.

## Implementation snippet

```bash
# PromQL: histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Create a RED dashboard for rate, errors and duration with alert annotation.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Grafana dashboards and alerting using the worked scenario.

## Knowledge check

1. Explain the mechanism of Grafana dashboards and alerting using the worked scenario.
2. What failure should you watch for in Grafana dashboards and alerting, and how would you detect or prevent it?

## Review resources

- https://grafana.com/docs/grafana/latest/

---

# ELK and structured logging

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF08-L03`

## Learning objectives

- Explain the mechanism behind ELK and structured logging.
- Implement or demonstrate: Parse synthetic JSON logs and locate error requests by correlation ID.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Elasticsearch indexes events, Logstash transforms/ships data and Kibana queries/visualizes it. Structured JSON logs should include timestamp, severity, service and trace ID; redact personal and secret data.

## Worked example

A 500 error can be connected to a trace ID across services.

## Common failure mode

Do not log authorization headers or unbounded payloads; index retention matters.

## Implementation snippet

Try the lab before opening the solution.

```bash
python -c 'import json; print(json.dumps({"service":"api","level":"ERROR","trace_id":"demo-123"}))'
```

Executable reference: see lab and solution files.

## Hands-on exercise

Parse synthetic JSON logs and locate error requests by correlation ID.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of ELK and structured logging using the worked scenario.

## Knowledge check

1. Explain the mechanism of ELK and structured logging using the worked scenario.
2. What failure should you watch for in ELK and structured logging, and how would you detect or prevent it?

## Review resources

- https://www.elastic.co/guide/index.html

---

# OpenTelemetry and Datadog

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF08-L04`

## Learning objectives

- Explain the mechanism behind OpenTelemetry and Datadog.
- Implement or demonstrate: Draw SDK → collector → backend and configure a local debug exporter.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

OpenTelemetry instrumentation emits vendor-neutral traces, metrics and logs via SDK/collector pipelines. Datadog provides a managed observability platform; exporters and agents route telemetry. Sampling and attributes control cost and privacy.

## Worked example

An inbound span and database child span expose where latency accumulates.

## Common failure mode

Never put secrets in span attributes; avoid baggage with sensitive data.

## Implementation snippet

```bash
# OTLP gRPC receiver on 127.0.0.1:4317; debug exporter in local lab only
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Draw SDK → collector → backend and configure a local debug exporter.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of OpenTelemetry and Datadog using the worked scenario.

## Knowledge check

1. Explain the mechanism of OpenTelemetry and Datadog using the worked scenario.
2. What failure should you watch for in OpenTelemetry and Datadog, and how would you detect or prevent it?

## Review resources

- https://opentelemetry.io/docs/collector/
- https://docs.datadoghq.com/

---

# SLOs, incidents, Jira and PagerDuty

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF08-L05`

## Learning objectives

- Explain the mechanism behind SLOs, incidents, Jira and PagerDuty.
- Implement or demonstrate: Run a tabletop exercise for an API error spike and calculate budget consumption.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

SLI measures service behavior, SLO targets it, error budget is allowed unreliability. PagerDuty routes on-call alerts; Jira tracks incident follow-up. Incident command coordinates mitigation, communication and blameless review.

## Worked example

99.9% monthly success allows 0.1% unsuccessful requests; budget exhaustion can pause risky releases.

## Common failure mode

A severity label without an owner and response procedure is not incident management.

## Implementation snippet

Try the lab before opening the solution.

```bash
# SLI = good_requests / total_requests; burn rate = observed_error_fraction / allowed_error_fraction
```

Executable reference: see lab and solution files.

## Hands-on exercise

Run a tabletop exercise for an API error spike and calculate budget consumption.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of SLOs, incidents, Jira and PagerDuty using the worked scenario.

## Knowledge check

1. Explain the mechanism of SLOs, incidents, Jira and PagerDuty using the worked scenario.
2. What failure should you watch for in SLOs, incidents, Jira and PagerDuty, and how would you detect or prevent it?

## Review resources

- https://sre.google/workbook/alerting-on-slos/
- https://support.pagerduty.com/
- https://support.atlassian.com/jira-software-cloud/
