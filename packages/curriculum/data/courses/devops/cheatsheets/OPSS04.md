# Artifact and infrastructure scanning — quick reference

## Trivy and Grype image scanning

Scan the exact digest that will be deployed. Trivy supports vulnerabilities and several other target-dependent scanners; Grype identifies vulnerable packages from images/SBOMs. Database freshness and distribution advisory backports influence results.

**Watch for:** Scanner exit defaults can be zero on findings; explicitly configure gate and handle tool errors.

## Checkov and Trivy infrastructure scanning

IaC scanning detects risky configurations before provisioning. Checkov analyzes Terraform and other IaC; Trivy misconfiguration scanning includes functionality historically associated with tfsec. Findings need context and runtime verification.

**Watch for:** Scanning source alone can miss dynamic values; evaluate plan/rendered manifests as appropriate and protect sensitive plans.
