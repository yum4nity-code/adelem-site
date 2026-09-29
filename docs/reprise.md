# Reprise de session — état au 29 septembre 2026 (soir)

À lire en premier par toute nouvelle session, avec `AGENTS.md`, `docs/doctrine-adelem.md` et `docs/decisions.md`.

## Dépôt et déploiement

- Dépôt : `yum4nity-code/adelem-site`, branche de travail `v7-astro`, déployée sur `main` (Vercel → adelem.fr).
- Pousser : `git push origin v7-astro:main && git push origin v7-astro:v7-astro`.
- Build de démo : `cd site-astro && ADELEM_DEMO=1 npm run build`.
- Un projet Vercel en double (`adelem-site-prlz`) échoue à chaque push : à supprimer par Gwen (vérifier d'abord qu'adelem.fr n'est pas dans ses domaines).

## Règles permanentes (rappel)

- Aucun nom autre qu'« Adelem » hors des pages légales.
- Indexation Google désactivée (`PUBLIC_INDEX`) tant que les vraies pièces ne sont pas publiées.
- Ne jamais inventer de témoignage. Pas de sur-mesure.
- Demander avant toute action destructive ; proposer avant de coder un changement structurant.

## Fait aujourd'hui

- Mention discrète « Version test » en haut au centre (remplace la bande jaune).
- Menu lisible sur la photo d'ouverture : voile sombre sur les 220 px du haut, menu en 500 / 0,8 rem.
- Stripe relié par le connecteur Stripe, compte **« Adelem sandbox » (mode test uniquement)**.
  - 4 produits et 4 liens de paiement test créés : Canopée 690 €, Clairière 650 €, Sous-bois 130 €, Au vent 520 €.
  - Liens posés dans `site-astro/src/content/oeuvres/*.json` (champ `lien_paiement`) : les boutons « Acquérir » et la barre d'achat mobile fonctionnent.
  - Réglages des liens : 1 paiement max, adresse (FR, BE, LU, CH, MC, DE, IT, ES, NL) et téléphone, pas de codes promo, redirection `/merci-achat`, rappel CGV + 14 jours.
  - Non fait : case CGV (Stripe exige l'URL des CGV dans Paramètres › Informations publiques), Klarna (à activer par Gwen dans Paramètres › Moyens de paiement), frais de port.
- Récapitulatif des frais de port : `docs/pdf/adelem-frais-de-port.pdf` (script `docs/pdf/generer-frais-de-port.py`).

## Décision prise

- **Livraison offerte en France métropolitaine.** L'étranger paie des frais de port.

## En cours : paiement automatique avec frais de port par zone

Proposé, **pas encore validé ni codé** :

1. L'acheteur clique « Acquérir », choisit la zone (France / Europe / reste du monde).
2. Une fonction Vercel crée une session Stripe Checkout à la volée : prix de la pièce (lu dans Sanity), forfait de port de la zone (`shipping_options` avec `shipping_rate_data`), `allowed_countries` limités à la zone, vérification que la pièce est encore disponible.
3. Un webhook Stripe (`checkout.session.completed`) passe la pièce en « Vendue » dans Sanity.
4. Plus de liens Stripe à créer à la main ; le champ `lien_paiement` deviendrait inutile.
5. Gwen ajoute lui-même dans Vercel : clé Stripe (restreinte), secret du webhook, jeton d'écriture Sanity. Ne jamais lui demander de coller une clé dans la conversation.

Formats d'envoi (calculés à partir des dimensions et du poids déjà saisis) :

| Format | Plus grand côté | L + l + P | Poids pièce |
|---|---|---|---|
| Petit | ≤ 40 cm | — | ≤ 4 kg |
| Moyen | ≤ 65 cm | ≤ 120 cm | ≤ 8 kg |
| Grand | ≤ 90 cm | ≤ 170 cm | ≤ 12 kg |
| Hors format | au-delà | au-delà | au-delà → devis |

Grille proposée (dernière version, celle du PDF) :

| | France | Europe (UE, Suisse, Royaume-Uni) | Reste du monde |
|---|---|---|---|
| Petit | Offerte | 45 € | 95 € |
| Moyen | Offerte | 75 € | 175 € |
| Grand | Offerte | 105 € | Sur devis |
| Hors format | Sur devis | Sur devis | Sur devis |

Points à trancher par Gwen et sa mère avant de coder :

1. Petites pièces : livraison offerte (≈ 20 % du prix d'une pièce à 130 €) → intégrer au prix, ou « offerte dès 300 € ».
2. Pièces > 1 000 € : l'assurance Colissimo plafonne à 1 000 € → devis ou assurance spécialisée.
3. Vérifier les dimensions maximales Colissimo à l'international.

Ensuite : mettre à jour CGV et page Emballage et livraison (livraison offerte en France, forfaits étranger, devis hors format).

## En attente côté Gwen

- Supprimer le projet Vercel en double.
- Fiche Google Business.
- Vraies pièces et photos.
- Médiateur de la consommation (non choisi).
