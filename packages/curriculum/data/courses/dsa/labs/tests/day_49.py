import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_49.py"
globals().update(runpy.run_path(str(path)))
assert wildcard('abef','a*f') and not wildcard('ab','a?c') and wildcard('','**')
print("PASS day 49")
