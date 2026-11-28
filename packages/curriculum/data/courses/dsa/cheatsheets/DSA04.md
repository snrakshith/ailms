# Stack & monotonic stack — quick reference

## Day 14 — Stack Fundamentals
A stack holds unmatched opening symbols. A closing symbol must match the most recent opening.

**Watch for:** Check for an empty stack before popping and require emptiness at finish.


## Day 15 — Monotonic Stack
A decreasing stack stores indices whose next strictly greater value is unknown. Each index is pushed and popped at most once.

**Watch for:** Store indices, not values, to compute distances; equal values are not warmer.


## Day 16 — Monotonic Stack: Advanced Applications
Subarray-minimum contribution counts choices of left and right boundary for which each element is the designated minimum. Break ties asymmetrically.

**Watch for:** Using strict comparisons on both sides double counts duplicates.
