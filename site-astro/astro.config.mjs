import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://adelem.fr',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [
    // Pages exclues du sitemap tant qu'elles sont incomplètes (retirer /cgv et /mentions-legales une fois validées)
    sitemap({ filter: (page) => !['/merci', '/cgv', '/mentions-legales'].some((p) => page.includes(p)) }),
  ],
});
