import numpy as np
import cv2
img=np.zeros((64,64,3),dtype=np.uint8)
cv2.rectangle(img,(16,16),(48,48),(0,0,255),-1)
gray=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
mask=cv2.threshold(gray,30,255,cv2.THRESH_BINARY)[1]
edges=cv2.Canny(gray,30,100)
assert mask[32,32]==255 and mask[0,0]==0
print('mask pixels',np.count_nonzero(mask),'edge pixels',np.count_nonzero(edges))
