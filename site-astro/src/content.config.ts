import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Une œuvre = un fichier JSON dans src/content/oeuvres/ (les fichiers commençant par _ sont ignorés).
// Plus tard, la même structure viendra de l'espace d'administration (Sanity).
const oeuvres = defineCollection({
  loader: glob({ pattern: '[!_]*.json', base: './src/content/oeuvres' }),
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
    cadre: z.string().nullable().optional(), // ex. « Cadre en chêne sculpté, vers 1900 »
    provenance: z.string().nullable().optional(), // ex. « chiné près d'Uzès, restauré à l'atelier »
    histoire: z.string().nullable().optional(),
    // Photos dans public/oeuvres/<id>/. La première (face) est recadrée au ras du cadre.
    photos: z.array(z.object({ fichier: z.string(), legende: z.string(), alt: z.string() })).min(1),
    ordre: z.number().default(100),
    demo: z.boolean().default(false), // œuvre d'exemple, à retirer au lancement
  }),
});

export const collections = { oeuvres };
