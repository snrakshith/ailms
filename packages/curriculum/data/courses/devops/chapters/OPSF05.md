# Cloud & infrastructure as code

Study in this order; each section contains an independent lesson.

# AWS IAM, networking and compute

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF05-L01`

## Learning objectives

- Explain the mechanism behind AWS IAM, networking and compute.
- Implement or demonstrate: Design a two-AZ VPC with public load balancer, private app subnets and least-privilege role.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

A VPC spans subnets; route tables determine paths and security groups are stateful controls. IAM policies authorize actions; prefer workload roles and short-lived credentials. Public IP plus an internet route does not automatically imply permitted ingress.

## Worked example

An ALB in public subnets can forward to private EC2 or EKS workloads without public workload IPs.

## Common failure mode

An unrestricted SSH rule and static access keys are avoidable risk.

## Implementation snippet

Try the lab before opening the solution.

```bash
aws sts get-caller-identity
# read-only; use a dedicated sandbox role
```

Executable reference: see lab and solution files.

## Hands-on exercise

Design a two-AZ VPC with public load balancer, private app subnets and least-privilege role.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of AWS IAM, networking and compute using the worked scenario.

## Knowledge check

1. Explain the mechanism of AWS IAM, networking and compute using the worked scenario.
2. What failure should you watch for in AWS IAM, networking and compute, and how would you detect or prevent it?

## Review resources

- https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html

---

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

---

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

---

# Ansible configuration management

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF05-L04`

## Learning objectives

- Explain the mechanism behind Ansible configuration management.
- Implement or demonstrate: Create a config in a disposable local directory and run playbook twice.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Inventory identifies hosts; playbooks declare tasks using modules. Idempotent tasks converge to desired state with no extra changes on repeated runs. Use check mode as preview where supported.

## Worked example

The copy module ensures file content and mode, unlike repeatedly appending shell output.

## Common failure mode

Check mode is not a guarantee for every module; avoid ad hoc shell where a module exists.

## Implementation snippet

```bash
ansible-playbook -i localhost, -c local playbook.yml --check
ansible-playbook -i localhost, -c local playbook.yml
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Create a config in a disposable local directory and run playbook twice.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Ansible configuration management using the worked scenario.

## Knowledge check

1. Explain the mechanism of Ansible configuration management using the worked scenario.
2. What failure should you watch for in Ansible configuration management, and how would you detect or prevent it?

## Review resources

- https://docs.ansible.com/ansible/latest/playbook_guide/
