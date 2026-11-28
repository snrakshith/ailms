# Interview preparation

### Walk through Processes, files and permissions. Give a concrete scenario and justify your approach and failure handling.
Linux exposes process state through PID, parent PID, signals and open descriptors. Permissions apply to owner/group/other; directory execute grants traversal. Prefer graceful SIGTERM and inspect before stopping processes. A service cannot read a config with mode 600 owned by another account. Check identity and path permissions before changing modes. chmod 777 hides the root cause and broadens access.

### Walk through Shell scripting and automation. Give a concrete scenario and justify your approach and failure handling.
Shell exit codes are part of a command contract. Quote expansions, validate inputs, use a deliberate working directory and handle temporary files with traps. pipefail prevents upstream failures being masked in Bash. A build piped through tee can appear successful when the build failed; pipefail preserves the failed pipeline status. set -e does not replace explicit checks and has exceptions in conditional contexts.

### Walk through Networking, DNS, HTTP and TLS. Give a concrete scenario and justify your approach and failure handling.
DNS resolves names, TCP establishes transport, TLS authenticates endpoints and encrypts traffic, HTTP carries requests. Separate name lookup, connectivity, TLS and app status when debugging. A 502 from a proxy indicates it answered HTTP, unlike a DNS failure or TCP timeout. Do not disable certificate verification to fix trust errors.

### Walk through Git branching, commits and recovery. Give a concrete scenario and justify your approach and failure handling.
Commits are immutable snapshots with parent links; branches are movable refs. Merge preserves branch history; rebase rewrites commits. Revert creates a compensating commit; reset moves refs and can discard work. A faulty shared commit should usually be reverted, not force-pushed away. Avoid destructive reset on shared branches or unsaved working trees.

### Walk through GitHub pull requests and governance. Give a concrete scenario and justify your approach and failure handling.
A PR proposes a merge; required checks, CODEOWNERS review, protected branches and restricted bypass enforce server-side policy. Hooks are feedback, not a trust boundary. A developer skips a pre-commit hook, but required CI still blocks a failing change. Do not allow unreviewed workflows or broad write access to protected branches.

### Walk through CI/CD fundamentals and release strategies. Give a concrete scenario and justify your approach and failure handling.
CI integrates changes with repeatable builds and tests. Delivery keeps artifacts deployable; deployment releases automatically when gates pass. Build once, promote the same immutable artifact. Canary and blue-green reduce release risk but require health criteria. A candidate receives 5% of traffic; compare error rates and latency against baseline before promotion. Rebuilding per environment can change dependencies and invalidate earlier evidence.

### Walk through GitHub Actions workflows. Give a concrete scenario and justify your approach and failure handling.
Events trigger workflows containing jobs and steps. Jobs can depend on others through needs; workflow permissions define token scope. Separate untrusted PR jobs from deployment and avoid interpolating untrusted text into shell scripts. Run tests on pull_request with read-only token and no production secrets. Deployment runs from approved main commits. Mutable action tags and privileged pull_request_target can expose secrets to untrusted code.

### Walk through Jenkins declarative pipeline. Give a concrete scenario and justify your approach and failure handling.
Jenkins controller schedules agents; declarative stages specify ordered work. Isolate build agents, constrain credentials and install only reviewed pinned plugins. Store Jenkinsfile alongside code. A controller should orchestrate rather than execute arbitrary PR builds on itself. Printing secrets or reusing a workspace across trust levels leaks data.

### Walk through Artifacts, caching and dependency locking. Give a concrete scenario and justify your approach and failure handling.
An artifact is an immutable build output; a cache is an optimization and must not determine correctness. Lock dependencies and verify hashes for reproducibility. Separate caches across trust boundaries. A PR cache poisoned with a malicious binary must never be consumed by a privileged release job. A branch-name tag is not immutable and cached dependencies are not release evidence.

