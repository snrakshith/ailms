# Graph traversal and algorithms — quick reference

## Day 30 — Graph BFS & DFS Fundamentals

A flood fill marks each grid cell when discovered. Restart only from an unvisited land cell to count components.

**Watch for:** Marking after dequeue allows duplicate enqueues.

## Day 31 — Graph BFS: Shortest Path (Unweighted)

Multi-source BFS seeds all sources at distance zero and expands layer by layer. First discovery is shortest in an unweighted graph.

**Watch for:** Do not run independent BFS from every target.

## Day 32 — Graph: Union Find (Disjoint Set Union)

Disjoint sets store parent forests. Path compression flattens search paths; union by size limits height.

**Watch for:** Only roots should be linked; duplicate unions must not decrement components.

## Day 33 — Graph: Topological Sort

Kahn's algorithm starts with zero indegree vertices and removes outgoing edges. Remaining vertices after the queue empties imply a cycle.

**Watch for:** Include isolated vertices and count duplicate edges consistently.

## Day 34 — Graph: Dijkstra & Shortest Weighted Path

Dijkstra settles the smallest tentative distance when weights are nonnegative. Lazy heap entries with stale distances are ignored.

**Watch for:** Negative weights break the settled-distance proof.

## Day 35 — Graph: Advanced — Cycles, Bridges, Components

DFS discovery time and low-link track whether a descendant can reach an ancestor without the parent edge. A tree edge is a bridge if low[child] > tin[parent].

**Watch for:** Parent edge IDs matter in multigraphs; the lab assumes simple graph.

## Day 36 — Graph: Grid-Based Problems & Review

A grid search may need state beyond coordinates. For obstacle elimination, remaining budget is part of the vertex.

**Watch for:** Visited keyed only by cell may discard a better remaining-budget state.
