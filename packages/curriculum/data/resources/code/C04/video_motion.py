import cv2
import numpy as np
previous=np.zeros((64,64),np.uint8); current=previous.copy()
cv2.circle(previous,(25,25),7,255,-1); cv2.circle(current,(29,25),7,255,-1)
flow=cv2.calcOpticalFlowFarneback(previous,current,None,.5,3,15,3,5,1.2,0)
print('median object motion',np.median(flow[previous>0],axis=0))
assert flow.shape==(64,64,2)
