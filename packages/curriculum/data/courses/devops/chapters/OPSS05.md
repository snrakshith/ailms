# Dynamic and policy security

Study in this order; each section contains an independent lesson.

# OWASP ZAP and Burp Suite DAST

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS05-L01`

## Learning objectives

- Explain the mechanism behind OWASP ZAP and Burp Suite DAST.
- Implement or demonstrate: Run a baseline against your loopback lab app or approved disposable target.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

DAST examines running application behavior with HTTP traffic. ZAP baseline is passive-oriented plus spidering; active scanning can change state. Burp Suite supports manual proxy-based testing and licensed scanning. Test only owned authorized labs.

## Worked example

Missing security headers can be found via passive analysis; authenticated checks need test users and scoped sessions.

## Common failure mode

Do not point scanners at production or public third-party hosts without authorization.

## Implementation snippet

```bash
# With a verified ZAP installation; local service only
zap-baseline.py -t http://127.0.0.1:8080 -r zap-report.html
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Run a baseline against your loopback lab app or approved disposable target.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of OWASP ZAP and Burp Suite DAST using the worked scenario.

## Knowledge check

1. Explain the mechanism of OWASP ZAP and Burp Suite DAST using the worked scenario.
2. What failure should you watch for in OWASP ZAP and Burp Suite DAST, and how would you detect or prevent it?

## Review resources

- https://www.zaproxy.org/docs/docker/baseline-scan/
- https://portswigger.net/burp/documentation

---

# OPA and Rego policy as code

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS05-L02`

## Learning objectives

- Explain the mechanism behind OPA and Rego policy as code.
- Implement or demonstrate: Write a deny policy for privileged containers and evaluate safe and unsafe manifests.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

OPA evaluates structured input against declarative policies; it is a decision engine, not an automatic enforcement point. Integrate policy evaluation in CI or admission and test explicit allow/deny cases.

## Worked example

A deployment manifest requesting privileged=true violates an organization rule.

## Common failure mode

A missing field can yield undefined instead of true/false; define defaults and test shape errors.

## Implementation snippet

Try the lab before opening the solution.

```bash
opa test starter-code/policy -v
opa eval --data starter-code/policy/policy.rego --input starter-code/policy/input.json 'data.learning.deny'
```

Executable reference: see lab and solution files.

## Hands-on exercise

Write a deny policy for privileged containers and evaluate safe and unsafe manifests.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of OPA and Rego policy as code using the worked scenario.

## Knowledge check

1. Explain the mechanism of OPA and Rego policy as code using the worked scenario.
2. What failure should you watch for in OPA and Rego policy as code, and how would you detect or prevent it?

## Review resources

- https://www.openpolicyagent.org/docs/

---

# Kyverno Kubernetes admission policies

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS05-L03`

## Learning objectives

- Explain the mechanism behind Kyverno Kubernetes admission policies.
- Implement or demonstrate: Apply the lab policy to a disposable namespace and observe safe/unsafe outcomes.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Kyverno validates, mutates, generates and verifies Kubernetes resources with Kubernetes-native policies. Start in Audit where appropriate, inspect reports then enforce with explicit exceptions.

## Worked example

A policy rejects Pods without runAsNonRoot in a controlled namespace.

## Common failure mode

A broad cluster-wide enforce rollout can break system workloads; scope and test before enforcement.

## Implementation snippet

```bash
kyverno apply starter-code/policy/kyverno.yaml --resource starter-code/k8s/deployment.yaml
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Apply the lab policy to a disposable namespace and observe safe/unsafe outcomes.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Kyverno Kubernetes admission policies using the worked scenario.

## Knowledge check

1. Explain the mechanism of Kyverno Kubernetes admission policies using the worked scenario.
2. What failure should you watch for in Kyverno Kubernetes admission policies, and how would you detect or prevent it?

## Review resources

- https://kyverno.io/docs/
