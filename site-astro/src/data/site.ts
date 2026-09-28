// Coordonnées et informations légales. `null` = pas encore fourni : la page concernée l'affiche comme « à compléter ».
export const site = {
  nom: 'Adelem',
  url: 'https://adelem.fr',
  description:
    'Œuvres uniques en végétaux naturels stabilisés, matières naturelles et cadres anciens restaurés.',
  delaiReponse: '3 jours ouvrés',
  contact: {
    email: null as string | null, // à fournir par Adèle
    telephone: null as string | null, // à fournir par Adèle
    instagram: null as string | null, // compte à créer par Gwen
  },
  // Point d'envoi du formulaire (service d'e-mail à choisir). Sans valeur, le formulaire ouvre la messagerie.
  formEndpoint: null as string | null,
  legal: {
    editrice: 'Adèle Mette',
    statut: 'Entrepreneur individuel (EI)',
    siret: '351 073 457 00027',
    adresse: null as string | null, // adresse d'inscription ou domiciliation, à fournir
    tva: null as string | null, // probablement « TVA non applicable, art. 293 B du CGI », à confirmer
    directeurPublication: 'Gwennaël Salinas',
    hebergeur: null as string | null, // renseigné au choix de l'hébergement
    mediateur: null as string | null, // médiateur de la consommation, à désigner
  },
};

export const nav = [
  { href: '/galerie', label: 'Galerie' },
  { href: '/cadres-anciens', label: 'Cadres anciens' },
  { href: '/sculptures', label: 'Sculptures' },
  { href: '/sur-mesure', label: 'Sur mesure' },
  { href: '/atelier', label: 'Atelier' },
  { href: '/contact', label: 'Contact' },
];

export const formats = {
  Monumental: 'Des pièces qui structurent un espace et se découvrent à plusieurs distances.',
  Signature: 'Une présence affirmée, pensée pour habiter un mur sans dominer toute la pièce.',
  Intime: 'Des formats qui invitent à regarder la matière de près.',
} as const;

export const prix = (p: number | null) =>
  p == null ? 'Prix sur demande' : `${p.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
