# Terraform configuration and lifecycle

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF05-L02`

## Learning objectives

- Explain the mechanism behind Terraform configuration and lifecycle.
- Implement or demonstrate: Initialize the local Terraform exercise and inspect a plan; optionally apply then destroy locally.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Providers implement resource APIs; desired resource graph is derived from HCL references. init downloads providers, plan previews changes, apply executes. Validate and review plan before apply. OpenTofu is an alternative, with version compatibility checked separately.

## Worked example

A local terraform_data resource can demonstrate plan and apply without cloud charges.

## Common failure mode

A plan can contain sensitive values; do not upload it publicly.

## Implementation snippet

```bash
terraform init
terraform fmt -check
terraform validate
terraform plan -out=local.tfplan
# optional local-only: terraform apply local.tfplan
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Initialize the local Terraform exercise and inspect a plan; optionally apply then destroy locally.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Terraform configuration and lifecycle using the worked scenario.

## Knowledge check

1. Explain the mechanism of Terraform configuration and lifecycle using the worked scenario.
2. What failure should you watch for in Terraform configuration and lifecycle, and how would you detect or prevent it?

## Review resources

- https://developer.hashicorp.com/terraform/tutorials
