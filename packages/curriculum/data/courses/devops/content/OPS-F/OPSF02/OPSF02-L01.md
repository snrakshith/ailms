# Git branching, commits and recovery

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF02-L01`

## Learning objectives

- Explain the mechanism behind Git branching, commits and recovery.
- Implement or demonstrate: Create a disposable Git repository, commit a change, inspect diff and revert it.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Commits are immutable snapshots with parent links; branches are movable refs. Merge preserves branch history; rebase rewrites commits. Revert creates a compensating commit; reset moves refs and can discard work.

## Worked example

A faulty shared commit should usually be reverted, not force-pushed away.

## Common failure mode

Avoid destructive reset on shared branches or unsaved working trees.

## Implementation snippet

Try the lab before opening the solution.

```bash
git init -b main demo
cd demo
git config user.name Learner
git config user.email learner@example.invalid
echo v1 > app.txt
git add app.txt && git commit -m baseline
echo v2 > app.txt
git commit -am update
git revert --no-edit HEAD
```

Executable reference: see lab and solution files.

## Hands-on exercise

Create a disposable Git repository, commit a change, inspect diff and revert it.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Git branching, commits and recovery using the worked scenario.

## Knowledge check

1. Explain the mechanism of Git branching, commits and recovery using the worked scenario.
2. What failure should you watch for in Git branching, commits and recovery, and how would you detect or prevent it?

## Review resources

- https://git-scm.com/docs
