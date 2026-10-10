// Récupère les triptyques « Herbier » publiés dans Sanity et les met au format du site.
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { readFileSync } from 'node:fs';
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID } from './env';
import { slugify } from './oeuvres';

type SanityHerbier = {
  _id: string;
  titre: string;
  prix: number;
  statut?: 'disponible' | 'epuise' | null;
  taille_cm?: number | null;
  matieres?: string[] | null;
  description?: string | null;
  lien_paiement?: string | null;
  livraison_france?: number | null;
  photo?: { hotspot?: unknown; crop?: unknown; asset?: { _id: string } | null } | null;
  autres_photos?: { hotspot?: unknown; crop?: unknown; legende?: string | null; asset?: { _id: string } | null }[] | null;
};

const QUERY = `*[_type == "herbier" && defined(titre) && defined(prix) && defined(photo.asset)]
  | order(_createdAt desc) {
    _id, titre, prix, statut, taille_cm, matieres, description, lien_paiement, livraison_france,
    photo{ hotspot, crop, asset-> { _id } },
    autres_photos[defined(asset)]{ hotspot, crop, legende, asset-> { _id } }
  }`;

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET });

export async function herbierSanity() {
  let docs: SanityHerbier[];
  if (process.env.SANITY_FIXTURE_HERBIER) {
    docs = JSON.parse(readFileSync(process.env.SANITY_FIXTURE_HERBIER, 'utf8'));
  } else {
    const client = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      perspective: 'published',
    });
    docs = await client.fetch<SanityHerbier[]>(QUERY);
  }

  const vus = new Map<string, number>();
  return docs.map((h) => {
    const base = slugify(h.titre);
    const n = (vus.get(base) ?? 0) + 1;
    vus.set(base, n);
    const img = { asset: { _ref: h.photo!.asset!._id }, hotspot: h.photo!.hotspot ?? undefined, crop: h.photo!.crop ?? undefined };
    return {
      id: n > 1 ? `${base}-${n}` : base,
      titre: h.titre.trim(),
      prix: h.prix,
      statut: h.statut ?? 'disponible',
      taille_cm: h.taille_cm ?? null,
      matieres: h.matieres ?? [],
      description: h.description?.trim() || null,
      image: builder.image(img).width(1400).fit('max').auto('format').quality(82).url(),
      mini: builder.image(img).width(240).height(240).fit('crop').auto('format').quality(70).url(),
      vues: (h.autres_photos ?? []).map((p, i) => {
        const v = { asset: { _ref: p.asset!._id }, hotspot: p.hotspot ?? undefined, crop: p.crop ?? undefined };
        const legende = p.legende?.trim() || 'Détail';
        return {
          src: builder.image(v).width(1400).fit('max').auto('format').quality(80).url(),
          mini: builder.image(v).width(240).height(240).fit('crop').auto('format').quality(70).url(),
          legende,
          alt: `Trio ${h.titre.trim()}, ${legende.toLowerCase()} (photo ${i + 2})`,
        };
      }),
      lien_paiement: h.lien_paiement ?? null,
      livraison_france: h.livraison_france ?? null,
      demo: false,
    };
  });
}
