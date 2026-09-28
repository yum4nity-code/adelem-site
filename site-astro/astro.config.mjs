import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'https://adelem.fr',
  trailingSlash: 'never',
  build: { format: 'directory' },
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
    sitemap({ filter: (page) => !['/merci', '/cgv', '/mentions-legales', '/admin'].some((p) => page.includes(p)) }),
  ],
});
