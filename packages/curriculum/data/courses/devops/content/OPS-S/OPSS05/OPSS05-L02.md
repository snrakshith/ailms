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
