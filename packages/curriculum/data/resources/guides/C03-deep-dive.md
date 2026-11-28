# Detection and segmentation metric walkthrough

For ground truth box [0,0,4,4] and prediction [2,2,6,6], using continuous xyxy coordinates, intersection area is 2×2=4, each box area is 16 and union is 28. IoU=4/28=0.143. It fails an IoU threshold of 0.5. A detection with the correct class and enough overlap may be matched to an unmatched ground truth; further duplicates become false positives. Evaluate confidence ordering and matching rules before calculating AP. COCO-style AP averages specified IoU thresholds from 0.50 through 0.95.

For binary masks with 100 predicted positive pixels, 80 ground-truth positive pixels and 60 intersecting, IoU=60/120=0.5 and Dice=120/180=0.667. Include per-class metrics and state how empty masks and ignored pixels are handled.

| Task                  | Output                 | Typical metrics                 |
| --------------------- | ---------------------- | ------------------------------- |
| Classification        | Class logits           | Macro F1, accuracy, calibration |
| Detection             | Boxes, classes, scores | AP, recall, latency             |
| Semantic segmentation | Per-pixel classes      | mIoU, Dice                      |
| Instance segmentation | Separate object masks  | Mask AP                         |
| Tracking              | Identity over frames   | IDF1, HOTA, identity switches   |

**Exercise:** construct five predictions including duplicate, wrong-class, low-confidence, poor-overlap and correct cases; implement class-aware matching on a fixed IoU threshold, then explain how AP differs from precision at one threshold.
