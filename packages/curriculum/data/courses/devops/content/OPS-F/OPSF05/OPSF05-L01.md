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
