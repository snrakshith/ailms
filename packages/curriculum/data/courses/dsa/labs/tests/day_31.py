import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_31.py"
globals().update(runpy.run_path(str(path)))
assert multi_bfs([[1],[0,2],[1,3],[2,4],[3]],[0,4])=={0:0,4:0,1:1,3:1,2:2}
print("PASS day 31")
