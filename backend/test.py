# ============================================
# U-NET TESTING SCRIPT (NO TRAINING)
# ============================================

import os
import cv2
import torch
import numpy as np
import segmentation_models_pytorch as smp

# -------- CONFIG --------
IMG_SIZE = 256
MODEL_PATH = "best_unet.pth"

INPUT_DIR  = "test_images"     # yaha images daalo
OUTPUT_DIR = "test_results"    # yaha output milega
# ------------------------

os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# -------- LOAD MODEL --------
device = "cuda" if torch.cuda.is_available() else "cpu"

model = smp.Unet(
    encoder_name="resnet34",
    encoder_weights=None,   # IMPORTANT
    in_channels=3,
    classes=1,
    activation=None
)

model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.to(device)
model.eval()

print("Model loaded. Starting inference...\n")

# -------- TEST LOOP --------
for filename in os.listdir(INPUT_DIR):
    img_path = os.path.join(INPUT_DIR, filename)

    img = cv2.imread(img_path)
    if img is None:
        continue

    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) / 255.0

    x = torch.tensor(rgb).permute(2,0,1).unsqueeze(0).float().to(device)

    with torch.no_grad():
        pred = torch.sigmoid(model(x))[0,0].cpu().numpy()

    mask = (pred > 0.5).astype(np.uint8)

    # -------- COVERAGE --------
    coverage = mask.sum() / (IMG_SIZE * IMG_SIZE) * 100

    # -------- OVERLAY --------
    overlay = img.copy()
    overlay[mask == 1] = [0, 255, 0]
    blended = cv2.addWeighted(img, 0.7, overlay, 0.3, 0)

    name = os.path.splitext(filename)[0]

    cv2.imwrite(f"{OUTPUT_DIR}/{name}_mask.png", mask * 255)
    cv2.imwrite(f"{OUTPUT_DIR}/{name}_overlay.jpg", blended)

    print(f"{filename}  -->  Coverage: {coverage:.2f}%")

print("\nTesting complete.")
