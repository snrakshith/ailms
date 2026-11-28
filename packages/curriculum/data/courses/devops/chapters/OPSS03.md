# Dependency and secrets security

Study in this order; each section contains an independent lesson.

# SCA: Snyk, Dependabot and OWASP Dependency-Check

**Level:** intermediate · **Estimated time:** 120 min · **ID:** `OPSS03-L01`

## Learning objectives
- Explain the mechanism behind SCA: Snyk, Dependabot and OWASP Dependency-Check.
- Implement or demonstrate: Triage a synthetic dependency report and propose upgrade plus regression tests.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
SCA maps dependency versions to advisory data; direct and transitive dependencies matter. Dependabot alerts/updates automate maintenance; Snyk and Dependency-Check provide scans with differing ecosystem coverage.

## Worked example
A vulnerable transitive library can require updating the parent dependency or constrained override.

## Common failure mode
CVSS alone ignores reachability, exposure and available fix; avoid permanent blanket ignores.

## Implementation snippet
Try the lab before opening the solution.

```bash
# examples; installed and authorized tools only
snyk test
dependency-check.sh --project learning --scan . --format JSON
```

Executable reference: see lab and solution files.

## Hands-on exercise
Triage a synthetic dependency report and propose upgrade plus regression tests.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of SCA: Snyk, Dependabot and OWASP Dependency-Check using the worked scenario.

## Knowledge check
1. Explain the mechanism of SCA: Snyk, Dependabot and OWASP Dependency-Check using the worked scenario.
2. What failure should you watch for in SCA: Snyk, Dependabot and OWASP Dependency-Check, and how would you detect or prevent it?

## Review resources
- https://docs.snyk.io/
- https://docs.github.com/en/code-security/dependabot
- https://dependency-check.github.io/DependencyCheck/


---

# Gitleaks and TruffleHog secrets detection

**Level:** intermediate · **Estimated time:** 120 min · **ID:** `OPSS03-L02`

## Learning objectives
- Explain the mechanism behind Gitleaks and TruffleHog secrets detection.
- Implement or demonstrate: Detect a deliberately fake token with a local custom rule and document incident response.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Pattern and entropy scanning find likely credentials; verification can improve precision but may contact providers. Scan history and staged changes; rotate/revoke leaked keys first, then remediate history and prevent recurrence.

## Worked example
A fake fixture matches a training rule, demonstrating detection without real credentials.

## Common failure mode
Deleting a secret from the latest commit does not revoke it or remove older copies.

## Implementation snippet
Try the lab before opening the solution.

```bash
gitleaks dir starter-code/security --config starter-code/security/gitleaks.toml --redact
trufflehog filesystem starter-code/security --no-verification
```

Executable reference: see lab and solution files.

## Hands-on exercise
Detect a deliberately fake token with a local custom rule and document incident response.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Gitleaks and TruffleHog secrets detection using the worked scenario.

## Knowledge check
1. Explain the mechanism of Gitleaks and TruffleHog secrets detection using the worked scenario.
2. What failure should you watch for in Gitleaks and TruffleHog secrets detection, and how would you detect or prevent it?

## Review resources
- https://github.com/gitleaks/gitleaks
- https://github.com/trufflesecurity/trufflehog


---

# Vault and AWS Secrets Manager

**Level:** intermediate · **Estimated time:** 120 min · **ID:** `OPSS03-L03`

## Learning objectives
- Explain the mechanism behind Vault and AWS Secrets Manager.
- Implement or demonstrate: Compare a static secret with a leased credential, including failure on expiry.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A secret manager centralizes versioning, authorization, auditing and rotation. Vault can issue dynamic credentials with leases; AWS Secrets Manager manages versions and rotation integrations. Workloads authenticate with identities rather than embedded keys.

## Worked example
A compromised static password is replaced by a short-lived credential or rotated version with controlled rollout.

## Common failure mode
Do not log secret values or store them in Terraform state/CI artifacts.

## Implementation snippet
```bash
# metadata-only in sandbox
aws secretsmanager describe-secret --secret-id YOUR_SANDBOX_SECRET_ID
vault status
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Compare a static secret with a leased credential, including failure on expiry.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Vault and AWS Secrets Manager using the worked scenario.

## Knowledge check
1. Explain the mechanism of Vault and AWS Secrets Manager using the worked scenario.
2. What failure should you watch for in Vault and AWS Secrets Manager, and how would you detect or prevent it?

## Review resources
- https://developer.hashicorp.com/vault/docs
- https://docs.aws.amazon.com/secretsmanager/
