// Arborescence de la galerie (décision du 2026-10-27, demande d'Adèle) : une page par menu.
// /galerie → trois thèmes ; /galerie/vegetaux-stabilises → trois collections ; chaque collection et chaque autre thème a sa page.
import type { CollectionEntry } from 'astro:content';

type Oeuvre = CollectionEntry<'oeuvres'>;

export const collectionsVegetaux = [
  {
    cle: 'signature',
    nom: 'Signature',
    href: '/galerie/vegetaux-stabilises/signature',
    texte: 'La collection « Signature », ce sont mes œuvres sublimées par un cadre ancien, patiemment chiné et rénové en respectant son vécu. Un écrin de luxe pour mes créations nature. Les « Signature » conviennent dans tous les environnements, toutes les ambiances, de l’ancien au design.',
  },
  { cle: 'contemporain', nom: 'Cadres contemporains', href: '/galerie/vegetaux-stabilises/cadres-contemporains', texte: null },
  { cle: 'deco', nom: 'Déco & cadeaux', href: '/galerie/vegetaux-stabilises/deco-et-cadeaux', texte: null },
] as const;

export const themes = [
  { cle: 'tableau', nom: 'Végétaux stabilisés', href: '/galerie/vegetaux-stabilises' },
  { cle: 'sculpture', nom: 'Sculptures', href: '/galerie/sculptures' },
  { cle: 'fleurs', nom: 'Fleurs en porcelaine froide', href: '/galerie/fleurs-en-porcelaine-froide' },
] as const;

/** Page de la galerie où se trouve une œuvre (pour le fil d'Ariane et le retour depuis sa fiche). */
export function pageDe(o: Oeuvre) {
  if (o.data.type === 'tableau') {
    const c = collectionsVegetaux.find((x) => x.cle === o.data.collection) ?? collectionsVegetaux[0];
    return { nom: c.nom, href: c.href };
  }
  const t = themes.find((x) => x.cle === o.data.type)!;
  return { nom: t.nom, href: t.href };
}
