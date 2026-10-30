// Ajoute les en-têtes de sécurité à toutes les réponses, dans la configuration produite par l'adaptateur Vercel
// (.vercel/output/config.json). Pourquoi ici : avec l'adaptateur, Vercel ignore les « headers » de vercel.json.
import { readFileSync, writeFileSync } from 'node:fs';

const chemin = new URL('../.vercel/output/config.json', import.meta.url);
const config = JSON.parse(readFileSync(chemin, 'utf8'));
const entetes = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};
config.routes = config.routes || [];
if (!config.routes.some((r) => r.headers && r.headers['X-Content-Type-Options'])) {
  config.routes.unshift({ src: '/(.*)', headers: entetes, continue: true });
  config.routes.unshift({ src: '/admin(?:/.*)?', headers: { 'X-Robots-Tag': 'noindex, nofollow' }, continue: true });
}
writeFileSync(chemin, JSON.stringify(config, null, 2));
console.log('En-têtes de sécurité ajoutés à .vercel/output/config.json');
