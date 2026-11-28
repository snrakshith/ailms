import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_52.py"
globals().update(runpy.run_path(str(path)))
assert longest_parens(')()())')==4 and longest_parens('')==0
print("PASS day 52")
