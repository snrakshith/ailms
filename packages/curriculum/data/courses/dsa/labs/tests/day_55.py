import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_55.py"
globals().update(runpy.run_path(str(path)))
assert schedule_courses([(3,3),(2,4),(1,5)])==2 and schedule_courses([])==0
print("PASS day 55")
