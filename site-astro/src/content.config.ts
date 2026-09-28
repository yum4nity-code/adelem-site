import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Une œuvre = un fichier JSON dans src/content/oeuvres/ (les fichiers commençant par _ sont ignorés).
const oeuvres = defineCollection({
  loader: glob({ pattern: '[!_]*.json', base: './src/content/oeuvres' }),
  schema: z.object({
    titre: z.string(),
    type: z.enum(['tableau', 'sculpture']),
    format: z.enum(['Intime', 'Signature', 'Monumental']),
    prix: z.number().int().positive().nullable(),
    statut: z.enum(['disponible', 'reservee', 'vendue']),
    dimensions_cm: z.object({ l: z.number(), h: z.number(), p: z.number().optional() }).nullable(),
    poids_kg: z.number().nullable().optional(),
    annee: z.number().int().nullable().optional(),
    cadre: z.string().nullable().optional(),
    matieres: z.array(z.string()).default([]),
    histoire: z.string().nullable().optional(),
    // Photos dans public/oeuvres/<id>/ : face, biais, matiere, echelle, cadre, situation
    photos: z.array(z.object({ fichier: z.string(), vue: z.string(), alt: z.string() })).min(1),
    ordre: z.number().default(100),
  }),
});

export const collections = { oeuvres };
