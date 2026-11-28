import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_05.py"
globals().update(runpy.run_path(str(path)))
assert histogram([2,1,2])==3 and histogram([2,2])==4 and histogram([])==0
print("PASS day 5")
