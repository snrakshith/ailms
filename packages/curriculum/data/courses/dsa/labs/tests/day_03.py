import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_03.py"
globals().update(runpy.run_path(str(path)))
assert sort_colors([2,0,1,2,0])==[0,0,1,2,2] and sort_colors([])==[]
print("PASS day 3")
