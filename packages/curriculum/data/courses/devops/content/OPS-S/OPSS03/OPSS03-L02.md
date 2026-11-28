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
