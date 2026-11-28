import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_04.py"
globals().update(runpy.run_path(str(path)))
assert rotate([[1,2],[3,4]])==[[3,1],[4,2]] and rotate([])==[]
print("PASS day 4")
