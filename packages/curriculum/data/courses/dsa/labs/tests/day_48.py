import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_48.py"
globals().update(runpy.run_path(str(path)))
assert catalan(3)==5 and catalan(0)==1
print("PASS day 48")
