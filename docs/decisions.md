# Journal des décisions

## 2026-09-13

### Base historique
- La V2 parallax est conservée intacte dans `archive/v2-parallax.html`
- Elle reste une référence esthétique et rédactionnelle, pas une base à modifier sans réflexion

### Positionnement provisoire
- Galerie marchande hybride
- Haut de gamme sans prétention
- Identité artiste-artisane
- Désir avant vente, clarté au moment d'acheter

### Règles déjà actées
- Aucun point final dans les titres
- Pas de promotions artificielles
- Prix visibles par défaut
- Œuvres vendues conservées dans les archives
- Homepage immersive, pages d'achat fonctionnelles
- Les sculptures font partie du langage AdeleM

### En attente
- Réponses au questionnaire de 58 questions
- Positionnement définitif
- Gamme et politique de prix
- Cible prioritaire
- Poids du sur-mesure
- Place personnelle d'AdeleM sur le site

## 2026-09-28

### Nouveau site
- Abandon de Lovable : le site est reconstruit en Astro (dossier `site-astro/`), hébergé sur Vercel, déployé depuis la branche `main`
- Direction visuelle retenue par Gwen : « Accrochage » (mur de galerie, œuvres à l'échelle réelle, cartels de musée), mur clair
- Variante « salle sombre » (vert forêt très foncé, pas noir) gardée en option (`site.salle` dans `site-astro/src/data/site.ts`), à faire choisir par Adèle
- Aucune image générée par IA ; vraies photos uniquement, avec retouches de lumière autorisées
- Gwen est directeur de la publication
- Espace d'administration prévu : Sanity (offre gratuite), pour qu'Adèle ajoute œuvres, photos et textes seule
- adelem.fr ne bascule sur le nouveau site qu'avec : 6 vraies œuvres, formulaire de contact actif, mentions légales complètes
- Les œuvres actuellement en ligne sur le nouveau site sont des exemples (`"demo": true`) avec des prix alignés sur le questionnaire (grands formats vers 350 à 690 €)

## 2026-09-28 — Espace d'administration Sanity branché

- Projet Sanity `b9pobh76`, jeu de données `production` (lecture publique). Studio embarqué sur `/admin` (noindex), interface en français.
- Fiche « Œuvre » : photos (la 1re = face, recadrée), titre, disponibilité, prix, dimensions cadre compris ; détails facultatifs (type, année, matières, cadre, provenance, texte, poids, mise en avant accueil).
- Calculé automatiquement : format (≤ 40 cm Petit format, ≤ 70 cm Format signature, au-delà Grand format, sur le plus grand côté), adresse de la page (depuis le titre), recadrage de la vue de face aux proportions réelles.
- Tant qu'aucune œuvre n'est publiée dans Sanity, le site affiche les œuvres d'exemple. Si Sanity est injoignable, la construction échoue et la version en ligne reste en place.
- Mise à jour du site après publication : webhook Sanity → Deploy Hook Vercel (à créer par Gwen).

## 2026-09-28 — Audit technique et alignement sur la doctrine

- Audit du site avec les skills de revue de design et les Web Interface Guidelines (Vercel) : corrections directes de tout ce qui était sans risque et réversible (accessibilité clavier, lien d'évitement, focus, contraste des liens, LCP de la galerie, apostrophes et espaces insécables français dans tout le contenu affiché).
- Palier intermédiaire de la gamme renommé « Moyen format » → **Format signature**, pour correspondre aux 4 paliers du document de doctrine (Petit format / Format signature / Grand format / Sur mesure). Sous-titres doctrinaux ajoutés sous chaque palier sur la page Œuvres, et renvoi vers le sur-mesure en bas de cette page.
- Section « Chez vous » (promesse de photomontage personnalisé) déjà retirée précédemment ; remplacée par une ligne de conseil sur la taille, formulée sans promettre de visuel produit (« nous vous conseillons la taille »), à la demande explicite de Gwen.
- Deux champs facultatifs de la doctrine, absents jusqu'ici, ajoutés à la fiche œuvre (Sanity + site) : **Entretien** et **Certificat / signature particulière**. Volontairement vides par défaut et à remplir par Adèle avec ses propres mots — aucun texte générique inventé, conformément à la règle du projet contre les promesses non vérifiées. Les œuvres d'exemple montrent un rendu possible, texte marqué « d'exemple ».
- Toujours en attente (voir mémoire projet) : Deploy Hook Vercel + webhook Sanity, invitation d'Adèle en Administrateur sur Sanity, adresse et coordonnées manquantes dans les mentions légales, passages à préciser dans les CGV, case de consentement et service d'envoi réel pour le formulaire de contact, décision sur un outil de mesure d'audience.
