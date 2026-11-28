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

# TODO: Maintain online median for nonempty integer stream.
class median_stream:

    def __init__(self):
        raise NotImplementedError()

    def add(self, x):
        raise NotImplementedError()

    def median(self):
        raise NotImplementedError()