### Walk through Docker images and containers. Give a concrete scenario and justify your approach and failure handling.
Images are layered filesystems and configuration; containers are running processes isolated by OS mechanisms. Multi-stage builds separate tooling from runtime; use nonroot users and small trusted base images. A Python service can run from an image with only application files and runtime dependencies. A container is not a VM-level security boundary; never bake secrets into layers.

### Walk through Container networking, volumes and Compose. Give a concrete scenario and justify your approach and failure handling.
Container network namespaces isolate interfaces; service discovery resolves names on shared networks. Volumes survive container replacement while writable layers do not. Compose models local multi-service dependencies. An app inside a container reaches another service by its Compose service name, not localhost. depends_on alone does not guarantee readiness; publishing all ports broadens exposure.

### Walk through AWS IAM, networking and compute. Give a concrete scenario and justify your approach and failure handling.
A VPC spans subnets; route tables determine paths and security groups are stateful controls. IAM policies authorize actions; prefer workload roles and short-lived credentials. Public IP plus an internet route does not automatically imply permitted ingress. An ALB in public subnets can forward to private EC2 or EKS workloads without public workload IPs. An unrestricted SSH rule and static access keys are avoidable risk.

### Walk through Terraform configuration and lifecycle. Give a concrete scenario and justify your approach and failure handling.
Providers implement resource APIs; desired resource graph is derived from HCL references. init downloads providers, plan previews changes, apply executes. Validate and review plan before apply. OpenTofu is an alternative, with version compatibility checked separately. A local terraform_data resource can demonstrate plan and apply without cloud charges. A plan can contain sensitive values; do not upload it publicly.

### Walk through Terraform modules, state and environments. Give a concrete scenario and justify your approach and failure handling.
State maps resource addresses to remote IDs; protect and version remote state with locking where supported. Modules expose inputs and outputs. Separate state per environment and promote reviewed versions. Moving a resource into a module without a moved block may propose replacement. Do not commit state, plans or credentials; sensitive output masks display but not state contents.

### Walk through Ansible configuration management. Give a concrete scenario and justify your approach and failure handling.
Inventory identifies hosts; playbooks declare tasks using modules. Idempotent tasks converge to desired state with no extra changes on repeated runs. Use check mode as preview where supported. The copy module ensures file content and mode, unlike repeatedly appending shell output. Check mode is not a guarantee for every module; avoid ad hoc shell where a module exists.

### Walk through Cluster architecture and workloads. Give a concrete scenario and justify your approach and failure handling.
API server validates resources, controllers reconcile desired state, scheduler selects nodes and kubelet manages pods. Deployments own ReplicaSets and replaceable Pods. StatefulSets provide stable identities, Jobs run finite work. Deleting a Deployment-managed Pod causes a controller to create a replacement. A Pod IP is ephemeral; route clients through Services.

### Walk through Services, ingress and DNS. Give a concrete scenario and justify your approach and failure handling.
ClusterIP exposes stable service discovery; selectors map Services to EndpointSlices. Ingress or Gateway API requires an implementation to route external traffic. Network policy requires a supporting CNI. A service with no matching selector has no ready endpoints even if pods are healthy. An Ingress resource without a controller does not route traffic.

### Walk through ConfigMap, Secret, storage and resources. Give a concrete scenario and justify your approach and failure handling.
ConfigMaps hold nonsecret settings; Secrets require encryption at rest, RBAC and careful delivery, as base64 is not encryption. Requests inform scheduling; limits constrain consumption. PersistentVolumeClaims request durable storage. A Pod pending due to excessive requests differs from an OOMKilled process exceeding its memory limit. Secrets in Git are exposed even when base64 encoded.

### Walk through Health probes, scaling and rolling releases. Give a concrete scenario and justify your approach and failure handling.
Startup protects slow initialization; readiness controls eligibility for service traffic; liveness restarts unhealthy containers. HPA adjusts replicas based on metrics, assuming suitable requests/metrics. PDB limits voluntary disruptions. A database outage may cause readiness to fail without requiring every app process to restart. Using the same dependency-sensitive liveness and readiness can create restart storms.

