# DP foundations and grids

Study in this order; each section contains an independent lesson.

# Day 41 — 1D DP: Linear State

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA10-L01`

## Learning objectives
- Explain the mechanism behind Day 41 — 1D DP: Linear State.
- Implement or demonstrate: Maximum sum of nonadjacent values, allowing empty selection.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Linear DP summarizes the best solution up to a position. Nonadjacent choices compare skipping current versus taking current plus best two positions back.

## Worked example
[2,7,9,3,1] yields 12.

## Common failure mode
Updating the previous state too early changes the recurrence.

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

def rob_line(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Maximum sum of nonadjacent values, allowing empty selection.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `rob_line` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `rob_line` correct, and what are its time and space costs?
2. What failure should you watch for in Day 41 — 1D DP: Linear State, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #70 — Easy (as printed)
- LeetCode #198 — Medium (as printed)
- LeetCode #213 — Medium (as printed)
- LeetCode #746 — Easy (as printed)
- LeetCode #91 — Medium (as printed)
- LeetCode #322 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 42 — 1D DP: Subsequences

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA10-L02`

## Learning objectives
- Explain the mechanism behind Day 42 — 1D DP: Subsequences.
- Implement or demonstrate: Implement quadratic LIS for comparison with Day 13.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Subsequence DP asks which earlier indices can precede the current item; the best predecessor determines dp[i].

## Worked example
[3,1,2,4] has length 3.

## Common failure mode
A subsequence need not be contiguous; use strict comparison.

## Complexity and assumptions
O(n²) time, O(n) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def lis_dp(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Implement quadratic LIS for comparison with Day 13.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `lis_dp` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `lis_dp` correct, and what are its time and space costs?
2. What failure should you watch for in Day 42 — 1D DP: Subsequences, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #300 — Medium (as printed)
- LeetCode #674 — Easy (as printed)
- LeetCode #673 — Medium (as printed)
- LeetCode #1143 — Medium (as printed)
- LeetCode #368 — Medium (as printed)
- LeetCode #376 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 43 — DP: 0/1 Knapsack Pattern

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA10-L03`

## Learning objectives
- Explain the mechanism behind Day 43 — DP: 0/1 Knapsack Pattern.
- Implement or demonstrate: Return best total value within integer capacity.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
0/1 knapsack uses each item at most once. Descending capacity order prevents reusing a newly updated state in the same iteration.

## Worked example
Weights [2,3], values [3,4], capacity 4: best 4.

## Common failure mode
Ascending capacity turns the recurrence into unbounded knapsack.

## Complexity and assumptions
O(nW) time, O(W) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def knapsack(weights, values, W):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Return best total value within integer capacity.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `knapsack` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `knapsack` correct, and what are its time and space costs?
2. What failure should you watch for in Day 43 — DP: 0/1 Knapsack Pattern, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #416 — Medium (as printed)
- LeetCode #494 — Medium (as printed)
- LeetCode #474 — Medium (as printed)
- LeetCode #518 — Medium (as printed)
- LeetCode #1049 — Medium (as printed)
- LeetCode #879 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 44 — 2D DP: Strings

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA10-L04`

## Learning objectives
- Explain the mechanism behind Day 44 — 2D DP: Strings.
- Implement or demonstrate: Compute Levenshtein distance.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Edit distance uses prefixes as states. Each cell compares insertion, deletion, substitution or a free match.

## Worked example
cat→cut needs one substitution.

## Common failure mode
Initialize empty-prefix costs; substitution cost is zero for equal characters.

## Complexity and assumptions
O(mn) time, O(n) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def edit_distance(a, b):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Compute Levenshtein distance.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `edit_distance` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `edit_distance` correct, and what are its time and space costs?
2. What failure should you watch for in Day 44 — 2D DP: Strings, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #1143 — Medium (as printed)
- LeetCode #72 — Hard (as printed)
- LeetCode #115 — Hard (as printed)
- LeetCode #583 — Medium (as printed)
- LeetCode #1092 — Hard (as printed)
- LeetCode #97 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 45 — 2D DP: Grids and Paths

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA10-L05`

## Learning objectives
- Explain the mechanism behind Day 45 — 2D DP: Grids and Paths.
- Implement or demonstrate: Count down/right paths in grid with obstacles.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Grid path DP adds paths from top and left, resetting blocked cells to zero. One row is enough because previous row values persist.

## Worked example
2×2 open grid has two paths; block top-right and one remains.

## Common failure mode
If start is blocked the initial value must become zero.

## Complexity and assumptions
O(rc) time, O(c) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def grid_paths(g):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Count down/right paths in grid with obstacles.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `grid_paths` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `grid_paths` correct, and what are its time and space costs?
2. What failure should you watch for in Day 45 — 2D DP: Grids and Paths, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #62 — Medium (as printed)
- LeetCode #63 — Medium (as printed)
- LeetCode #64 — Medium (as printed)
- LeetCode #174 — Hard (as printed)
- LeetCode #741 — Hard (as printed)
- LeetCode #1463 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
