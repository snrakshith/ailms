import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_35.py"
globals().update(runpy.run_path(str(path)))
assert bridges(4,[(0,1),(1,2),(2,0),(2,3)])==[(2,3)] and bridges(1,[])==[]
print("PASS day 35")
