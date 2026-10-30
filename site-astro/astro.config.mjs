import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Adaptateur Vercel (2026-10-30) : le site reste pré-construit, sauf /api/stripe-webhook (fonction serveur).
  // Il produit aussi les redirections ci-dessous dans la configuration Vercel.
  adapter: vercel(),
  site: 'https://www.adelem.fr',
  trailingSlash: 'never',
  build: { format: 'directory' },
  // Redirections (pages statiques de renvoi). Herbier retiré du menu le 2026-10-26 : sa page source est gardée en _herbier.
  redirects: { '/herbier': '/a-propos', '/sur-mesure': '/galerie', '/sculptures': '/galerie/sculptures' },
  integrations: [
    // Espace d'administration d'Adèle sur /admin (Sanity Studio, chargé seulement sur cette page).
    sanity({
      projectId: 'b9pobh76',
      dataset: 'production',
      apiVersion: '2025-02-19',
      useCdn: false,
      studioBasePath: '/admin',
    }),
    react(),
    // Pages exclues du sitemap tant qu'elles sont incomplètes (retirer /cgv et /mentions-legales une fois validées)
    sitemap({ filter: (page) => !['/merci', '/cgv', '/mentions-legales', '/admin', '/herbier'].some((p) => page.includes(p)) }),
  ],
});
