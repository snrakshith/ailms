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

# TODO: Implement DSU with count of connected components.
class dsu:

    def __init__(self, n):
        raise NotImplementedError()

    def find(self, x):
        raise NotImplementedError()

    def union(self, a, b):
        raise NotImplementedError()
