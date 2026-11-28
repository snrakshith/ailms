import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_57.py"
globals().update(runpy.run_path(str(path)))
assert power(3,13)==1594323 and power(9,0)==1
print("PASS day 57")
