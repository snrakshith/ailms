# Kubernetes — quick reference

## Cluster architecture and workloads

API server validates resources, controllers reconcile desired state, scheduler selects nodes and kubelet manages pods. Deployments own ReplicaSets and replaceable Pods. StatefulSets provide stable identities, Jobs run finite work.

**Watch for:** A Pod IP is ephemeral; route clients through Services.

## Services, ingress and DNS

ClusterIP exposes stable service discovery; selectors map Services to EndpointSlices. Ingress or Gateway API requires an implementation to route external traffic. Network policy requires a supporting CNI.

**Watch for:** An Ingress resource without a controller does not route traffic.

## ConfigMap, Secret, storage and resources

ConfigMaps hold nonsecret settings; Secrets require encryption at rest, RBAC and careful delivery, as base64 is not encryption. Requests inform scheduling; limits constrain consumption. PersistentVolumeClaims request durable storage.

**Watch for:** Secrets in Git are exposed even when base64 encoded.

## Health probes, scaling and rolling releases

Startup protects slow initialization; readiness controls eligibility for service traffic; liveness restarts unhealthy containers. HPA adjusts replicas based on metrics, assuming suitable requests/metrics. PDB limits voluntary disruptions.

**Watch for:** Using the same dependency-sensitive liveness and readiness can create restart storms.

## Debugging, RBAC and network policy

Start with desired/current state, events, logs and endpoints. RBAC scopes API verbs/resources; default-deny network policy then explicit allowed flows reduces lateral movement when enforced by CNI.

**Watch for:** Do not grant cluster-admin to fix a narrow permission error.
