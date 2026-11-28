# Trees & binary search trees — quick reference

## Day 21 — Tree Traversals & Basics

Tree DFS defines what a node returns to its parent. Depth is one plus maximum child depth; empty has depth zero.

**Watch for:** Count nodes versus edges explicitly; recursion may exceed stack limit.

## Day 22 — Tree BFS — Level-by-Level Processing

Snapshot the queue length before processing a level; appended children belong to the next level.

**Watch for:** Iterating until the queue is empty mixes levels.

## Day 23 — Tree DFS — Path and Sum Problems

Root-to-leaf paths require a leaf check; pass remaining target downward. A matching internal node alone is not enough.

**Watch for:** Treat a missing child as failure, not as a zero-valued leaf.

## Day 24 — Tree: Lowest Common Ancestor & Construction

For distinct node values, preorder identifies the root and an inorder position splits the subtree. Index bounds avoid slicing.

**Watch for:** Duplicate values make this reconstruction ambiguous without identity data.

## Day 25 — Binary Search Trees

BST validity is global: each node must satisfy every ancestral lower and upper bound, not only its immediate parent.

**Watch for:** Use strict bounds if duplicates are disallowed.

## Day 26 — Tree: Advanced DFS Patterns

A top-down DFS carries the maximum value on the root-to-node path. A node is good if its value is at least that maximum.

**Watch for:** Do not share one mutable maximum across sibling paths.

## Day 27 — Trees: Revision & Hard Problems

Tree DP returns mutually exclusive states. If a node is selected, its children must be skipped; otherwise choose the better state for each child.

**Watch for:** Using a global visited flag loses independent subtree choices.
