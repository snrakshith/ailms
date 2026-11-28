import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_12.py"
globals().update(runpy.run_path(str(path)))
assert peak([1,4,3,2])==1 and peak([5])==0
print("PASS day 12")
