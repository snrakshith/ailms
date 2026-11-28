# Version control — quick reference

## Git branching, commits and recovery

Commits are immutable snapshots with parent links; branches are movable refs. Merge preserves branch history; rebase rewrites commits. Revert creates a compensating commit; reset moves refs and can discard work.

**Watch for:** Avoid destructive reset on shared branches or unsaved working trees.

## GitHub pull requests and governance

A PR proposes a merge; required checks, CODEOWNERS review, protected branches and restricted bypass enforce server-side policy. Hooks are feedback, not a trust boundary.

**Watch for:** Do not allow unreviewed workflows or broad write access to protected branches.
