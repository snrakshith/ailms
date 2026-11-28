# Trees & binary search trees

Study in this order; each section contains an independent lesson.

# Day 21 — Tree Traversals & Basics

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA06-L01`

## Learning objectives

- Explain the mechanism behind Day 21 — Tree Traversals & Basics.
- Implement or demonstrate: Compute tree depth using recursion.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Tree DFS defines what a node returns to its parent. Depth is one plus maximum child depth; empty has depth zero.

## Worked example

A root with one leaf has depth two.

## Common failure mode

Count nodes versus edges explicitly; recursion may exceed stack limit.

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

def depth(root):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Compute tree depth using recursion.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `depth` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `depth` correct, and what are its time and space costs?
2. What failure should you watch for in Day 21 — Tree Traversals & Basics, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #104 — Easy (as printed)
- LeetCode #226 — Easy (as printed)
- LeetCode #543 — Easy (as printed)
- LeetCode #110 — Easy (as printed)
- LeetCode #100 — Easy (as printed)
- LeetCode #572 — Easy (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 22 — Tree BFS — Level-by-Level Processing

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA06-L02`

## Learning objectives

- Explain the mechanism behind Day 22 — Tree BFS — Level-by-Level Processing.
- Implement or demonstrate: Return grouped level-order traversal.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Snapshot the queue length before processing a level; appended children belong to the next level.

## Worked example

Root 1 with children 2 and 3 gives [[1],[2,3]].

## Common failure mode

Iterating until the queue is empty mixes levels.

## Complexity and assumptions

O(n) time, O(w) queue plus output. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def levels(root):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Return grouped level-order traversal.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `levels` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `levels` correct, and what are its time and space costs?
2. What failure should you watch for in Day 22 — Tree BFS — Level-by-Level Processing, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #102 — Medium (as printed)
- LeetCode #103 — Medium (as printed)
- LeetCode #199 — Medium (as printed)
- LeetCode #116 — Medium (as printed)
- LeetCode #117 — Medium (as printed)
- LeetCode #993 — Easy (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 23 — Tree DFS — Path and Sum Problems

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA06-L03`

## Learning objectives

- Explain the mechanism behind Day 23 — Tree DFS — Path and Sum Problems.
- Implement or demonstrate: Return whether any root-to-leaf path equals target.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Root-to-leaf paths require a leaf check; pass remaining target downward. A matching internal node alone is not enough.

## Worked example

Root 1 with child 2: target 1 fails, target 3 succeeds.

## Common failure mode

Treat a missing child as failure, not as a zero-valued leaf.

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

def path_sum(root, t):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Return whether any root-to-leaf path equals target.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `path_sum` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `path_sum` correct, and what are its time and space costs?
2. What failure should you watch for in Day 23 — Tree DFS — Path and Sum Problems, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #112 — Easy (as printed)
- LeetCode #113 — Medium (as printed)
- LeetCode #437 — Medium (as printed)
- LeetCode #124 — Hard (as printed)
- LeetCode #129 — Medium (as printed)
- LeetCode #257 — Easy (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 24 — Tree: Lowest Common Ancestor & Construction

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA06-L04`

## Learning objectives

- Explain the mechanism behind Day 24 — Tree: Lowest Common Ancestor & Construction.
- Implement or demonstrate: Reconstruct a tree from consistent unique traversals.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

For distinct node values, preorder identifies the root and an inorder position splits the subtree. Index bounds avoid slicing.

## Worked example

Preorder [2,1,3], inorder [1,2,3] gives root 2.

## Common failure mode

Duplicate values make this reconstruction ambiguous without identity data.

## Complexity and assumptions

O(n) expected time, O(n) index map and stack. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def build_tree(pre, ino):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Reconstruct a tree from consistent unique traversals.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `build_tree` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `build_tree` correct, and what are its time and space costs?
2. What failure should you watch for in Day 24 — Tree: Lowest Common Ancestor & Construction, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #236 — Medium (as printed)
- LeetCode #235 — Medium (as printed)
- LeetCode #105 — Medium (as printed)
- LeetCode #106 — Medium (as printed)
- LeetCode #297 — Hard (as printed)
- LeetCode #1123 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 25 — Binary Search Trees

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA06-L05`

## Learning objectives

- Explain the mechanism behind Day 25 — Binary Search Trees.
- Implement or demonstrate: Validate a strict binary search tree.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

BST validity is global: each node must satisfy every ancestral lower and upper bound, not only its immediate parent.

## Worked example

Root 5 with left child 3 whose right child is 6 is invalid.

## Common failure mode

Use strict bounds if duplicates are disallowed.

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

def valid_bst(root):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Validate a strict binary search tree.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `valid_bst` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `valid_bst` correct, and what are its time and space costs?
2. What failure should you watch for in Day 25 — Binary Search Trees, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #98 — Medium (as printed)
- LeetCode #230 — Medium (as printed)
- LeetCode #538 — Medium (as printed)
- LeetCode #450 — Medium (as printed)
- LeetCode #701 — Medium (as printed)
- LeetCode #669 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 26 — Tree: Advanced DFS Patterns

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA06-L06`

## Learning objectives

- Explain the mechanism behind Day 26 — Tree: Advanced DFS Patterns.
- Implement or demonstrate: Count good nodes in a tree.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

A top-down DFS carries the maximum value on the root-to-node path. A node is good if its value is at least that maximum.

## Worked example

Root 3, left 1, right 4: two good nodes.

## Common failure mode

Do not share one mutable maximum across sibling paths.

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

def good_nodes(root):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Count good nodes in a tree.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `good_nodes` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `good_nodes` correct, and what are its time and space costs?
2. What failure should you watch for in Day 26 — Tree: Advanced DFS Patterns, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #968 — Hard (as printed)
- LeetCode #1448 — Medium (as printed)
- LeetCode #366 — Medium (as printed)
- LeetCode #863 — Medium (as printed)
- LeetCode #987 — Hard (as printed)
- LeetCode #1110 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.

---

# Day 27 — Trees: Revision & Hard Problems

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA06-L07`

## Learning objectives

- Explain the mechanism behind Day 27 — Trees: Revision & Hard Problems.
- Implement or demonstrate: Maximum independent-set weight on a binary tree, permitting empty selection.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Tree DP returns mutually exclusive states. If a node is selected, its children must be skipped; otherwise choose the better state for each child.

## Worked example

Root 3 with children 4,5: best is 9.

## Common failure mode

Using a global visited flag loses independent subtree choices.

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

def rob_tree(root):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise

Maximum independent-set weight on a binary tree, permitting empty selection.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `rob_tree` correct, and what are its time and space costs?

## Knowledge check

1. What invariant or recurrence makes `rob_tree` correct, and what are its time and space costs?
2. What failure should you watch for in Day 27 — Trees: Revision & Hard Problems, and how would you detect or prevent it?

## Review resources

- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)

- LeetCode #337 — Medium (as printed)
- LeetCode #222 — Medium (as printed)
- LeetCode #958 — Medium (as printed)
- LeetCode #114 — Medium (as printed)
- LeetCode #1008 — Medium (as printed)
- LeetCode #652 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
