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
