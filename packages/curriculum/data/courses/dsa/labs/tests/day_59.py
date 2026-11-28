import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_59.py"
globals().update(runpy.run_path(str(path)))
assert job_profit([(1,3,5),(2,5,7),(3,6,8)])==13 and job_profit([])==0
print("PASS day 59")
