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
