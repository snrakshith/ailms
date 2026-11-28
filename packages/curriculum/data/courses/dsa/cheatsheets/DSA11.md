# Advanced dynamic programming — quick reference

## Day 46 — DP: Interval DP
Interval DP chooses a final action whose neighbors are known after the interior is solved. In burst balloons, the last balloon splits independent intervals.

**Watch for:** Choosing the first burst does not preserve fixed interval neighbors.


## Day 47 — DP: Decision Making (Stock Problems)
Stock DP describes held and cash states, with transitions using the previous day's values. Fees apply only to a sale in this convention.

**Watch for:** Avoid unintended same-day state dependencies by saving old values.


## Day 48 — DP: Counting and Probability
Catalan counting multiplies independent left and right subtree choices for each root then sums over roots.

**Watch for:** Use dp[0]=1 for the empty tree; otherwise all products vanish.


## Day 49 — DP: Advanced String Patterns
Glob wildcard DP distinguishes ? (one character) and * (zero or more arbitrary characters). Regex star has different semantics.

**Watch for:** Do not use a regex recurrence for glob wildcard matching.


## Day 50 — DP: Trees and DAGs
Tree DP combines child heights and records the best diameter crossing any node. Height counts nodes; diameter counts edges.

**Watch for:** Returning diameter instead of height breaks parent computation.


## Day 51 — DP: Bitmask DP
A bitmask encodes visited vertices and BFS explores (vertex,mask). All starting vertices can seed distance zero.

**Watch for:** Do not mark only vertices; same vertex with different mask is distinct.


## Day 52 — DP: Mixed Review & Hard Consolidation
A stack of unmatched opening indices and a sentinel for the last invalid boundary can compute longest valid parentheses.

**Watch for:** When popping empties the stack, current index becomes new boundary.
