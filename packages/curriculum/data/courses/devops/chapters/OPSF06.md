# Kubernetes

Study in this order; each section contains an independent lesson.

# Cluster architecture and workloads

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF06-L01`

## Learning objectives
- Explain the mechanism behind Cluster architecture and workloads.
- Implement or demonstrate: Create a disposable kind cluster and deploy the example workload.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
API server validates resources, controllers reconcile desired state, scheduler selects nodes and kubelet manages pods. Deployments own ReplicaSets and replaceable Pods. StatefulSets provide stable identities, Jobs run finite work.

## Worked example
Deleting a Deployment-managed Pod causes a controller to create a replacement.

## Common failure mode
A Pod IP is ephemeral; route clients through Services.

## Implementation snippet
```bash
kubectl -n learning get deployments,pods
kubectl -n learning rollout status deployment/learning-api
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Create a disposable kind cluster and deploy the example workload.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Cluster architecture and workloads using the worked scenario.

## Knowledge check
1. Explain the mechanism of Cluster architecture and workloads using the worked scenario.
2. What failure should you watch for in Cluster architecture and workloads, and how would you detect or prevent it?

## Review resources
- https://kubernetes.io/docs/concepts/architecture/


---

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


---

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


---

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


---

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
