# ============================================
# FASTAPI: SEGMENTATION + CHATBOT (AUTO)
# ============================================

import os, io, cv2, torch, json, base64, binascii
import numpy as np
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import segmentation_models_pytorch as smp
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# ---------------- CONFIG ----------------
IMG_SIZE = 256
MODEL_PATH = "best_unet.pth"
GROQ_MODEL = "meta-llama/llama-4-maverick-17b-128e-instruct"
# ---------------------------------------

app = FastAPI(title="Hyacinth Detection + Analysis API")

# ---------------- LOAD MODEL ----------------
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

# ---------------- GROQ ----------------
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ---------------- UTILS ----------------
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = np.array(img)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    x = torch.tensor(img / 255.0).permute(2,0,1).unsqueeze(0).float().to(device)
    return x, img

def infer(x):
    with torch.no_grad():
        pred = torch.sigmoid(model(x))[0,0].cpu().numpy()
    return (pred > 0.5).astype(np.uint8)

def analyze_with_groq(coverage):
    completion = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "Return ONLY valid JSON in this EXACT structure:\n"
                    "{"
                    '"severity":"high|medium|low",'
                    '"coverage_percent":number,'
                    '"risk":"string",'
                    '"recommended_action":"string",'
                    '"confidence":"high|medium|low"'
                    "}"
                )
            },
            {
                "role": "user",
                "content": (
                    f"Detected water hyacinth coverage is {coverage}%. "
                    "Assess severity and recommend action."
                )
            }
        ],
        temperature=0.2,
        max_completion_tokens=300
    )

    result = json.loads(completion.choices[0].message.content)
    result["coverage_percent"] = coverage
    return result


# ---------------- API ----------------
@app.post("/detect")
async def detect_and_analyze(file: UploadFile = File(...)):
    image_bytes = await file.read()

    x, original = preprocess_image(image_bytes)
    mask = infer(x)

    coverage = round(float(mask.sum() / (IMG_SIZE * IMG_SIZE) * 100), 2)

    overlay = original.copy()
    overlay[mask == 1] = [0, 255, 0]
    blended = cv2.addWeighted(original, 0.7, overlay, 0.3, 0)

    _, mask_png = cv2.imencode(".png", mask * 255)
    _, overlay_jpg = cv2.imencode(".jpg", blended)

    mask_hex = mask_png.tobytes().hex()
    overlay_hex = overlay_jpg.tobytes().hex()

    #  AUTO CHATBOT CALL
    chatbot_result = analyze_with_groq(coverage)


    return JSONResponse({
        "segmentation": {
            "coverage_percent": coverage,
            "mask_base64": mask_hex,
            "overlay_base64": overlay_hex
        },
        "analysis": chatbot_result
    })
