import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_46.py"
globals().update(runpy.run_path(str(path)))
assert burst([3,1,5,8])==167 and burst([])==0
print("PASS day 46")
