import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_09.py"
globals().update(runpy.run_path(str(path)))
assert unique_window('abba')==2 and unique_window('')==0
print("PASS day 9")
