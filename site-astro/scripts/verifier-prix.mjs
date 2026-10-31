// Vérifie que la règle de prix du site (src/data/prix-envoi.ts) et celle des fonctions Vercel (../site/api/_prix.mjs)
// donnent les mêmes résultats. Lancé avant chaque construction : un écart arrête la construction.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const ici = fileURLToPath(new URL('.', import.meta.url));
const api = await import(new URL('../../site/api/_prix.mjs', import.meta.url));
// Le fichier .ts est simple : on retire les annotations de type pour l'évaluer.
const ts = readFileSync(ici + '../src/data/prix-envoi.ts', 'utf8')
  .replace(/: \{ jusqua_kg: number; ajout: number \}\[\]/g, '')
  .replace(/\?: number \| null/g, '').replace(/: number \| null/g, '').replace(/: number/g, '');
const site = await import('data:text/javascript;base64,' + Buffer.from(ts).toString('base64'));
let ecarts = 0;
for (const prix of [1, 49, 79, 99, 109, 189, 219, 650]) for (const poids of [null, 0.4, 1, 1.5, 2, 3, 5, 8, 12, 20, 40]) for (const [l, h] of [[12, 17], [25, 25], [47.5, 38], [60, 90]]) {
  if (site.prixAffiche(prix, poids, l, h) !== api.prixAffiche(prix, poids, l, h)) ecarts++;
}
if (ecarts) { console.error(`Règle de prix différente entre le site et site/api/_prix.mjs (${ecarts} écarts).`); process.exit(1); }
console.log('Règle de prix : site et paiement identiques.');
