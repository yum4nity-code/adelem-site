// Récupère les entrées du carnet d'atelier publiées dans Sanity et les met au format du site.
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { readFileSync } from 'node:fs';
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID } from './env';
import { slugify } from './oeuvres';

type SanityCarnet = {
  _id: string;
  titre: string;
  date?: string | null;
  texte: string;
  photo?: SanityImage | null;
  photos?: (SanityImage | null)[] | null;
};

type SanityImage = { hotspot?: unknown; crop?: unknown; asset?: { _id: string } | null };

const QUERY = `*[_type == "carnet" && defined(titre) && defined(texte) && (defined(photo.asset) || count(photos[defined(asset)]) > 0)]
  | order(date desc) {
    _id, titre, date, texte,
    photo{ hotspot, crop, asset-> { _id } },
    photos[]{ hotspot, crop, asset-> { _id } }
  }`;

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET });

export async function carnetSanity() {
  let docs: SanityCarnet[];
  if (process.env.SANITY_FIXTURE_CARNET) {
    docs = JSON.parse(readFileSync(process.env.SANITY_FIXTURE_CARNET, 'utf8'));
  } else {
    const client = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      perspective: 'published',
    });
    docs = await client.fetch<SanityCarnet[]>(QUERY);
  }

  const vus = new Map<string, number>();
  return docs.map((c) => {
    const base = slugify(c.titre);
    const n = (vus.get(base) ?? 0) + 1;
    vus.set(base, n);
    // L'ancienne photo unique (entrées saisies avant le champ « Photos ») reste en tête, puis les photos ajoutées.
    const sources = [c.photo, ...(c.photos ?? [])].filter((p): p is SanityImage => !!p?.asset?._id);
    const images = sources.map((p) => {
      const img = { asset: { _ref: p.asset!._id }, hotspot: p.hotspot ?? undefined, crop: p.crop ?? undefined };
      return {
        vignette: builder.image(img).width(640).height(480).fit('crop').auto('format').quality(80).url(),
        grande: builder.image(img).width(1600).fit('max').auto('format').quality(82).url(),
      };
    });
    return {
      id: n > 1 ? `${base}-${n}` : base,
      titre: c.titre.trim(),
      date: c.date ?? null,
      texte: c.texte.trim(),
      images,
      demo: false,
    };
  });
}
