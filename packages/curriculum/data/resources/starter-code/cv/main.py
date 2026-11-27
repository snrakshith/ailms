import numpy as np
import cv2

def segment(img):
    # TODO: grayscale conversion and threshold, return uint8 mask.
    raise NotImplementedError

if __name__=='__main__':
    img=np.zeros((64,64,3),np.uint8); cv2.rectangle(img,(10,10),(30,30),(255,255,255),-1)
    mask=segment(img)
    assert mask.shape==(64,64) and mask[20,20]>0 and mask[0,0]==0
