# Optional beginner prerequisites

Study in this order; each section contains an independent lesson.

# Python for problem solving

**Level:** beginner · **Estimated time:** 45 min · **ID:** `DSA00-L01`

## Learning objectives
- Explain the mechanism behind Python for problem solving.
- Implement or demonstrate: Build a frequency map, FIFO queue and priority queue.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Use list, dict, set, tuple, deque and heapq. Python lists support amortized O(1) append, but popping the front shifts items. Dictionaries require hashable keys.

## Worked example
A queue uses deque.popleft rather than list.pop(0).

## Common failure mode
Mutating a list while iterating can skip items.

## Implementation snippet
```python
from collections import Counter, deque
from heapq import heappush, heappop
assert Counter([1,1,2])[1]==2
q=deque([1,2]); assert q.popleft()==1
h=[]; heappush(h,3); heappush(h,1); assert heappop(h)==1
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Build a frequency map, FIFO queue and priority queue.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Python for problem solving using the worked scenario.

## Knowledge check
1. Explain the mechanism of Python for problem solving using the worked scenario.
2. What failure should you watch for in Python for problem solving, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/tutorial/
- https://docs.python.org/3/library/collections.html


---

# Big-O and amortized analysis

**Level:** beginner · **Estimated time:** 45 min · **ID:** `DSA00-L02`

## Learning objectives
- Explain the mechanism behind Big-O and amortized analysis.
- Implement or demonstrate: Compare counts for linear scan and unordered pairs at n=10 and n=20.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Count work as input size grows; distinguish worst, average and amortized bounds. Nested loops are not necessarily quadratic if the inner pointer advances monotonically. Auxiliary space excludes input/output unless stated.

## Worked example
Doubling n roughly doubles a linear scan but quadruples a full pair enumeration.

## Common failure mode
Time measurements alone cannot prove asymptotic bounds.

## Implementation snippet
```python
for n in [10,20]:
    print(n,n*(n-1)//2)
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Compare counts for linear scan and unordered pairs at n=10 and n=20.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Big-O and amortized analysis using the worked scenario.

## Knowledge check
1. Explain the mechanism of Big-O and amortized analysis using the worked scenario.
2. What failure should you watch for in Big-O and amortized analysis, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/tutorial/
- https://docs.python.org/3/library/collections.html


---

# Recursion, invariants and correctness

**Level:** beginner · **Estimated time:** 45 min · **ID:** `DSA00-L03`

## Learning objectives
- Explain the mechanism behind Recursion, invariants and correctness.
- Implement or demonstrate: Implement recursive prefix sum and iterative equivalent; compare stack costs.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
An invariant is true before and after every loop iteration; termination plus postcondition proves correctness. Recursion needs a decreasing measure, base case and correct subproblem contract.

## Worked example
For sum of prefix, recurse on length n-1, base n=0.

## Common failure mode
Missing base case or nondecreasing argument can overflow the stack.

## Implementation snippet
```python
def prefix(a,n):
    return 0 if n==0 else prefix(a,n-1)+a[n-1]
assert prefix([1,2,3],3)==6
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Implement recursive prefix sum and iterative equivalent; compare stack costs.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Recursion, invariants and correctness using the worked scenario.

## Knowledge check
1. Explain the mechanism of Recursion, invariants and correctness using the worked scenario.
2. What failure should you watch for in Recursion, invariants and correctness, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/tutorial/
- https://docs.python.org/3/library/collections.html


---

# Testing and interview habits

**Level:** beginner · **Estimated time:** 45 min · **ID:** `DSA00-L04`

## Learning objectives
- Explain the mechanism behind Testing and interview habits.
- Implement or demonstrate: Create a deterministic test table with normal, empty and duplicate cases.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Clarify constraints, derive brute force, optimize, state invariant, code and trace edge cases. Use assertion tests and compare optimized results with brute force on tiny random inputs.

## Worked example
Two-sum with repeated values tests whether the same index is reused.

## Common failure mode
Only testing the example misses empty, duplicate and boundary inputs.

## Implementation snippet
```python
def brute(a,t):
    return next(((i,j) for i in range(len(a)) for j in range(i+1,len(a)) if a[i]+a[j]==t),None)
assert brute([3,3],6)==(0,1) and brute([],1) is None
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Create a deterministic test table with normal, empty and duplicate cases.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Testing and interview habits using the worked scenario.

## Knowledge check
1. Explain the mechanism of Testing and interview habits using the worked scenario.
2. What failure should you watch for in Testing and interview habits, and how would you detect or prevent it?

## Review resources
- https://docs.python.org/3/tutorial/
- https://docs.python.org/3/library/collections.html
