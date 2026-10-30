// Point d'entrée Stripe (https://www.adelem.fr/api/stripe-webhook) : exécuté sur le serveur Vercel, pas pré-construit.
// Toute la logique (signature, pièce, passage en « vendue ») est dans src/lib/stripe-webhook.mjs.
import type { APIRoute } from 'astro';
import { POST as traiter } from '../../lib/stripe-webhook.mjs';

export const prerender = false;
export const POST: APIRoute = ({ request }) => traiter(request);
