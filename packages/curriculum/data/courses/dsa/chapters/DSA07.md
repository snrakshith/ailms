# Tries & priority queues

Study in this order; each section contains an independent lesson.

# Day 28 — Tries

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA07-L01`

## Learning objectives
- Explain the mechanism behind Day 28 — Tries.
- Implement or demonstrate: Implement insert, exact search and prefix search.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A trie shares prefix paths and records terminal markers separately from child maps.

## Worked example
Insert cat: ca is a prefix but is not a stored word.

## Common failure mode
An empty dictionary at a leaf is not sufficient to represent terminal status.

## Complexity and assumptions
O(m) per operation, O(total characters) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

class trie:

    def __init__(self):
        raise NotImplementedError()

    def insert(self, word):
        raise NotImplementedError()

    def _walk(self, s):
        raise NotImplementedError()

    def search(self, s):
        raise NotImplementedError()

    def starts_with(self, s):
        raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Implement insert, exact search and prefix search.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `trie` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `trie` correct, and what are its time and space costs?
2. What failure should you watch for in Day 28 — Tries, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #208 — Medium (as printed)
- LeetCode #211 — Medium (as printed)
- LeetCode #212 — Hard (as printed)
- LeetCode #1268 — Medium (as printed)
- LeetCode #336 — Hard (as printed)
- LeetCode #421 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 29 — Heaps & Priority Queues

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA07-L02`

## Learning objectives
- Explain the mechanism behind Day 29 — Heaps & Priority Queues.
- Implement or demonstrate: Maintain online median for nonempty integer stream.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Two heaps partition a stream into lower and upper halves, with sizes differing by at most one and ordered boundary values.

## Worked example
Insert 3,1,2: medians 3,2,2.

## Common failure mode
Python heapq is a min-heap; negate lower-half values.

## Complexity and assumptions
O(log n) insert, O(1) median, O(n) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

class median_stream:

    def __init__(self):
        raise NotImplementedError()

    def add(self, x):
        raise NotImplementedError()

    def median(self):
        raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Maintain online median for nonempty integer stream.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `median_stream` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `median_stream` correct, and what are its time and space costs?
2. What failure should you watch for in Day 29 — Heaps & Priority Queues, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #215 — Medium (as printed)
- LeetCode #703 — Easy (as printed)
- LeetCode #295 — Hard (as printed)
- LeetCode #973 — Medium (as printed)
- LeetCode #1046 — Easy (as printed)
- LeetCode #621 — Medium (as printed)
- LeetCode #23 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
