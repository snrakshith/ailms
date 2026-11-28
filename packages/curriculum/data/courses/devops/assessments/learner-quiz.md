# Learner question bank

### OPSF01-L01-Q1

Explain the mechanism of Processes, files and permissions using the worked scenario.

### OPSF01-L01-Q2

What failure should you watch for in Processes, files and permissions, and how would you detect or prevent it?

### OPSF01-L01-Q3

For this scenario, which response is technically appropriate: A service cannot read a config with mode 600 owned by another account. Check identity and path permissions before changing modes.

- Use mktemp, chmod 600 and stat; delete only the created temp directory.
- chmod 777 hides the root cause and broadens access.
- Skip verification and accept the initial result.

### OPSF01-L02-Q1

Explain the mechanism of Shell scripting and automation using the worked scenario.

### OPSF01-L02-Q2

What failure should you watch for in Shell scripting and automation, and how would you detect or prevent it?

### OPSF01-L02-Q3

For this scenario, which response is technically appropriate: A build piped through tee can appear successful when the build failed; pipefail preserves the failed pipeline status.

- Skip verification and accept the initial result.
- Use explicit argument checks and return nonzero on invalid input; test both branches.
- set -e does not replace explicit checks and has exceptions in conditional contexts.

### OPSF01-L03-Q1

Explain the mechanism of Networking, DNS, HTTP and TLS using the worked scenario.

### OPSF01-L03-Q2

What failure should you watch for in Networking, DNS, HTTP and TLS, and how would you detect or prevent it?

### OPSF01-L03-Q3

For this scenario, which response is technically appropriate: A 502 from a proxy indicates it answered HTTP, unlike a DNS failure or TCP timeout.

- Do not disable certificate verification to fix trust errors.
- Skip verification and accept the initial result.
- Start python http.server on loopback in one terminal; inspect headers from another; stop the server afterwards.

### OPSF02-L01-Q1

Explain the mechanism of Git branching, commits and recovery using the worked scenario.

### OPSF02-L01-Q2

What failure should you watch for in Git branching, commits and recovery, and how would you detect or prevent it?

### OPSF02-L01-Q3

For this scenario, which response is technically appropriate: A faulty shared commit should usually be reverted, not force-pushed away.

- Commit a baseline, commit a change, then git revert HEAD and verify file state.
- Avoid destructive reset on shared branches or unsaved working trees.
- Skip verification and accept the initial result.

### OPSF02-L02-Q1

Explain the mechanism of GitHub pull requests and governance using the worked scenario.

### OPSF02-L02-Q2

What failure should you watch for in GitHub pull requests and governance, and how would you detect or prevent it?

### OPSF02-L02-Q3

For this scenario, which response is technically appropriate: A developer skips a pre-commit hook, but required CI still blocks a failing change.

- Skip verification and accept the initial result.
- Require PR, one approval and successful CI; verify a failed check blocks merge.
- Do not allow unreviewed workflows or broad write access to protected branches.

### OPSF03-L01-Q1

Explain the mechanism of CI/CD fundamentals and release strategies using the worked scenario.

### OPSF03-L01-Q2

What failure should you watch for in CI/CD fundamentals and release strategies, and how would you detect or prevent it?

### OPSF03-L01-Q3

For this scenario, which response is technically appropriate: A candidate receives 5% of traffic; compare error rates and latency against baseline before promotion.

- Rebuilding per environment can change dependencies and invalidate earlier evidence.
- Skip verification and accept the initial result.
- Require passing gates; promote a digest; roll back to a known-good digest if health thresholds fail.

### OPSF03-L02-Q1

Explain the mechanism of GitHub Actions workflows using the worked scenario.

### OPSF03-L02-Q2

What failure should you watch for in GitHub Actions workflows, and how would you detect or prevent it?

### OPSF03-L02-Q3

For this scenario, which response is technically appropriate: Run tests on pull_request with read-only token and no production secrets. Deployment runs from approved main commits.

