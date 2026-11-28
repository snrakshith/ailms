import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_58.py"
globals().update(runpy.run_path(str(path)))
assert missing_positive([3,4,-1,1])==2 and missing_positive([1,1])==2 and missing_positive([])==1
print("PASS day 58")
