import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_11.py"
globals().update(runpy.run_path(str(path)))
assert min_speed([3,6,7,11],8)==4 and min_speed([1],1)==1
print("PASS day 11")
