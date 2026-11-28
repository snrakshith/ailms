# Binary search — quick reference

## Day 10 — Binary Search Fundamentals

A half-open search range [lo,hi) preserves the first possible index with value >= target. When empty, lo is the insertion boundary.

**Watch for:** Do not read a[len(a)] when target is larger than all values.

## Day 11 — Binary Search on Answers

Search a monotonic feasibility predicate rather than array indices. A higher processing speed never needs more time.

**Watch for:** Use integer ceiling arithmetic and ensure a feasible upper bound.

## Day 12 — Binary Search: Advanced Variants

A peak exists on the uphill side of a strict adjacent slope under the no-equal-neighbors assumption.

**Watch for:** The loop must stop before reading mid+1 beyond the range.

## Day 13 — Binary Search + Prefix Sums

A tails array records the smallest possible final value for each length of increasing subsequence. Binary search replaces tails without claiming tails itself is a subsequence.

**Watch for:** Use lower bound for strictly increasing, upper bound for nondecreasing.
