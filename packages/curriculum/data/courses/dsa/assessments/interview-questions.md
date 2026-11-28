# Interview preparation

### Walk through Python for problem solving. Give a concrete scenario and justify your approach and failure handling.

Use list, dict, set, tuple, deque and heapq. Python lists support amortized O(1) append, but popping the front shifts items. Dictionaries require hashable keys. A queue uses deque.popleft rather than list.pop(0). Mutating a list while iterating can skip items.

### Walk through Big-O and amortized analysis. Give a concrete scenario and justify your approach and failure handling.

Count work as input size grows; distinguish worst, average and amortized bounds. Nested loops are not necessarily quadratic if the inner pointer advances monotonically. Auxiliary space excludes input/output unless stated. Doubling n roughly doubles a linear scan but quadruples a full pair enumeration. Time measurements alone cannot prove asymptotic bounds.

### Walk through Recursion, invariants and correctness. Give a concrete scenario and justify your approach and failure handling.

An invariant is true before and after every loop iteration; termination plus postcondition proves correctness. Recursion needs a decreasing measure, base case and correct subproblem contract. For sum of prefix, recurse on length n-1, base n=0. Missing base case or nondecreasing argument can overflow the stack.

### Walk through Testing and interview habits. Give a concrete scenario and justify your approach and failure handling.

Clarify constraints, derive brute force, optimize, state invariant, code and trace edge cases. Use assertion tests and compare optimized results with brute force on tiny random inputs. Two-sum with repeated values tests whether the same index is reused. Only testing the example misses empty, duplicate and boundary inputs.

### Walk through Day 1 — Arrays Basics & HashMap Introduction. Give a concrete scenario and justify your approach and failure handling.

Hash maps trade memory for expected constant-time membership; look up the complement before inserting the current value so an index is never reused. For [4,1,7] and target 8, seeing 7 matches the earlier 1. Store indices rather than just values; duplicate values may be necessary. O(n) expected time, O(n) space

### Walk through Day 2 — HashMap Deep Dive & Prefix Sums. Give a concrete scenario and justify your approach and failure handling.

Prefix totals encode sums of contiguous ranges as differences. Count earlier prefixes equal to current total minus target; initialize the empty prefix once. [2,-2,2] has three subarrays summing to 2. A sliding window is not valid for arbitrary signed sums. O(n) expected time, O(n) space

### Walk through Day 3 — Sorting Tricks & Counting Patterns. Give a concrete scenario and justify your approach and failure handling.

Sorting groups duplicates and introduces order. A three-way partition instead maintains less-than, equal-to and unknown regions. For [2,0,1,2,0], swap 2 to the end, then re-examine the incoming value. Advancing after swapping from the unknown right region skips data. O(n) time, O(1) auxiliary space

### Walk through Day 4 — Matrix & 2D Array Patterns. Give a concrete scenario and justify your approach and failure handling.

For square matrices, transposition swaps coordinates and reversing rows performs a clockwise rotation. Rectangular matrices need a different shape. [[1,2],[3,4]] becomes [[3,1],[4,2]]. Swapping every pair twice undoes the transpose. O(n²) time, O(1) auxiliary space

### Walk through Day 5 — Arrays Review & Hard Problems. Give a concrete scenario and justify your approach and failure handling.

An unresolved histogram bar can remain on a monotone stack until a shorter bar defines its right boundary. The new stack top defines the left boundary. Heights [2,1,2] have maximum rectangle area 3. Flush remaining bars at the end and handle equal heights consistently. O(n) time, O(n) space

### Walk through Day 6 — Two Pointers Fundamentals. Give a concrete scenario and justify your approach and failure handling.

For a sorted pair sum, a sum below target eliminates the left value paired with any remaining right value; a high sum eliminates the right value. [1,3,5,8], target 8: 1+8 too high; 1+5 low; 3+5 works. Sorting destroys original indices unless tracked. O(n) time, O(1) space

