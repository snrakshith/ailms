# Arrays & hashing — quick reference

## Day 1 — Arrays Basics & HashMap Introduction

Hash maps trade memory for expected constant-time membership; look up the complement before inserting the current value so an index is never reused.

**Watch for:** Store indices rather than just values; duplicate values may be necessary.

## Day 2 — HashMap Deep Dive & Prefix Sums

Prefix totals encode sums of contiguous ranges as differences. Count earlier prefixes equal to current total minus target; initialize the empty prefix once.

**Watch for:** A sliding window is not valid for arbitrary signed sums.

## Day 3 — Sorting Tricks & Counting Patterns

Sorting groups duplicates and introduces order. A three-way partition instead maintains less-than, equal-to and unknown regions.

**Watch for:** Advancing after swapping from the unknown right region skips data.

## Day 4 — Matrix & 2D Array Patterns

For square matrices, transposition swaps coordinates and reversing rows performs a clockwise rotation. Rectangular matrices need a different shape.

**Watch for:** Swapping every pair twice undoes the transpose.

## Day 5 — Arrays Review & Hard Problems

An unresolved histogram bar can remain on a monotone stack until a shorter bar defines its right boundary. The new stack top defines the left boundary.

**Watch for:** Flush remaining bars at the end and handle equal heights consistently.
