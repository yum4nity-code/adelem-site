// Arborescence de la galerie (décision du 2026-10-27, demande d'Adèle) : une page par menu.
// /galerie → trois thèmes ; /galerie/vegetaux-stabilises → trois collections ; chaque collection et chaque autre thème a sa page.
// Chaque titre de menu a une photo derrière lui : l'œuvre cochée « Photo de la rubrique » dans l'admin, sinon la plus
// récente de la rubrique, sinon une image d'ambiance libre de droits (jamais un objet fini qu'on prendrait pour une pièce).
// Ambiances : photos Unsplash (licence Unsplash, usage libre), servies directement par images.unsplash.com.
const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=1400&h=600&fit=crop&fm=webp&q=60`;
const AMBIANCE = {
  mousse: unsplash('photo-1658819543328-59b114859eaf'), // tapis de mousse
  lichen: unsplash('photo-1727388826270-804614a2a27e'), // lichen clair
  argile: unsplash('photo-1422246358533-95dcd3d48961'), // mains dans la terre
  petales: unsplash('photo-1646794377035-fb4caa4ced23'), // pétales pâles
  cadreNoir: unsplash('photo-1634970064884-88918a3be8c8'), // gros plan d'un coin de cadre en bois, passé en noir par filtre (MenuGalerie)
};
import type { CollectionEntry } from 'astro:content';

type Oeuvre = CollectionEntry<'oeuvres'>;
type Filtre = (o: Oeuvre) => boolean;

export const collectionsVegetaux = [
  {
    cle: 'signature',
    nom: 'Signature',
    href: '/galerie/vegetaux-stabilises/signature',
    texte: 'La collection « Signature », ce sont mes œuvres sublimées par un cadre ancien, patiemment chiné et rénové en respectant son vécu. Un écrin de luxe pour mes créations nature. Les « Signature » conviennent dans tous les environnements, toutes les ambiances, de l’ancien au design.',
    ambiance: AMBIANCE.mousse,
    piece: 'Cœur de forêt',
  },
  { cle: 'contemporain', nom: 'Cadres contemporains', href: '/galerie/vegetaux-stabilises/cadres-contemporains', texte: null, ambiance: AMBIANCE.mousse, piece: 'Le secret du vieux tronc' },
  // Collection noire (2026-10-30, demande de Gwen) : aucune pièce pour l'instant, la page affiche « bientôt ».
  { cle: 'noire', nom: 'Collection noire', href: '/galerie/vegetaux-stabilises/collection-noire', texte: null, ambiance: AMBIANCE.cadreNoir },
  { cle: 'deco', nom: 'Déco & cadeaux', href: '/galerie/vegetaux-stabilises/deco-et-cadeaux', texte: null, ambiance: AMBIANCE.lichen },
] as const;

export const themes = [
  { cle: 'tableau', nom: 'Végétaux stabilisés', href: '/galerie/vegetaux-stabilises', ambiance: AMBIANCE.mousse, piece: 'Balade d’automne' },
  { cle: 'sculpture', nom: 'Sculptures', href: '/galerie/sculptures', ambiance: AMBIANCE.argile, piece: 'Rêveuse du soleil levant', cadrage: 'tete' },
  { cle: 'fleurs', nom: 'Fleurs en porcelaine froide', href: '/galerie/fleurs-en-porcelaine-froide', ambiance: AMBIANCE.petales },
] as const;

export const filtreTheme = (cle: string): Filtre => (o) => o.data.type === cle;
export const filtreCollection = (cle: string): Filtre => (o) => o.data.type === 'tableau' && o.data.collection === cle;

/** Photo derrière un titre : photo de fond choisie dans l'admin, sinon œuvre cochée, sinon la plus récente
 * (pièces disponibles d'abord), sinon l'ambiance. Pour une œuvre : la vue de face (nette, recadrée au cadre),
 * plutôt qu'une photo de détail souvent floue ou prise sous verre (2026-10-30). */
// Pièces choisies par Gwen pour chaque tuile (2026-10-30), retrouvées par leur titre (sans tenir compte des
// apostrophes ni des majuscules). Si la pièce n'existe plus, retour au choix automatique.
const norme = (t: string) => t.toLowerCase().replace(/[’']/g, "'").trim();
// Cadrage « tête » (sculptures) : le haut de la statue seulement, montré en entier (plan large, tête petite) : la photo
// d'origine est petite (≈ 280 px de large), un gros plan serait flou.
const haut = (src: string) => {
  const base = src.split('?')[0];
  const m = base.match(/-(\d+)x(\d+)\.\w+$/);
  if (!m) return src;
  const w = Number(m[1]);
  return `${base}?rect=0,0,${w},${Math.round(w * 1.25)}&w=600&auto=format`;
};
export function photoRubrique(oeuvres: Oeuvre[], filtre: Filtre, ambiance: string, fond?: string, piece?: string, cadrage?: string) {
  if (fond) return { src: fond, oeuvre: true, entier: false };
  const choix = piece ? oeuvres.find((o) => norme(o.data.titre) === norme(piece)) : undefined;
  if (choix) return cadrage === 'tete' ? { src: haut(choix.data.photos[0].src), oeuvre: true, entier: true } : { src: choix.data.photos[0].src, oeuvre: true, entier: false };
  const items = oeuvres.filter(filtre).sort((a, b) => Number(a.data.statut === 'vendue') - Number(b.data.statut === 'vendue') || a.data.ordre - b.data.ordre);
  const choisie = items.find((o) => o.data.photo_rubrique) ?? items[0];
  if (!choisie) return { src: ambiance, oeuvre: false, entier: false };
  return { src: choisie.data.photos[0].src, oeuvre: true, entier: false };
}

/** Page de la galerie où se trouve une œuvre (pour le fil d'Ariane et le retour depuis sa fiche). */
export function pageDe(o: Oeuvre) {
  if (o.data.type === 'tableau') {
    const c = collectionsVegetaux.find((x) => x.cle === o.data.collection) ?? collectionsVegetaux[0];
    return { nom: c.nom, href: c.href };
  }
  const t = themes.find((x) => x.cle === o.data.type)!;
  return { nom: t.nom, href: t.href };
}
