# Linked lists & caches — quick reference

## Day 17 — Linked Lists: Fundamentals
A linked-list reversal preserves the next pointer before changing the current link; the reversed prefix and untouched suffix form a partition.

**Watch for:** Changing next before saving it loses the remaining list.


## Day 18 — Linked Lists: Reversal Patterns
A dummy node allows uniform rewiring even when the segment begins at the head. Move each node after the segment head to the front of the segment.

**Watch for:** Keep the segment tail fixed during head insertion.


## Day 19 — Linked Lists: Merging & Advanced
A heap provides the smallest current head among k sorted streams. After extracting it, advance only that stream.

**Watch for:** Heap entries need a tie-breaker when payloads are not comparable.


## Day 20 — Linked Lists: Review + LRU/LFU
Recency ordering and key lookup are independent responsibilities. An ordered map can model LRU with fast lookup and move-to-end.

**Watch for:** Updates also count as accesses; handle capacity zero.
