import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_51.py"
globals().update(runpy.run_path(str(path)))
assert visit_all([[1],[0,2],[1]])==2 and visit_all([[],[]])==-1
print("PASS day 51")
