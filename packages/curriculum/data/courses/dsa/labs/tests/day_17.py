import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_17.py"
globals().update(runpy.run_path(str(path)))
assert reverse_list(ListNode(1,ListNode(2))).val==2 and reverse_list(None) is None
print("PASS day 17")
