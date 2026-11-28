import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_13.py"
globals().update(runpy.run_path(str(path)))
assert lis([3,5,2,4,6])==3 and lis([2,2])==1 and lis([])==0
print("PASS day 13")
