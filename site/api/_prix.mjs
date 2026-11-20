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
// Europe (hors France et Monaco) : supplément = écart entre le tarif Colissimo International « Union européenne et Suisse »
// et le tarif Colissimo France (domicile), tarifs en ligne 2026 (laposte.fr/colissimo-en-ligne/tarifs, relevés le 2026-11-20),
// arrondi à l'euro supérieur. L'emballage est déjà compris dans l'envoi France inclus dans le prix.
// Avant (2026-10-31) : forfaits 25/30/50 € moins l'envoi France, nettement sous le coût réel au-delà de 5 kg.
export const SUPPLEMENTS_EUROPE = [
  { jusqua_kg: 1, supplement: 10 },  // 19,39 - 9,59
  { jusqua_kg: 2, supplement: 11 },  // 22,19 - 11,19
  { jusqua_kg: 5, supplement: 12 },  // 28,59 - 17,39
  { jusqua_kg: 10, supplement: 22 }, // 46,99 - 25,29
  { jusqua_kg: 15, supplement: 36 }, // 67,99 - 31,99
  { jusqua_kg: 30, supplement: 49 }, // 87,99 - 39,59
];
export function supplementEurope(poids, largeur, hauteur) {
  const p = poidsDe(poids, largeur, hauteur);
  return (SUPPLEMENTS_EUROPE.find((f) => p <= f.jusqua_kg) ?? SUPPLEMENTS_EUROPE[SUPPLEMENTS_EUROPE.length - 1]).supplement;
}
