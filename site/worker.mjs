// Point d'entrée Cloudflare : /api/* → fonctions de paiement (même code que sur Vercel, site/api/*.mjs) ;
// tout le reste → pages statiques construites par Astro (site-astro/dist).
import * as acheter from './api/acheter.mjs';
import * as webhook from './api/stripe-webhook.mjs';

const CLES = ['STRIPE_API_KEY', 'STRIPE_WEBHOOK_SECRET', 'SANITY_WRITE_TOKEN'];
const ROUTES = { '/api/acheter': acheter, '/api/stripe-webhook': webhook };

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const module = ROUTES[pathname];
    if (!module) {
      if (pathname.startsWith('/api/')) return new Response('Introuvable', { status: 404 });
      return env.ASSETS.fetch(request);
    }
    // Les fonctions lisent leurs clés dans process.env, comme sur Vercel.
    globalThis.process ??= { env: {} };
    process.env ??= {};
    for (const k of CLES) if (env[k] !== undefined) process.env[k] = env[k];
    const handler = module[request.method];
    if (!handler) return new Response('Méthode non autorisée', { status: 405, headers: { Allow: Object.keys(module).filter((m) => /^[A-Z]+$/.test(m)).join(', ') } });
    return handler(request);
  },
};
