# Version control

Study in this order; each section contains an independent lesson.

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


---

# GitHub pull requests and governance

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF02-L02`

## Learning objectives
- Explain the mechanism behind GitHub pull requests and governance.
- Implement or demonstrate: Configure a disposable repository ruleset with tests and independent review.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A PR proposes a merge; required checks, CODEOWNERS review, protected branches and restricted bypass enforce server-side policy. Hooks are feedback, not a trust boundary.

## Worked example
A developer skips a pre-commit hook, but required CI still blocks a failing change.

## Common failure mode
Do not allow unreviewed workflows or broad write access to protected branches.

## Implementation snippet
```bash
# CODEOWNERS example (replace with actual team)
# /.github/workflows/ @your-org/platform-security
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Configure a disposable repository ruleset with tests and independent review.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of GitHub pull requests and governance using the worked scenario.

## Knowledge check
1. Explain the mechanism of GitHub pull requests and governance using the worked scenario.
2. What failure should you watch for in GitHub pull requests and governance, and how would you detect or prevent it?

## Review resources
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository
