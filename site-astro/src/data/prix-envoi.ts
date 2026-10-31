// Prix affiché = prix atelier (saisi dans l'admin) + envoi en France, arrondi au 5 € supérieur (décision du 2026-10-31).
// La livraison étant offerte en France, son coût est inclus dans le prix. Rétroactif : s'applique à toutes les pièces.
// Forfait = tarif Colissimo 2026 (France, domicile) + emballage, selon le poids emballé.
// Sans poids saisi, le poids est estimé d'après le plus grand côté du cadre.
export const FORFAITS: { jusqua_kg: number; ajout: number }[] = [
  { jusqua_kg: 1, ajout: 13 },
  { jusqua_kg: 2, ajout: 15 },
  { jusqua_kg: 5, ajout: 24 },
  { jusqua_kg: 10, ajout: 35 },
  { jusqua_kg: 15, ajout: 42 },
  { jusqua_kg: 30, ajout: 50 },
];

/** Poids emballé estimé quand il n'est pas saisi (plus grand côté du cadre, en cm). */
export function poidsEstime(largeur?: number | null, hauteur?: number | null): number {
  const cote = Math.max(largeur ?? 0, hauteur ?? 0);
  if (cote <= 30) return 1;
  if (cote <= 50) return 2;
  if (cote <= 80) return 5;
  return 10;
}

export function ajoutEnvoi(poids?: number | null, largeur?: number | null, hauteur?: number | null): number {
  const p = poids && poids > 0 ? poids : poidsEstime(largeur, hauteur);
  return (FORFAITS.find((f) => p <= f.jusqua_kg) ?? FORFAITS[FORFAITS.length - 1]).ajout;
}

/** Prix affiché sur le site. Sans prix atelier : null (« Prix sur demande »). */
export function prixAffiche(prixAtelier?: number | null, poids?: number | null, largeur?: number | null, hauteur?: number | null): number | null {
  if (!prixAtelier || prixAtelier <= 0) return null;
  return Math.ceil((prixAtelier + ajoutEnvoi(poids, largeur, hauteur)) / 5) * 5;
}
