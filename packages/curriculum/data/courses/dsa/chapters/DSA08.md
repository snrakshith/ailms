# Graph traversal and algorithms

Study in this order; each section contains an independent lesson.

# Day 30 — Graph BFS & DFS Fundamentals

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA08-L01`

## Learning objectives
- Explain the mechanism behind Day 30 — Graph BFS & DFS Fundamentals.
- Implement or demonstrate: Count 4-connected islands without mutating the grid.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A flood fill marks each grid cell when discovered. Restart only from an unvisited land cell to count components.

## Worked example
Grid [[1,0],[0,1]] has two 4-connected islands.

## Common failure mode
Marking after dequeue allows duplicate enqueues.

## Complexity and assumptions
O(rc) time, O(rc) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def islands(g):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Count 4-connected islands without mutating the grid.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `islands` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `islands` correct, and what are its time and space costs?
2. What failure should you watch for in Day 30 — Graph BFS & DFS Fundamentals, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #200 — Medium (as printed)
- LeetCode #695 — Medium (as printed)
- LeetCode #133 — Medium (as printed)
- LeetCode #417 — Medium (as printed)
- LeetCode #130 — Medium (as printed)
- LeetCode #1020 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 31 — Graph BFS: Shortest Path (Unweighted)

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA08-L02`

## Learning objectives
- Explain the mechanism behind Day 31 — Graph BFS: Shortest Path (Unweighted).
- Implement or demonstrate: Compute distance from nearest source in an adjacency list.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Multi-source BFS seeds all sources at distance zero and expands layer by layer. First discovery is shortest in an unweighted graph.

## Worked example
Sources 0 and 4 on a chain yield distances [0,1,2,1,0].

## Common failure mode
Do not run independent BFS from every target.

## Complexity and assumptions
O(V+E) time, O(V) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def multi_bfs(g, sources):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Compute distance from nearest source in an adjacency list.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `multi_bfs` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `multi_bfs` correct, and what are its time and space costs?
2. What failure should you watch for in Day 31 — Graph BFS: Shortest Path (Unweighted), and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #994 — Medium (as printed)
- LeetCode #1162 — Medium (as printed)
- LeetCode #127 — Hard (as printed)
- LeetCode #126 — Hard (as printed)
- LeetCode #542 — Medium (as printed)
- LeetCode #1926 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 32 — Graph: Union Find (Disjoint Set Union)

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA08-L03`

## Learning objectives
- Explain the mechanism behind Day 32 — Graph: Union Find (Disjoint Set Union).
- Implement or demonstrate: Implement DSU with count of connected components.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Disjoint sets store parent forests. Path compression flattens search paths; union by size limits height.

## Worked example
Union (0,1), then (1,2); find(0)==find(2).

## Common failure mode
Only roots should be linked; duplicate unions must not decrement components.

## Complexity and assumptions
Amortized O(α(n)) per operation, O(n) space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

class dsu:

    def __init__(self, n):
        raise NotImplementedError()

    def find(self, x):
        raise NotImplementedError()

    def union(self, a, b):
        raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Implement DSU with count of connected components.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `dsu` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `dsu` correct, and what are its time and space costs?
2. What failure should you watch for in Day 32 — Graph: Union Find (Disjoint Set Union), and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #547 — Medium (as printed)
- LeetCode #684 — Medium (as printed)
- LeetCode #685 — Hard (as printed)
- LeetCode #1135 — Medium (as printed)
- LeetCode #959 — Medium (as printed)
- LeetCode #990 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 33 — Graph: Topological Sort

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA08-L04`

## Learning objectives
- Explain the mechanism behind Day 33 — Graph: Topological Sort.
- Implement or demonstrate: Return a topological order or None if cyclic.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Kahn's algorithm starts with zero indegree vertices and removes outgoing edges. Remaining vertices after the queue empties imply a cycle.

## Worked example
0→1→2 gives [0,1,2]; 0↔1 fails.

## Common failure mode
Include isolated vertices and count duplicate edges consistently.

