import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_16.py"
globals().update(runpy.run_path(str(path)))
assert sum_mins([2,2])==6 and sum_mins([3,1,2,4])==17 and sum_mins([])==0
print("PASS day 16")
