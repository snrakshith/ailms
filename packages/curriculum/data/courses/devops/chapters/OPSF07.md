# Helm & GitOps

Study in this order; each section contains an independent lesson.

# Helm chart structure and release management

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF07-L01`

## Learning objectives
- Explain the mechanism behind Helm chart structure and release management.
- Implement or demonstrate: Render and lint the starter Helm chart with a verified image digest.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Chart.yaml describes metadata; values.yaml provides defaults; templates render manifests. Validate rendered output, not only templates. Helm releases track revisions; avoid secrets in values.

## Worked example
A wrong selector in a template can make an upgrade impossible or break routing.

## Common failure mode
helm template renders locally but does not prove cluster acceptance.

## Implementation snippet
```bash
helm lint starter-code/helm/learning-api
helm template learning-api starter-code/helm/learning-api -n learning
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Render and lint the starter Helm chart with a verified image digest.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Helm chart structure and release management using the worked scenario.

## Knowledge check
1. Explain the mechanism of Helm chart structure and release management using the worked scenario.
2. What failure should you watch for in Helm chart structure and release management, and how would you detect or prevent it?

## Review resources
- https://helm.sh/docs/


---

# Argo CD reconciliation and GitOps

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF07-L02`

## Learning objectives
- Explain the mechanism behind Argo CD reconciliation and GitOps.
- Implement or demonstrate: Draft an Argo Application with a restricted destination and manual sync.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Git defines desired state; Argo CD compares desired with live resources and synchronizes through Kubernetes API. Automated prune/self-heal have consequences; choose explicitly and use restricted projects.

## Worked example
Manual edits create drift; a reviewed Git revert restores desired state without fighting the controller.

## Common failure mode
CI should not simultaneously apply manifests that GitOps owns.

## Implementation snippet
```bash
argocd app diff learning-api
argocd app get learning-api
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Draft an Argo Application with a restricted destination and manual sync.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Argo CD reconciliation and GitOps using the worked scenario.

## Knowledge check
1. Explain the mechanism of Argo CD reconciliation and GitOps using the worked scenario.
2. What failure should you watch for in Argo CD reconciliation and GitOps, and how would you detect or prevent it?

## Review resources
- https://argo-cd.readthedocs.io/en/stable/
