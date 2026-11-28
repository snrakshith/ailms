import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_41.py"
globals().update(runpy.run_path(str(path)))
assert rob_line([2,7,9,3,1])==12 and rob_line([-1])==0
print("PASS day 41")
