import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_45.py"
globals().update(runpy.run_path(str(path)))
assert grid_paths([[0,0],[0,0]])==2 and grid_paths([[1]])==0
print("PASS day 45")
