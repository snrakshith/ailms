# Health probes, scaling and rolling releases

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF06-L04`

## Learning objectives
- Explain the mechanism behind Health probes, scaling and rolling releases.
- Implement or demonstrate: Add distinct health probes and inspect rolling update behavior.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Startup protects slow initialization; readiness controls eligibility for service traffic; liveness restarts unhealthy containers. HPA adjusts replicas based on metrics, assuming suitable requests/metrics. PDB limits voluntary disruptions.

## Worked example
A database outage may cause readiness to fail without requiring every app process to restart.

## Common failure mode
Using the same dependency-sensitive liveness and readiness can create restart storms.

## Implementation snippet
Try the lab before opening the solution.

```bash
kubectl -n learning rollout history deployment/learning-api
kubectl -n learning rollout status deployment/learning-api
```

Executable reference: see lab and solution files.

## Hands-on exercise
Add distinct health probes and inspect rolling update behavior.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Health probes, scaling and rolling releases using the worked scenario.

## Knowledge check
1. Explain the mechanism of Health probes, scaling and rolling releases using the worked scenario.
2. What failure should you watch for in Health probes, scaling and rolling releases, and how would you detect or prevent it?

## Review resources
- https://kubernetes.io/docs/concepts/workloads/pods/probes/
