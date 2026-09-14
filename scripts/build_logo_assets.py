from pathlib import Path
from PIL import Image
import cairosvg, io

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "site" / "assets" / "logo"
V = LOGO / "vector"
R = LOGO / "raster"
W = LOGO / "web"
F = LOGO / "favicon"
for d in (R,W,F): d.mkdir(parents=True, exist_ok=True)

def svg_png(src, dst, width):
    data = cairosvg.svg2png(url=str(src), output_width=width)
    im = Image.open(io.BytesIO(data)).convert("RGBA")
    im.save(dst, optimize=True)
    return im

for color in ("copper","charcoal","white"):
    svg_png(V/f"adelem-wordmark-{color}.svg", R/f"adelem-wordmark-{color}-transparent.png", 2400)

dark = svg_png(V/"adelem-badge-dark.svg", R/"adelem-badge-dark.png", 1800)
trans = svg_png(V/"adelem-badge-transparent.svg", R/"adelem-badge-transparent.png", 1800)

for size in (512,1024):
    d = dark.resize((size,size), Image.Resampling.LANCZOS)
    d.save(W/f"adelem-badge-dark-{size}.webp", "WEBP", quality=90, method=6)
    t = trans.resize((size,size), Image.Resampling.LANCZOS)
    t.save(W/f"adelem-badge-transparent-{size}.webp", "WEBP", quality=90, method=6)

base = trans
for size in (16,32,48,180,192,512):
    icon = base.resize((size,size), Image.Resampling.LANCZOS)
    icon.save(F/f"favicon-{size}.png", optimize=True)
base.resize((256,256), Image.Resampling.LANCZOS).save(
    F/"favicon.ico", format="ICO",
    sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)]
)
print("AdeleM logo assets generated")
