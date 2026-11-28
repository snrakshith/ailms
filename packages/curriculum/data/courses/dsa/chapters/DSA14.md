# Interview sprint

Study in this order; each section contains an independent lesson.

# Day 58 — Mixed Hard Problems: Pattern Identification Under Pressure

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA14-L01`

## Learning objectives

- Explain the mechanism behind Day 58 — Mixed Hard Problems: Pattern Identification Under Pressure.
- Implement or demonstrate: Find first missing positive integer, mutating input.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Cyclic placement maps each positive value v in 1..n to index v-1. Each successful swap permanently places at least one value.

## Worked example

[3,4,-1,1] returns 2.

## Common failure mode

Duplicate values can cause infinite swaps without an equality guard.

## Complexity and assumptions

O(n) time, O(1) auxiliary space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def missing_positive(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Find first missing positive integer, mutating input.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `missing_positive` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `missing_positive` correct, and what are its time and space costs?
2. What failure should you watch for in Day 58 — Mixed Hard Problems: Pattern Identification Under Pressure, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #295 — Hard (as printed)
- LeetCode #68 — Hard (as printed)
- LeetCode #41 — Hard (as printed)
- LeetCode #218 — Hard (as printed)
- LeetCode #233 — Hard (as printed)
- LeetCode #4 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 59 — Company-Specific Problems: Google, Microsoft, Adobe Focus

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA14-L02`

## Learning objectives

- Explain the mechanism behind Day 59 — Company-Specific Problems: Google, Microsoft, Adobe Focus.
- Implement or demonstrate: Maximize profit from nonoverlapping positive-duration jobs.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Weighted interval scheduling sorts by finish time; binary search finds the count of compatible earlier jobs; DP chooses take or skip.

## Worked example

Jobs (1,3,5),(2,5,7),(3,6,8) yield 13.

## Common failure mode

For half-open jobs, end <= start is compatible; ensure search only earlier jobs.

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

def job_profit(jobs):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Maximize profit from nonoverlapping positive-duration jobs.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `job_profit` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `job_profit` correct, and what are its time and space costs?
2. What failure should you watch for in Day 59 — Company-Specific Problems: Google, Microsoft, Adobe Focus, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #843 — Hard (as printed)
- LeetCode #1229 — Medium (as printed)
- LeetCode #760 — Easy (as printed)
- LeetCode #146 — Medium (as printed)
- LeetCode #1650 — Medium (as printed)
- LeetCode #1235 — Hard (as printed)
- LeetCode #939 — Medium (as printed)
- LeetCode #1060 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 60 — Final Review: Booking.com, Intuit, MoEngage Focus + Revision

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA14-L03`

## Learning objectives

- Explain the mechanism behind Day 60 — Final Review: Booking.com, Intuit, MoEngage Focus + Revision.
- Implement or demonstrate: Return k most frequent integers ordered by descending frequency then ascending value.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Top-k frequency combines counting with a size-k heap or bucket grouping; ties need a declared rule.

## Worked example

[4,4,3,3,2], k=1 returns 3 using smaller-value tie break.

## Common failure mode

Do not assume the order of equal-frequency elements is unique.

## Complexity and assumptions

O(n+u log u) time, O(u) space for sort-based solution. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def top_frequency(a, k):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Return k most frequent integers ordered by descending frequency then ascending value.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `top_frequency` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `top_frequency` correct, and what are its time and space costs?
2. What failure should you watch for in Day 60 — Final Review: Booking.com, Intuit, MoEngage Focus + Revision, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #1268 — Medium (as printed)
- LeetCode #759 — Hard (as printed)
- LeetCode #253 — Medium (as printed)
- LeetCode #188 — Hard (as printed)
- LeetCode #1029 — Medium (as printed)
- LeetCode #218 — Hard (as printed)
- LeetCode #146 — Medium (as printed)
- LeetCode #347 — Medium (as printed)
- LeetCode #621 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
