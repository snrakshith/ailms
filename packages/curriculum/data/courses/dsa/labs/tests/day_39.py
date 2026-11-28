import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_39.py"
globals().update(runpy.run_path(str(path)))
assert word_search(['AB','CD'],'ABD') and not word_search(['AB','CD'],'ABA')
print("PASS day 39")
