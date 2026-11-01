// Image d'aperçu composée (1200 × 630) : à gauche la pièce entière sur le fond du site, à droite un gros plan.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import sharp, { type OverlayOptions } from 'sharp';
import { apercuCompose } from '../../data/apercu';

export async function getStaticPaths() {
  const oeuvres = await getCollection('oeuvres');
  return oeuvres.filter((o) => apercuCompose(o.data)).map((o) => ({ params: { id: o.id }, props: { oeuvre: o } }));
}

const lire = async (src: string) => {
  if (/^https?:/.test(src)) {
    const r = await fetch(src.replace(/([?&])auto=format&?/, '$1'));
    if (!r.ok) throw new Error(`HTTP ${r.status} ${src}`);
    return Buffer.from(await r.arrayBuffer());
  }
  return readFile(new URL(`../../../public${src}`, import.meta.url));
};

export const GET: APIRoute = async ({ props }) => {
  // La pièce occupe le carré central (630 × 630) : WhatsApp découpe ce carré pour ses petites miniatures, la pièce y
  // reste donc entière. Dans le grand aperçu, deux gros plans l'encadrent (2e et 3e photos, ou deux cadrages de la 2e).
  // Une photo injoignable ne bloque jamais la mise en ligne : sans gros plan, la pièce reste seule au centre.
  const d = (props as any).oeuvre.data;
  const [face, d1, d2] = await Promise.all([
    lire(d.photos[0].src),
    lire(d.photos[1].src).catch(() => null),
    d.photos[2] ? lire(d.photos[2].src).catch(() => null) : Promise.resolve(null),
  ]);
  const piece = await sharp(face).resize(560, 590, { fit: 'inside' }).toBuffer({ resolveWithObject: true });
  const calques: OverlayOptions[] = [];
  const cote = async (src: Buffer, position: string) => sharp(src).resize(285, 630, { fit: 'cover', position }).toBuffer();
  if (d1) {
    calques.push({ input: await cote(d1, d2 ? 'attention' : 'left'), left: 0, top: 0 });
    calques.push({ input: await cote(d2 ?? d1, d2 ? 'attention' : 'right'), left: 915, top: 0 });
  }
  calques.push({ input: piece.data, left: Math.round(600 - piece.info.width / 2), top: Math.round(315 - piece.info.height / 2) });
  const img = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#1B211B' } })
    .composite(calques)
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(img), { headers: { 'Content-Type': 'image/jpeg' } });
};
