import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_38.py"
globals().update(runpy.run_path(str(path)))
assert len(permutations([1,2,3]))==6 and permutations([])==[[]]
print("PASS day 38")
