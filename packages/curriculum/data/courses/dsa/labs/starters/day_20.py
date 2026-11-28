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

# TODO: Implement get/put LRU using OrderedDict; compare DLL+map in notes.
class lru:

    def __init__(self, capacity):
        raise NotImplementedError()

    def get(self, key):
        raise NotImplementedError()

    def put(self, key, value):
        raise NotImplementedError()
