# Backtracking — quick reference

## Day 37 — Backtracking Fundamentals

Each subset branches on inclusion or exclusion; copying the current path at a leaf isolates output from later mutations.

**Watch for:** Appending the same list object corrupts earlier answers.

## Day 38 — Backtracking: Permutations & String Problems

Permutations choose an unused index each level. Backtracking restores both path and used status.

**Watch for:** Duplicate values require a separate skip strategy; this lab assumes distinct values.

## Day 39 — Backtracking: Grid and Board Problems

Board search marks cells on the current path, not globally. Undo the mark on return so other starts remain possible.

**Watch for:** Failure to restore visited on return rejects valid alternate paths.

## Day 40 — Backtracking: Palindromes, Partitions & IP Addresses

Partitioning considers every next cut; palindrome checks prune invalid pieces before recursion.

**Watch for:** Memoizing solely by index is fine for decision/count but not a mutable output path.
