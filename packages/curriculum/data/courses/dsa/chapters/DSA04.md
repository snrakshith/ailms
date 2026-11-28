# Stack & monotonic stack

Study in this order; each section contains an independent lesson.

# Day 14 — Stack Fundamentals

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA04-L01`

## Learning objectives
- Explain the mechanism behind Day 14 — Stack Fundamentals.
- Implement or demonstrate: Validate a string of bracket characters.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A stack holds unmatched opening symbols. A closing symbol must match the most recent opening.

## Worked example
([)] fails because ) appears while [ is on top.

## Common failure mode
Check for an empty stack before popping and require emptiness at finish.

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

def brackets(s):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Validate a string of bracket characters.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `brackets` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `brackets` correct, and what are its time and space costs?
2. What failure should you watch for in Day 14 — Stack Fundamentals, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #20 — Easy (as printed)
- LeetCode #394 — Medium (as printed)
- LeetCode #71 — Medium (as printed)
- LeetCode #155 — Medium (as printed)
- LeetCode #150 — Medium (as printed)
- LeetCode #227 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 15 — Monotonic Stack

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA04-L02`

## Learning objectives
- Explain the mechanism behind Day 15 — Monotonic Stack.
- Implement or demonstrate: Return number of days until a warmer temperature.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A decreasing stack stores indices whose next strictly greater value is unknown. Each index is pushed and popped at most once.

## Worked example
[73,74,72,76] yields waits [1,2,1,0].

## Common failure mode
Store indices, not values, to compute distances; equal values are not warmer.

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

def warmer(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Return number of days until a warmer temperature.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `warmer` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `warmer` correct, and what are its time and space costs?
2. What failure should you watch for in Day 15 — Monotonic Stack, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #496 — Easy (as printed)
- LeetCode #503 — Medium (as printed)
- LeetCode #739 — Medium (as printed)
- LeetCode #901 — Medium (as printed)
- LeetCode #85 — Hard (as printed)
- LeetCode #402 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 16 — Monotonic Stack: Advanced Applications

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA04-L03`

## Learning objectives
- Explain the mechanism behind Day 16 — Monotonic Stack: Advanced Applications.
- Implement or demonstrate: Compute sum of minimums of all nonempty subarrays, exact integer.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Subarray-minimum contribution counts choices of left and right boundary for which each element is the designated minimum. Break ties asymmetrically.

## Worked example
[2,2] has total minimum sum 6, not 8.

## Common failure mode
Using strict comparisons on both sides double counts duplicates.

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

def sum_mins(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Compute sum of minimums of all nonempty subarrays, exact integer.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `sum_mins` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `sum_mins` correct, and what are its time and space costs?
2. What failure should you watch for in Day 16 — Monotonic Stack: Advanced Applications, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #42 — Hard (as printed)
- LeetCode #907 — Medium (as printed)
- LeetCode #1856 — Medium (as printed)
- LeetCode #456 — Medium (as printed)
- LeetCode #1019 — Medium (as printed)
- LeetCode #84 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
