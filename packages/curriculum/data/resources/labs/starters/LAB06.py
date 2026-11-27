import numpy as np

def iou(a,b):
    raise NotImplementedError("Learner TODO: iou")

def nms(boxes,threshold=.5):
    raise NotImplementedError("Learner TODO: nms")

def main():
    a=[0,0,2,2]; b=[1,1,3,3]
    assert abs(iou(a,b)-1/7)<1e-10 and iou(a,a)==1 and iou(a,[3,3,4,4])==0
    boxes=[{'box':a,'label':'a','score':.9},{'box':a,'label':'a','score':.8},{'box':a,'label':'b','score':.7}]
    assert len(nms(boxes))==2; print('IoU:',iou(a,b),'kept:',nms(boxes))
if __name__=='__main__':main()
