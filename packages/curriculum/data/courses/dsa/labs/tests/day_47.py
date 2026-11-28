import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_47.py"
globals().update(runpy.run_path(str(path)))
assert stock_fee([1,3,2,8,4,9],2)==8 and stock_fee([],2)==0
print("PASS day 47")
