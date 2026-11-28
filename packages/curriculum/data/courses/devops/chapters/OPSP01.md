# Production operations

Study in this order; each section contains an independent lesson.

# Disaster recovery, backup and rollback

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSP01-L01`

## Learning objectives
- Explain the mechanism behind Disaster recovery, backup and rollback.
- Implement or demonstrate: Write recovery steps for app and data failure, then tabletop a restore.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
RPO bounds data loss; RTO bounds recovery time. Backups need restoration tests; rollback may not reverse database schema changes. Use backward-compatible expand/contract migrations.

## Worked example
A deployment rolls back but destructive schema change remains; the migration plan must support old and new versions.

## Common failure mode
Snapshots without tested restoration give false confidence.

## Implementation snippet
```bash
# dry run recovery checklist: identify backup -> restore isolated -> validate -> authorize cutover
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Write recovery steps for app and data failure, then tabletop a restore.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Disaster recovery, backup and rollback using the worked scenario.

## Knowledge check
1. Explain the mechanism of Disaster recovery, backup and rollback using the worked scenario.
2. What failure should you watch for in Disaster recovery, backup and rollback, and how would you detect or prevent it?

## Review resources
- https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html


---

# Progressive delivery and quality gates

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSP01-L02`

## Learning objectives
- Explain the mechanism behind Progressive delivery and quality gates.
- Implement or demonstrate: Apply a release gate to synthetic metrics with both healthy and unhealthy candidates.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Canary decisions compare candidate error rate/latency against baseline with minimum sample size. Promotion requires approved metrics, signature and scan evidence; rollback has predefined triggers.

## Worked example
A candidate with 1 error in 2 requests is too small a sample for confident promotion.

## Common failure mode
Do not promote solely because no alerts fired; unknown evidence fails closed.

## Implementation snippet
Try the lab before opening the solution.

```bash
python labs/solutions/release_gate.py
```

Executable reference: see lab and solution files.

## Hands-on exercise
Apply a release gate to synthetic metrics with both healthy and unhealthy candidates.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Progressive delivery and quality gates using the worked scenario.

## Knowledge check
1. Explain the mechanism of Progressive delivery and quality gates using the worked scenario.
2. What failure should you watch for in Progressive delivery and quality gates, and how would you detect or prevent it?

## Review resources
- https://argo-rollouts.readthedocs.io/en/stable/


---

# Platform engineering and golden paths

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSP01-L03`

## Learning objectives
- Explain the mechanism behind Platform engineering and golden paths.
- Implement or demonstrate: Design a reusable service template with clear owners and onboarding SOP.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A golden path combines reusable templates, secure defaults, documentation and ownership. Self-service interfaces expose a supported contract; exceptions are governed rather than copying pipelines across teams.

## Worked example
A service scaffold provides health probes, resource defaults, CI tests and security gates with team-specific configuration.

## Common failure mode
Overly rigid templates encourage bypasses; version and support migration paths.

## Implementation snippet
```bash
# Contract: app test + immutable image + scan + signed artifact + GitOps desired state + runbook
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Design a reusable service template with clear owners and onboarding SOP.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Platform engineering and golden paths using the worked scenario.

## Knowledge check
1. Explain the mechanism of Platform engineering and golden paths using the worked scenario.
2. What failure should you watch for in Platform engineering and golden paths, and how would you detect or prevent it?

## Review resources
- https://tag-app-delivery.cncf.io/whitepapers/platforms/


---

# End-to-end DevSecOps capstone

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSP01-L04`

## Learning objectives
- Explain the mechanism behind End-to-end DevSecOps capstone.
- Implement or demonstrate: Deliver a secure delivery pipeline in a disposable environment, including failure demonstrations.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Integrate code review, tests, build, SAST/SCA/secrets, SBOM and signing, GitOps deploy, DAST, metrics and incident response. Each gate must have evidence, identity, owner and failure handling.

## Worked example
A patched version passes scans, gets signed, is deployed to staging and promoted only after health and DAST checks.

## Common failure mode
A monolithic privileged job defeats separation of duties and makes rollback ambiguous.

## Implementation snippet
```bash
# See projects/OPS-CAP01.md and starter-code/README.md
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Deliver a secure delivery pipeline in a disposable environment, including failure demonstrations.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of End-to-end DevSecOps capstone using the worked scenario.

## Knowledge check
1. Explain the mechanism of End-to-end DevSecOps capstone using the worked scenario.
2. What failure should you watch for in End-to-end DevSecOps capstone, and how would you detect or prevent it?

## Review resources
- https://owasp.org/www-project-devsecops-guideline/
