# Arrays & hashing

Study in this order; each section contains an independent lesson.

# Day 1 — Arrays Basics & HashMap Introduction

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA01-L01`

## Learning objectives
- Explain the mechanism behind Day 1 — Arrays Basics & HashMap Introduction.
- Implement or demonstrate: Return two distinct indices for a target sum.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Hash maps trade memory for expected constant-time membership; look up the complement before inserting the current value so an index is never reused.

## Worked example
For [4,1,7] and target 8, seeing 7 matches the earlier 1.

## Common failure mode
Store indices rather than just values; duplicate values may be necessary.

## Complexity and assumptions
O(n) expected time, O(n) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def two_sum(a, target):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Return two distinct indices for a target sum.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `two_sum` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `two_sum` correct, and what are its time and space costs?
2. What failure should you watch for in Day 1 — Arrays Basics & HashMap Introduction, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #1 — Easy (as printed)
- LeetCode #217 — Easy (as printed)
- LeetCode #242 — Easy (as printed)
- LeetCode #49 — Medium (as printed)
- LeetCode #347 — Medium (as printed)
- LeetCode #238 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 2 — HashMap Deep Dive & Prefix Sums

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA01-L02`

## Learning objectives
- Explain the mechanism behind Day 2 — HashMap Deep Dive & Prefix Sums.
- Implement or demonstrate: Count subarrays with sum k, including negative elements.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Prefix totals encode sums of contiguous ranges as differences. Count earlier prefixes equal to current total minus target; initialize the empty prefix once.

## Worked example
[2,-2,2] has three subarrays summing to 2.

## Common failure mode
A sliding window is not valid for arbitrary signed sums.

## Complexity and assumptions
O(n) expected time, O(n) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def subarray_count(a, k):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Count subarrays with sum k, including negative elements.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `subarray_count` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `subarray_count` correct, and what are its time and space costs?
2. What failure should you watch for in Day 2 — HashMap Deep Dive & Prefix Sums, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #560 — Medium (as printed)
- LeetCode #523 — Medium (as printed)
- LeetCode #525 — Medium (as printed)
- LeetCode #128 — Medium (as printed)
- LeetCode #659 — Medium (as printed)
- LeetCode #41 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 3 — Sorting Tricks & Counting Patterns

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA01-L03`

## Learning objectives
- Explain the mechanism behind Day 3 — Sorting Tricks & Counting Patterns.
- Implement or demonstrate: Partition an array containing only 0,1,2 in place.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Sorting groups duplicates and introduces order. A three-way partition instead maintains less-than, equal-to and unknown regions.

## Worked example
For [2,0,1,2,0], swap 2 to the end, then re-examine the incoming value.

## Common failure mode
Advancing after swapping from the unknown right region skips data.

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

def sort_colors(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Partition an array containing only 0,1,2 in place.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `sort_colors` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `sort_colors` correct, and what are its time and space costs?
2. What failure should you watch for in Day 3 — Sorting Tricks & Counting Patterns, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #15 — Medium (as printed)
- LeetCode #18 — Medium (as printed)
- LeetCode #75 — Medium (as printed)
- LeetCode #280 — Medium (as printed)
- LeetCode #315 — Hard (as printed)
- LeetCode #324 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 4 — Matrix & 2D Array Patterns

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA01-L04`

## Learning objectives
- Explain the mechanism behind Day 4 — Matrix & 2D Array Patterns.
- Implement or demonstrate: Rotate a square matrix clockwise without another matrix.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
For square matrices, transposition swaps coordinates and reversing rows performs a clockwise rotation. Rectangular matrices need a different shape.

## Worked example
[[1,2],[3,4]] becomes [[3,1],[4,2]].

## Common failure mode
Swapping every pair twice undoes the transpose.

## Complexity and assumptions
O(n²) time, O(1) auxiliary space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def rotate(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Rotate a square matrix clockwise without another matrix.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `rotate` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `rotate` correct, and what are its time and space costs?
2. What failure should you watch for in Day 4 — Matrix & 2D Array Patterns, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #48 — Medium (as printed)
- LeetCode #54 — Medium (as printed)
- LeetCode #73 — Medium (as printed)
- LeetCode #304 — Medium (as printed)
- LeetCode #289 — Medium (as printed)
- LeetCode #36 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 5 — Arrays Review & Hard Problems

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA01-L05`

## Learning objectives
- Explain the mechanism behind Day 5 — Arrays Review & Hard Problems.
- Implement or demonstrate: Compute largest histogram rectangle.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
An unresolved histogram bar can remain on a monotone stack until a shorter bar defines its right boundary. The new stack top defines the left boundary.

## Worked example
Heights [2,1,2] have maximum rectangle area 3.

## Common failure mode
Flush remaining bars at the end and handle equal heights consistently.

## Complexity and assumptions
O(n) time, O(n) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def histogram(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Compute largest histogram rectangle.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `histogram` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `histogram` correct, and what are its time and space costs?
2. What failure should you watch for in Day 5 — Arrays Review & Hard Problems, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #42 — Hard (as printed)
- LeetCode #84 — Hard (as printed)
- LeetCode #239 — Hard (as printed)
- LeetCode #169 — Easy (as printed)
- LeetCode #229 — Medium (as printed)
- LeetCode #134 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
