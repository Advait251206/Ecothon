# ============================================
# FASTAPI U-NET INFERENCE SERVER
# ============================================

import io
import cv2
import torch
import numpy as np
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import segmentation_models_pytorch as smp

# -------- CONFIG --------
IMG_SIZE = 256
MODEL_PATH = "best_unet.pth"
# ------------------------

app = FastAPI(title="Water Hyacinth Detection API")

# -------- LOAD MODEL --------
device = "cuda" if torch.cuda.is_available() else "cpu"

model = smp.Unet(
    encoder_name="resnet34",
    encoder_weights=None,
    in_channels=3,
    classes=1,
    activation=None
)

model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.to(device)
model.eval()

# -------- UTILS --------
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = np.array(image)

    image = cv2.resize(image, (IMG_SIZE, IMG_SIZE))
    rgb = image / 255.0

    x = torch.tensor(rgb).permute(2,0,1).unsqueeze(0).float().to(device)
    return x, image

def infer(image_tensor):
    with torch.no_grad():
        pred = torch.sigmoid(model(image_tensor))[0,0].cpu().numpy()
    return (pred > 0.5).astype(np.uint8)

# -------- API --------
@app.post("/detect")
async def detect_hyacinth(file: UploadFile = File(...)):
    image_bytes = await file.read()

    x, original = preprocess_image(image_bytes)
    mask = infer(x)

    coverage = mask.sum() / (IMG_SIZE * IMG_SIZE) * 100

    # Overlay (optional but useful)
    overlay = original.copy()
    overlay[mask == 1] = [0, 255, 0]
    blended = cv2.addWeighted(original, 0.7, overlay, 0.3, 0)

    # Encode results
    _, mask_png = cv2.imencode(".png", mask * 255)
    _, overlay_jpg = cv2.imencode(".jpg", blended)

    return JSONResponse({
        "coverage_percent": round(float(coverage), 2),
        "mask_base64": mask_png.tobytes().hex(),
        "overlay_base64": overlay_jpg.tobytes().hex()
    })
