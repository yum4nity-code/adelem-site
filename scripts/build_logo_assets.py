from pathlib import Path
from PIL import Image
import numpy as np
import cv2

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "site" / "assets" / "logo"
SRC = LOGO / "master" / "adelem-original-master.png"
VECTOR = LOGO / "vector"
RASTER = LOGO / "raster"
WEB = LOGO / "web"
FAV = LOGO / "favicon"

for d in (VECTOR, RASTER, WEB, FAV):
    d.mkdir(parents=True, exist_ok=True)

img = Image.open(SRC).convert("RGB")
arr = np.array(img)
h, w = arr.shape[:2]

# 1) Logo circulaire fidèle à la source, extérieur transparent.
rgba = np.dstack([arr, np.full((h, w), 255, dtype=np.uint8)])
yy, xx = np.ogrid[:h, :w]
cx, cy = w / 2.0, h / 2.0
radius = min(w, h) * 0.4883
dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
alpha = np.clip((radius + 1.25 - dist) * 255.0, 0, 255).astype(np.uint8)
rgba[..., 3] = alpha
round_img = Image.fromarray(rgba, "RGBA")
round_img.save(RASTER / "adelem-logo-original-round-transparent.png", optimize=True)

# 2) Extraction fidèle de la signature cuivre depuis l'original.
r, g, bl = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
mask = ((r > 150) & (g > 70) & (bl > 60) &
        ((r - g) > 15) & ((g.astype(int) - bl.astype(int)) > -10) &
        ((r - bl) > 25)).astype(np.uint8) * 255
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))

num, labels, stats, centroids = cv2.connectedComponentsWithStats(mask, 8)
candidates = []
for i in range(1, num):
    x, y, cw, ch, area = stats[i]
    if area > 5000 and cw < int(w * 0.90):
        candidates.append((area, i, x, y, cw, ch))
if not candidates:
    raise RuntimeError("Unable to isolate AdeleM wordmark")
area, comp_id, x, y, cw, ch = max(candidates, key=lambda z: z[0])
component = ((labels == comp_id).astype(np.uint8) * 255)

pad = 28
x0, y0 = max(0, x-pad), max(0, y-pad)
x1, y1 = min(w, x+cw+pad), min(h, y+ch+pad)
crop = component[y0:y1, x0:x1]
chh, cww = crop.shape

# Vectorisation de la silhouette originale.
contours, _ = cv2.findContours(crop, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
parts = []
for c in contours:
    if cv2.contourArea(c) < 2:
        continue
    a = cv2.approxPolyDP(c, 0.55, True)
    pts = a[:, 0, :]
    seg = []
    for j, (px, py_) in enumerate(pts):
        seg.append(("M" if j == 0 else "L") + f"{int(px)},{int(py_)}")
    seg.append("Z")
    parts.append(" ".join(seg))
path_d = " ".join(parts)

colors = {
    "copper": "#D58A6F",
    "charcoal": "#171714",
    "white": "#FFFFFF",
}
for name, color in colors.items():
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cww} {chh}" '
        f'role="img" aria-label="Adelem"><title>Adelem</title>'
        f'<path d="{path_d}" fill="{color}" fill-rule="evenodd"/></svg>'
    )
    (VECTOR / f"adelem-wordmark-{name}.svg").write_text(svg, encoding="utf-8")

    # PNG HD transparent. Le suréchantillonnage lisse les bords sans modifier la forme.
    out_w = 2400
    out_h = round(out_w * chh / cww)
    alpha_im = Image.fromarray(crop, "L").resize((out_w, out_h), Image.Resampling.LANCZOS)
    rgb = tuple(int(color[i:i+2], 16) for i in (1, 3, 5))
    out = Image.new("RGBA", (out_w, out_h), rgb + (0,))
    out.putalpha(alpha_im)
    out.save(RASTER / f"adelem-wordmark-{name}-transparent.png", optimize=True)

# 3) Versions web légères du logo original.
for size in (512, 1024):
    web = round_img.resize((size, size), Image.Resampling.LANCZOS)
    web.save(WEB / f"adelem-logo-original-round-{size}.webp",
             format="WEBP", quality=88, method=6)

# 4) Favicons / icônes.
for size in (16, 32, 48, 180, 192, 512):
    icon = round_img.resize((size, size), Image.Resampling.LANCZOS)
    icon.save(FAV / f"favicon-{size}.png", optimize=True)
round_img.resize((256, 256), Image.Resampling.LANCZOS).save(
    FAV / "favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
)

print("AdeleM logo assets generated.")
