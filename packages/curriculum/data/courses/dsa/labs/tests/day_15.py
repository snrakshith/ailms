import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_15.py"
globals().update(runpy.run_path(str(path)))
assert warmer([73,74,72,76])==[1,2,1,0] and warmer([5,5])==[0,0]
print("PASS day 15")
