# End-to-end DevSecOps capstone

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSP01-L04`

## Learning objectives

- Explain the mechanism behind End-to-end DevSecOps capstone.
- Implement or demonstrate: Deliver a secure delivery pipeline in a disposable environment, including failure demonstrations.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Integrate code review, tests, build, SAST/SCA/secrets, SBOM and signing, GitOps deploy, DAST, metrics and incident response. Each gate must have evidence, identity, owner and failure handling.

## Worked example

A patched version passes scans, gets signed, is deployed to staging and promoted only after health and DAST checks.

## Common failure mode

A monolithic privileged job defeats separation of duties and makes rollback ambiguous.

## Implementation snippet

```bash
# See projects/OPS-CAP01.md and starter-code/README.md
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Deliver a secure delivery pipeline in a disposable environment, including failure demonstrations.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of End-to-end DevSecOps capstone using the worked scenario.

## Knowledge check

1. Explain the mechanism of End-to-end DevSecOps capstone using the worked scenario.
2. What failure should you watch for in End-to-end DevSecOps capstone, and how would you detect or prevent it?

## Review resources

- https://owasp.org/www-project-devsecops-guideline/
