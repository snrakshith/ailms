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
