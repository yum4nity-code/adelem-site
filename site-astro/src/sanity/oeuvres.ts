// Récupère les œuvres publiées dans Sanity et les met au format du site.
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { readFileSync } from 'node:fs';
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID } from './env';
import { LARGEUR_ANALYSE, rectangle, zoneOccupee, type Zone } from './cadrage';

type Crop = { top: number; bottom: number; left: number; right: number };
type SanityPhoto = {
  legende?: string | null;
  alt?: string | null;
  crop?: Crop | null;
  hotspot?: unknown;
  asset?: { _id: string; metadata?: { dimensions?: { width: number; height: number } } } | null;
};
type SanityOeuvre = {
  _id: string;
  titre: string;
  sous_titre?: string | null;
  annee?: number | null;
  type?: 'tableau' | 'sculpture' | null;
  statut?: 'disponible' | 'reservee' | 'vendue' | null;
  prix?: number | null;
  largeur_cm?: number | null;
  hauteur_cm?: number | null;
  profondeur_cm?: number | null;
  poids_kg?: number | null;
  matieres?: string[] | null;
  cadre?: string | null;
  provenance?: string | null;
  histoire?: string | null;
  entretien?: string | null;
  certificat?: string | null;
  accueil?: boolean | null;
  lien_paiement?: string | null;
  livraison_france?: number | null;
  photos?: SanityPhoto[] | null;
};

const QUERY = `*[_type == "oeuvre" && defined(titre) && defined(largeur_cm) && defined(hauteur_cm) && count(photos[defined(asset)]) > 0]
  | order(_createdAt desc) {
    _id, titre, sous_titre, annee, type, statut, prix, largeur_cm, hauteur_cm, profondeur_cm, poids_kg,
    matieres, cadre, provenance, histoire, entretien, certificat, accueil, lien_paiement, livraison_france,
    photos[defined(asset)]{ legende, alt, crop, hotspot, asset->{ _id, metadata { dimensions { width, height } } } }
  }`;

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET });

export const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[œŒ]/g, 'oe')
    .replace(/[æÆ]/g, 'ae')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'oeuvre';

// Petit ≤ 40 cm, moyen ≤ 70 cm, grand au-delà (plus grand côté, cadre compris).
export const formatDe = (l: number, h: number) => {
  const m = Math.max(l, h);
  return m <= 40 ? 'Petit format' : m <= 70 ? 'Format signature' : 'Grand format';
};

// Zone de l'image originale (en pixels) à partir de laquelle on travaille : le recadrage fait dans l'admin s'il existe,
// réduit au besoin à la partie réellement occupée par l'œuvre (fond transparent ou uni retiré, voir cadrage.ts).
function zoneDeTravail(p: SanityPhoto, occupee: Zone | null): { dans: Zone; zone: Zone } | null {
  const d = p.asset?.metadata?.dimensions;
  if (!d || !occupee) return null;
  const c = p.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const dans = { left: c.left * d.width, top: c.top * d.height, width: d.width * (1 - c.left - c.right), height: d.height * (1 - c.top - c.bottom) };
  const l = Math.max(dans.left, occupee.left * d.width);
  const t = Math.max(dans.top, occupee.top * d.height);
  const r = Math.min(dans.left + dans.width, (occupee.left + occupee.width) * d.width);
  const b = Math.min(dans.top + dans.height, (occupee.top + occupee.height) * d.height);
  if (r - l < 20 || b - t < 20) return null;
  return { dans, zone: { left: l, top: t, width: r - l, height: b - t } };
}

