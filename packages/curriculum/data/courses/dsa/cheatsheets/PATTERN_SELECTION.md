# 15-pattern decision reference

| Pattern | Recognition cue | Invariant or decision |
|---|---|---|
| Arrays & hashing | Membership or complement | Seen values/frequencies |
| Two pointers | Ordered pair or in-place | Exclude impossible pairs |
| Sliding window | Contiguous constraint | Monotone valid window |
| Binary search | Sorted data or feasible boundary | Answer remains in range |
| Stack & monotonic stack | Nesting or next boundary | Unresolved ordered indices |
| Linked lists | Pointer rewiring | Preserve next before change |
| Tree BFS/DFS | Levels or subtree result | Queue level or recursive contract |
| BST | Ordered tree keys | Ancestor bounds |
| Graphs | Connectivity/paths/dependencies | Visited states, distances, indegree |
| Backtracking | Enumerate valid choices | Choose, explore, undo |
| Dynamic programming | Overlapping states | Recurrence, base, order |
| Greedy | Provably safe local choice | Exchange argument |
| Trie | Prefix matching | Shared prefixes and terminal marker |
| Heap | Dynamic extremes/top-k | Heap boundary |
| Bit manipulation | Bit state/parity | Bit identities and width |

Binary search requires monotonicity; sliding windows require appropriate monotone constraints; greedy needs proof, not trigger words alone.
