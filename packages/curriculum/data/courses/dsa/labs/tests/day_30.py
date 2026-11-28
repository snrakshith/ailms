import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_30.py"
globals().update(runpy.run_path(str(path)))
assert islands([[1,0],[0,1]])==2 and islands([])==0
print("PASS day 30")
