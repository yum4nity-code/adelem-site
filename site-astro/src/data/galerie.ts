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
  },
  { cle: 'contemporain', nom: 'Cadres contemporains', href: '/galerie/vegetaux-stabilises/cadres-contemporains', texte: null, ambiance: AMBIANCE.mousse },
  // Collection noire (2026-10-30, demande de Gwen) : aucune pièce pour l'instant, la page affiche « bientôt ».
  { cle: 'noire', nom: 'Collection noire', href: '/galerie/vegetaux-stabilises/collection-noire', texte: null, ambiance: AMBIANCE.cadreNoir },
  { cle: 'deco', nom: 'Déco & cadeaux', href: '/galerie/vegetaux-stabilises/deco-et-cadeaux', texte: null, ambiance: AMBIANCE.lichen },
] as const;

export const themes = [
  { cle: 'tableau', nom: 'Végétaux stabilisés', href: '/galerie/vegetaux-stabilises', ambiance: AMBIANCE.mousse },
  { cle: 'sculpture', nom: 'Sculptures', href: '/galerie/sculptures', ambiance: AMBIANCE.argile },
  { cle: 'fleurs', nom: 'Fleurs en porcelaine froide', href: '/galerie/fleurs-en-porcelaine-froide', ambiance: AMBIANCE.petales },
] as const;

export const filtreTheme = (cle: string): Filtre => (o) => o.data.type === cle;
export const filtreCollection = (cle: string): Filtre => (o) => o.data.type === 'tableau' && o.data.collection === cle;

/** Photo derrière un titre : œuvre cochée, sinon la plus récente (pièces disponibles d'abord), sinon l'ambiance. */
export function photoRubrique(oeuvres: Oeuvre[], filtre: Filtre, ambiance: string) {
  const items = oeuvres.filter(filtre).sort((a, b) => Number(a.data.statut === 'vendue') - Number(b.data.statut === 'vendue') || a.data.ordre - b.data.ordre);
  const choisie = items.find((o) => o.data.photo_rubrique) ?? items[0];
  if (!choisie) return { src: ambiance, oeuvre: false };
  const p = choisie.data.photos[1] ?? choisie.data.photos[0];
  return { src: p.src, oeuvre: true };
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
