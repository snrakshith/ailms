# Greedy and intervals

Study in this order; each section contains an independent lesson.

# Day 53 — Greedy Fundamentals

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA12-L01`

## Learning objectives

- Explain the mechanism behind Day 53 — Greedy Fundamentals.
- Implement or demonstrate: Decide if last index is reachable with nonnegative jump limits.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Greedy reachability maintains farthest reachable index; if next index is beyond it no future index can be reached.

## Worked example

[3,2,1,0,4] fails; [2,0,1] succeeds.

## Common failure mode

Do not extend reach from unreachable positions.

## Complexity and assumptions

O(n) time, O(1) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

## Implementation snippet

Try the lab before opening the solution.

```python
from collections import Counter, deque, OrderedDict
from bisect import bisect_left, bisect_right
from heapq import heappush, heappop
from dataclasses import dataclass
from math import inf


@dataclass
class ListNode:
    val:int
    next:object=None

@dataclass
class TreeNode:
    val:int
    left:object=None
    right:object=None

def can_jump(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Decide if last index is reachable with nonnegative jump limits.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `can_jump` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `can_jump` correct, and what are its time and space costs?
2. What failure should you watch for in Day 53 — Greedy Fundamentals, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #455 — Easy (as printed)
- LeetCode #860 — Easy (as printed)
- LeetCode #135 — Hard (as printed)
- LeetCode #406 — Medium (as printed)
- LeetCode #45 — Medium (as printed)
- LeetCode #55 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 54 — Intervals

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA12-L02`

## Learning objectives

- Explain the mechanism behind Day 54 — Intervals.
- Implement or demonstrate: Merge closed intervals into sorted disjoint intervals.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Sort intervals by start; merge when next start is at most current end for closed intervals.

## Worked example

[1,3],[2,4],[6,7] yields [1,4],[6,7].

## Common failure mode

Meeting scheduling usually uses half-open intervals, so touching semantics differ.

## Complexity and assumptions

O(n log n) time, O(n) output and sort space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

## Implementation snippet

Try the lab before opening the solution.

```python
from collections import Counter, deque, OrderedDict
from bisect import bisect_left, bisect_right
from heapq import heappush, heappop
from dataclasses import dataclass
from math import inf


@dataclass
class ListNode:
    val:int
    next:object=None

@dataclass
class TreeNode:
    val:int
    left:object=None
    right:object=None

def merge_intervals(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Merge closed intervals into sorted disjoint intervals.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `merge_intervals` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `merge_intervals` correct, and what are its time and space costs?
2. What failure should you watch for in Day 54 — Intervals, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #56 — Medium (as printed)
- LeetCode #57 — Medium (as printed)
- LeetCode #435 — Medium (as printed)
- LeetCode #452 — Medium (as printed)
- LeetCode #253 — Medium (as printed)
- LeetCode #1851 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 55 — Greedy: Advanced Scheduling & Task Problems

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA12-L03`

## Learning objectives

- Explain the mechanism behind Day 55 — Greedy: Advanced Scheduling & Task Problems.
- Implement or demonstrate: Maximize count of courses with durations and deadlines.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

For maximum number of courses by deadline, process deadlines in order and remove longest duration if total exceeds deadline.

## Worked example

(3,3),(2,4),(1,5): replacing 3 allows two courses.

## Common failure mode

Heap stores durations, not deadlines; justify exchange argument.

## Complexity and assumptions

O(n log n) time, O(n) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

## Implementation snippet

Try the lab before opening the solution.

```python
from collections import Counter, deque, OrderedDict
from bisect import bisect_left, bisect_right
from heapq import heappush, heappop
from dataclasses import dataclass
from math import inf


@dataclass
class ListNode:
    val:int
    next:object=None

@dataclass
class TreeNode:
    val:int
    left:object=None
    right:object=None

def schedule_courses(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Maximize count of courses with durations and deadlines.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `schedule_courses` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `schedule_courses` correct, and what are its time and space costs?
2. What failure should you watch for in Day 55 — Greedy: Advanced Scheduling & Task Problems, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #621 — Medium (as printed)
- LeetCode #1353 — Medium (as printed)
- LeetCode #1665 — Hard (as printed)
- LeetCode #630 — Hard (as printed)
- LeetCode #1029 — Medium (as printed)
- LeetCode #1710 — Easy (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
