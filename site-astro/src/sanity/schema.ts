import { defineArrayMember, defineField, defineType } from 'sanity';

// Fiche d'une œuvre, telle qu'Adèle la remplit dans /admin.
// Le format (petit, moyen, grand) et l'adresse de la page sont calculés tout seuls.
export const oeuvre = defineType({
  name: 'oeuvre',
  title: 'Œuvre',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      title: 'Photos',
      description:
        "Glissez 3 photos ou plus. La 1re est l'œuvre bien de face : cliquez dessus puis sur l'icône de recadrage pour couper au ras du cadre. Les suivantes : la matière de près, le cadre, l'œuvre au mur. Faites-les glisser pour changer l'ordre.",
      type: 'array',
      options: { layout: 'grid' },
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'legende',
              title: 'Légende (facultatif)',
              description: 'Ex. « La matière », « Le cadre », « Au mur ».',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              title: 'Description pour les malvoyants (facultatif)',
              description: 'Une phrase qui décrit la photo. Sans texte, le titre de l’œuvre est utilisé.',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (r) => r.required().min(1).error('Ajoutez au moins une photo : l’œuvre de face.'),
    }),
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required().error('Le titre est obligatoire.'),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      description: 'Tableau par défaut : pour une sculpture, cochez Sculpture.',
      type: 'string',
      initialValue: 'tableau',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Tableau', value: 'tableau' },
          { title: 'Sculpture', value: 'sculpture' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'histoire',
      title: 'Description',
      description: 'Deux ou trois phrases simples : ce qu’on y voit, ce qu’elle raconte, d’où viennent les matières. Affichée en grand sur la page de l’œuvre.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'statut',
      title: 'Disponibilité',
      type: 'string',
      initialValue: 'disponible',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Disponible', value: 'disponible' },
          { title: 'Réservée', value: 'reservee' },
          { title: 'Vendue', value: 'vendue' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'prix',
      title: 'Prix en euros',
      description: 'Laisser vide pour afficher « Prix sur demande ».',
      type: 'number',
      validation: (r) => r.integer().positive(),
    }),
    defineField({
      name: 'largeur_cm',
      title: 'Largeur (cm), cadre compris',
      type: 'number',
      validation: (r) => [
        r.required().positive().max(400).error('Indiquez la largeur en centimètres.'),
        r.max(150).warning('Plus de 150 cm : vérifiez que c’est bien en centimètres.'),
      ],
    }),
    defineField({
      name: 'hauteur_cm',
      title: 'Hauteur (cm), cadre compris',
      type: 'number',
      validation: (r) => [
        r.required().positive().max(400).error('Indiquez la hauteur en centimètres.'),
        r.max(150).warning('Plus de 150 cm : vérifiez que c’est bien en centimètres.'),
      ],
    }),
    defineField({
      name: 'profondeur_cm',
      title: 'Profondeur (cm)',
      type: 'number',
      validation: (r) => [r.positive().max(200), r.max(30).warning('Plus de 30 cm de profondeur : vérifiez la valeur.')],
    }),
    defineField({
      name: 'matieres',
      title: 'Matières',
      description: 'Tapez une matière puis Entrée. Ex. Mousse coussin, Lichen, Écorce de chêne, Galets. (Masqué pour les sculptures : leur matière n’est pas indiquée sur le site.)',
      hidden: ({ document }) => document?.type === 'sculpture',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'cadre',
      title: 'Le cadre (précisions)',
      description: 'Bois, style, époque, état, restauration. Ex. « Chêne massif mouluré, vers 1930, patine d’origine conservée ».',
      type: 'text',
      rows: 2,
      hidden: ({ document }) => document?.type === 'sculpture',
    }),
    defineField({
      name: 'provenance',
      title: 'Provenance du cadre',
      description: 'Ex. « Chiné près d’Uzès, restauré à l’atelier ».',
      hidden: ({ document }) => document?.type === 'sculpture',
      type: 'string',
    }),
    defineField({
      name: 'annee',
      title: 'Année',
      type: 'number',
      initialValue: () => new Date().getFullYear(),
      validation: (r) => r.integer().min(1970).max(2100),
    }),
    defineField({
      name: 'poids_kg',
      title: 'Poids (kg)',
      type: 'number',
      validation: (r) => r.positive().max(200),
    }),
    defineField({
      name: 'entretien',
      title: 'Entretien (facultatif)',
      description:
        'Vos conseils pour que l’œuvre dure bien : lumière, poussière, humidité… Avec vos mots. Laissez vide tant que vous ne savez pas quoi écrire, rien ne s’affiche dans ce cas.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'certificat',
      title: 'Certificat ou signature particulière (facultatif)',
      description:
        'Le site indique déjà que chaque pièce est unique et signée au dos. Remplissez ce champ seulement si cette œuvre a quelque chose en plus : un numéro, un certificat, une dédicace… Sinon, laissez vide.',
      type: 'string',
    }),
    defineField({
      name: 'lien_paiement',
      title: 'Lien de paiement (facultatif)',
      description:
        'Si vous avez un lien de paiement pour cette pièce (Stripe, par exemple), collez-le ici : un bouton « Acquérir » apparaît sur le site. Sans lien, seul le formulaire de demande s’affiche.',
      type: 'url',
    }),
    defineField({
      name: 'livraison_france',
      title: 'Livraison en France (€, facultatif)',
      description: 'Frais de livraison en France pour cette pièce, affichés sur sa fiche. Ailleurs, le tarif est calculé au moment du paiement.',
      type: 'number',
      validation: (r) => r.min(0),
    }),
    defineField({
      name: 'accueil',
      title: 'Mettre en avant sur la page d’accueil',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [{ title: 'Plus récentes', name: 'recentes', by: [{ field: '_createdAt', direction: 'desc' }] }],
  preview: {
    select: { titre: 'titre', l: 'largeur_cm', h: 'hauteur_cm', statut: 'statut', prix: 'prix', media: 'photos.0' },
    prepare({ titre, l, h, statut, prix, media }) {
      const etat = { disponible: 'Disponible', reservee: 'Réservée', vendue: 'Vendue' }[statut as string] ?? '';
      const parts = [l && h ? `${l} × ${h} cm` : null, prix ? `${prix} €` : null, etat].filter(Boolean);
      return { title: titre || 'Nouvelle œuvre', subtitle: parts.join(' · '), media };
    },
  },
});

