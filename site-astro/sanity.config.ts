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
            S.documentTypeListItem('herbier').title('Herbier (petits formats)'),
            S.documentTypeListItem('carnet').title('Carnet d’atelier'),
            S.divider(),
            // Document unique : les réglages de l'accueil (photo d'ouverture).
            S.listItem().title('Accueil').id('reglages').child(S.document().schemaType('reglages').documentId('reglages')),
          ]),
    }),
    frFRLocale(),
  ],
  schema: { types: schemaTypes },
  document: {
    // Pas de « dupliquer / nouveau document » d'autres types que ceux-ci.
    newDocumentOptions: (prev) => prev.filter((t) => ['oeuvre', 'carnet', 'herbier'].includes(t.templateId)),
  },
});
