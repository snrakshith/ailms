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
