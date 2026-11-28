# Greedy and intervals — quick reference

## Day 53 — Greedy Fundamentals

Greedy reachability maintains farthest reachable index; if next index is beyond it no future index can be reached.

**Watch for:** Do not extend reach from unreachable positions.

## Day 54 — Intervals

Sort intervals by start; merge when next start is at most current end for closed intervals.

**Watch for:** Meeting scheduling usually uses half-open intervals, so touching semantics differ.

## Day 55 — Greedy: Advanced Scheduling & Task Problems

For maximum number of courses by deadline, process deadlines in order and remove longest duration if total exceeds deadline.

**Watch for:** Heap stores durations, not deadlines; justify exchange argument.
