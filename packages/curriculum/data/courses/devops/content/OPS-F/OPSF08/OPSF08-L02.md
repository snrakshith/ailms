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
