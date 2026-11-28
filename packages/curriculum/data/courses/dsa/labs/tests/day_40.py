import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_40.py"
globals().update(runpy.run_path(str(path)))
assert pal_parts('aab')==[['a','a','b'],['aa','b']] and pal_parts('')==[[]]
print("PASS day 40")
