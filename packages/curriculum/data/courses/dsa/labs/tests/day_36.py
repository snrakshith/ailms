import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_36.py"
globals().update(runpy.run_path(str(path)))
assert grid_budget([[0,1,0]],1)==2 and grid_budget([[0,1,0]],0)==-1
print("PASS day 36")
