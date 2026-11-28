# Linked lists & caches

Study in this order; each section contains an independent lesson.

# Day 17 — Linked Lists: Fundamentals

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA05-L01`

## Learning objectives
- Explain the mechanism behind Day 17 — Linked Lists: Fundamentals.
- Implement or demonstrate: Reverse a singly linked list represented by node objects.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A linked-list reversal preserves the next pointer before changing the current link; the reversed prefix and untouched suffix form a partition.

## Worked example
1→2→3 becomes 3→2→1.

## Common failure mode
Changing next before saving it loses the remaining list.

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

def reverse_list(head):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Reverse a singly linked list represented by node objects.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `reverse_list` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `reverse_list` correct, and what are its time and space costs?
2. What failure should you watch for in Day 17 — Linked Lists: Fundamentals, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #206 — Easy (as printed)
- LeetCode #21 — Easy (as printed)
- LeetCode #141 — Easy (as printed)
- LeetCode #142 — Medium (as printed)
- LeetCode #876 — Easy (as printed)
- LeetCode #19 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 18 — Linked Lists: Reversal Patterns

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA05-L02`

## Learning objectives
- Explain the mechanism behind Day 18 — Linked Lists: Reversal Patterns.
- Implement or demonstrate: Reverse a valid 1-based inclusive sublist.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A dummy node allows uniform rewiring even when the segment begins at the head. Move each node after the segment head to the front of the segment.

## Worked example
1→2→3→4, reverse positions 2..3: 1→3→2→4.

## Common failure mode
Keep the segment tail fixed during head insertion.

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

def reverse_between(head, left, right):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Reverse a valid 1-based inclusive sublist.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `reverse_between` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `reverse_between` correct, and what are its time and space costs?
2. What failure should you watch for in Day 18 — Linked Lists: Reversal Patterns, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #92 — Medium (as printed)
- LeetCode #25 — Hard (as printed)
- LeetCode #234 — Easy (as printed)
- LeetCode #143 — Medium (as printed)
- LeetCode #61 — Medium (as printed)
- LeetCode #24 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 19 — Linked Lists: Merging & Advanced

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA05-L03`

## Learning objectives
- Explain the mechanism behind Day 19 — Linked Lists: Merging & Advanced.
- Implement or demonstrate: Merge k sorted lists of integers into a new list.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A heap provides the smallest current head among k sorted streams. After extracting it, advance only that stream.

## Worked example
[[1,4],[2,3],[]] becomes [1,2,3,4].

## Common failure mode
Heap entries need a tie-breaker when payloads are not comparable.

## Complexity and assumptions
O(N log(k+1)) time, O(k) auxiliary space plus output. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def merge_k(lists):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Merge k sorted lists of integers into a new list.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `merge_k` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `merge_k` correct, and what are its time and space costs?
2. What failure should you watch for in Day 19 — Linked Lists: Merging & Advanced, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #23 — Hard (as printed)
- LeetCode #148 — Medium (as printed)
- LeetCode #82 — Medium (as printed)
- LeetCode #86 — Medium (as printed)
- LeetCode #138 — Medium (as printed)
- LeetCode #160 — Easy (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 20 — Linked Lists: Review + LRU/LFU

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA05-L04`

## Learning objectives
- Explain the mechanism behind Day 20 — Linked Lists: Review + LRU/LFU.
- Implement or demonstrate: Implement get/put LRU using OrderedDict; compare DLL+map in notes.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Recency ordering and key lookup are independent responsibilities. An ordered map can model LRU with fast lookup and move-to-end.

## Worked example
Capacity 2: insert a,b, read a, insert c; b is evicted.

## Common failure mode
Updates also count as accesses; handle capacity zero.

## Complexity and assumptions
O(1) expected per operation, O(capacity) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

class lru:

    def __init__(self, capacity):
        raise NotImplementedError()

    def get(self, key):
        raise NotImplementedError()

    def put(self, key, value):
        raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Implement get/put LRU using OrderedDict; compare DLL+map in notes.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `lru` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `lru` correct, and what are its time and space costs?
2. What failure should you watch for in Day 20 — Linked Lists: Review + LRU/LFU, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #146 — Medium (as printed)
- LeetCode #432 — Hard (as printed)
- LeetCode #460 — Hard (as printed)
- LeetCode #445 — Medium (as printed)
- LeetCode #2 — Medium (as printed)
- LeetCode #430 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
