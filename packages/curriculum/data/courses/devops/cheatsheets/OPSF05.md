# Cloud & infrastructure as code — quick reference

## AWS IAM, networking and compute
A VPC spans subnets; route tables determine paths and security groups are stateful controls. IAM policies authorize actions; prefer workload roles and short-lived credentials. Public IP plus an internet route does not automatically imply permitted ingress.

**Watch for:** An unrestricted SSH rule and static access keys are avoidable risk.


## Terraform configuration and lifecycle
Providers implement resource APIs; desired resource graph is derived from HCL references. init downloads providers, plan previews changes, apply executes. Validate and review plan before apply. OpenTofu is an alternative, with version compatibility checked separately.

**Watch for:** A plan can contain sensitive values; do not upload it publicly.


## Terraform modules, state and environments
State maps resource addresses to remote IDs; protect and version remote state with locking where supported. Modules expose inputs and outputs. Separate state per environment and promote reviewed versions.

**Watch for:** Do not commit state, plans or credentials; sensitive output masks display but not state contents.


## Ansible configuration management
Inventory identifies hosts; playbooks declare tasks using modules. Idempotent tasks converge to desired state with no extra changes on repeated runs. Use check mode as preview where supported.

**Watch for:** Check mode is not a guarantee for every module; avoid ad hoc shell where a module exists.
