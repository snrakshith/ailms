import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_01.py"
globals().update(runpy.run_path(str(path)))
assert two_sum([4,1,7],8)==(1,2) and two_sum([3,3],6)==(0,1) and two_sum([],0) is None
print("PASS day 1")
