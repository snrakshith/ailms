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

# TODO: Implement insert, exact search and prefix search.
class trie:

    def __init__(self):
        raise NotImplementedError()

    def insert(self, word):
        raise NotImplementedError()

    def _walk(self, s):
        raise NotImplementedError()

    def search(self, s):
        raise NotImplementedError()

    def starts_with(self, s):
        raise NotImplementedError()
