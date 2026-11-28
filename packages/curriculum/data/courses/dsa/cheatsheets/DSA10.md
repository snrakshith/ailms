# DP foundations and grids — quick reference

## Day 41 — 1D DP: Linear State

Linear DP summarizes the best solution up to a position. Nonadjacent choices compare skipping current versus taking current plus best two positions back.

**Watch for:** Updating the previous state too early changes the recurrence.

## Day 42 — 1D DP: Subsequences

Subsequence DP asks which earlier indices can precede the current item; the best predecessor determines dp[i].

**Watch for:** A subsequence need not be contiguous; use strict comparison.

## Day 43 — DP: 0/1 Knapsack Pattern

0/1 knapsack uses each item at most once. Descending capacity order prevents reusing a newly updated state in the same iteration.

**Watch for:** Ascending capacity turns the recurrence into unbounded knapsack.

## Day 44 — 2D DP: Strings

Edit distance uses prefixes as states. Each cell compares insertion, deletion, substitution or a free match.

**Watch for:** Initialize empty-prefix costs; substitution cost is zero for equal characters.

## Day 45 — 2D DP: Grids and Paths

Grid path DP adds paths from top and left, resetting blocked cells to zero. One row is enough because previous row values persist.

**Watch for:** If start is blocked the initial value must become zero.
