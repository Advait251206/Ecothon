# =========================================================
# SINGLE-FILE U-NET TRAINING FOR WATER HYACINTH SEGMENTATION
# =========================================================

import os
import cv2
import torch
import numpy as np
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import albumentations as A
import segmentation_models_pytorch as smp



# ---------------- CONFIG ----------------
IMG_SIZE = 256
BATCH_SIZE = 4
EPOCHS = 100
LR = 1e-4

TRAIN_IMG = "dataset/images/train"
TRAIN_MASK = "dataset/masks/train"
VAL_IMG   = "dataset/images/val"
VAL_MASK  = "dataset/masks/val"
# ---------------------------------------


# ---------------- DATASET ----------------
class HyacinthDataset(Dataset):
    def __init__(self, img_dir, mask_dir, augment=False):
        self.img_dir = img_dir
        self.mask_dir = mask_dir
        self.files = os.listdir(img_dir)
        self.augment = augment

        self.transform = A.Compose([
            A.HorizontalFlip(p=0.5),
            A.VerticalFlip(p=0.5),
            A.Rotate(limit=15, p=0.5),
            A.RandomBrightnessContrast(p=0.5),
        ]) if augment else None

    def __len__(self):
        return len(self.files)

    def __getitem__(self, idx):
        name = self.files[idx]

        img = cv2.imread(os.path.join(self.img_dir, name))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
        img = img / 255.0

        mask_name = os.path.splitext(name)[0] + ".png"
        mask = cv2.imread(os.path.join(self.mask_dir, mask_name), 0)
        mask = cv2.resize(mask, (IMG_SIZE, IMG_SIZE))
        mask = mask / 255.0

        if self.transform:
            aug = self.transform(image=img, mask=mask)
            img, mask = aug["image"], aug["mask"]

        img = torch.tensor(img, dtype=torch.float32).permute(2,0,1)
        mask = torch.tensor(mask, dtype=torch.float32).unsqueeze(0)

        return img, mask


# ---------------- MODEL ----------------
model = smp.Unet(
    encoder_name="resnet34",
    encoder_weights="imagenet",
    in_channels=3,
    classes=1,
    activation=None
)

device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)


# ---------------- LOSS ----------------
bce = nn.BCEWithLogitsLoss()

def dice_loss(pred, target, smooth=1):
    pred = torch.sigmoid(pred)
    intersection = (pred * target).sum()
    return 1 - (2*intersection + smooth) / (pred.sum() + target.sum() + smooth)

def loss_fn(pred, target):
    return bce(pred, target) + dice_loss(pred, target)


# ---------------- TRAIN ----------------
train_ds = HyacinthDataset(TRAIN_IMG, TRAIN_MASK, augment=True)
val_ds   = HyacinthDataset(VAL_IMG, VAL_MASK, augment=False)

train_loader = DataLoader(train_ds, batch_size=BATCH_SIZE, shuffle=True)
val_loader   = DataLoader(val_ds, batch_size=BATCH_SIZE)

optimizer = torch.optim.Adam(model.parameters(), lr=LR)

best_val = 1e9
patience, wait = 10, 0

for epoch in range(EPOCHS):
    model.train()
    train_loss = 0

    for img, mask in train_loader:
        img, mask = img.to(device), mask.to(device)

        pred = model(img)
        loss = loss_fn(pred, mask)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        train_loss += loss.item()

    model.eval()
    val_loss = 0
    with torch.no_grad():
        for img, mask in val_loader:
            img, mask = img.to(device), mask.to(device)
            pred = model(img)
            val_loss += loss_fn(pred, mask).item()

    print(f"Epoch {epoch+1} | Train {train_loss:.4f} | Val {val_loss:.4f}")

    if val_loss < best_val:
        best_val = val_loss
        torch.save(model.state_dict(), "best_unet.pth")
        wait = 0
    else:
        wait += 1
        if wait >= patience:
            break


# ---------------- INFERENCE ----------------
model.load_state_dict(torch.load("best_unet.pth"))
model.eval()

test_img = cv2.imread("test.jpg")
test_img = cv2.resize(test_img, (IMG_SIZE, IMG_SIZE))
rgb = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB) / 255.0

x = torch.tensor(rgb).permute(2,0,1).unsqueeze(0).float().to(device)

with torch.no_grad():
    pred = torch.sigmoid(model(x))[0,0].cpu().numpy()

mask = (pred > 0.5).astype(np.uint8)
coverage = mask.sum() / (IMG_SIZE*IMG_SIZE) * 100

print("Coverage %:", coverage)
