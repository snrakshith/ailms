import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_54.py"
globals().update(runpy.run_path(str(path)))
assert merge_intervals([[1,3],[2,4],[6,7]])==[[1,4],[6,7]] and merge_intervals([])==[]
print("PASS day 54")
