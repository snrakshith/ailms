import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_27.py"
globals().update(runpy.run_path(str(path)))
assert rob_tree(TreeNode(3,TreeNode(4),TreeNode(5)))==9 and rob_tree(TreeNode(-1))==0
print("PASS day 27")