- Use the provided workflow template, fill verified SHA and require the CI status check.
- Mutable action tags and privileged pull_request_target can expose secrets to untrusted code.
- Skip verification and accept the initial result.

### OPSF03-L03-Q1

Explain the mechanism of Jenkins declarative pipeline using the worked scenario.

### OPSF03-L03-Q2

What failure should you watch for in Jenkins declarative pipeline, and how would you detect or prevent it?

### OPSF03-L03-Q3

For this scenario, which response is technically appropriate: A controller should orchestrate rather than execute arbitrary PR builds on itself.

- Skip verification and accept the initial result.
- Use pipeline agent label for a trusted lab runner, sh tests, archiveArtifacts only on success.
- Printing secrets or reusing a workspace across trust levels leaks data.

### OPSF03-L04-Q1

Explain the mechanism of Artifacts, caching and dependency locking using the worked scenario.

### OPSF03-L04-Q2

What failure should you watch for in Artifacts, caching and dependency locking, and how would you detect or prevent it?

### OPSF03-L04-Q3

For this scenario, which response is technically appropriate: A PR cache poisoned with a malicious binary must never be consumed by a privileged release job.

- A branch-name tag is not immutable and cached dependencies are not release evidence.
- Skip verification and accept the initial result.
- Generate a SHA-256 manifest and verify it before promotion; intentionally change a copy to confirm rejection.

### OPSF04-L01-Q1

Explain the mechanism of Docker images and containers using the worked scenario.

### OPSF04-L01-Q2

What failure should you watch for in Docker images and containers, and how would you detect or prevent it?

### OPSF04-L01-Q3

For this scenario, which response is technically appropriate: A Python service can run from an image with only application files and runtime dependencies.

- Pin the verified base digest, build with docker build, run with --read-only and verify /health.
- A container is not a VM-level security boundary; never bake secrets into layers.
- Skip verification and accept the initial result.

### OPSF04-L02-Q1

Explain the mechanism of Container networking, volumes and Compose using the worked scenario.

### OPSF04-L02-Q2

What failure should you watch for in Container networking, volumes and Compose, and how would you detect or prevent it?

### OPSF04-L02-Q3

For this scenario, which response is technically appropriate: An app inside a container reaches another service by its Compose service name, not localhost.

- Skip verification and accept the initial result.
- Use the starter compose.yaml and docker compose config before up; remove lab containers with down.
- depends_on alone does not guarantee readiness; publishing all ports broadens exposure.

### OPSF05-L01-Q1

Explain the mechanism of AWS IAM, networking and compute using the worked scenario.

### OPSF05-L01-Q2

What failure should you watch for in AWS IAM, networking and compute, and how would you detect or prevent it?

### OPSF05-L01-Q3

For this scenario, which response is technically appropriate: An ALB in public subnets can forward to private EC2 or EKS workloads without public workload IPs.

- An unrestricted SSH rule and static access keys are avoidable risk.
- Skip verification and accept the initial result.
- Draw route tables, security group flows, NAT or endpoints, health checks, budget and cleanup plan; no apply needed.

### OPSF05-L02-Q1

Explain the mechanism of Terraform configuration and lifecycle using the worked scenario.

### OPSF05-L02-Q2

What failure should you watch for in Terraform configuration and lifecycle, and how would you detect or prevent it?

### OPSF05-L02-Q3

For this scenario, which response is technically appropriate: A local terraform_data resource can demonstrate plan and apply without cloud charges.

- Use only terraform_data, review plan, apply explicit plan in sandbox and clean up.
- A plan can contain sensitive values; do not upload it publicly.
- Skip verification and accept the initial result.

### OPSF05-L03-Q1

Explain the mechanism of Terraform modules, state and environments using the worked scenario.

### OPSF05-L03-Q2

What failure should you watch for in Terraform modules, state and environments, and how would you detect or prevent it?

### OPSF05-L03-Q3

For this scenario, which response is technically appropriate: Moving a resource into a module without a moved block may propose replacement.