### Walk through Day 7 — Two Pointers: In-Place Modifications. Give a concrete scenario and justify your approach and failure handling.

Maintain a write index for the accepted prefix while a read index scans all values. The unprocessed suffix is irrelevant. [0,1,0,3] becomes [1,3,0,0]. Avoid losing the original order of nonzero values. O(n) time, O(1) space

### Walk through Day 8 — Sliding Window: Fixed Size. Give a concrete scenario and justify your approach and failure handling.

A fixed-width window changes by one outgoing and one incoming value each step. Updating a running sum avoids recomputation. [1,4,2,8] with k=2 gives sums 5,6,10. Validate 1 <= k <= n before taking the first window. O(n) time, O(1) space

### Walk through Day 9 — Sliding Window: Variable Size. Give a concrete scenario and justify your approach and failure handling.

A variable window maintains a constraint. For unique characters, jump the left boundary past a duplicate only if it lies in the current window. abba: the second b advances left to 2; final a must not move left backwards. Stale last-seen indices must not shrink left backwards. O(n) expected time, O(min(n, alphabet)) space

### Walk through Day 10 — Binary Search Fundamentals. Give a concrete scenario and justify your approach and failure handling.

A half-open search range [lo,hi) preserves the first possible index with value >= target. When empty, lo is the insertion boundary. [1,3,3,7], target 3 returns 1; target 9 returns 4. Do not read a[len(a)] when target is larger than all values. O(log n) time, O(1) space

### Walk through Day 11 — Binary Search on Answers. Give a concrete scenario and justify your approach and failure handling.

Search a monotonic feasibility predicate rather than array indices. A higher processing speed never needs more time. Piles [3,6,7,11], 8 hours: speed 4 is feasible, 3 is not. Use integer ceiling arithmetic and ensure a feasible upper bound. O(n log max(pile)) time, O(1) space

### Walk through Day 12 — Binary Search: Advanced Variants. Give a concrete scenario and justify your approach and failure handling.

A peak exists on the uphill side of a strict adjacent slope under the no-equal-neighbors assumption. [1,4,3,2] moves left toward index 1. The loop must stop before reading mid+1 beyond the range. O(log n) time, O(1) space

### Walk through Day 13 — Binary Search + Prefix Sums. Give a concrete scenario and justify your approach and failure handling.

A tails array records the smallest possible final value for each length of increasing subsequence. Binary search replaces tails without claiming tails itself is a subsequence. [3,5,2,4,6] ends with tails [2,4,6]. Use lower bound for strictly increasing, upper bound for nondecreasing. O(n log n) time, O(n) space

### Walk through Day 14 — Stack Fundamentals. Give a concrete scenario and justify your approach and failure handling.

