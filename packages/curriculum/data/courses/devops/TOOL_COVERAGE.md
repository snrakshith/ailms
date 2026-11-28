# Tool coverage by stage

| Stage             | Tools                                                   |
| ----------------- | ------------------------------------------------------- |
| Source            | Git, GitHub                                             |
| CI/CD             | GitHub Actions, Jenkins                                 |
| GitOps            | Argo CD                                                 |
| IaC               | Terraform, optional OpenTofu                            |
| Configuration     | Ansible                                                 |
| Containers        | Docker, Kubernetes, Helm                                |
| Observability     | Prometheus, Grafana, ELK, Datadog, OpenTelemetry        |
| Planning/on-call  | Jira, PagerDuty                                         |
| SAST              | SonarQube, Semgrep, CodeQL, Checkmarx                   |
| SCA               | Snyk, Dependabot, OWASP Dependency-Check                |
| Secret detection  | Gitleaks, TruffleHog                                    |
| Secret management | Vault, AWS Secrets Manager                              |
| Images            | Trivy, Grype                                            |
| IaC security      | Checkov, Trivy misconfiguration scanner (tfsec lineage) |
| DAST              | ZAP, Burp Suite                                         |
| Policy            | OPA, Kyverno                                            |
| Runtime           | Falco                                                   |
| Supply chain      | Syft, Cosign                                            |

A concept lesson and command/example are included for each family, not a fully deployed instance of every product. See guides/INTEGRATION_TEST_PLAN.md for tests that remain to run.
