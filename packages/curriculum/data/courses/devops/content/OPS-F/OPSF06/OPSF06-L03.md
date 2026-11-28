# ConfigMap, Secret, storage and resources

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF06-L03`

## Learning objectives
- Explain the mechanism behind ConfigMap, Secret, storage and resources.
- Implement or demonstrate: Review a Pod manifest for resource requests, secret refs and storage choices.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
ConfigMaps hold nonsecret settings; Secrets require encryption at rest, RBAC and careful delivery, as base64 is not encryption. Requests inform scheduling; limits constrain consumption. PersistentVolumeClaims request durable storage.

## Worked example
A Pod pending due to excessive requests differs from an OOMKilled process exceeding its memory limit.

## Common failure mode
Secrets in Git are exposed even when base64 encoded.

## Implementation snippet
```bash
kubectl -n learning describe pod POD_NAME
kubectl -n learning get events --sort-by=.metadata.creationTimestamp
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Review a Pod manifest for resource requests, secret refs and storage choices.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of ConfigMap, Secret, storage and resources using the worked scenario.

## Knowledge check
1. Explain the mechanism of ConfigMap, Secret, storage and resources using the worked scenario.
2. What failure should you watch for in ConfigMap, Secret, storage and resources, and how would you detect or prevent it?

## Review resources
- https://kubernetes.io/docs/concepts/configuration/