A stack holds unmatched opening symbols. A closing symbol must match the most recent opening. ([)] fails because ) appears while [ is on top. Check for an empty stack before popping and require emptiness at finish. O(n) time, O(n) space

### Walk through Day 15 — Monotonic Stack. Give a concrete scenario and justify your approach and failure handling.

A decreasing stack stores indices whose next strictly greater value is unknown. Each index is pushed and popped at most once. [73,74,72,76] yields waits [1,2,1,0]. Store indices, not values, to compute distances; equal values are not warmer. O(n) time, O(n) space

### Walk through Day 16 — Monotonic Stack: Advanced Applications. Give a concrete scenario and justify your approach and failure handling.

Subarray-minimum contribution counts choices of left and right boundary for which each element is the designated minimum. Break ties asymmetrically. [2,2] has total minimum sum 6, not 8. Using strict comparisons on both sides double counts duplicates. O(n) time, O(n) space

### Walk through Day 17 — Linked Lists: Fundamentals. Give a concrete scenario and justify your approach and failure handling.

A linked-list reversal preserves the next pointer before changing the current link; the reversed prefix and untouched suffix form a partition. 1→2→3 becomes 3→2→1. Changing next before saving it loses the remaining list. O(n) time, O(1) auxiliary space

### Walk through Day 18 — Linked Lists: Reversal Patterns. Give a concrete scenario and justify your approach and failure handling.

A dummy node allows uniform rewiring even when the segment begins at the head. Move each node after the segment head to the front of the segment. 1→2→3→4, reverse positions 2..3: 1→3→2→4. Keep the segment tail fixed during head insertion. O(n) time, O(1) space

### Walk through Day 19 — Linked Lists: Merging & Advanced. Give a concrete scenario and justify your approach and failure handling.

A heap provides the smallest current head among k sorted streams. After extracting it, advance only that stream. [[1,4],[2,3],[]] becomes [1,2,3,4]. Heap entries need a tie-breaker when payloads are not comparable. O(N log(k+1)) time, O(k) auxiliary space plus output

### Walk through Day 20 — Linked Lists: Review + LRU/LFU. Give a concrete scenario and justify your approach and failure handling.

Recency ordering and key lookup are independent responsibilities. An ordered map can model LRU with fast lookup and move-to-end. Capacity 2: insert a,b, read a, insert c; b is evicted. Updates also count as accesses; handle capacity zero. O(1) expected per operation, O(capacity) space

### Walk through Day 21 — Tree Traversals & Basics. Give a concrete scenario and justify your approach and failure handling.

Tree DFS defines what a node returns to its parent. Depth is one plus maximum child depth; empty has depth zero. A root with one leaf has depth two. Count nodes versus edges explicitly; recursion may exceed stack limit. O(n) time, O(h) stack

### Walk through Day 22 — Tree BFS — Level-by-Level Processing. Give a concrete scenario and justify your approach and failure handling.

Snapshot the queue length before processing a level; appended children belong to the next level. Root 1 with children 2 and 3 gives [[1],[2,3]]. Iterating until the queue is empty mixes levels. O(n) time, O(w) queue plus output

### Walk through Day 23 — Tree DFS — Path and Sum Problems. Give a concrete scenario and justify your approach and failure handling.

Root-to-leaf paths require a leaf check; pass remaining target downward. A matching internal node alone is not enough. Root 1 with child 2: target 1 fails, target 3 succeeds. Treat a missing child as failure, not as a zero-valued leaf. O(n) time, O(h) stack

### Walk through Day 24 — Tree: Lowest Common Ancestor & Construction. Give a concrete scenario and justify your approach and failure handling.

For distinct node values, preorder identifies the root and an inorder position splits the subtree. Index bounds avoid slicing. Preorder [2,1,3], inorder [1,2,3] gives root 2. Duplicate values make this reconstruction ambiguous without identity data. O(n) expected time, O(n) index map and stack

### Walk through Day 25 — Binary Search Trees. Give a concrete scenario and justify your approach and failure handling.

BST validity is global: each node must satisfy every ancestral lower and upper bound, not only its immediate parent. Root 5 with left child 3 whose right child is 6 is invalid. Use strict bounds if duplicates are disallowed. O(n) time, O(h) stack

### Walk through Day 26 — Tree: Advanced DFS Patterns. Give a concrete scenario and justify your approach and failure handling.

A top-down DFS carries the maximum value on the root-to-node path. A node is good if its value is at least that maximum. Root 3, left 1, right 4: two good nodes. Do not share one mutable maximum across sibling paths. O(n) time, O(h) stack

### Walk through Day 27 — Trees: Revision & Hard Problems. Give a concrete scenario and justify your approach and failure handling.

Tree DP returns mutually exclusive states. If a node is selected, its children must be skipped; otherwise choose the better state for each child. Root 3 with children 4,5: best is 9. Using a global visited flag loses independent subtree choices. O(n) time, O(h) stack

### Walk through Day 28 — Tries. Give a concrete scenario and justify your approach and failure handling.

A trie shares prefix paths and records terminal markers separately from child maps. Insert cat: ca is a prefix but is not a stored word. An empty dictionary at a leaf is not sufficient to represent terminal status. O(m) per operation, O(total characters) space

### Walk through Day 29 — Heaps & Priority Queues. Give a concrete scenario and justify your approach and failure handling.

Two heaps partition a stream into lower and upper halves, with sizes differing by at most one and ordered boundary values. Insert 3,1,2: medians 3,2,2. Python heapq is a min-heap; negate lower-half values. O(log n) insert, O(1) median, O(n) space

### Walk through Day 30 — Graph BFS & DFS Fundamentals. Give a concrete scenario and justify your approach and failure handling.

A flood fill marks each grid cell when discovered. Restart only from an unvisited land cell to count components. Grid [[1,0],[0,1]] has two 4-connected islands. Marking after dequeue allows duplicate enqueues. O(rc) time, O(rc) space

### Walk through Day 31 — Graph BFS: Shortest Path (Unweighted). Give a concrete scenario and justify your approach and failure handling.

Multi-source BFS seeds all sources at distance zero and expands layer by layer. First discovery is shortest in an unweighted graph. Sources 0 and 4 on a chain yield distances [0,1,2,1,0]. Do not run independent BFS from every target. O(V+E) time, O(V) space

### Walk through Day 32 — Graph: Union Find (Disjoint Set Union). Give a concrete scenario and justify your approach and failure handling.

Disjoint sets store parent forests. Path compression flattens search paths; union by size limits height. Union (0,1), then (1,2); find(0)==find(2). Only roots should be linked; duplicate unions must not decrement components. Amortized O(α(n)) per operation, O(n) space

### Walk through Day 33 — Graph: Topological Sort. Give a concrete scenario and justify your approach and failure handling.

Kahn's algorithm starts with zero indegree vertices and removes outgoing edges. Remaining vertices after the queue empties imply a cycle. 0→1→2 gives [0,1,2]; 0↔1 fails. Include isolated vertices and count duplicate edges consistently. O(V+E) time, O(V+E) space including adjacency

### Walk through Day 34 — Graph: Dijkstra & Shortest Weighted Path. Give a concrete scenario and justify your approach and failure handling.

Dijkstra settles the smallest tentative distance when weights are nonnegative. Lazy heap entries with stale distances are ignored. 0→1 weight 5, 0→2 weight 1, 2→1 weight 1 gives distance 2 to 1. Negative weights break the settled-distance proof. O((V+E) log(V+E)) time, O(V+E) auxiliary worst case

### Walk through Day 35 — Graph: Advanced — Cycles, Bridges, Components. Give a concrete scenario and justify your approach and failure handling.

DFS discovery time and low-link track whether a descendant can reach an ancestor without the parent edge. A tree edge is a bridge if low[child] > tin[parent]. Triangle plus tail edge 2-3: only 2-3 is a bridge. Parent edge IDs matter in multigraphs; the lab assumes simple graph. O(V+E) time, O(V+E) space including adjacency

### Walk through Day 36 — Graph: Grid-Based Problems & Review. Give a concrete scenario and justify your approach and failure handling.

A grid search may need state beyond coordinates. For obstacle elimination, remaining budget is part of the vertex. A blocked direct route can be valid with one elimination. Visited keyed only by cell may discard a better remaining-budget state. O(rc(k+1)) time and space

### Walk through Day 37 — Backtracking Fundamentals. Give a concrete scenario and justify your approach and failure handling.

Each subset branches on inclusion or exclusion; copying the current path at a leaf isolates output from later mutations. [1,2] produces [],[2],[1],[1,2] in exclude-first order. Appending the same list object corrupts earlier answers. O(n 2^n) output time and space; O(n) stack

### Walk through Day 38 — Backtracking: Permutations & String Problems. Give a concrete scenario and justify your approach and failure handling.

Permutations choose an unused index each level. Backtracking restores both path and used status. [1,2,3] has six orderings. Duplicate values require a separate skip strategy; this lab assumes distinct values. O(n·n!) output time and space; O(n) working space

### Walk through Day 39 — Backtracking: Grid and Board Problems. Give a concrete scenario and justify your approach and failure handling.

Board search marks cells on the current path, not globally. Undo the mark on return so other starts remain possible. Board AB/CD contains ABD along adjacent cells. Failure to restore visited on return rejects valid alternate paths. O(rc·4^L) upper bound, O(L) recursion/visited

### Walk through Day 40 — Backtracking: Palindromes, Partitions & IP Addresses. Give a concrete scenario and justify your approach and failure handling.

Partitioning considers every next cut; palindrome checks prune invalid pieces before recursion. aab gives [a,a,b] and [aa,b]. Memoizing solely by index is fine for decision/count but not a mutable output path. O(n²·2^n) loose upper bound, O(n) stack plus output

### Walk through Day 41 — 1D DP: Linear State. Give a concrete scenario and justify your approach and failure handling.

Linear DP summarizes the best solution up to a position. Nonadjacent choices compare skipping current versus taking current plus best two positions back. [2,7,9,3,1] yields 12. Updating the previous state too early changes the recurrence. O(n) time, O(1) space

### Walk through Day 42 — 1D DP: Subsequences. Give a concrete scenario and justify your approach and failure handling.

Subsequence DP asks which earlier indices can precede the current item; the best predecessor determines dp[i]. [3,1,2,4] has length 3. A subsequence need not be contiguous; use strict comparison. O(n²) time, O(n) space

### Walk through Day 43 — DP: 0/1 Knapsack Pattern. Give a concrete scenario and justify your approach and failure handling.

0/1 knapsack uses each item at most once. Descending capacity order prevents reusing a newly updated state in the same iteration. Weights [2,3], values [3,4], capacity 4: best 4. Ascending capacity turns the recurrence into unbounded knapsack. O(nW) time, O(W) space

### Walk through Day 44 — 2D DP: Strings. Give a concrete scenario and justify your approach and failure handling.

Edit distance uses prefixes as states. Each cell compares insertion, deletion, substitution or a free match. cat→cut needs one substitution. Initialize empty-prefix costs; substitution cost is zero for equal characters. O(mn) time, O(n) space

### Walk through Day 45 — 2D DP: Grids and Paths. Give a concrete scenario and justify your approach and failure handling.

Grid path DP adds paths from top and left, resetting blocked cells to zero. One row is enough because previous row values persist. 2×2 open grid has two paths; block top-right and one remains. If start is blocked the initial value must become zero. O(rc) time, O(c) space

### Walk through Day 46 — DP: Interval DP. Give a concrete scenario and justify your approach and failure handling.

Interval DP chooses a final action whose neighbors are known after the interior is solved. In burst balloons, the last balloon splits independent intervals. [3,1,5,8] yields 167. Choosing the first burst does not preserve fixed interval neighbors. O(n³) time, O(n²) space

### Walk through Day 47 — DP: Decision Making (Stock Problems). Give a concrete scenario and justify your approach and failure handling.

Stock DP describes held and cash states, with transitions using the previous day's values. Fees apply only to a sale in this convention. Prices [1,3,2,8,4,9], fee 2 yields 8. Avoid unintended same-day state dependencies by saving old values. O(n) time, O(1) space

### Walk through Day 48 — DP: Counting and Probability. Give a concrete scenario and justify your approach and failure handling.

Catalan counting multiplies independent left and right subtree choices for each root then sums over roots. n=3 has five distinct BST shapes. Use dp[0]=1 for the empty tree; otherwise all products vanish. O(n²) time, O(n) space

### Walk through Day 49 — DP: Advanced String Patterns. Give a concrete scenario and justify your approach and failure handling.

Glob wildcard DP distinguishes ? (one character) and * (zero or more arbitrary characters). Regex star has different semantics. abef matches a*f; ab does not match a?c. Do not use a regex recurrence for glob wildcard matching. O(mn) time, O(n) space

### Walk through Day 50 — DP: Trees and DAGs. Give a concrete scenario and justify your approach and failure handling.

Tree DP combines child heights and records the best diameter crossing any node. Height counts nodes; diameter counts edges. Three-node chain has diameter 2. Returning diameter instead of height breaks parent computation. O(n) time, O(h) stack

### Walk through Day 51 — DP: Bitmask DP. Give a concrete scenario and justify your approach and failure handling.

A bitmask encodes visited vertices and BFS explores (vertex,mask). All starting vertices can seed distance zero. A chain of 3 nodes requires two edges to visit all nodes. Do not mark only vertices; same vertex with different mask is distinct. O((V+E)2^V) time, O(V2^V) space

### Walk through Day 52 — DP: Mixed Review & Hard Consolidation. Give a concrete scenario and justify your approach and failure handling.

A stack of unmatched opening indices and a sentinel for the last invalid boundary can compute longest valid parentheses. )()()) yields length 4. When popping empties the stack, current index becomes new boundary. O(n) time, O(n) space

