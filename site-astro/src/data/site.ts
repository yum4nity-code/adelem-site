// Réglages du site. `null` = pas encore fourni : la page concernée l'affiche comme « à compléter ».
export const site = {
  nom: 'Adelem',
  url: 'https://www.adelem.fr', // adresse réelle du site (adelem.fr redirige ici) : sert aux liens canoniques et au plan du site
  description:
    'Pièces uniques faites à la main : tableaux de mousses, lichens et écorces dans des cadres anciens restaurés, et sculptures.',
  delaiReponse: '3 jours ouvrés',
  contact: {
    email: 'contact@adelem.fr' as string | null,
    telephone: '+33 6 80 37 54 01' as string | null,
    instagram: 'https://www.instagram.com/adelem_nature/' as string | null,
    // Lien vers la fiche Google Business Profile (où tous les avis restent visibles). Affiché sous les témoignages.
    google: null as string | null,
  },
  // Point d'envoi du formulaire (service d'e-mail à brancher). Sans valeur : lien e-mail, sinon message d'attente.
  formEndpoint: 'https://formspree.io/f/mgavrzzp' as string | null,
  // Le plan gratuit de Formspree ne gère pas les pièces jointes : ne passer à true qu'après un plan payant (Personal ou plus).
  formFileUploads: false as boolean,
  // Photo d'ouverture de l'accueil en attendant celle choisie dans l'administration (Accueil › Photo d'ouverture).
  // Vraie pièce d'Adelem (tableau sous-bois aux arbres rouges), redressée, détourée au ras du cadre et posée
  // sur un mur vert sombre éclairé en galerie (photomontage : le tableau est réel, le mur est reconstitué).
  // mode 'mur' : la signature se place au-dessus du tableau, comme un nom d'artiste sur le mur d'une galerie ;
  // une image propre au mobile (portrait) garde le tableau entier à l'écran.
  // Pour revenir à l'ancienne ouverture : src '/images/ouverture-sous-bois.webp', position '30% 50%', sans mode.
  photoOuverture: {
    src: '/images/ouverture-mur-desktop.webp',
    srcMobile: '/images/ouverture-mur-mobile.jpg',
    position: 'center',
    mode: 'mur',
    // Œuvre montrée sur ce photomontage (identifiant Sanity) : un clic sur la photo mène à sa fiche.
    oeuvreId: 'b2b4c0c1-2715-4419-ad5c-183b30562dbd', // Balade d'automne
  } as { src: string; srcMobile?: string; position: string; mode?: 'mur'; oeuvreId?: string } | null,
  // Témoignages de clients, publiés avec leur accord. Liste vide = la section n'apparaît pas.
  // Dates au format AAAA-MM-JJ. Ne jamais inventer ni retoucher un témoignage (art. L121-4 du Code de la consommation).
  temoignages: [] as { texte: string; auteur: string; ville?: string; oeuvre?: string; dateAchat: string; datePublication: string }[],
  // Galeries, dépôts, salons ou expositions où voir les pièces. Liste vide = la section n'apparaît pas.
  lieux: [] as { nom: string; ville: string; quand?: string; url?: string }[],
  legal: {
    editrice: 'Adèle Mette',
    statut: 'Entrepreneur individuel (EI)',
    siret: '351 073 457 00027',
    adresse: '116 rue du Vicariat, 82110 Cazes-Mondenard' as string | null,
    tva: 'TVA non applicable, art. 293 B du CGI' as string | null,
    directeurPublication: 'Gwennaël Salinas',
    // Coordonnées reprises de vercel.com/legal/privacy-notice (rubrique Contact Us), vérifiées le 2026-10-27.
    hebergeur: 'Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis — vercel.com' as string | null,
    mediateur: null as string | null,
  },
};

// Indexation Google ouverte le 2026-10-27 (décision de Gwen). Pour la couper : PUBLIC_INDEX=false dans Vercel.
export const indexable = import.meta.env.PUBLIC_INDEX !== 'false';

export const nav = [
  { href: '/galerie', label: 'Galerie' },
  { href: '/atelier', label: 'Atelier' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export const prix = (p: number | null) =>
  p == null ? 'Prix sur demande' : `${p.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;

/** Nombre à la française : 47,5 et non 47.5. */
export const nombre = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 });

export const dims = (l: number, h: number, p?: number | null) =>
  `${nombre(l)} × ${nombre(h)}${p ? ` × ${nombre(p)}` : ''} cm`;

/** Description pour Google et les partages : 150 à 160 caractères au plus, coupée à un mot entier. */
export const resume = (texte: string, max = 155) => {
  const t = texte.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, max).replace(/\s+\S*$/, '').replace(/[\s.,;:!?…·—–-]+$/u, '') + '…';
};
