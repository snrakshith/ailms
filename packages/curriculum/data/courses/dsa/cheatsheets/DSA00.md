# Optional beginner prerequisites — quick reference

## Python for problem solving

Use list, dict, set, tuple, deque and heapq. Python lists support amortized O(1) append, but popping the front shifts items. Dictionaries require hashable keys.

**Watch for:** Mutating a list while iterating can skip items.

## Big-O and amortized analysis

Count work as input size grows; distinguish worst, average and amortized bounds. Nested loops are not necessarily quadratic if the inner pointer advances monotonically. Auxiliary space excludes input/output unless stated.

**Watch for:** Time measurements alone cannot prove asymptotic bounds.

## Recursion, invariants and correctness

An invariant is true before and after every loop iteration; termination plus postcondition proves correctness. Recursion needs a decreasing measure, base case and correct subproblem contract.

**Watch for:** Missing base case or nondecreasing argument can overflow the stack.

## Testing and interview habits

Clarify constraints, derive brute force, optimize, state invariant, code and trace edge cases. Use assertion tests and compare optimized results with brute force on tiny random inputs.

**Watch for:** Only testing the example misses empty, duplicate and boundary inputs.
