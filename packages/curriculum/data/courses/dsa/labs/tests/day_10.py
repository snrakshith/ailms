import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_10.py"
globals().update(runpy.run_path(str(path)))
assert lower_bound([1,3,3,7],3)==1 and lower_bound([],1)==0 and lower_bound([1],9)==1
print("PASS day 10")
