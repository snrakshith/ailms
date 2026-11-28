import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_02.py"
globals().update(runpy.run_path(str(path)))
assert subarray_count([2,-2,2],2)==3 and subarray_count([0,0],0)==3
print("PASS day 2")
