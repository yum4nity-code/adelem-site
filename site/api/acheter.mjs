// « Acquérir cette pièce » → page de paiement Stripe créée à la volée (option B, décidée par Gwen le 2026-10-31).
// Adresse : /api/acheter?piece=<identifiant Sanity>&retour=/oeuvres/<page>
// 1. Lit la pièce dans l'admin (Sanity) : elle doit être « disponible », avoir un prix, et ne pas être déjà réservée.
// 2. La réserve 30 minutes (champ reserve_jusqua), de façon atomique : deux clics simultanés ne peuvent pas passer tous les deux.
// 3. Crée la session de paiement Stripe au prix affiché sur le site (envoi France compris), avec l'option Europe.
// 4. Redirige l'acheteur vers Stripe. Après paiement, le webhook (stripe-webhook.mjs) passe la pièce en « vendue ».
// Variables Vercel : STRIPE_API_KEY (clé restreinte : Checkout Sessions en écriture), SANITY_WRITE_TOKEN.
import { prixAffiche, supplementEurope } from './_prix.mjs';

const SANITY = 'https://b9pobh76.api.sanity.io/v2024-01-01/data';
const SITE = 'https://www.adelem.fr';
const DUREE_MIN = 31; // Stripe impose au moins 30 minutes avant expiration d'une session
const PAYS_FRANCE = ['FR', 'MC'];
const PAYS_EUROPE = ['BE', 'LU', 'CH', 'DE', 'IT', 'ES', 'NL'];

const echapper = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
function page(status, titre, texte, retour = '/galerie') {
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${echapper(titre)} · Adelem</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1B211B;color:#C9C6B8;font:300 1.05rem/1.7 Georgia,serif;padding:24px;box-sizing:border-box}main{max-width:34em;text-align:center}h1{font:300 2.2rem/1.15 Georgia,serif;color:#ECE9E0;margin:0 0 16px}a{display:inline-block;margin-top:28px;color:#ECE9E0;border-bottom:1px solid;padding-bottom:4px;text-decoration:none;font:400 .8rem/1 system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase}</style></head>
<body><main><h1>${echapper(titre)}</h1><p>${echapper(texte)}</p><a href="${echapper(retour)}">Revenir</a></main></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

async function sanity(chemin, token, init = {}) {
  const r = await fetch(`${SANITY}/${chemin}`, { ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(init.headers || {}) } });
  const corps = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, corps };
}

// Corps x-www-form-urlencoded pour l'API Stripe, à partir d'un objet imbriqué.
function formulaire(obj, prefixe = '', sortie = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const cle = prefixe ? `${prefixe}[${k}]` : k;
    if (typeof v === 'object') formulaire(v, cle, sortie); else sortie.append(cle, String(v));
  }
  return sortie;
}

const heureParis = (iso) => new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });

