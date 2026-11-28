import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_44.py"
globals().update(runpy.run_path(str(path)))
assert edit_distance('cat','cut')==1 and edit_distance('','abc')==3
print("PASS day 44")
