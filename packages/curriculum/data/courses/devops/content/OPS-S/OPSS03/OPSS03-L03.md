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
