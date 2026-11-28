# Services, ingress and DNS

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF06-L02`

## Learning objectives

- Explain the mechanism behind Services, ingress and DNS.
- Implement or demonstrate: Diagnose a mismatched service selector using labels and EndpointSlices.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

ClusterIP exposes stable service discovery; selectors map Services to EndpointSlices. Ingress or Gateway API requires an implementation to route external traffic. Network policy requires a supporting CNI.

## Worked example

A service with no matching selector has no ready endpoints even if pods are healthy.

## Common failure mode

An Ingress resource without a controller does not route traffic.

## Implementation snippet

```bash
kubectl -n learning get svc,endpointslices
kubectl -n learning get pods --show-labels
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Diagnose a mismatched service selector using labels and EndpointSlices.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Services, ingress and DNS using the worked scenario.

## Knowledge check

1. Explain the mechanism of Services, ingress and DNS using the worked scenario.
2. What failure should you watch for in Services, ingress and DNS, and how would you detect or prevent it?

## Review resources

- https://kubernetes.io/docs/concepts/services-networking/service/
