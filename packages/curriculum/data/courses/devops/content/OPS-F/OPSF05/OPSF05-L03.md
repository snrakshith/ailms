# Terraform modules, state and environments

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF05-L03`

## Learning objectives

- Explain the mechanism behind Terraform modules, state and environments.
- Implement or demonstrate: Design a module contract with explicit variables, outputs and state boundaries.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

State maps resource addresses to remote IDs; protect and version remote state with locking where supported. Modules expose inputs and outputs. Separate state per environment and promote reviewed versions.

## Worked example

Moving a resource into a module without a moved block may propose replacement.

## Common failure mode

Do not commit state, plans or credentials; sensitive output masks display but not state contents.

## Implementation snippet

```bash
terraform providers
terraform state list
# state inspection only in your own sandbox
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Design a module contract with explicit variables, outputs and state boundaries.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Terraform modules, state and environments using the worked scenario.

## Knowledge check

1. Explain the mechanism of Terraform modules, state and environments using the worked scenario.
2. What failure should you watch for in Terraform modules, state and environments, and how would you detect or prevent it?

## Review resources

- https://developer.hashicorp.com/terraform/language/state
