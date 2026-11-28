import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_56.py"
globals().update(runpy.run_path(str(path)))
assert single_number([4,1,4,2,2])==1 and single_number([-2])==-2
print("PASS day 56")
