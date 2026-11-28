import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_20.py"
globals().update(runpy.run_path(str(path)))
cache=lru(2);cache.put('a',1);cache.put('b',2);assert cache.get('a')==1;cache.put('c',3);assert cache.get('b') is None
print("PASS day 20")
