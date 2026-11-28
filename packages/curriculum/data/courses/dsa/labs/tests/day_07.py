import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_07.py"
globals().update(runpy.run_path(str(path)))
assert move_zeroes([0,1,0,3])==[1,3,0,0] and move_zeroes([0])==[0]
print("PASS day 7")