### Walk through Debugging, RBAC and network policy. Give a concrete scenario and justify your approach and failure handling.
Start with desired/current state, events, logs and endpoints. RBAC scopes API verbs/resources; default-deny network policy then explicit allowed flows reduces lateral movement when enforced by CNI. A 403 means authentication succeeded but authorization denied; inspect role bindings before changing permissions. Do not grant cluster-admin to fix a narrow permission error.

### Walk through Helm chart structure and release management. Give a concrete scenario and justify your approach and failure handling.
Chart.yaml describes metadata; values.yaml provides defaults; templates render manifests. Validate rendered output, not only templates. Helm releases track revisions; avoid secrets in values. A wrong selector in a template can make an upgrade impossible or break routing. helm template renders locally but does not prove cluster acceptance.

### Walk through Argo CD reconciliation and GitOps. Give a concrete scenario and justify your approach and failure handling.
Git defines desired state; Argo CD compares desired with live resources and synchronizes through Kubernetes API. Automated prune/self-heal have consequences; choose explicitly and use restricted projects. Manual edits create drift; a reviewed Git revert restores desired state without fighting the controller. CI should not simultaneously apply manifests that GitOps owns.

### Walk through Prometheus metrics and PromQL. Give a concrete scenario and justify your approach and failure handling.
Counters monotonically increase except resets; gauges represent current values; histograms bucket observations. Rates over counter windows support error ratios. Avoid high-cardinality labels such as request IDs. Calculate 5xx fraction as sum(rate(errors[5m])) / sum(rate(requests[5m])) on consistent counters. Averages obscure tail latency; dividing by zero needs explicit no-traffic handling.

### Walk through Grafana dashboards and alerting. Give a concrete scenario and justify your approach and failure handling.
Dashboards combine query panels with labels, time ranges and drilldowns. Alert rules evaluate signals for duration; route notifications with ownership and action links. A 5-minute sustained error-rate alert is less noisy than one transient failure. Dashboards are not alert policies; alert on user impact rather than every CPU spike.

### Walk through ELK and structured logging. Give a concrete scenario and justify your approach and failure handling.
Elasticsearch indexes events, Logstash transforms/ships data and Kibana queries/visualizes it. Structured JSON logs should include timestamp, severity, service and trace ID; redact personal and secret data. A 500 error can be connected to a trace ID across services. Do not log authorization headers or unbounded payloads; index retention matters.

### Walk through OpenTelemetry and Datadog. Give a concrete scenario and justify your approach and failure handling.
OpenTelemetry instrumentation emits vendor-neutral traces, metrics and logs via SDK/collector pipelines. Datadog provides a managed observability platform; exporters and agents route telemetry. Sampling and attributes control cost and privacy. An inbound span and database child span expose where latency accumulates. Never put secrets in span attributes; avoid baggage with sensitive data.

### Walk through SLOs, incidents, Jira and PagerDuty. Give a concrete scenario and justify your approach and failure handling.
SLI measures service behavior, SLO targets it, error budget is allowed unreliability. PagerDuty routes on-call alerts; Jira tracks incident follow-up. Incident command coordinates mitigation, communication and blameless review. 99.9% monthly success allows 0.1% unsuccessful requests; budget exhaustion can pause risky releases. A severity label without an owner and response procedure is not incident management.

### Walk through Threat modeling and secure pipeline design. Give a concrete scenario and justify your approach and failure handling.
Identify assets, actors, trust boundaries and threats before selecting scanners. SAST examines source, SCA known dependency issues, DAST running behavior; each is incomplete. Use least privilege, OIDC, isolated runners and auditable gates. A fork PR can run hostile code; it must not receive deployment credentials. Passing scans cannot establish absence of vulnerabilities.

### Walk through Hooks, Husky, linting and local feedback. Give a concrete scenario and justify your approach and failure handling.
Pre-commit checks shorten feedback; pre-push may run tests or scans. Husky manages Git hooks for Node projects; ESLint/Prettier improve quality. CI repeats required checks because local hooks are bypassable. A staged file with formatting errors is fixed before commit; CI independently enforces the same standard. Do not store secrets in hook configs or assume hooks are mandatory security gates.