function photo(p: SanityPhoto, i: number, o: SanityOeuvre, occupee: Zone | null) {
  const img = { asset: { _ref: p.asset!._id }, crop: p.crop ?? undefined, hotspot: p.hotspot ?? undefined };
  const travail = zoneDeTravail(p, occupee);
  // Avec un fond vide détecté, l'image est découpée explicitement (rect) ; sinon, comportement d'origine.
  const vue = (ratio: number | null) => {
    if (!travail) return builder.image(img);
    const r = rectangle(travail.zone, travail.dans, ratio);
    return builder.image(p.asset!._id).rect(r.left, r.top, r.width, r.height);
  };
  const alt = p.alt?.trim() || (i === 0 ? `${o.titre}, vue de face` : `${o.titre}, ${p.legende?.trim() || 'détail'}`);
  const legende = p.legende?.trim() || (i === 0 ? 'Face' : 'Détail');
  // Vignette carrée pour la rangée de photos sous l'œuvre (respecte le recadrage et le point d'intérêt).
  const mini = vue(1).width(240).height(240).fit('crop').auto('format').quality(70).url();
  if (i === 0) {
    // Vue de face : recadrée exactement aux proportions réelles du cadre, pour l'accrochage à l'échelle.
    const w = 1600;
    const h = Math.round((w * o.hauteur_cm!) / o.largeur_cm!);
    return { src: vue(o.largeur_cm! / o.hauteur_cm!).width(w).height(h).fit('crop').auto('format').quality(82).url(), mini, legende, alt, w, h };
  }
  const d = p.asset!.metadata?.dimensions;
  const c = p.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const ratio = travail
    ? travail.zone.height / travail.zone.width
    : d ? (d.height * (1 - c.top - c.bottom)) / (d.width * (1 - c.left - c.right)) : 0.75;
  const w = 1800;
  return {
    src: vue(null).width(w).fit('max').auto('format').quality(80).url(),
    mini,
    legende,
    alt,
    w,
    h: Math.round(w * ratio),
  };
}

// Analyse des photos (une requête par photo, en PNG réduit pour garder la transparence).
// En cas d'échec réseau sur une photo, elle est simplement gardée telle quelle.
async function zonesOccupees(docs: SanityOeuvre[]): Promise<Map<string, Zone | null>> {
  const ids = [...new Set(docs.flatMap((o) => (o.photos ?? []).map((p) => p.asset?._id).filter((x): x is string => !!x)))];
  const zones = new Map<string, Zone | null>();
  if (process.env.ADELEM_SANS_CADRAGE === '1') return zones;
  const analyser = async (id: string) => {
    try {
      const url = builder.image(id).width(LARGEUR_ANALYSE).format('png').url();
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      zones.set(id, await zoneOccupee(Buffer.from(await r.arrayBuffer())));
    } catch (e) {
      console.warn(`[cadrage] photo ${id} non analysée (${(e as Error).message}) : gardée telle quelle.`);
      zones.set(id, null);
    }
  };
  for (let k = 0; k < ids.length; k += 6) await Promise.all(ids.slice(k, k + 6).map(analyser));
  return zones;
}

export async function oeuvresSanity() {
  let docs: SanityOeuvre[];
  if (process.env.SANITY_FIXTURE) {
    docs = JSON.parse(readFileSync(process.env.SANITY_FIXTURE, 'utf8'));
  } else {
    const client = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      perspective: 'published',
    });
    docs = await client.fetch<SanityOeuvre[]>(QUERY);
  }

  const zones = await zonesOccupees(docs);
  const vus = new Map<string, number>();
  return docs.map((o, i) => {
    const base = slugify(o.titre);
    const n = (vus.get(base) ?? 0) + 1;
    vus.set(base, n);
    return {
      id: n > 1 ? `${base}-${n}` : base,
      titre: o.titre.trim(),
      sous_titre: o.sous_titre?.trim() || null,
      annee: o.annee ?? null,
      type: o.type ?? 'tableau',
      format: formatDe(o.largeur_cm!, o.hauteur_cm!),
      statut: o.statut ?? 'disponible',
      prix: o.prix ?? null,
      largeur_cm: o.largeur_cm!,
      hauteur_cm: o.hauteur_cm!,
      profondeur_cm: o.profondeur_cm ?? null,
      poids_kg: o.poids_kg ?? null,
      matieres: o.matieres ?? [],
      cadre: o.cadre ?? null,
      provenance: o.provenance ?? null,
      histoire: o.histoire ?? null,
      entretien: o.entretien ?? null,
      certificat: o.certificat ?? null,
      photos: (o.photos ?? []).map((p, j) => photo(p, j, o, zones.get(p.asset!._id) ?? null)),
      ordre: i + 1,
      accueil: !!o.accueil,
      lien_paiement: o.lien_paiement ?? null,
      livraison_france: o.livraison_france ?? null,
      demo: false,
    };
  });
}
