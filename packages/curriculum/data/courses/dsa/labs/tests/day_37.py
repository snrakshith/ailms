import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_37.py"
globals().update(runpy.run_path(str(path)))
assert subsets([1,2])==[[],[2],[1],[1,2]] and subsets([])==[[]]
print("PASS day 37")
