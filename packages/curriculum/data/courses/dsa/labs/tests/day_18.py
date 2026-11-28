import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_18.py"
globals().update(runpy.run_path(str(path)))
assert reverse_between(ListNode(1,ListNode(2,ListNode(3))),1,2)==ListNode(2,ListNode(1,ListNode(3)))
print("PASS day 18")
