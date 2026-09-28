import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { formatDe, oeuvresSanity } from './sanity/oeuvres';

// Les œuvres viennent de l'espace d'administration (Sanity, /admin).
// Tant qu'aucune œuvre n'y est publiée, le site montre les œuvres d'exemple de src/content/oeuvres/
// (fichiers JSON ; ceux qui commencent par _ sont ignorés). ADELEM_DEMO=1 force les exemples.
const exemples = import.meta.glob<{ default: Record<string, any> }>('./content/oeuvres/[!_]*.json', { eager: true });

function oeuvresExemple() {
  return Object.entries(exemples).map(([chemin, mod]) => {
    const id = chemin.split('/').pop()!.replace(/\.json$/, '');
    const d = mod.default;
    return {
      ...d,
      id,
      format: d.format ?? formatDe(d.largeur_cm, d.hauteur_cm),
      photos: d.photos.map((p: { fichier: string; legende: string; alt: string }) => ({
        src: `/oeuvres/${id}/${p.fichier}`,
        legende: p.legende,
        alt: p.alt,
      })),
    };
  });
}

const oeuvres = defineCollection({
  loader: async () => {
    if (process.env.ADELEM_DEMO === '1') return oeuvresExemple();
    // En cas d'erreur réseau, la construction échoue volontairement : la version en ligne reste en place
    // au lieu d'être remplacée par les exemples.
    const reelles = await oeuvresSanity();
    return reelles.length > 0 ? reelles : oeuvresExemple();
  },
  schema: z.object({
    titre: z.string(),
    annee: z.number().int().nullable().optional(),
    type: z.enum(['tableau', 'sculpture']),
    format: z.enum(['Petit format', 'Moyen format', 'Grand format']),
    statut: z.enum(['disponible', 'reservee', 'vendue']),
    prix: z.number().int().positive().nullable(),
    // Dimensions extérieures, cadre compris : elles servent à l'accrochage à l'échelle.
    largeur_cm: z.number().positive(),
    hauteur_cm: z.number().positive(),
    profondeur_cm: z.number().positive().nullable().optional(),
    poids_kg: z.number().nullable().optional(),
    matieres: z.array(z.string()).default([]),
    cadre: z.string().nullable().optional(),
    provenance: z.string().nullable().optional(),
    histoire: z.string().nullable().optional(),
    // La première photo est la vue de face, aux proportions du cadre.
    photos: z
      .array(z.object({ src: z.string(), legende: z.string(), alt: z.string(), w: z.number().optional(), h: z.number().optional() }))
      .min(1),
    ordre: z.number().default(100),
    accueil: z.boolean().default(false),
    demo: z.boolean().default(false), // œuvre d'exemple
  }),
});

export const collections = { oeuvres };