## Complexity and assumptions
O(V+E) time, O(V+E) space including adjacency. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def topo(n, edges):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Return a topological order or None if cyclic.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `topo` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `topo` correct, and what are its time and space costs?
2. What failure should you watch for in Day 33 — Graph: Topological Sort, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #207 — Medium (as printed)
- LeetCode #210 — Medium (as printed)
- LeetCode #269 — Hard (as printed)
- LeetCode #310 — Medium (as printed)
- LeetCode #444 — Medium (as printed)
- LeetCode #2115 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 34 — Graph: Dijkstra & Shortest Weighted Path

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA08-L05`

## Learning objectives
- Explain the mechanism behind Day 34 — Graph: Dijkstra & Shortest Weighted Path.
- Implement or demonstrate: Compute shortest distances, leaving unreachable nodes infinite.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Dijkstra settles the smallest tentative distance when weights are nonnegative. Lazy heap entries with stale distances are ignored.

## Worked example
0→1 weight 5, 0→2 weight 1, 2→1 weight 1 gives distance 2 to 1.

## Common failure mode
Negative weights break the settled-distance proof.

## Complexity and assumptions
O((V+E) log(V+E)) time, O(V+E) auxiliary worst case. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def dijkstra(g, s):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Compute shortest distances, leaving unreachable nodes infinite.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `dijkstra` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `dijkstra` correct, and what are its time and space costs?
2. What failure should you watch for in Day 34 — Graph: Dijkstra & Shortest Weighted Path, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #743 — Medium (as printed)
- LeetCode #1631 — Medium (as printed)
- LeetCode #787 — Medium (as printed)
- LeetCode #1514 — Medium (as printed)
- LeetCode #778 — Medium (as printed)
- LeetCode #1976 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 35 — Graph: Advanced — Cycles, Bridges, Components

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA08-L06`

## Learning objectives
- Explain the mechanism behind Day 35 — Graph: Advanced — Cycles, Bridges, Components.
- Implement or demonstrate: Find bridges in an undirected simple graph.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
DFS discovery time and low-link track whether a descendant can reach an ancestor without the parent edge. A tree edge is a bridge if low[child] > tin[parent].

## Worked example
Triangle plus tail edge 2-3: only 2-3 is a bridge.

## Common failure mode
Parent edge IDs matter in multigraphs; the lab assumes simple graph.

## Complexity and assumptions
O(V+E) time, O(V+E) space including adjacency. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def bridges(n, edges):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Find bridges in an undirected simple graph.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `bridges` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `bridges` correct, and what are its time and space costs?
2. What failure should you watch for in Day 35 — Graph: Advanced — Cycles, Bridges, Components, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #261 — Medium (as printed)
- LeetCode #323 — Medium (as printed)
- LeetCode #1059 — Medium (as printed)
- LeetCode #1192 — Hard (as printed)
- LeetCode #332 — Hard (as printed)
- LeetCode #753 — Hard (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.


---

# Day 36 — Graph: Grid-Based Problems & Review

**Level:** intermediate · **Estimated time:** 105 min · **ID:** `DSA08-L07`

## Learning objectives
- Explain the mechanism behind Day 36 — Graph: Grid-Based Problems & Review.
- Implement or demonstrate: Find shortest 4-neighbor path allowing k blocked-cell entries, with open endpoints.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
A grid search may need state beyond coordinates. For obstacle elimination, remaining budget is part of the vertex.

## Worked example
A blocked direct route can be valid with one elimination.

## Common failure mode
Visited keyed only by cell may discard a better remaining-budget state.

## Complexity and assumptions
O(rc(k+1)) time and space. Auxiliary space excludes output where noted. Explain why the invariant holds and when it fails.

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

def grid_budget(g, k):
    raise NotImplementedError()
```

Executable reference: see lab and solution files.

## Hands-on exercise
Find shortest 4-neighbor path allowing k blocked-cell entries, with open endpoints.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: What invariant or recurrence makes `grid_budget` correct, and what are its time and space costs?

## Knowledge check
1. What invariant or recurrence makes `grid_budget` correct, and what are its time and space costs?
2. What failure should you watch for in Day 36 — Graph: Grid-Based Problems & Review, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/library/
- https://leetcode.com/problemset/

## Source-aligned practice (after the lab)
- LeetCode #286 — Medium (as printed)
- LeetCode #1091 — Medium (as printed)
- LeetCode #934 — Medium (as printed)
- LeetCode #1293 — Hard (as printed)
- LeetCode #490 — Medium (as printed)
- LeetCode #505 — Medium (as printed)

Attempt first without answers; record time, approach, complexity and Green/Yellow/Red status. IDs refer to the attached source; exercise statements are not republished.
