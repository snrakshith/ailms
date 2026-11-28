import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_60.py"
globals().update(runpy.run_path(str(path)))
assert top_frequency([4,4,3,3,2],1)==[3] and top_frequency([],0)==[]
print("PASS day 60")