export async function GET(request) {
  const url = new URL(request.url);
  const id = (url.searchParams.get('piece') || '').replace(/[^A-Za-z0-9-]/g, '');
  const r = url.searchParams.get('retour') || '';
  const retour = /^\/oeuvres\/[a-z0-9-]+$/.test(r) ? r : '/galerie';
  const cle = process.env.STRIPE_API_KEY;
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!id) return page(400, 'Pièce introuvable', 'Le lien de paiement est incomplet.', retour);
  if (!cle || !token) return page(503, 'Paiement momentanément indisponible', 'Le paiement en ligne n’est pas encore ouvert. Écrivez-nous depuis la page Contact : nous vous répondons rapidement.', '/contact');

  const q = encodeURIComponent('*[_type == "oeuvre" && _id == $id][0]{ _id, _rev, titre, statut, prix, poids_kg, largeur_cm, hauteur_cm, reserve_jusqua, "photo": photos[defined(asset)][0].asset->url }');
  const lu = await sanity(`query/production?query=${q}&$id=${encodeURIComponent(JSON.stringify(id))}`, token);
  const o = lu.corps?.result;
  if (!lu.ok || !o) return page(404, 'Pièce introuvable', 'Cette pièce n’existe plus dans la galerie.', '/galerie');
  if (o.statut !== 'disponible') return page(409, 'Cette pièce a trouvé preneur', 'Elle n’est plus disponible. D’autres pièces vous attendent dans la galerie.', '/galerie');
  const montant = prixAffiche(o.prix, o.poids_kg, o.largeur_cm, o.hauteur_cm);
  if (!montant) return page(409, 'Prix sur demande', 'Cette pièce ne s’achète pas en ligne. Écrivez-nous depuis la page Contact.', '/contact');
  const maintenant = Date.now();
  if (o.reserve_jusqua && Date.parse(o.reserve_jusqua) > maintenant) {
    return page(409, 'Pièce en cours d’acquisition', `Quelqu’un est en train de l’acquérir. Si l’achat n’aboutit pas, elle sera de nouveau disponible à ${heureParis(o.reserve_jusqua)}.`, retour);
  }

  // Réservation atomique : la modification échoue si la pièce a changé depuis la lecture (autre clic au même moment).
  const expire = Math.floor(maintenant / 1000) + DUREE_MIN * 60;
  const jusqua = new Date(expire * 1000).toISOString();
  const resa = await sanity('mutate/production', token, { method: 'POST', body: JSON.stringify({ mutations: [{ patch: { id: o._id, ifRevisionID: o._rev, set: { reserve_jusqua: jusqua } } }] }) });
  if (!resa.ok) return page(409, 'Pièce en cours d’acquisition', 'Quelqu’un vient de commencer à l’acquérir. Réessayez dans une demi-heure si l’achat n’aboutit pas.', retour);

  const europe = supplementEurope(o.poids_kg, o.largeur_cm, o.hauteur_cm);
  const params = formulaire({
    mode: 'payment',
    locale: 'fr',
    expires_at: expire,
    success_url: `${SITE}/merci-achat`,
    cancel_url: `${SITE}${retour}`,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'eur',
        unit_amount: montant * 100,
        product_data: {
          name: o.titre,
          description: `Pièce unique · ${String(o.largeur_cm).replace('.', ',')} × ${String(o.hauteur_cm).replace('.', ',')} cm`,
          ...(o.photo ? { images: [`${o.photo}?w=800&h=800&fit=max&bg=1B211B&fm=jpg`] } : {}),
        },
      },
    }],
    metadata: { oeuvre: o._id },
    payment_intent_data: { metadata: { oeuvre: o._id }, description: o.titre },
    phone_number_collection: { enabled: true },
    shipping_address_collection: { allowed_countries: [...PAYS_FRANCE, ...PAYS_EUROPE] },
    shipping_options: [
      { shipping_rate_data: { type: 'fixed_amount', display_name: 'France et Monaco : livraison offerte (Colissimo)', fixed_amount: { amount: 0, currency: 'eur' } } },
      { shipping_rate_data: { type: 'fixed_amount', display_name: 'Ailleurs en Europe (Colissimo)', fixed_amount: { amount: europe * 100, currency: 'eur' } } },
    ],
    custom_text: { shipping_address: { message: 'Livraison offerte en France et à Monaco. Pour une adresse ailleurs en Europe, choisissez « Ailleurs en Europe ».' } },
    invoice_creation: { enabled: true, invoice_data: { footer: 'TVA non applicable, art. 293 B du CGI' } },
  });
  const s = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: params });
  const session = await s.json().catch(() => ({}));
  if (!s.ok || !session.url) {
    console.error('Stripe', s.status, session?.error?.message);
    // Échec : on libère la pièce tout de suite.
    await sanity('mutate/production', token, { method: 'POST', body: JSON.stringify({ mutations: [{ patch: { id: o._id, unset: ['reserve_jusqua'] } }] }) });
    return page(502, 'Paiement momentanément indisponible', 'La page de paiement n’a pas pu s’ouvrir. Réessayez dans un instant, ou écrivez-nous depuis la page Contact.', retour);
  }
  return new Response(null, { status: 303, headers: { Location: session.url, 'Cache-Control': 'no-store' } });
}
