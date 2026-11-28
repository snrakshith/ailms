# External integration test plan

All checks below are pending environment execution. Record CLI version, digest/checksum, test date, expected result, actual result, evidence path and owner.

| Component                           | Required validation                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| GitHub Actions / Jenkins            | Successful run and intentional failure; no privileged secrets in PR; pinned actions; job artifact lineage |
| Docker/Compose                      | Build verified digest, nonroot, readonly, local health, cleanup                                           |
| Terraform/OpenTofu/Ansible          | fmt, validate, reviewed local plan, idempotent second run; no cloud apply by default                      |
| Kubernetes/Helm/Argo                | Render, server dry-run, selector and readiness, drift and Git revert, scope RBAC and policy               |
| Prometheus/Grafana/ELK/OTel/Datadog | Synthetic telemetry, dashboard, alert, correlation, redaction, cost controls                              |
| Jira/PagerDuty                      | Authorized test alert route, incident ticket, acknowledgment and closure                                  |
| Semgrep/CodeQL/SonarQube/Checkmarx  | Seeded issue detected, fix verified, scanner failure blocks configured gate                               |
| Snyk/Dependabot/Dependency-Check    | Synthetic or approved vulnerable dependency, upgrade, clean report                                        |
| Gitleaks/TruffleHog                 | Fake training rule, redacted output; no real credentials; verification disabled where applicable          |
| Vault/AWS Secrets Manager           | Scoped identity, metadata check, sandbox rotation and expiry                                              |
| Trivy/Grype/Checkov                 | Pinned binaries and DB age; scan exact target; exit code and report validation                            |
| ZAP/Burp                            | Authorized local target only, passive baseline, scope, report and remediation                             |
| OPA/Kyverno/Falco                   | Allow/deny policy tests, namespace restriction, audit vs enforce, synthetic runtime alert triage          |
| Syft/Cosign                         | SBOM digest linkage, verify exact signing identity, reject wrong artifact/issuer                          |

Independent review must check references and version-specific flags. A passing offline model is not evidence of tool integration.
