// Réglages du site. `null` = pas encore fourni : la page concernée l'affiche comme « à compléter ».
export const site = {
  nom: 'Adelem',
  url: 'https://adelem.fr',
  description:
    'Pièces uniques faites à la main : tableaux de mousses, lichens et écorces dans des cadres anciens restaurés, et sculptures.',
  delaiReponse: '3 jours ouvrés',
  contact: {
    email: 'contact@adelem.fr' as string | null,
    telephone: null as string | null,
    instagram: null as string | null,
    // Lien vers la fiche Google Business Profile (où tous les avis restent visibles). Affiché sous les témoignages.
    google: null as string | null,
  },
  // Point d'envoi du formulaire (service d'e-mail à brancher). Sans valeur : lien e-mail, sinon message d'attente.
  formEndpoint: 'https://formspree.io/f/mgavrzzp' as string | null,
  // Le plan gratuit de Formspree ne gère pas les pièces jointes : ne passer à true qu'après un plan payant (Personal ou plus).
  formFileUploads: false as boolean,
  // Témoignages de clients, publiés avec leur accord. Liste vide = la section n'apparaît pas.
  // Dates au format AAAA-MM-JJ. Ne jamais inventer ni retoucher un témoignage (art. L121-4 du Code de la consommation).
  temoignages: [] as { texte: string; auteur: string; ville?: string; oeuvre?: string; dateAchat: string; datePublication: string }[],
  // Galeries, dépôts, salons ou expositions où voir les pièces. Liste vide = la section n'apparaît pas.
  lieux: [] as { nom: string; ville: string; quand?: string; url?: string }[],
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
  { href: '/sculptures', label: 'Sculptures' },
  { href: '/atelier', label: 'Atelier' },
  { href: '/herbier', label: 'Herbier' },
  { href: '/contact', label: 'Contact' },
];

export const prix = (p: number | null) =>
  p == null ? 'Prix sur demande' : `${p.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;

export const dims = (l: number, h: number, p?: number | null) =>
  `${l} × ${h}${p ? ` × ${p}` : ''} cm`;
