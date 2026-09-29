// Réglages de l'accueil saisis dans l'administration (document unique « reglages ») :
// pour l'instant, la photo d'ouverture. En cas d'absence ou d'erreur, l'accueil garde son choix automatique.
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID } from './env';

type Photo = { hotspot?: { x: number; y: number } | null; asset?: { _id: string } | null } | null;

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET });

export async function photoOuvertureSanity(): Promise<{ src: string; position: string; alt: string } | null> {
  if (process.env.ADELEM_DEMO === '1') return null;
  try {
    const client = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      perspective: 'published',
    });
    const r = await client.fetch<{ photo: Photo; alt?: string | null } | null>(
      `*[_id == "reglages"][0]{ "photo": photoOuverture{ hotspot, asset-> { _id } }, "alt": photoOuvertureAlt }`,
    );
    if (!r?.photo?.asset) return null;
    const h = r.photo.hotspot;
    return {
      src: builder.image(r.photo).width(1600).auto('format').quality(82).url(),
      // Le point d'intérêt choisi dans l'administration reste visible quel que soit le recadrage de l'écran.
      position: h ? `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%` : 'center',
      alt: r.alt ?? '',
    };
  } catch {
    return null;
  }
}
