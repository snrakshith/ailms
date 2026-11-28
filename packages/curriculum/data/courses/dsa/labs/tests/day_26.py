import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_26.py"
globals().update(runpy.run_path(str(path)))
assert good_nodes(TreeNode(3,TreeNode(1),TreeNode(4)))==2 and good_nodes(None)==0
print("PASS day 26")
