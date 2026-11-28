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