- Skip verification and accept the initial result.
- Use variable validation, pin provider constraints and commit dependency lock file; test a local plan.
- Do not commit state, plans or credentials; sensitive output masks display but not state contents.

### OPSF05-L04-Q1

Explain the mechanism of Ansible configuration management using the worked scenario.

### OPSF05-L04-Q2

What failure should you watch for in Ansible configuration management, and how would you detect or prevent it?

### OPSF05-L04-Q3

For this scenario, which response is technically appropriate: The copy module ensures file content and mode, unlike repeatedly appending shell output.

- Check mode is not a guarantee for every module; avoid ad hoc shell where a module exists.
- Skip verification and accept the initial result.
- Use ansible.builtin.copy with explicit path and mode; second run should report no changes.

### OPSF06-L01-Q1

Explain the mechanism of Cluster architecture and workloads using the worked scenario.

### OPSF06-L01-Q2

What failure should you watch for in Cluster architecture and workloads, and how would you detect or prevent it?

### OPSF06-L01-Q3

For this scenario, which response is technically appropriate: Deleting a Deployment-managed Pod causes a controller to create a replacement.

- Confirm Deployment available, desired replicas and replacement after deleting only its lab Pod.
- A Pod IP is ephemeral; route clients through Services.
- Skip verification and accept the initial result.

### OPSF06-L02-Q1

Explain the mechanism of Services, ingress and DNS using the worked scenario.

### OPSF06-L02-Q2

What failure should you watch for in Services, ingress and DNS, and how would you detect or prevent it?

### OPSF06-L02-Q3

For this scenario, which response is technically appropriate: A service with no matching selector has no ready endpoints even if pods are healthy.

- Skip verification and accept the initial result.
- Compare pod labels with selector, fix in source manifests and verify endpoints.
- An Ingress resource without a controller does not route traffic.

### OPSF06-L03-Q1

Explain the mechanism of ConfigMap, Secret, storage and resources using the worked scenario.

### OPSF06-L03-Q2

What failure should you watch for in ConfigMap, Secret, storage and resources, and how would you detect or prevent it?

### OPSF06-L03-Q3

For this scenario, which response is technically appropriate: A Pod pending due to excessive requests differs from an OOMKilled process exceeding its memory limit.

- Secrets in Git are exposed even when base64 encoded.
- Skip verification and accept the initial result.
- Set explicit requests/limits, avoid plaintext secret manifests, and choose storage class only when persistence required.

### OPSF06-L04-Q1

Explain the mechanism of Health probes, scaling and rolling releases using the worked scenario.

### OPSF06-L04-Q2

What failure should you watch for in Health probes, scaling and rolling releases, and how would you detect or prevent it?

### OPSF06-L04-Q3

For this scenario, which response is technically appropriate: A database outage may cause readiness to fail without requiring every app process to restart.

- Validate rollout, verify readiness removes a failed pod from service, and restore last known good manifest.
- Using the same dependency-sensitive liveness and readiness can create restart storms.
- Skip verification and accept the initial result.

### OPSF06-L05-Q1

Explain the mechanism of Debugging, RBAC and network policy using the worked scenario.

### OPSF06-L05-Q2

What failure should you watch for in Debugging, RBAC and network policy, and how would you detect or prevent it?

### OPSF06-L05-Q3

For this scenario, which response is technically appropriate: A 403 means authentication succeeded but authorization denied; inspect role bindings before changing permissions.

- Skip verification and accept the initial result.
- Use auth can-i, inspect RoleBinding and allow only required verb/resource; confirm both allow and deny cases.
- Do not grant cluster-admin to fix a narrow permission error.

### OPSF07-L01-Q1

Explain the mechanism of Helm chart structure and release management using the worked scenario.

### OPSF07-L01-Q2

What failure should you watch for in Helm chart structure and release management, and how would you detect or prevent it?

### OPSF07-L01-Q3

For this scenario, which response is technically appropriate: A wrong selector in a template can make an upgrade impossible or break routing.

