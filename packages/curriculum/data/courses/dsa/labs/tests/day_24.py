import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_24.py"
globals().update(runpy.run_path(str(path)))
assert build_tree([2,1,3],[1,2,3])==TreeNode(2,TreeNode(1),TreeNode(3)) and build_tree([],[]) is None
print("PASS day 24")
