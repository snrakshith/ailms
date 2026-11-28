# Two pointers & sliding window — quick reference

## Day 6 — Two Pointers Fundamentals

For a sorted pair sum, a sum below target eliminates the left value paired with any remaining right value; a high sum eliminates the right value.

**Watch for:** Sorting destroys original indices unless tracked.

## Day 7 — Two Pointers: In-Place Modifications

Maintain a write index for the accepted prefix while a read index scans all values. The unprocessed suffix is irrelevant.

**Watch for:** Avoid losing the original order of nonzero values.

## Day 8 — Sliding Window: Fixed Size

A fixed-width window changes by one outgoing and one incoming value each step. Updating a running sum avoids recomputation.

**Watch for:** Validate 1 <= k <= n before taking the first window.

## Day 9 — Sliding Window: Variable Size

A variable window maintains a constraint. For unique characters, jump the left boundary past a duplicate only if it lies in the current window.

**Watch for:** Stale last-seen indices must not shrink left backwards.