### Walk through Day 53 — Greedy Fundamentals. Give a concrete scenario and justify your approach and failure handling.

Greedy reachability maintains farthest reachable index; if next index is beyond it no future index can be reached. [3,2,1,0,4] fails; [2,0,1] succeeds. Do not extend reach from unreachable positions. O(n) time, O(1) space

### Walk through Day 54 — Intervals. Give a concrete scenario and justify your approach and failure handling.

Sort intervals by start; merge when next start is at most current end for closed intervals. [1,3],[2,4],[6,7] yields [1,4],[6,7]. Meeting scheduling usually uses half-open intervals, so touching semantics differ. O(n log n) time, O(n) output and sort space

### Walk through Day 55 — Greedy: Advanced Scheduling & Task Problems. Give a concrete scenario and justify your approach and failure handling.

For maximum number of courses by deadline, process deadlines in order and remove longest duration if total exceeds deadline. (3,3),(2,4),(1,5): replacing 3 allows two courses. Heap stores durations, not deadlines; justify exchange argument. O(n log n) time, O(n) space

### Walk through Day 56 — Bit Manipulation. Give a concrete scenario and justify your approach and failure handling.

XOR is associative, commutative and cancels equal pairs. A unique value remains if every other value appears exactly twice. [4,1,4,2,2] returns 1. The guarantee fails for arbitrary occurrence counts. O(n) time, O(1) space

