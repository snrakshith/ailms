# Binary search

Study in this order; each section contains an independent lesson.

# Day 10 — Binary Search Fundamentals

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA03-L01`

## Learning objectives
- Explain the mechanism behind Day 10 — Binary Search Fundamentals.
- Implement or demonstrate: Implement lower bound, including empty arrays.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A half-open search range [lo,hi) preserves the first possible index with value >= target. When empty, lo is the insertion boundary.

## Worked example
[1,3,3,7], target 3 returns 1; target 9 returns 4.

## Common failure mode
Do not read a[len(a)] when target is larger than all values.

## Complexity and assumptions
O(log n) time, O(1) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def lower_bound(a, t):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Implement lower bound, including empty arrays.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `lower_bound` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `lower_bound` correct, and what are its time and space costs?
2. What failure should you watch for in Day 10 — Binary Search Fundamentals, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #704 — Easy (as printed)
- LeetCode #35 — Easy (as printed)
- LeetCode #34 — Medium (as printed)
- LeetCode #153 — Medium (as printed)
- LeetCode #33 — Medium (as printed)
- LeetCode #81 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 11 — Binary Search on Answers

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA03-L02`

## Learning objectives
- Explain the mechanism behind Day 11 — Binary Search on Answers.
- Implement or demonstrate: Find minimum integer speed with sum ceil(pile/speed) <= hours.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Search a monotonic feasibility predicate rather than array indices. A higher processing speed never needs more time.

## Worked example
Piles [3,6,7,11], 8 hours: speed 4 is feasible, 3 is not.

## Common failure mode
Use integer ceiling arithmetic and ensure a feasible upper bound.

## Complexity and assumptions
O(n log max(pile)) time, O(1) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def min_speed(a, hours):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Find minimum integer speed with sum ceil(pile/speed) <= hours.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `min_speed` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `min_speed` correct, and what are its time and space costs?
2. What failure should you watch for in Day 11 — Binary Search on Answers, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #875 — Medium (as printed)
- LeetCode #1011 — Medium (as printed)
- LeetCode #410 — Hard (as printed)
- LeetCode #774 — Hard (as printed)
- LeetCode #1283 — Medium (as printed)
- LeetCode #2064 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 12 — Binary Search: Advanced Variants

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA03-L03`

## Learning objectives
- Explain the mechanism behind Day 12 — Binary Search: Advanced Variants.
- Implement or demonstrate: Find any peak index in nonempty data with distinct neighbors.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A peak exists on the uphill side of a strict adjacent slope under the no-equal-neighbors assumption.

## Worked example
[1,4,3,2] moves left toward index 1.

## Common failure mode
The loop must stop before reading mid+1 beyond the range.

## Complexity and assumptions
O(log n) time, O(1) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def peak(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Find any peak index in nonempty data with distinct neighbors.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `peak` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `peak` correct, and what are its time and space costs?
2. What failure should you watch for in Day 12 — Binary Search: Advanced Variants, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #162 — Medium (as printed)
- LeetCode #74 — Medium (as printed)
- LeetCode #240 — Medium (as printed)
- LeetCode #658 — Medium (as printed)
- LeetCode #719 — Hard (as printed)
- LeetCode #4 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 13 — Binary Search + Prefix Sums

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA03-L04`

## Learning objectives
- Explain the mechanism behind Day 13 — Binary Search + Prefix Sums.
- Implement or demonstrate: Return length of longest strictly increasing subsequence.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A tails array records the smallest possible final value for each length of increasing subsequence. Binary search replaces tails without claiming tails itself is a subsequence.

## Worked example
[3,5,2,4,6] ends with tails [2,4,6].

## Common failure mode
Use lower bound for strictly increasing, upper bound for nondecreasing.

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

def lis(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Return length of longest strictly increasing subsequence.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `lis` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `lis` correct, and what are its time and space costs?
2. What failure should you watch for in Day 13 — Binary Search + Prefix Sums, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #378 — Medium (as printed)
- LeetCode #668 — Hard (as printed)
- LeetCode #1201 — Medium (as printed)
- LeetCode #793 — Hard (as printed)
- LeetCode #354 — Hard (as printed)
- LeetCode #300 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
