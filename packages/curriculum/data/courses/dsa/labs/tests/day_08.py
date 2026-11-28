import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_08.py"
globals().update(runpy.run_path(str(path)))
assert fixed_window([1,4,2,8],2)==10 and fixed_window([-4,-2],1)==-2
print("PASS day 8")
