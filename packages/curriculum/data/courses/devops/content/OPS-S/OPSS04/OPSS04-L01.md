# Trivy and Grype image scanning

**Level:** intermediate · **Estimated time:** 120 min · **ID:** `OPSS04-L01`

## Learning objectives
- Explain the mechanism behind Trivy and Grype image scanning.
- Implement or demonstrate: Scan a verified local image digest and review high/critical findings.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Scan the exact digest that will be deployed. Trivy supports vulnerabilities and several other target-dependent scanners; Grype identifies vulnerable packages from images/SBOMs. Database freshness and distribution advisory backports influence results.

## Worked example
An image tagged latest may resolve differently between scan and deployment; digest binds evidence to artifact.

## Common failure mode
Scanner exit defaults can be zero on findings; explicitly configure gate and handle tool errors.

## Implementation snippet
```bash
trivy image --severity HIGH,CRITICAL --exit-code 1 IMAGE_DIGEST
grype IMAGE_DIGEST --fail-on high
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Scan a verified local image digest and review high/critical findings.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Trivy and Grype image scanning using the worked scenario.

## Knowledge check
1. Explain the mechanism of Trivy and Grype image scanning using the worked scenario.
2. What failure should you watch for in Trivy and Grype image scanning, and how would you detect or prevent it?

## Review resources
- https://trivy.dev/docs/
- https://oss.anchore.com/docs/overview/grype/
