import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_28.py"
globals().update(runpy.run_path(str(path)))
t=trie();t.insert('cat');assert t.search('cat') and t.starts_with('ca') and not t.search('ca')
print("PASS day 28")
