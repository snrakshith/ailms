import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_06.py"
globals().update(runpy.run_path(str(path)))
assert sorted_pair([1,3,5,8],8)==(1,2) and sorted_pair([2],4) is None
print("PASS day 6")
