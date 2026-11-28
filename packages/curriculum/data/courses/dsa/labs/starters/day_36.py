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

# TODO: Find shortest 4-neighbor path allowing k blocked-cell entries, with open endpoints.
def grid_budget(g, k):
    raise NotImplementedError()
