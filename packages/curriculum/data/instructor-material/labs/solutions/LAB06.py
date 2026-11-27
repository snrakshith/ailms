import numpy as np

def iou(a,b):
    a,b=map(np.asarray,(a,b)); inter=np.maximum(0,np.minimum(a[2:],b[2:])-np.maximum(a[:2],b[:2])).prod()
    union=np.maximum(0,a[2:]-a[:2]).prod()+np.maximum(0,b[2:]-b[:2]).prod()-inter
    return float(inter/union) if union else 0.

def nms(boxes,threshold=.5):
    kept=[]
    for x in sorted(boxes,key=lambda b:-b['score']):
        if not any(y['label']==x['label'] and iou(x['box'],y['box'])>threshold for y in kept):kept.append(x)
    return kept

def main():
    a=[0,0,2,2]; b=[1,1,3,3]
    assert abs(iou(a,b)-1/7)<1e-10 and iou(a,a)==1 and iou(a,[3,3,4,4])==0
    boxes=[{'box':a,'label':'a','score':.9},{'box':a,'label':'a','score':.8},{'box':a,'label':'b','score':.7}]
    assert len(nms(boxes))==2; print('IoU:',iou(a,b),'kept:',nms(boxes))
if __name__=='__main__':main()