// Une entrée du carnet d'atelier : un instant de travail, en quelques mots et une photo.
export const carnet = defineType({
  name: 'carnet',
  title: 'Carnet d’atelier',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      description: 'Ex. « Un cadre chiné un dimanche matin », « Le séchage des mousses ».',
      type: 'string',
      validation: (r) => r.required().error('Le titre est obligatoire.'),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'texte',
      title: 'Quelques phrases',
      description: 'Ce que vous avez fait, trouvé, essayé. Pas besoin de grandes phrases.',
      type: 'text',
      rows: 4,
      validation: (r) => r.required().error('Ajoutez quelques mots.'),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      description: 'Une photo prise avec le téléphone suffit.',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required().error('Ajoutez une photo.'),
    }),
  ],
  orderings: [{ title: 'Plus récentes', name: 'recentes', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { titre: 'titre', date: 'date', media: 'photo' },
    prepare({ titre, date, media }) {
      return { title: titre || 'Nouvelle entrée', subtitle: date, media };
    },
  },
});

// Un triptyque « Herbier » : trois petits cadres vendus ensemble, catégorie à part des œuvres uniques.
export const herbier = defineType({
  name: 'herbier',
  title: 'Herbier (petits formats)',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Nom du trio',
      description: 'Ex. « Sous-bois », « Lichen ».',
      type: 'string',
      validation: (r) => r.required().error('Le nom est obligatoire.'),
    }),
    defineField({
      name: 'prix',
      title: 'Prix du triptyque en euros',
      description: 'Le prix pour les trois cadres ensemble.',
      type: 'number',
      validation: (r) => r.required().integer().positive().error('Indiquez un prix.'),
    }),
    defineField({
      name: 'statut',
      title: 'Disponibilité',
      type: 'string',
      initialValue: 'disponible',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Disponible', value: 'disponible' },
          { title: 'Épuisé', value: 'epuise' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'taille_cm',
      title: 'Taille de chaque petit cadre (cm)',
      description: 'Ex. 10 pour un carré de 10 × 10 cm. Laissez vide si les trois cadres n’ont pas la même taille.',
      type: 'number',
      validation: (r) => r.positive().max(30),
    }),
    defineField({
      name: 'matieres',
      title: 'Matières',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'description',
      title: 'Quelques mots',
      description: 'Une ou deux phrases : l’idée du trio, à qui il ferait plaisir.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      title: 'Photo du triptyque',
      description: 'Les trois cadres ensemble, comme ils seraient présentés côte à côte.',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required().error('Ajoutez une photo.'),
    }),
    defineField({
      name: 'lien_paiement',
      title: 'Lien de paiement (facultatif)',
      description:
        'Si vous avez un lien de paiement pour ce trio (Stripe, par exemple), collez-le ici : un bouton « Acquérir » apparaît sur le site. Sans lien, seul le formulaire de demande s’affiche.',
      type: 'url',
    }),
    defineField({
      name: 'livraison_france',
      title: 'Livraison en France (€, facultatif)',
      description: 'Frais de livraison en France pour cette pièce, affichés sur sa fiche. Ailleurs, le tarif est calculé au moment du paiement.',
      type: 'number',
      validation: (r) => r.min(0),
    }),
  ],
  orderings: [{ title: 'Plus récents', name: 'recents', by: [{ field: '_createdAt', direction: 'desc' }] }],
  preview: {
    select: { titre: 'titre', prix: 'prix', statut: 'statut', media: 'photo' },
    prepare({ titre, prix, statut, media }) {
      const etat = statut === 'epuise' ? 'Épuisé' : 'Disponible';
      return { title: titre || 'Nouveau triptyque', subtitle: [prix ? `${prix} €` : null, etat].filter(Boolean).join(' · '), media };
    },
  },
});


const reglages = defineType({
  name: 'reglages',
  title: 'Accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'photoOuverture',
      title: 'Photo d’ouverture de l’accueil',
      description:
        'La grande photo derrière la signature, en haut de l’accueil. Choisir une photo verticale (portrait), nette et bien éclairée : idéalement une vraie pièce, accrochée chez quelqu’un ou en gros plan avec le cadre. Cliquez sur la photo puis sur le crayon pour placer le point qui doit toujours rester visible. Sans photo, le site en choisit une automatiquement.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photoOuvertureAlt',
      title: 'Description de la photo (pour les malvoyants et Google)',
      description: 'Une phrase simple, par exemple : « Tableau de mousse accroché au-dessus d’une commode ».',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Réglages de l’accueil' }) },
});

export const schemaTypes = [oeuvre, carnet, herbier, reglages];
