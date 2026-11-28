import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_50.py"
globals().update(runpy.run_path(str(path)))
assert diameter(TreeNode(1,TreeNode(2,TreeNode(3))))==2 and diameter(None)==0
print("PASS day 50")
