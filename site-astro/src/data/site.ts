// Réglages du site. `null` = pas encore fourni : la page concernée l'affiche comme « à compléter ».
export const site = {
  nom: 'Adelem',
  url: 'https://adelem.fr',
  description:
    'Tableaux végétaux uniques : mousses, lichens et écorces composés à la main dans des cadres anciens restaurés.',
  delaiReponse: '3 jours ouvrés',
  contact: {
    email: null as string | null,
    telephone: null as string | null,
    instagram: null as string | null,
  },
  // Point d'envoi du formulaire (service d'e-mail à brancher). Sans valeur : lien e-mail, sinon message d'attente.
  formEndpoint: null as string | null,
  legal: {
    editrice: 'Adèle Mette',
    statut: 'Entrepreneur individuel (EI)',
    siret: '351 073 457 00027',
    adresse: null as string | null,
    tva: null as string | null,
    directeurPublication: 'Gwennaël Salinas',
    hebergeur: null as string | null, // Vercel Inc. : coordonnées exactes à reprendre de vercel.com/legal au passage en ligne
    mediateur: null as string | null,
  },
};

// Le site n'est indexé par Google que si PUBLIC_INDEX=true est défini (au passage sur adelem.fr).
export const indexable = import.meta.env.PUBLIC_INDEX === 'true';

export const nav = [
  { href: '/galerie', label: 'Œuvres' },
  { href: '/sur-mesure', label: 'Sur mesure' },
  { href: '/atelier', label: 'Atelier' },
  { href: '/contact', label: 'Contact' },
];

export const prix = (p: number | null) =>
  p == null ? 'Prix sur demande' : `${p.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;

export const dims = (l: number, h: number, p?: number | null) =>
  `${l} × ${h}${p ? ` × ${p}` : ''} cm`;
