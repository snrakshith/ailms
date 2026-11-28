import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_32.py"
globals().update(runpy.run_path(str(path)))
d=dsu(3);assert d.union(0,1) and d.union(1,2) and not d.union(0,2) and d.count==1
print("PASS day 32")
