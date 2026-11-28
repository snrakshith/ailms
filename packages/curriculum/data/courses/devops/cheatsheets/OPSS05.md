# Dynamic and policy security — quick reference

## OWASP ZAP and Burp Suite DAST

DAST examines running application behavior with HTTP traffic. ZAP baseline is passive-oriented plus spidering; active scanning can change state. Burp Suite supports manual proxy-based testing and licensed scanning. Test only owned authorized labs.

**Watch for:** Do not point scanners at production or public third-party hosts without authorization.

## OPA and Rego policy as code

OPA evaluates structured input against declarative policies; it is a decision engine, not an automatic enforcement point. Integrate policy evaluation in CI or admission and test explicit allow/deny cases.

**Watch for:** A missing field can yield undefined instead of true/false; define defaults and test shape errors.

## Kyverno Kubernetes admission policies

Kyverno validates, mutates, generates and verifies Kubernetes resources with Kubernetes-native policies. Start in Audit where appropriate, inspect reports then enforce with explicit exceptions.

**Watch for:** A broad cluster-wide enforce rollout can break system workloads; scope and test before enforcement.
