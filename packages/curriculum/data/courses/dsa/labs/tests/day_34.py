import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_34.py"
globals().update(runpy.run_path(str(path)))
assert dijkstra([[(1,5),(2,1)],[],[(1,1)],[]],0)==[0,2,1,inf]
print("PASS day 34")
