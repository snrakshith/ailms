# Interview sprint — quick reference

## Day 58 — Mixed Hard Problems: Pattern Identification Under Pressure

Cyclic placement maps each positive value v in 1..n to index v-1. Each successful swap permanently places at least one value.

**Watch for:** Duplicate values can cause infinite swaps without an equality guard.

## Day 59 — Company-Specific Problems: Google, Microsoft, Adobe Focus

Weighted interval scheduling sorts by finish time; binary search finds the count of compatible earlier jobs; DP chooses take or skip.

**Watch for:** For half-open jobs, end <= start is compatible; ensure search only earlier jobs.

## Day 60 — Final Review: Booking.com, Intuit, MoEngage Focus + Revision

Top-k frequency combines counting with a size-k heap or bucket grouping; ties need a declared rule.

**Watch for:** Do not assume the order of equal-frequency elements is unique.
