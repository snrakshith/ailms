import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_42.py"
globals().update(runpy.run_path(str(path)))
assert lis_dp([3,1,2,4])==3 and lis_dp([2,2])==1 and lis_dp([])==0
print("PASS day 42")
