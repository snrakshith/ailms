import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_33.py"
globals().update(runpy.run_path(str(path)))
assert topo(3,[(0,1),(1,2)])==[0,1,2] and topo(2,[(0,1),(1,0)]) is None
print("PASS day 33")
