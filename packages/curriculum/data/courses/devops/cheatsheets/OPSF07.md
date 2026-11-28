# Helm & GitOps — quick reference

## Helm chart structure and release management

Chart.yaml describes metadata; values.yaml provides defaults; templates render manifests. Validate rendered output, not only templates. Helm releases track revisions; avoid secrets in values.

**Watch for:** helm template renders locally but does not prove cluster acceptance.

## Argo CD reconciliation and GitOps

Git defines desired state; Argo CD compares desired with live resources and synchronizes through Kubernetes API. Automated prune/self-heal have consequences; choose explicitly and use restricted projects.

**Watch for:** CI should not simultaneously apply manifests that GitOps owns.
