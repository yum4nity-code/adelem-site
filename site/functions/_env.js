// Cloudflare Pages : les fonctions de paiement (site/api/*.mjs) lisent leurs clés dans process.env, comme sur Vercel.
// Sur Cloudflare, les clés arrivent dans context.env : on les recopie avant chaque appel. Le code de paiement
// lui-même est partagé entre les deux hébergeurs (aucune duplication).
const CLES = ['STRIPE_API_KEY', 'STRIPE_WEBHOOK_SECRET', 'SANITY_WRITE_TOKEN'];
export function avecEnv(handler) {
  return (context) => {
    globalThis.process ??= { env: {} };
    process.env ??= {};
    for (const k of CLES) if (context.env?.[k] !== undefined) process.env[k] = context.env[k];
    return handler(context.request);
  };
}