- helm template renders locally but does not prove cluster acceptance.
- Skip verification and accept the initial result.
- Use helm lint/template, review manifests, server dry-run in sandbox and optionally upgrade --install.

### OPSF07-L02-Q1

Explain the mechanism of Argo CD reconciliation and GitOps using the worked scenario.

### OPSF07-L02-Q2

What failure should you watch for in Argo CD reconciliation and GitOps, and how would you detect or prevent it?

### OPSF07-L02-Q3

For this scenario, which response is technically appropriate: Manual edits create drift; a reviewed Git revert restores desired state without fighting the controller.

- Replace repository/path placeholders, review diff, sync in sandbox and observe drift; revert Git for rollback.
- CI should not simultaneously apply manifests that GitOps owns.
- Skip verification and accept the initial result.

### OPSF08-L01-Q1

Explain the mechanism of Prometheus metrics and PromQL using the worked scenario.

### OPSF08-L01-Q2

What failure should you watch for in Prometheus metrics and PromQL, and how would you detect or prevent it?

### OPSF08-L01-Q3

For this scenario, which response is technically appropriate: Calculate 5xx fraction as sum(rate(errors[5m])) / sum(rate(requests[5m])) on consistent counters.

- Skip verification and accept the initial result.
- Use rate on counters, sum by service if needed and define no-data behavior.
- Averages obscure tail latency; dividing by zero needs explicit no-traffic handling.

### OPSF08-L02-Q1

Explain the mechanism of Grafana dashboards and alerting using the worked scenario.

### OPSF08-L02-Q2

What failure should you watch for in Grafana dashboards and alerting, and how would you detect or prevent it?

### OPSF08-L02-Q3

For this scenario, which response is technically appropriate: A 5-minute sustained error-rate alert is less noisy than one transient failure.

- Dashboards are not alert policies; alert on user impact rather than every CPU spike.
- Skip verification and accept the initial result.
- Add links to runbook, deployment version and trace/log correlation; test a synthetic breach.

### OPSF08-L03-Q1

Explain the mechanism of ELK and structured logging using the worked scenario.

### OPSF08-L03-Q2

What failure should you watch for in ELK and structured logging, and how would you detect or prevent it?

### OPSF08-L03-Q3

For this scenario, which response is technically appropriate: A 500 error can be connected to a trace ID across services.

- Filter severity ERROR, group by service and use trace ID to correlate sanitized records.
- Do not log authorization headers or unbounded payloads; index retention matters.
- Skip verification and accept the initial result.

### OPSF08-L04-Q1

Explain the mechanism of OpenTelemetry and Datadog using the worked scenario.

### OPSF08-L04-Q2

What failure should you watch for in OpenTelemetry and Datadog, and how would you detect or prevent it?

### OPSF08-L04-Q3

For this scenario, which response is technically appropriate: An inbound span and database child span expose where latency accumulates.

- Skip verification and accept the initial result.
- Use starter collector YAML with loopback receiver; validate with chosen pinned collector and inspect sanitized spans.
- Never put secrets in span attributes; avoid baggage with sensitive data.

### OPSF08-L05-Q1

Explain the mechanism of SLOs, incidents, Jira and PagerDuty using the worked scenario.

### OPSF08-L05-Q2

What failure should you watch for in SLOs, incidents, Jira and PagerDuty, and how would you detect or prevent it?

### OPSF08-L05-Q3

For this scenario, which response is technically appropriate: 99.9% monthly success allows 0.1% unsuccessful requests; budget exhaustion can pause risky releases.

- A severity label without an owner and response procedure is not incident management.
- Skip verification and accept the initial result.
- Declare incident, assign commander, mitigate via rollback, update timeline and file action items with owners/dates.

### OPSS01-L01-Q1

Explain the mechanism of Threat modeling and secure pipeline design using the worked scenario.

### OPSS01-L01-Q2

What failure should you watch for in Threat modeling and secure pipeline design, and how would you detect or prevent it?

### OPSS01-L01-Q3

