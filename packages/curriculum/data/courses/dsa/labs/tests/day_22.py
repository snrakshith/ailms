import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_22.py"
globals().update(runpy.run_path(str(path)))
assert levels(TreeNode(1,TreeNode(2),TreeNode(3)))==[[1],[2,3]] and levels(None)==[]
print("PASS day 22")
