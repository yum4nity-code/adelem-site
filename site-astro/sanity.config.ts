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
            S.divider(),
            // Document unique : les réglages de l'accueil (photo d'ouverture).
            S.listItem().title('Accueil').id('reglages').child(S.document().schemaType('reglages').documentId('reglages')),
            // Document unique : les textes sous le titre de chaque rubrique de la galerie.
            S.listItem().title('Textes de la galerie').id('textesGalerie').child(S.document().schemaType('textesGalerie').documentId('textesGalerie')),
          ]),
    }),
    frFRLocale(),
  ],
  schema: { types: schemaTypes },
  document: {
    // Pas de « dupliquer / nouveau document » d'autres types que ceux-ci.
    newDocumentOptions: (prev) => prev.filter((t) => ['oeuvre', 'carnet'].includes(t.templateId)),
  },
});
