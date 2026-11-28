# Dependency and secrets security — quick reference

## SCA: Snyk, Dependabot and OWASP Dependency-Check
SCA maps dependency versions to advisory data; direct and transitive dependencies matter. Dependabot alerts/updates automate maintenance; Snyk and Dependency-Check provide scans with differing ecosystem coverage.

**Watch for:** CVSS alone ignores reachability, exposure and available fix; avoid permanent blanket ignores.


## Gitleaks and TruffleHog secrets detection
Pattern and entropy scanning find likely credentials; verification can improve precision but may contact providers. Scan history and staged changes; rotate/revoke leaked keys first, then remediate history and prevent recurrence.

**Watch for:** Deleting a secret from the latest commit does not revoke it or remove older copies.


## Vault and AWS Secrets Manager
A secret manager centralizes versioning, authorization, auditing and rotation. Vault can issue dynamic credentials with leases; AWS Secrets Manager manages versions and rotation integrations. Workloads authenticate with identities rather than embedded keys.

**Watch for:** Do not log secret values or store them in Terraform state/CI artifacts.
