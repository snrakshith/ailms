# Two pointers & sliding window

Study in this order; each section contains an independent lesson.

# Day 6 — Two Pointers Fundamentals

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA02-L01`

## Learning objectives

- Explain the mechanism behind Day 6 — Two Pointers Fundamentals.
- Implement or demonstrate: Return zero-based indices in sorted input or None.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

For a sorted pair sum, a sum below target eliminates the left value paired with any remaining right value; a high sum eliminates the right value.

## Worked example

[1,3,5,8], target 8: 1+8 too high; 1+5 low; 3+5 works.

## Common failure mode

Sorting destroys original indices unless tracked.

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

def sorted_pair(a, target):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Return zero-based indices in sorted input or None.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `sorted_pair` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `sorted_pair` correct, and what are its time and space costs?
2. What failure should you watch for in Day 6 — Two Pointers Fundamentals, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #167 — Medium (as printed)
- LeetCode #125 — Easy (as printed)
- LeetCode #680 — Easy (as printed)
- LeetCode #11 — Medium (as printed)
- LeetCode #16 — Medium (as printed)
- LeetCode #844 — Easy (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 7 — Two Pointers: In-Place Modifications

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA02-L02`

## Learning objectives

- Explain the mechanism behind Day 7 — Two Pointers: In-Place Modifications.
- Implement or demonstrate: Move zeroes to the end in place, preserving relative order.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Maintain a write index for the accepted prefix while a read index scans all values. The unprocessed suffix is irrelevant.

## Worked example

[0,1,0,3] becomes [1,3,0,0].

## Common failure mode

Avoid losing the original order of nonzero values.

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

def move_zeroes(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Move zeroes to the end in place, preserving relative order.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `move_zeroes` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `move_zeroes` correct, and what are its time and space costs?
2. What failure should you watch for in Day 7 — Two Pointers: In-Place Modifications, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #26 — Easy (as printed)
- LeetCode #80 — Medium (as printed)
- LeetCode #27 — Easy (as printed)
- LeetCode #283 — Easy (as printed)
- LeetCode #905 — Easy (as printed)
- LeetCode #977 — Easy (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 8 — Sliding Window: Fixed Size

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA02-L03`

## Learning objectives

- Explain the mechanism behind Day 8 — Sliding Window: Fixed Size.
- Implement or demonstrate: Return maximum sum among windows of size k.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

A fixed-width window changes by one outgoing and one incoming value each step. Updating a running sum avoids recomputation.

## Worked example

[1,4,2,8] with k=2 gives sums 5,6,10.

## Common failure mode

Validate 1 <= k <= n before taking the first window.

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

def fixed_window(a, k):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Return maximum sum among windows of size k.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `fixed_window` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `fixed_window` correct, and what are its time and space costs?
2. What failure should you watch for in Day 8 — Sliding Window: Fixed Size, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #643 — Easy (as printed)
- LeetCode #1052 — Medium (as printed)
- LeetCode #1343 — Medium (as printed)
- LeetCode #567 — Medium (as printed)
- LeetCode #438 — Medium (as printed)
- LeetCode #1876 — Easy (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 9 — Sliding Window: Variable Size

**Level:** beginner · **Estimated time:** 105 min · **ID:** `DSA02-L04`

## Learning objectives

- Explain the mechanism behind Day 9 — Sliding Window: Variable Size.
- Implement or demonstrate: Find longest substring without duplicate characters.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

A variable window maintains a constraint. For unique characters, jump the left boundary past a duplicate only if it lies in the current window.

## Worked example

abba: the second b advances left to 2; final a must not move left backwards.

## Common failure mode

Stale last-seen indices must not shrink left backwards.

## Complexity and assumptions

O(n) expected time, O(min(n, alphabet)) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def unique_window(s):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Find longest substring without duplicate characters.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `unique_window` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `unique_window` correct, and what are its time and space costs?
2. What failure should you watch for in Day 9 — Sliding Window: Variable Size, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #3 — Medium (as printed)
- LeetCode #76 — Hard (as printed)
- LeetCode #424 — Medium (as printed)
- LeetCode #904 — Medium (as printed)
- LeetCode #1004 — Medium (as printed)
- LeetCode #1838 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