For this scenario, which response is technically appropriate: A fork PR can run hostile code; it must not receive deployment credentials.

- Mark trust boundaries, secrets, artifact identities and attack paths; add prevention/detection/recovery controls.
- Passing scans cannot establish absence of vulnerabilities.
- Skip verification and accept the initial result.

### OPSS01-L02-Q1

Explain the mechanism of Hooks, Husky, linting and local feedback using the worked scenario.

### OPSS01-L02-Q2

What failure should you watch for in Hooks, Husky, linting and local feedback, and how would you detect or prevent it?

### OPSS01-L02-Q3

For this scenario, which response is technically appropriate: A staged file with formatting errors is fixed before commit; CI independently enforces the same standard.

- Skip verification and accept the initial result.
- Set a hook to run lint/tests for a local repository; verify CI fails when skipped.
- Do not store secrets in hook configs or assume hooks are mandatory security gates.

### OPSS02-L01-Q1

Explain the mechanism of Semgrep and rule-based SAST using the worked scenario.

### OPSS02-L01-Q2

What failure should you watch for in Semgrep and rule-based SAST, and how would you detect or prevent it?

### OPSS02-L01-Q3

For this scenario, which response is technically appropriate: A rule detects unsafe string concatenation in query construction; parameter binding is the fix.

- Scanning only changed files misses contextual findings; do periodic full scans.
- Skip verification and accept the initial result.
- Use the supplied rule and fixture; require nonzero exit on findings and rerun after parameterization.

### OPSS02-L02-Q1

Explain the mechanism of CodeQL, SonarQube and Checkmarx using the worked scenario.

### OPSS02-L02-Q2

What failure should you watch for in CodeQL, SonarQube and Checkmarx, and how would you detect or prevent it?

### OPSS02-L02-Q3

For this scenario, which response is technically appropriate: A tainted request parameter reaches an unsafe sink; triage by reachability and validate the fix.

- Configure CodeQL for supported language and build mode or use approved SonarQube/Checkmarx environment; normalize findings by rule/location.
- A green quality gate does not replace review or threat modeling.
- Skip verification and accept the initial result.

### OPSS03-L01-Q1

Explain the mechanism of SCA: Snyk, Dependabot and OWASP Dependency-Check using the worked scenario.

### OPSS03-L01-Q2

What failure should you watch for in SCA: Snyk, Dependabot and OWASP Dependency-Check, and how would you detect or prevent it?

### OPSS03-L01-Q3

For this scenario, which response is technically appropriate: A vulnerable transitive library can require updating the parent dependency or constrained override.

- Skip verification and accept the initial result.
- Document affected component, version, severity, exposure, fix, owner and expiration of accepted risk.
- CVSS alone ignores reachability, exposure and available fix; avoid permanent blanket ignores.

### OPSS03-L02-Q1

Explain the mechanism of Gitleaks and TruffleHog secrets detection using the worked scenario.

### OPSS03-L02-Q2

What failure should you watch for in Gitleaks and TruffleHog secrets detection, and how would you detect or prevent it?

### OPSS03-L02-Q3

For this scenario, which response is technically appropriate: A fake fixture matches a training rule, demonstrating detection without real credentials.

- Deleting a secret from the latest commit does not revoke it or remove older copies.
- Skip verification and accept the initial result.
- Use the synthetic Gitleaks config; never create real leaked keys. For TruffleHog disable verification in local practice.

### OPSS03-L03-Q1

Explain the mechanism of Vault and AWS Secrets Manager using the worked scenario.

### OPSS03-L03-Q2

What failure should you watch for in Vault and AWS Secrets Manager, and how would you detect or prevent it?

### OPSS03-L03-Q3

For this scenario, which response is technically appropriate: A compromised static password is replaced by a short-lived credential or rotated version with controlled rollout.

- Design IAM/role permissions for one secret, rotation schedule, audit and fallback plan; do not retrieve production secrets.
- Do not log secret values or store them in Terraform state/CI artifacts.
- Skip verification and accept the initial result.

