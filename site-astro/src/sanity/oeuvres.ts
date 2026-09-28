// Récupère les œuvres publiées dans Sanity et les met au format du site.
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { readFileSync } from 'node:fs';
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID } from './env';

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
  photos?: SanityPhoto[] | null;
};

const QUERY = `*[_type == "oeuvre" && defined(titre) && defined(largeur_cm) && defined(hauteur_cm) && count(photos[defined(asset)]) > 0]
  | order(_createdAt desc) {
    _id, titre, annee, type, statut, prix, largeur_cm, hauteur_cm, profondeur_cm, poids_kg,
    matieres, cadre, provenance, histoire, entretien, certificat, accueil,
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

function photo(p: SanityPhoto, i: number, o: SanityOeuvre) {
  const img = { asset: { _ref: p.asset!._id }, crop: p.crop ?? undefined, hotspot: p.hotspot ?? undefined };
  const alt = p.alt?.trim() || (i === 0 ? `${o.titre}, vue de face` : `${o.titre}, ${p.legende?.trim() || 'détail'}`);
  const legende = p.legende?.trim() || (i === 0 ? 'Face' : 'Détail');
  if (i === 0) {
    // Vue de face : recadrée exactement aux proportions réelles du cadre, pour l'accrochage à l'échelle.
    const w = 1600;
    const h = Math.round((w * o.hauteur_cm!) / o.largeur_cm!);
    return { src: builder.image(img).width(w).height(h).fit('crop').auto('format').quality(82).url(), legende, alt, w, h };
  }
  const d = p.asset!.metadata?.dimensions;
  const c = p.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const ratio = d ? (d.height * (1 - c.top - c.bottom)) / (d.width * (1 - c.left - c.right)) : 0.75;
  const w = 1800;
  return {
    src: builder.image(img).width(w).fit('max').auto('format').quality(80).url(),
    legende,
    alt,
    w,
    h: Math.round(w * ratio),
  };
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

  const vus = new Map<string, number>();
  return docs.map((o, i) => {
    const base = slugify(o.titre);
    const n = (vus.get(base) ?? 0) + 1;
    vus.set(base, n);
    return {
      id: n > 1 ? `${base}-${n}` : base,
      titre: o.titre.trim(),
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
      photos: (o.photos ?? []).map((p, j) => photo(p, j, o)),
      ordre: i + 1,
      accueil: !!o.accueil,
      demo: false,
    };
  });
}
