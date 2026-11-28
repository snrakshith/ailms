# Advanced dynamic programming

Study in this order; each section contains an independent lesson.

# Day 46 — DP: Interval DP

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA11-L01`

## Learning objectives
- Explain the mechanism behind Day 46 — DP: Interval DP.
- Implement or demonstrate: Maximize burst-balloon score for nonnegative values.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Interval DP chooses a final action whose neighbors are known after the interior is solved. In burst balloons, the last balloon splits independent intervals.

## Worked example
[3,1,5,8] yields 167.

## Common failure mode
Choosing the first burst does not preserve fixed interval neighbors.

## Complexity and assumptions
O(n³) time, O(n²) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def burst(a):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Maximize burst-balloon score for nonnegative values.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `burst` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `burst` correct, and what are its time and space costs?
2. What failure should you watch for in Day 46 — DP: Interval DP, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #312 — Hard (as printed)
- LeetCode #1000 — Hard (as printed)
- LeetCode #516 — Medium (as printed)
- LeetCode #647 — Medium (as printed)
- LeetCode #5 — Medium (as printed)
- LeetCode #87 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 47 — DP: Decision Making (Stock Problems)

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA11-L02`

## Learning objectives
- Explain the mechanism behind Day 47 — DP: Decision Making (Stock Problems).
- Implement or demonstrate: Maximize unlimited-transaction profit with fee and no overlapping holdings.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Stock DP describes held and cash states, with transitions using the previous day's values. Fees apply only to a sale in this convention.

## Worked example
Prices [1,3,2,8,4,9], fee 2 yields 8.

## Common failure mode
Avoid unintended same-day state dependencies by saving old values.

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

def stock_fee(a, fee):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Maximize unlimited-transaction profit with fee and no overlapping holdings.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `stock_fee` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `stock_fee` correct, and what are its time and space costs?
2. What failure should you watch for in Day 47 — DP: Decision Making (Stock Problems), and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #121 — Easy (as printed)
- LeetCode #122 — Medium (as printed)
- LeetCode #123 — Hard (as printed)
- LeetCode #188 — Hard (as printed)
- LeetCode #309 — Medium (as printed)
- LeetCode #714 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 48 — DP: Counting and Probability

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA11-L03`

## Learning objectives
- Explain the mechanism behind Day 48 — DP: Counting and Probability.
- Implement or demonstrate: Count structurally distinct BSTs on n ordered keys.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Catalan counting multiplies independent left and right subtree choices for each root then sums over roots.

## Worked example
n=3 has five distinct BST shapes.

## Common failure mode
Use dp[0]=1 for the empty tree; otherwise all products vanish.

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

def catalan(n):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Count structurally distinct BSTs on n ordered keys.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `catalan` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `catalan` correct, and what are its time and space costs?
2. What failure should you watch for in Day 48 — DP: Counting and Probability, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #96 — Medium (as printed)
- LeetCode #95 — Medium (as printed)
- LeetCode #688 — Medium (as printed)
- LeetCode #935 — Medium (as printed)
- LeetCode #576 — Medium (as printed)
- LeetCode #1269 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 49 — DP: Advanced String Patterns

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA11-L04`

## Learning objectives
- Explain the mechanism behind Day 49 — DP: Advanced String Patterns.
- Implement or demonstrate: Implement full-string glob matching for literals, ? and *.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Glob wildcard DP distinguishes ? (one character) and * (zero or more arbitrary characters). Regex star has different semantics.

## Worked example
abef matches a*f; ab does not match a?c.

## Common failure mode
Do not use a regex recurrence for glob wildcard matching.

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

def wildcard(s, p):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Implement full-string glob matching for literals, ? and *.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `wildcard` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `wildcard` correct, and what are its time and space costs?
2. What failure should you watch for in Day 49 — DP: Advanced String Patterns, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #10 — Hard (as printed)
- LeetCode #44 — Hard (as printed)
- LeetCode #392 — Easy (as printed)
- LeetCode #115 — Hard (as printed)
- LeetCode #1092 — Hard (as printed)
- LeetCode #1062 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 50 — DP: Trees and DAGs

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA11-L05`

## Learning objectives
- Explain the mechanism behind Day 50 — DP: Trees and DAGs.
- Implement or demonstrate: Compute binary-tree diameter in edges.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Tree DP combines child heights and records the best diameter crossing any node. Height counts nodes; diameter counts edges.

## Worked example
Three-node chain has diameter 2.

## Common failure mode
Returning diameter instead of height breaks parent computation.

## Complexity and assumptions
O(n) time, O(h) stack. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def diameter(root):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Compute binary-tree diameter in edges.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `diameter` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `diameter` correct, and what are its time and space costs?
2. What failure should you watch for in Day 50 — DP: Trees and DAGs, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #337 — Medium (as printed)
- LeetCode #968 — Hard (as printed)
- LeetCode #1245 — Medium (as printed)
- LeetCode #543 — Easy (as printed)
- LeetCode #124 — Hard (as printed)
- LeetCode #1339 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 51 — DP: Bitmask DP

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA11-L06`

## Learning objectives
- Explain the mechanism behind Day 51 — DP: Bitmask DP.
- Implement or demonstrate: Find minimum walk length visiting every node in an undirected graph.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A bitmask encodes visited vertices and BFS explores (vertex,mask). All starting vertices can seed distance zero.

## Worked example
A chain of 3 nodes requires two edges to visit all nodes.

## Common failure mode
Do not mark only vertices; same vertex with different mask is distinct.

## Complexity and assumptions
O((V+E)2^V) time, O(V2^V) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def visit_all(g):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Find minimum walk length visiting every node in an undirected graph.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `visit_all` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `visit_all` correct, and what are its time and space costs?
2. What failure should you watch for in Day 51 — DP: Bitmask DP, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #847 — Hard (as printed)
- LeetCode #691 — Hard (as printed)
- LeetCode #1125 — Hard (as printed)
- LeetCode #1494 — Hard (as printed)
- LeetCode #943 — Hard (as printed)
- LeetCode #526 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 52 — DP: Mixed Review & Hard Consolidation

**Level:** advanced · **Estimated time:** 105 min · **ID:** `DSA11-L07`

## Learning objectives
- Explain the mechanism behind Day 52 — DP: Mixed Review & Hard Consolidation.
- Implement or demonstrate: Find longest contiguous valid-parenthesis substring.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A stack of unmatched opening indices and a sentinel for the last invalid boundary can compute longest valid parentheses.

## Worked example
)()()) yields length 4.

## Common failure mode
When popping empties the stack, current index becomes new boundary.

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

def longest_parens(s):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Find longest contiguous valid-parenthesis substring.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `longest_parens` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `longest_parens` correct, and what are its time and space costs?
2. What failure should you watch for in Day 52 — DP: Mixed Review & Hard Consolidation, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #32 — Hard (as printed)
- LeetCode #1411 — Hard (as printed)
- LeetCode #629 — Hard (as printed)
- LeetCode #1866 — Hard (as printed)
- LeetCode #1531 — Hard (as printed)
- LeetCode #174 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
