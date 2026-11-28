# Kyverno Kubernetes admission policies

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS05-L03`

## Learning objectives

- Explain the mechanism behind Kyverno Kubernetes admission policies.
- Implement or demonstrate: Apply the lab policy to a disposable namespace and observe safe/unsafe outcomes.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Kyverno validates, mutates, generates and verifies Kubernetes resources with Kubernetes-native policies. Start in Audit where appropriate, inspect reports then enforce with explicit exceptions.

## Worked example

A policy rejects Pods without runAsNonRoot in a controlled namespace.

## Common failure mode

A broad cluster-wide enforce rollout can break system workloads; scope and test before enforcement.

## Implementation snippet

```bash
kyverno apply starter-code/policy/kyverno.yaml --resource starter-code/k8s/deployment.yaml
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Apply the lab policy to a disposable namespace and observe safe/unsafe outcomes.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Kyverno Kubernetes admission policies using the worked scenario.

## Knowledge check

1. Explain the mechanism of Kyverno Kubernetes admission policies using the worked scenario.
2. What failure should you watch for in Kyverno Kubernetes admission policies, and how would you detect or prevent it?

## Review resources

- https://kyverno.io/docs/