### OPSS04-L01-Q1

Explain the mechanism of Trivy and Grype image scanning using the worked scenario.

### OPSS04-L01-Q2

What failure should you watch for in Trivy and Grype image scanning, and how would you detect or prevent it?

### OPSS04-L01-Q3

For this scenario, which response is technically appropriate: An image tagged latest may resolve differently between scan and deployment; digest binds evidence to artifact.

- Skip verification and accept the initial result.
- Record DB age and scan target; block according to approved severity policy; rescan after rebuilding with patched base.
- Scanner exit defaults can be zero on findings; explicitly configure gate and handle tool errors.

### OPSS04-L02-Q1

Explain the mechanism of Checkov and Trivy infrastructure scanning using the worked scenario.

### OPSS04-L02-Q2

What failure should you watch for in Checkov and Trivy infrastructure scanning, and how would you detect or prevent it?

### OPSS04-L02-Q3

For this scenario, which response is technically appropriate: A storage resource marked public or a privileged container is identified before deployment.

- Scanning source alone can miss dynamic values; evaluate plan/rendered manifests as appropriate and protect sensitive plans.
- Skip verification and accept the initial result.
- Use checkov -d and trivy config on lab files; compare rules, document justified exceptions with expiry.

### OPSS05-L01-Q1

Explain the mechanism of OWASP ZAP and Burp Suite DAST using the worked scenario.

### OPSS05-L01-Q2

What failure should you watch for in OWASP ZAP and Burp Suite DAST, and how would you detect or prevent it?

### OPSS05-L01-Q3

For this scenario, which response is technically appropriate: Missing security headers can be found via passive analysis; authenticated checks need test users and scoped sessions.

- Review scope, exclude destructive routes, use pinned ZAP image, capture report and verify fixes; inspect local requests in Burp proxy.
- Do not point scanners at production or public third-party hosts without authorization.
- Skip verification and accept the initial result.

### OPSS05-L02-Q1

Explain the mechanism of OPA and Rego policy as code using the worked scenario.

### OPSS05-L02-Q2

What failure should you watch for in OPA and Rego policy as code, and how would you detect or prevent it?

### OPSS05-L02-Q3

For this scenario, which response is technically appropriate: A deployment manifest requesting privileged=true violates an organization rule.

- Skip verification and accept the initial result.
- Use starter Rego v1 policy, opa test and explicit gate on a nonempty deny set.
- A missing field can yield undefined instead of true/false; define defaults and test shape errors.

### OPSS05-L03-Q1

Explain the mechanism of Kyverno Kubernetes admission policies using the worked scenario.

### OPSS05-L03-Q2

What failure should you watch for in Kyverno Kubernetes admission policies, and how would you detect or prevent it?

### OPSS05-L03-Q3

For this scenario, which response is technically appropriate: A policy rejects Pods without runAsNonRoot in a controlled namespace.

- A broad cluster-wide enforce rollout can break system workloads; scope and test before enforcement.
- Skip verification and accept the initial result.
- Run policy CLI test or sandbox admission; confirm only intended resources are denied.

### OPSS06-L01-Q1

Explain the mechanism of Falco runtime detection using the worked scenario.

### OPSS06-L01-Q2

What failure should you watch for in Falco runtime detection, and how would you detect or prevent it?

### OPSS06-L01-Q3

For this scenario, which response is technically appropriate: A shell started inside an application container may be unusual and warrants triage.

- Verify workload identity, compare expected behavior, contain only authorized sandbox workload if required, preserve evidence.
- Runtime detection does not automatically prevent behavior; false positives need context.
- Skip verification and accept the initial result.

### OPSS06-L02-Q1

Explain the mechanism of Syft SBOM and dependency inventory using the worked scenario.

### OPSS06-L02-Q2

What failure should you watch for in Syft SBOM and dependency inventory, and how would you detect or prevent it?

### OPSS06-L02-Q3

