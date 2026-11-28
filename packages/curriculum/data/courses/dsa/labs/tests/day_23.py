import runpy,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=Path(sys.argv[1]) if len(sys.argv)>1 else root/"solutions/day_23.py"
globals().update(runpy.run_path(str(path)))
assert path_sum(TreeNode(1,TreeNode(2)),3) and not path_sum(TreeNode(1,TreeNode(2)),1)
print("PASS day 23")
