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
  const d = (props as any).oeuvre.data;
  // Une photo injoignable ne doit jamais bloquer la mise en ligne : sans gros plan, la pièce seule est centrée.
  const [face, detail] = await Promise.all([lire(d.photos[0].src), lire(d.photos[1].src).catch(() => null)]);
  const gauche = await sharp(face).resize(540, 570, { fit: 'inside' }).toBuffer({ resolveWithObject: true });
  const centre = detail ? 300 : 600;
  const calques: OverlayOptions[] = [
    { input: gauche.data, left: Math.round(centre - gauche.info.width / 2), top: Math.round(315 - gauche.info.height / 2) },
  ];
  if (detail) calques.push({ input: await sharp(detail).resize(600, 630, { fit: 'cover', position: 'attention' }).toBuffer(), left: 600, top: 0 });
  const img = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#1B211B' } })
    .composite(calques)
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(img), { headers: { 'Content-Type': 'image/jpeg' } });
};
