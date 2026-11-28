import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_21.py"
globals().update(runpy.run_path(str(path)))
assert depth(TreeNode(1,TreeNode(2)))==2 and depth(None)==0
print("PASS day 21")
