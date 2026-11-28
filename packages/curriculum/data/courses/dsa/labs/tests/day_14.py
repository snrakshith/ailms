import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_14.py"
globals().update(runpy.run_path(str(path)))
assert brackets('([])') and not brackets('([)]') and brackets('')
print("PASS day 14")
