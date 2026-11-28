import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_25.py"
globals().update(runpy.run_path(str(path)))
assert not valid_bst(TreeNode(5,TreeNode(3,None,TreeNode(6)))) and valid_bst(TreeNode(2,TreeNode(1),TreeNode(3)))
print("PASS day 25")
