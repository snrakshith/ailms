# Falco runtime detection

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS06-L01`

## Learning objectives

- Explain the mechanism behind Falco runtime detection.
- Implement or demonstrate: Analyze synthetic Falco events and map alerts to a response runbook.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Falco evaluates event streams such as system calls against rules to detect suspicious runtime behavior. Deploy with documented sensor privileges and route alerts; tune rules to workload behavior.

## Worked example

A shell started inside an application container may be unusual and warrants triage.

## Common failure mode

Runtime detection does not automatically prevent behavior; false positives need context.

## Implementation snippet

```bash
# inspect an installed Falco instance's local alerts
kubectl -n falco logs -l app.kubernetes.io/name=falco --tail=50
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Analyze synthetic Falco events and map alerts to a response runbook.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Falco runtime detection using the worked scenario.

## Knowledge check

1. Explain the mechanism of Falco runtime detection using the worked scenario.
2. What failure should you watch for in Falco runtime detection, and how would you detect or prevent it?

## Review resources

- https://falco.org/docs/
