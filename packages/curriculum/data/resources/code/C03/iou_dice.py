import numpy as np
def box_iou(a,b):
    if a[2]<a[0] or a[3]<a[1] or b[2]<b[0] or b[3]<b[1]: raise ValueError('invalid xyxy')
    intersection=max(0,min(a[2],b[2])-max(a[0],b[0]))*max(0,min(a[3],b[3])-max(a[1],b[1]))
    union=(a[2]-a[0])*(a[3]-a[1])+(b[2]-b[0])*(b[3]-b[1])-intersection
    return intersection/union if union else 0.
def dice(a,b):
    a,b=np.asarray(a,bool),np.asarray(b,bool)
    return 2*(a&b).sum()/(a.sum()+b.sum()) if a.any() or b.any() else 1.
assert box_iou((0,0,2,2),(1,1,3,3))==1/7
assert box_iou((0,0,2,2),(0,0,2,2))==1
assert dice([0,0],[0,0])==1
print('metrics passed')