### Walk through Semgrep and rule-based SAST. Give a concrete scenario and justify your approach and failure handling.
Semgrep matches structural code patterns and can track dataflow depending on engine/rules. Select trusted rule packs, distinguish false positives and define blocking severity with exceptions. A rule detects unsafe string concatenation in query construction; parameter binding is the fix. Scanning only changed files misses contextual findings; do periodic full scans.

### Walk through CodeQL, SonarQube and Checkmarx. Give a concrete scenario and justify your approach and failure handling.
CodeQL builds queryable code databases and finds semantic flows; SonarQube combines quality/security analysis and quality gates; Checkmarx offers enterprise SAST and related capabilities. Language/build coverage and licensing differ. A tainted request parameter reaches an unsafe sink; triage by reachability and validate the fix. A green quality gate does not replace review or threat modeling.

### Walk through SCA: Snyk, Dependabot and OWASP Dependency-Check. Give a concrete scenario and justify your approach and failure handling.
SCA maps dependency versions to advisory data; direct and transitive dependencies matter. Dependabot alerts/updates automate maintenance; Snyk and Dependency-Check provide scans with differing ecosystem coverage. A vulnerable transitive library can require updating the parent dependency or constrained override. CVSS alone ignores reachability, exposure and available fix; avoid permanent blanket ignores.

### Walk through Gitleaks and TruffleHog secrets detection. Give a concrete scenario and justify your approach and failure handling.
Pattern and entropy scanning find likely credentials; verification can improve precision but may contact providers. Scan history and staged changes; rotate/revoke leaked keys first, then remediate history and prevent recurrence. A fake fixture matches a training rule, demonstrating detection without real credentials. Deleting a secret from the latest commit does not revoke it or remove older copies.

### Walk through Vault and AWS Secrets Manager. Give a concrete scenario and justify your approach and failure handling.
A secret manager centralizes versioning, authorization, auditing and rotation. Vault can issue dynamic credentials with leases; AWS Secrets Manager manages versions and rotation integrations. Workloads authenticate with identities rather than embedded keys. A compromised static password is replaced by a short-lived credential or rotated version with controlled rollout. Do not log secret values or store them in Terraform state/CI artifacts.

### Walk through Trivy and Grype image scanning. Give a concrete scenario and justify your approach and failure handling.
Scan the exact digest that will be deployed. Trivy supports vulnerabilities and several other target-dependent scanners; Grype identifies vulnerable packages from images/SBOMs. Database freshness and distribution advisory backports influence results. An image tagged latest may resolve differently between scan and deployment; digest binds evidence to artifact. Scanner exit defaults can be zero on findings; explicitly configure gate and handle tool errors.

### Walk through Checkov and Trivy infrastructure scanning. Give a concrete scenario and justify your approach and failure handling.
IaC scanning detects risky configurations before provisioning. Checkov analyzes Terraform and other IaC; Trivy misconfiguration scanning includes functionality historically associated with tfsec. Findings need context and runtime verification. A storage resource marked public or a privileged container is identified before deployment. Scanning source alone can miss dynamic values; evaluate plan/rendered manifests as appropriate and protect sensitive plans.

### Walk through OWASP ZAP and Burp Suite DAST. Give a concrete scenario and justify your approach and failure handling.
DAST examines running application behavior with HTTP traffic. ZAP baseline is passive-oriented plus spidering; active scanning can change state. Burp Suite supports manual proxy-based testing and licensed scanning. Test only owned authorized labs. Missing security headers can be found via passive analysis; authenticated checks need test users and scoped sessions. Do not point scanners at production or public third-party hosts without authorization.

### Walk through OPA and Rego policy as code. Give a concrete scenario and justify your approach and failure handling.
OPA evaluates structured input against declarative policies; it is a decision engine, not an automatic enforcement point. Integrate policy evaluation in CI or admission and test explicit allow/deny cases. A deployment manifest requesting privileged=true violates an organization rule. A missing field can yield undefined instead of true/false; define defaults and test shape errors.

