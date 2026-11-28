# Complexity and recurrence quick reference

- BFS/DFS adjacency list: O(V+E) time, O(V) working memory (excluding adjacency). Lazy Dijkstra can store O(E) heap entries; nonnegative weights required.
- Hash lookup expected O(1), worst case depends on implementation and collisions.
- Backtracking output is often exponential; distinguish output size from recursion memory.
- Heap insert/pop O(log n); heapify O(n).
- DP: state count × transition cost, plus reconstruction/output.
- 0/1 knapsack: dp[w] = max(dp[w], dp[w-weight]+value), descending w.
- LCS: if match, 1 + diagonal; else max(top,left). Edit distance: min(insert,delete,substitute).
- Interval DP: increasing interval size, try split/last action.
- Union-find path compression + union by size: amortized inverse-Ackermann time.
