import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_19.py"
globals().update(runpy.run_path(str(path)))
assert merge_k([[1,4],[2,3],[]])==[1,2,3,4] and merge_k([])==[]
print("PASS day 19")
