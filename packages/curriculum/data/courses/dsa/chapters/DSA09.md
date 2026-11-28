# Backtracking

Study in this order; each section contains an independent lesson.

# Day 37 — Backtracking Fundamentals

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA09-L01`

## Learning objectives

- Explain the mechanism behind Day 37 — Backtracking Fundamentals.
- Implement or demonstrate: Enumerate subsets of distinct items.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Each subset branches on inclusion or exclusion; copying the current path at a leaf isolates output from later mutations.

## Worked example

[1,2] produces [],[2],[1],[1,2] in exclude-first order.

## Common failure mode

Appending the same list object corrupts earlier answers.

## Complexity and assumptions

O(n 2^n) output time and space; O(n) stack. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def subsets(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Enumerate subsets of distinct items.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `subsets` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `subsets` correct, and what are its time and space costs?
2. What failure should you watch for in Day 37 — Backtracking Fundamentals, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #78 — Medium (as printed)
- LeetCode #90 — Medium (as printed)
- LeetCode #77 — Medium (as printed)
- LeetCode #39 — Medium (as printed)
- LeetCode #40 — Medium (as printed)
- LeetCode #216 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 38 — Backtracking: Permutations & String Problems

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA09-L02`

## Learning objectives

- Explain the mechanism behind Day 38 — Backtracking: Permutations & String Problems.
- Implement or demonstrate: Generate all permutations of distinct integers.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Permutations choose an unused index each level. Backtracking restores both path and used status.

## Worked example

[1,2,3] has six orderings.

## Common failure mode

Duplicate values require a separate skip strategy; this lab assumes distinct values.

## Complexity and assumptions

O(n·n!) output time and space; O(n) working space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def permutations(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Generate all permutations of distinct integers.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `permutations` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `permutations` correct, and what are its time and space costs?
2. What failure should you watch for in Day 38 — Backtracking: Permutations & String Problems, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #46 — Medium (as printed)
- LeetCode #47 — Medium (as printed)
- LeetCode #784 — Medium (as printed)
- LeetCode #17 — Medium (as printed)
- LeetCode #22 — Medium (as printed)
- LeetCode #320 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 39 — Backtracking: Grid and Board Problems

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA09-L03`

## Learning objectives

- Explain the mechanism behind Day 39 — Backtracking: Grid and Board Problems.
- Implement or demonstrate: Test whether a word exists along 4-neighbor cells without reuse.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Board search marks cells on the current path, not globally. Undo the mark on return so other starts remain possible.

## Worked example

Board AB/CD contains ABD along adjacent cells.

## Common failure mode

Failure to restore visited on return rejects valid alternate paths.

## Complexity and assumptions

O(rc·4^L) upper bound, O(L) recursion/visited. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def word_search(g, word):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Test whether a word exists along 4-neighbor cells without reuse.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `word_search` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `word_search` correct, and what are its time and space costs?
2. What failure should you watch for in Day 39 — Backtracking: Grid and Board Problems, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #79 — Medium (as printed)
- LeetCode #51 — Hard (as printed)
- LeetCode #52 — Hard (as printed)
- LeetCode #37 — Hard (as printed)
- LeetCode #980 — Hard (as printed)
- LeetCode #489 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 40 — Backtracking: Palindromes, Partitions & IP Addresses

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA09-L04`

## Learning objectives

- Explain the mechanism behind Day 40 — Backtracking: Palindromes, Partitions & IP Addresses.
- Implement or demonstrate: Enumerate palindrome partitions.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Partitioning considers every next cut; palindrome checks prune invalid pieces before recursion.

## Worked example

aab gives [a,a,b] and [aa,b].

## Common failure mode

Memoizing solely by index is fine for decision/count but not a mutable output path.

## Complexity and assumptions

O(n²·2^n) loose upper bound, O(n) stack plus output. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def pal_parts(s):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Enumerate palindrome partitions.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `pal_parts` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `pal_parts` correct, and what are its time and space costs?
2. What failure should you watch for in Day 40 — Backtracking: Palindromes, Partitions & IP Addresses, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #131 — Medium (as printed)
- LeetCode #132 — Hard (as printed)
- LeetCode #93 — Medium (as printed)
- LeetCode #140 — Hard (as printed)
- LeetCode #139 — Medium (as printed)
- LeetCode #282 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