For this scenario, which response is technically appropriate: A newly disclosed CVE can be mapped to a stored SBOM without rebuilding the image.

- Skip verification and accept the initial result.
- Use Syft, archive JSON and digest, then feed SBOM to Grype for vulnerability analysis.
- SBOM completeness depends on package recognition; do not claim it proves absence of dependencies.

### OPSS06-L03-Q1

Explain the mechanism of Cosign signing, verification and provenance using the worked scenario.

### OPSS06-L03-Q2

What failure should you watch for in Cosign signing, verification and provenance, and how would you detect or prevent it?

### OPSS06-L03-Q3

For this scenario, which response is technically appropriate: An image signed by an unrelated identity is not acceptable even if signature cryptographically valid.

- Do not verify with broad identity regex or mutable tags; signature alone does not assert vulnerability-free.
- Skip verification and accept the initial result.
- Use sandbox registry and approved keyless CI identity or managed key. Verify exact expected issuer and identity before deploy.

### OPSS06-L04-Q1

Explain the mechanism of Secure scanners, CI identities and exceptions using the worked scenario.

### OPSS06-L04-Q2

What failure should you watch for in Secure scanners, CI identities and exceptions, and how would you detect or prevent it?

### OPSS06-L04-Q3

For this scenario, which response is technically appropriate: A compromised scanner can exfiltrate CI secrets; run untrusted scanning without deployment credentials and isolate permissions.

- Use supplied offline gate script; test missing evidence, failed scan and expired exception cases.
- A pinned malicious version is still malicious; review provenance and advisories, rotate when compromised.
- Skip verification and accept the initial result.

### OPSP01-L01-Q1

Explain the mechanism of Disaster recovery, backup and rollback using the worked scenario.

### OPSP01-L01-Q2

What failure should you watch for in Disaster recovery, backup and rollback, and how would you detect or prevent it?

### OPSP01-L01-Q3

For this scenario, which response is technically appropriate: A deployment rolls back but destructive schema change remains; the migration plan must support old and new versions.

- Skip verification and accept the initial result.
- Identify backup timestamp, restore sandbox, validate invariants and measure elapsed time; record recovery gaps.
- Snapshots without tested restoration give false confidence.

### OPSP01-L02-Q1

Explain the mechanism of Progressive delivery and quality gates using the worked scenario.

### OPSP01-L02-Q2

What failure should you watch for in Progressive delivery and quality gates, and how would you detect or prevent it?

### OPSP01-L02-Q3

For this scenario, which response is technically appropriate: A candidate with 1 error in 2 requests is too small a sample for confident promotion.

- Do not promote solely because no alerts fired; unknown evidence fails closed.
- Skip verification and accept the initial result.
- Run offline gate with passing and failing samples; require minimum traffic, error threshold and all evidence.

### OPSP01-L03-Q1

Explain the mechanism of Platform engineering and golden paths using the worked scenario.

### OPSP01-L03-Q2

What failure should you watch for in Platform engineering and golden paths, and how would you detect or prevent it?

### OPSP01-L03-Q3

For this scenario, which response is technically appropriate: A service scaffold provides health probes, resource defaults, CI tests and security gates with team-specific configuration.

- Use the starter app, Helm and CI scaffold; specify what is required vs configurable and document upgrade rollback.
- Overly rigid templates encourage bypasses; version and support migration paths.
- Skip verification and accept the initial result.

### OPSP01-L04-Q1

Explain the mechanism of End-to-end DevSecOps capstone using the worked scenario.

### OPSP01-L04-Q2

What failure should you watch for in End-to-end DevSecOps capstone, and how would you detect or prevent it?

### OPSP01-L04-Q3

For this scenario, which response is technically appropriate: A patched version passes scans, gets signed, is deployed to staging and promoted only after health and DAST checks.

- Skip verification and accept the initial result.
- Use project rubric, prove failing checks block promotion, demonstrate rollback and provide runbook; no production deployment required.
- A monolithic privileged job defeats separation of duties and makes rollback ambiguous.
