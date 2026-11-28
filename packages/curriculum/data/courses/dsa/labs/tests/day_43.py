import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_43.py"
globals().update(runpy.run_path(str(path)))
assert knapsack([2,3],[3,4],4)==4 and knapsack([2],[3],4)==3
print("PASS day 43")
