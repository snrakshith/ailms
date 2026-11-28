import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_29.py"
globals().update(runpy.run_path(str(path)))
m=median_stream();m.add(3);assert m.median()==3;m.add(1);assert m.median()==2;m.add(2);assert m.median()==2
print("PASS day 29")
