// Copie de la règle de prix du site (site-astro/src/data/prix-envoi.ts) pour les fonctions Vercel.
// Les deux DOIVENT rester identiques : site-astro/scripts/verifier-prix.mjs le vérifie à chaque construction.
export const FORFAITS = [
  { jusqua_kg: 1, ajout: 13 },
  { jusqua_kg: 2, ajout: 15 },
  { jusqua_kg: 5, ajout: 24 },
  { jusqua_kg: 10, ajout: 35 },
  { jusqua_kg: 15, ajout: 42 },
  { jusqua_kg: 30, ajout: 50 },
];
export function poidsEstime(largeur, hauteur) {
  const cote = Math.max(largeur ?? 0, hauteur ?? 0);
  if (cote <= 30) return 1;
  if (cote <= 50) return 2;
  if (cote <= 80) return 5;
  return 10;
}
const poidsDe = (poids, largeur, hauteur) => (poids && poids > 0 ? poids : poidsEstime(largeur, hauteur));
export function ajoutEnvoi(poids, largeur, hauteur) {
  const p = poidsDe(poids, largeur, hauteur);
  return (FORFAITS.find((f) => p <= f.jusqua_kg) ?? FORFAITS[FORFAITS.length - 1]).ajout;
}
export function prixAffiche(prixAtelier, poids, largeur, hauteur) {
  if (!prixAtelier || prixAtelier <= 0) return null;
  return Math.ceil((prixAtelier + ajoutEnvoi(poids, largeur, hauteur)) / 5) * 5;
}
// Europe (hors France et Monaco) : forfait Europe selon le poids (25 € jusqu'à 2 kg, 30 € jusqu'à 5 kg, 50 € au-delà),
// moins l'envoi France déjà compris dans le prix. À valider par Adèle (2026-10-31).
export function supplementEurope(poids, largeur, hauteur) {
  const p = poidsDe(poids, largeur, hauteur);
  const forfait = p <= 2 ? 25 : p <= 5 ? 30 : 50;
  return Math.max(0, forfait - ajoutEnvoi(poids, largeur, hauteur));
}
