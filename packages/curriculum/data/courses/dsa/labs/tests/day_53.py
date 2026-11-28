import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_53.py"
globals().update(runpy.run_path(str(path)))
assert not can_jump([3,2,1,0,4]) and can_jump([2,0,1])
print("PASS day 53")
