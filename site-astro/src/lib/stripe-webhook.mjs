// Vente Stripe → pièce « Vendue » dans l'admin (Sanity), automatiquement.
// Appelé par src/pages/api/stripe-webhook.ts (route Astro rendue sur le serveur par l'adaptateur Vercel).
// Stripe appelle cette adresse (https://www.adelem.fr/api/stripe-webhook) après chaque paiement réussi.
// On vérifie la signature Stripe, on retrouve la pièce, on passe son statut à « vendue » ;
// le webhook Sanity existant relance ensuite la construction du site (fiche « Collection privée »).
//
// Variables d'environnement (Vercel › Settings › Environment Variables) — jamais dans le code :
//   STRIPE_WEBHOOK_SECRET  secret de signature du webhook Stripe (whsec_…)
//   SANITY_WRITE_TOKEN     jeton Sanity avec droit d'écriture (rôle Editor)
//   STRIPE_API_KEY         facultatif : clé restreinte Stripe (lecture des liens de paiement), pour retrouver
//                          la pièce quand le lien n'a pas de métadonnée « oeuvre » (liens créés à la main).
import crypto from 'node:crypto';

const SANITY = 'https://b9pobh76.api.sanity.io/v2024-01-01/data';
const TOLERANCE_S = 300;

export function signatureValide(raw, entete, secret, maintenant = Math.floor(Date.now() / 1000)) {
  if (!entete || !secret) return false;
  const parties = Object.create(null);
  const v1 = [];
  for (const morceau of entete.split(',')) {
    const [k, v] = morceau.split('=');
    if (k === 'v1') v1.push(v); else parties[k] = v;
  }
  const t = Number(parties.t);
  if (!t || Math.abs(maintenant - t) > TOLERANCE_S || v1.length === 0) return false;
  const attendu = crypto.createHmac('sha256', secret).update(`${t}.${raw}`, 'utf8').digest('hex');
  return v1.some((sig) => sig.length === attendu.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(attendu)));
}

async function sanity(chemin, token, init = {}) {
  const r = await fetch(`${SANITY}/${chemin}`, { ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(init.headers || {}) } });
  if (!r.ok) throw new Error(`Sanity ${r.status} : ${await r.text()}`);
  return r.json();
}

async function trouverPiece(session, token) {
  if (session.metadata?.oeuvre) return session.metadata.oeuvre;
  const cle = process.env.STRIPE_API_KEY;
  if (!session.payment_link || !cle) return null;
  const r = await fetch(`https://api.stripe.com/v1/payment_links/${session.payment_link}`, { headers: { Authorization: `Bearer ${cle}` } });
  if (!r.ok) throw new Error(`Stripe ${r.status}`);
  const { url } = await r.json();
  const q = encodeURIComponent('*[_type in ["oeuvre","herbier"] && lien_paiement == $u][0]._id');
  const { result } = await sanity(`query/production?query=${q}&$u=${encodeURIComponent(JSON.stringify(url))}`, token);
  return result || null;
}

const reponse = (status, texte) => new Response(texte, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!secret || !token) return reponse(500, 'Configuration manquante');

  const raw = await request.text();
  if (!signatureValide(raw, request.headers.get('stripe-signature'), secret)) return reponse(400, 'Signature invalide');

  const evenement = JSON.parse(raw);
  if (!['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(evenement.type)) return reponse(200, 'Ignoré');
  const session = evenement.data.object;
  if (session.payment_status !== 'paid') return reponse(200, 'Paiement en attente');

  try {
    const piece = await trouverPiece(session, token);
    if (!piece) { console.error('Vente sans pièce reconnue', session.id); return reponse(200, 'Pièce introuvable'); }
    const id = piece.replace(/^drafts\./, '');
    // On met à jour la version publiée et, si elle existe, la version en cours d'édition (sinon une publication
    // ultérieure remettrait « disponible »).
    const q = encodeURIComponent('*[_id in [$p, $d]]._id');
    const { result: existants } = await sanity(`query/production?query=${q}&$p=${encodeURIComponent(JSON.stringify(id))}&$d=${encodeURIComponent(JSON.stringify(`drafts.${id}`))}`, token);
    if (!existants?.length) return reponse(200, 'Pièce absente de l’admin');
    await sanity('mutate/production', token, { method: 'POST', body: JSON.stringify({ mutations: existants.map((x) => ({ patch: { id: x, set: { statut: 'vendue' } } })) }) });
    return reponse(200, `Vendue : ${id}`);
  } catch (e) {
    console.error(e);
    return reponse(500, 'Erreur'); // Stripe réessaiera automatiquement.
  }
}
