# Bit manipulation & math

Study in this order; each section contains an independent lesson.

# Day 56 — Bit Manipulation

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA13-L01`

## Learning objectives
- Explain the mechanism behind Day 56 — Bit Manipulation.
- Implement or demonstrate: Find one unpaired integer using XOR.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
XOR is associative, commutative and cancels equal pairs. A unique value remains if every other value appears exactly twice.

## Worked example
[4,1,4,2,2] returns 1.

## Common failure mode
The guarantee fails for arbitrary occurrence counts.

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

def single_number(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Find one unpaired integer using XOR.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `single_number` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `single_number` correct, and what are its time and space costs?
2. What failure should you watch for in Day 56 — Bit Manipulation, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #136 — Easy (as printed)
- LeetCode #137 — Medium (as printed)
- LeetCode #260 — Medium (as printed)
- LeetCode #338 — Easy (as printed)
- LeetCode #191 — Easy (as printed)
- LeetCode #190 — Easy (as printed)
- LeetCode #268 — Easy (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 57 — Math & Number Theory

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA13-L02`

## Learning objectives
- Explain the mechanism behind Day 57 — Math & Number Theory.
- Implement or demonstrate: Compute integer power for nonnegative exponent.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Binary exponentiation squares the base while consuming exponent bits, multiplying the accumulator on set bits.

## Worked example
3^13 = 3^8 · 3^4 · 3.

## Common failure mode
Negative exponents require reciprocal handling; the lab uses nonnegative exponents.

## Complexity and assumptions
O(log exponent) multiplications, O(1) variables (big-int cost excluded). Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def power(a, n):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Compute integer power for nonnegative exponent.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `power` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `power` correct, and what are its time and space costs?
2. What failure should you watch for in Day 57 — Math & Number Theory, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #204 — Medium (as printed)
- LeetCode #372 — Medium (as printed)
- LeetCode #365 — Medium (as printed)
- LeetCode #858 — Medium (as printed)
- LeetCode #1015 — Medium (as printed)
- LeetCode #50 — Medium (as printed)
- LeetCode #149 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
