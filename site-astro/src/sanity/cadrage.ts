// Recadrage automatique des photos : retire le fond vide autour du cadre.
// Pourquoi : une photo détourée (PNG à fond transparent) ou prise sur un fond uni laisse une large marge autour
// du tableau. Le site recadre la vue de face aux proportions du cadre ; avec cette marge, le tableau paraissait
// petit sur les murs (incident du 2026-10-26, Balade d'automne remplacée par un PNG détouré 2500 × 2500).
// Ici, on mesure la zone réellement occupée par l'œuvre, et le site ne garde que cette zone, quel que soit le fichier envoyé.
import sharp from 'sharp';

export type Zone = { left: number; top: number; width: number; height: number };

const ANALYSE = 400; // largeur de l'aperçu analysé (px) : suffisant pour trouver les bords, rapide à télécharger.

// Zone occupée par l'œuvre, en fraction de l'image (0 à 1), ou null s'il n'y a pas de fond vide à retirer.
export async function zoneOccupee(buffer: Buffer): Promise<Zone | null> {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const px = (x: number, y: number) => (y * W + x) * 4;

  // 1. Fond transparent (photo détourée) : on garde les pixels visibles.
  // 2. Sinon, fond uni : les quatre coins doivent avoir la même couleur ; on garde ce qui s'en écarte nettement.
  const coins = [px(1, 1), px(W - 2, 1), px(1, H - 2), px(W - 2, H - 2)];
  const transparent = coins.every((i) => data[i + 3] < 20);
  const ref = coins[0];
  const ecart = (i: number, j: number) => Math.max(Math.abs(data[i] - data[j]), Math.abs(data[i + 1] - data[j + 1]), Math.abs(data[i + 2] - data[j + 2]));
  const uni = !transparent && coins.every((i) => data[i + 3] > 235 && ecart(i, ref) <= 14);
  if (!transparent && !uni) return null;
  const plein = transparent ? (i: number) => data[i + 3] >= 40 : (i: number) => data[i + 3] >= 40 && ecart(i, ref) > 28;

  // Une ligne ou une colonne compte si au moins 1 % de ses pixels appartiennent à l'œuvre (ignore poussières et ombres légères).
  const lignes = new Array(H).fill(0);
  const colonnes = new Array(W).fill(0);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (plein(px(x, y))) { lignes[y]++; colonnes[x]++; }
  const seuilL = Math.max(2, W * 0.01);
  const seuilC = Math.max(2, H * 0.01);
  const top = lignes.findIndex((n) => n >= seuilL);
  const bottom = H - 1 - [...lignes].reverse().findIndex((n) => n >= seuilL);
  const left = colonnes.findIndex((n) => n >= seuilC);
  const right = W - 1 - [...colonnes].reverse().findIndex((n) => n >= seuilC);
  if (top < 0 || left < 0 || bottom <= top || right <= left) return null;
  const z = { left: left / W, top: top / H, width: (right - left + 1) / W, height: (bottom - top + 1) / H };
  // Rien à gagner (marge de moins de 2 % de chaque côté) : on laisse la photo telle quelle.
  if (z.width > 0.96 && z.height > 0.96) return null;
  return z;
}

// Rectangle (en pixels de l'original) à garder pour obtenir le ratio voulu en montrant toute l'œuvre :
// on élargit la zone occupée jusqu'au bon ratio (le surplus est du fond vide), sans sortir de « dans ».
// Si l'image n'a pas la place, on rogne de façon centrée, comme avant.
export function rectangle(zone: Zone, dans: Zone, ratio: number | null): Zone {
  let { left, top, width, height } = zone;
  if (ratio) {
    if (width / height < ratio) {
      const w = Math.min(height * ratio, dans.width);
      left -= (w - width) / 2; width = w;
      if (w < height * ratio) { const h = w / ratio; top += (height - h) / 2; height = h; }
    } else {
      const h = Math.min(width / ratio, dans.height);
      top -= (h - height) / 2; height = h;
      if (h < width / ratio) { const w = h * ratio; left += (width - w) / 2; width = w; }
    }
  }
  left = Math.min(Math.max(left, dans.left), dans.left + dans.width - width);
  top = Math.min(Math.max(top, dans.top), dans.top + dans.height - height);
  return { left: Math.round(left), top: Math.round(top), width: Math.round(width), height: Math.round(height) };
}

export const LARGEUR_ANALYSE = ANALYSE;
