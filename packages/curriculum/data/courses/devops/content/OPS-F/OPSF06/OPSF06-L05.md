# Debugging, RBAC and network policy

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF06-L05`

## Learning objectives

- Explain the mechanism behind Debugging, RBAC and network policy.
- Implement or demonstrate: Diagnose a forbidden command and reason about allowed traffic in the lab namespace.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Start with desired/current state, events, logs and endpoints. RBAC scopes API verbs/resources; default-deny network policy then explicit allowed flows reduces lateral movement when enforced by CNI.

## Worked example

A 403 means authentication succeeded but authorization denied; inspect role bindings before changing permissions.

## Common failure mode

Do not grant cluster-admin to fix a narrow permission error.

## Implementation snippet

```bash
kubectl auth can-i get pods -n learning
kubectl -n learning logs deployment/learning-api --tail=50
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Diagnose a forbidden command and reason about allowed traffic in the lab namespace.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Debugging, RBAC and network policy using the worked scenario.

## Knowledge check

1. Explain the mechanism of Debugging, RBAC and network policy using the worked scenario.
2. What failure should you watch for in Debugging, RBAC and network policy, and how would you detect or prevent it?

## Review resources

- https://kubernetes.io/docs/reference/access-authn-authz/rbac/
