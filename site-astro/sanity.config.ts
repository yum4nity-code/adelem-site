import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { frFRLocale } from '@sanity/locale-fr-fr';
import { schemaTypes } from './src/sanity/schema';
import { SANITY_PROJECT_ID, SANITY_DATASET } from './src/sanity/env';

// Espace d'administration, accessible sur /admin.
export default defineConfig({
  name: 'adelem',
  title: 'Adelem',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Adelem')
          .items([
            S.documentTypeListItem('oeuvre').title('Œuvres'),
            S.documentTypeListItem('carnet').title('Carnet d’atelier'),
          ]),
    }),
    frFRLocale(),
  ],
  schema: { types: schemaTypes },
  document: {
    // Pas de « dupliquer / nouveau document » d'autres types : seules la fiche œuvre et le carnet existent.
    newDocumentOptions: (prev) => prev.filter((t) => t.templateId === 'oeuvre' || t.templateId === 'carnet'),
  },
});