### Walk through Kyverno Kubernetes admission policies. Give a concrete scenario and justify your approach and failure handling.
Kyverno validates, mutates, generates and verifies Kubernetes resources with Kubernetes-native policies. Start in Audit where appropriate, inspect reports then enforce with explicit exceptions. A policy rejects Pods without runAsNonRoot in a controlled namespace. A broad cluster-wide enforce rollout can break system workloads; scope and test before enforcement.

### Walk through Falco runtime detection. Give a concrete scenario and justify your approach and failure handling.
Falco evaluates event streams such as system calls against rules to detect suspicious runtime behavior. Deploy with documented sensor privileges and route alerts; tune rules to workload behavior. A shell started inside an application container may be unusual and warrants triage. Runtime detection does not automatically prevent behavior; false positives need context.

### Walk through Syft SBOM and dependency inventory. Give a concrete scenario and justify your approach and failure handling.
An SBOM is an inventory of components and metadata, not a vulnerability report. Syft generates SPDX or CycloneDX from images/filesystems. Store SBOM linked to immutable artifact digest. A newly disclosed CVE can be mapped to a stored SBOM without rebuilding the image. SBOM completeness depends on package recognition; do not claim it proves absence of dependencies.

### Walk through Cosign signing, verification and provenance. Give a concrete scenario and justify your approach and failure handling.
Signatures bind artifact identity to a signing identity; verify digest, certificate identity and issuer or trusted key. Provenance describes build inputs and builder. Sign only after approved build and scans; verify admission policy. An image signed by an unrelated identity is not acceptable even if signature cryptographically valid. Do not verify with broad identity regex or mutable tags; signature alone does not assert vulnerability-free.

### Walk through Secure scanners, CI identities and exceptions. Give a concrete scenario and justify your approach and failure handling.
Scanners, plugins and actions are dependencies in the trust chain. Pin actions to verified full SHAs, binaries/images to verified release hashes/digests; constrain token scope, separate PR/release trust, use OIDC and log evidence. Expire exceptions. A compromised scanner can exfiltrate CI secrets; run untrusted scanning without deployment credentials and isolate permissions. A pinned malicious version is still malicious; review provenance and advisories, rotate when compromised.

### Walk through Disaster recovery, backup and rollback. Give a concrete scenario and justify your approach and failure handling.
RPO bounds data loss; RTO bounds recovery time. Backups need restoration tests; rollback may not reverse database schema changes. Use backward-compatible expand/contract migrations. A deployment rolls back but destructive schema change remains; the migration plan must support old and new versions. Snapshots without tested restoration give false confidence.

### Walk through Progressive delivery and quality gates. Give a concrete scenario and justify your approach and failure handling.
Canary decisions compare candidate error rate/latency against baseline with minimum sample size. Promotion requires approved metrics, signature and scan evidence; rollback has predefined triggers. A candidate with 1 error in 2 requests is too small a sample for confident promotion. Do not promote solely because no alerts fired; unknown evidence fails closed.

### Walk through Platform engineering and golden paths. Give a concrete scenario and justify your approach and failure handling.
A golden path combines reusable templates, secure defaults, documentation and ownership. Self-service interfaces expose a supported contract; exceptions are governed rather than copying pipelines across teams. A service scaffold provides health probes, resource defaults, CI tests and security gates with team-specific configuration. Overly rigid templates encourage bypasses; version and support migration paths.

### Walk through End-to-end DevSecOps capstone. Give a concrete scenario and justify your approach and failure handling.
Integrate code review, tests, build, SAST/SCA/secrets, SBOM and signing, GitOps deploy, DAST, metrics and incident response. Each gate must have evidence, identity, owner and failure handling. A patched version passes scans, gets signed, is deployed to staging and promoted only after health and DAST checks. A monolithic privileged job defeats separation of duties and makes rollback ambiguous.