# FINAL WEAK-LABEL MASK GENERATION (CLEAN, USABLE FOR U-NET)
# Input  : images/
# Output : masks/
# Result : one 256x256 binary mask per image (noise reduced)

import cv2
import numpy as np
import os

# ---------- CONFIG ----------
IMAGE_DIR = "dataset/images/train"
MASK_DIR  = "dataset/masks"
IMG_SIZE  = 256
MIN_AREA  = 500        # remove small noisy blobs (tune 300–800)
# ----------------------------

os.makedirs(MASK_DIR, exist_ok=True)

for filename in os.listdir(IMAGE_DIR):
    img_path = os.path.join(IMAGE_DIR, filename)
    img = cv2.imread(img_path)

    if img is None:
        continue

    # 1. Force fixed size
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))

    # 2. Convert to HSV
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # 3. Green vegetation threshold
    lower_green = np.array([35, 40, 40])
    upper_green = np.array([85, 255, 255])
    mask = cv2.inRange(hsv, lower_green, upper_green)

    # 4. Morphological cleanup
    kernel = np.ones((7, 7), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

    # 5. Remove small connected components
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=8)

    clean_mask = np.zeros_like(mask)

    for i in range(1, num_labels):  # skip background
        area = stats[i, cv2.CC_STAT_AREA]
        if area >= MIN_AREA:
            clean_mask[labels == i] = 255

    # 6. Save final binary mask
    name, _ = os.path.splitext(filename)
    cv2.imwrite(os.path.join(MASK_DIR, name + ".png"), clean_mask)


print("Final clean masks generated for all images.")
