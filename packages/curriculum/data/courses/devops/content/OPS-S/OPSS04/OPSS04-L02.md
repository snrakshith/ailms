# Checkov and Trivy infrastructure scanning

**Level:** intermediate · **Estimated time:** 120 min · **ID:** `OPSS04-L02`

## Learning objectives
- Explain the mechanism behind Checkov and Trivy infrastructure scanning.
- Implement or demonstrate: Scan the training IaC and manifests; remediate a policy violation and record evidence.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
IaC scanning detects risky configurations before provisioning. Checkov analyzes Terraform and other IaC; Trivy misconfiguration scanning includes functionality historically associated with tfsec. Findings need context and runtime verification.

## Worked example
A storage resource marked public or a privileged container is identified before deployment.

## Common failure mode
Scanning source alone can miss dynamic values; evaluate plan/rendered manifests as appropriate and protect sensitive plans.

## Implementation snippet
```bash
checkov -d starter-code/terraform
trivy config starter-code/k8s
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Scan the training IaC and manifests; remediate a policy violation and record evidence.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Checkov and Trivy infrastructure scanning using the worked scenario.

## Knowledge check
1. Explain the mechanism of Checkov and Trivy infrastructure scanning using the worked scenario.
2. What failure should you watch for in Checkov and Trivy infrastructure scanning, and how would you detect or prevent it?

## Review resources
- https://www.checkov.io/
- https://trivy.dev/docs/latest/guide/scanner/misconfiguration/