### Walk through Day 57 — Math & Number Theory. Give a concrete scenario and justify your approach and failure handling.

Binary exponentiation squares the base while consuming exponent bits, multiplying the accumulator on set bits. 3^13 = 3^8 · 3^4 · 3. Negative exponents require reciprocal handling; the lab uses nonnegative exponents. O(log exponent) multiplications, O(1) variables (big-int cost excluded)

### Walk through Day 58 — Mixed Hard Problems: Pattern Identification Under Pressure. Give a concrete scenario and justify your approach and failure handling.

Cyclic placement maps each positive value v in 1..n to index v-1. Each successful swap permanently places at least one value. [3,4,-1,1] returns 2. Duplicate values can cause infinite swaps without an equality guard. O(n) time, O(1) auxiliary space

### Walk through Day 59 — Company-Specific Problems: Google, Microsoft, Adobe Focus. Give a concrete scenario and justify your approach and failure handling.

Weighted interval scheduling sorts by finish time; binary search finds the count of compatible earlier jobs; DP chooses take or skip. Jobs (1,3,5),(2,5,7),(3,6,8) yield 13. For half-open jobs, end <= start is compatible; ensure search only earlier jobs. O(n log n) time, O(n) space

### Walk through Day 60 — Final Review: Booking.com, Intuit, MoEngage Focus + Revision. Give a concrete scenario and justify your approach and failure handling.

Top-k frequency combines counting with a size-k heap or bucket grouping; ties need a declared rule. [4,4,3,3,2], k=1 returns 3 using smaller-value tie break. Do not assume the order of equal-frequency elements is unique. O(n+u log u) time, O(u) space for sort-based solution
