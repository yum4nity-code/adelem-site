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

## 2026-09-28 — Refonte visuelle « Nocturne »

- Gwen a jugé la direction « Accrochage » (mur clair) insuffisamment haut de gamme après avoir comparé le site à des références du luxe (David Zwirner, Trudon, Astier de Villatte, Gagosian). Décision, prise par Gwen en tant que directeur de la publication : bascule vers une identité sombre permanente (« Nocturne »), inspirée de ces références.
- La variante « salle sombre » optionnelle actée le 2026-09-28 (`site.salle`) est abandonnée : au lieu d'un choix laissé à Adèle entre mur clair et mur sombre, le mur sombre devient l'identité unique et permanente du site. Raison : les Web Interface Guidelines et le skill de refonte déconseillent explicitement les sections sombres ponctuelles dans un site par ailleurs clair (effet de patchwork) ; un site cohérent doit trancher entre les deux, pas les faire cohabiter.
- Palette : fond `#1B211B`, texte crème `#ECE9E0`/`#C9C6B8`, accent doré `#C9AF78`, tous vérifiés à plus de 7:1 de contraste (AAA) sur le fond. Signature Adelem existante (`adelem-wordmark-charcoal.svg`) réutilisée en blanc (inversion CSS) à la place d'un texte "Adelem" — solution provisoire en attendant une signature dédiée à la nouvelle direction, à revoir avec Adèle.
- Page d'accueil : nouvelle ouverture avec la signature fixée à l'écran pendant le défilement puis libérée (technique inspirée de Loewe.com), sur une photo d'ambiance tirée d'une œuvre réelle. Décision technique : cette mise en scène utilise toujours une photo rectangulaire ordinaire (jamais un détourage/fond transparent), pour rester compatible avec le circuit réel d'ajout de photos par Adèle dans Sanity, qui ne produit que des recadrages rectangulaires.
- Accès à la « boîte aux idées » (Google Doc partagé) indisponible au moment de cette décision (accès refusé) : la bascule a été faite sur la seule autorisation de Gwen, sans vérification croisée avec une éventuelle idée récente d'Adèle. Gwen en a été informé ; cette refonte reste soumise à sa validation et à celle d'Adèle avant mise en ligne définitive.

## 2026-09-28 — Herbier en vraies photos, bouton d'achat direct, clickabilité

- Boîte aux idées vérifiée avant cette session : toujours vide (aucune entrée d'Adèle au 2026-09-28).
- Les illustrations vectorielles de l'Herbier (jugées trop « bon marché » par Gwen) sont remplacées par de vraies photos macro sous licence libre (Unsplash, usage commercial), composées en petits cadres sobres (mat crème + bois foncé), délibérément plus discrets que les cadres dorés des œuvres uniques.
- Gwen confirme que tout le stock présenté (œuvres, sculptures, trios Herbier) est fait à l'avance, jamais sur commande : un achat immédiat est donc honnête à proposer, contrairement à une fabrication sur devis.
- Ajout d'un champ facultatif **Lien de paiement** (`lien_paiement`) sur les fiches Œuvre et Herbier (Sanity + site) : tant qu'il est vide, seul le formulaire de demande s'affiche (comportement actuel inchangé) ; rempli, un bouton « Acheter — [prix] » apparaît à côté du formulaire. Choix technique : un lien de paiement externe (ex. Stripe Payment Links) plutôt qu'un vrai panier, pour rester dans le budget/complexité du projet ; la création du compte de paiement revient à Gwen ou Adèle (ne peut pas être faite par l'assistant).
- Clickabilité : sur le Mur (œuvres + sculptures) et sur l'Herbier, ajout d'un survol plus marqué (légère mise à l'échelle + ombre approfondie, teinte dorée du titre) et d'un appel discret masqué par défaut (« Voir l'œuvre » / « Découvrir le trio ») révélé au survol/focus. Le recadrage serré et la grille asymétrique déjà suggérés ne sont volontairement pas appliqués au Mur : l'accrochage à l'échelle réelle (chaque pièce à sa vraie largeur relative) est déjà la version « haut de gamme » de ces deux idées et resterait la référence différenciante du site.

## 2026-09-28 — Emballage, livraison mondiale, retours, et matière stabilisée

- Gwen tranche trois points de vente restés en `.todo` dans les CGV : livraison dans le monde entier (Adelem expédie partout) ; chaque œuvre emballée séparément, sauf les triptyques Herbier qui voyagent comme un seul envoi ; frais de retour à la charge de l'acheteur en cas de rétractation.
- Vérifié : c'est légal (art. L221-23 du Code de la consommation) à la seule condition de le dire clairement avant l'achat — ce que fait maintenant la nouvelle page `/livraison`, en plus des CGV.
- Pas de calculateur de frais de port par poids/dimension construit sur le site : chaque œuvre a déjà son propre lien de paiement Stripe (`lien_paiement`), donc son propre tarif de port par zone, configuré une fois par Gwen/Adèle au moment de créer le lien (le champ `poids_kg` existe déjà pour ça). Stripe gère nativement plusieurs tarifs de port par zone dans un même lien de paiement, sans code : construire un vrai calculateur temps réel (API transporteur) serait disproportionné pour un volume de vente artisanal.
- CGV mises à jour (sections 4, 5, 6, 7) avec ces décisions. Restent en `.todo`, faute de réponse à ce jour : régime de TVA (art. 3), pourcentage d'acompte sur-mesure (art. 4-5), délai d'expédition en jours d'une œuvre disponible (art. 6), nom du médiateur de la consommation (art. 9).
- Réassurance sur la matière : une ligne fixe, identique sur toutes les fiches (œuvres non-sculptures + Herbier), juste après la liste des matières, précise qu'il s'agit de végétal stabilisé sans entretien particulier. Objectif : ne jamais dépendre du fait qu'Adèle pense à le préciser au cas par cas. Proposé en plus, non construit à ce stade : une page « Le végétal stabilisé » jumelle de « Cadres anciens », pour qui veut comprendre la technique plus en détail.
- Textes d'exemple du champ « histoire » (Canopée, Clairière, Sous-bois) réécrits comme modèles de ton pour Adèle : geste et matière d'abord, jamais grandiloquent, toujours marqués « texte d'exemple, à adapter ».

## 2026-09-28 — Retrait des mentions vide-grenier/brocante, TVA et délai d'expédition tranchés

- Gwen juge les mentions « vide-grenier » et « brocante » trop kitsch pour le positionnement du site ; « chiné » reste acceptable. Retiré de : provenance et histoire de Clairière, histoire et provenance de Sous-bois, pages Atelier et Cadres anciens, titre et illustration du carnet `cadre-brocante` (renommé `cadre-chine`), et de l'exemple dans le schéma Sanity (champ titre du carnet).
- TVA tranchée : non applicable, art. 293 B du CGI (franchise en base, micro-entreprise). Section 3 des CGV sortie du statut `.todo`.
- Délai d'expédition tranché : 3 à 5 jours ouvrés, souvent moins, avant même de compter le transport. Ajouté aux CGV (section 6) et à la page `/livraison`. Ce délai ne concerne que la préparation/l'envoi depuis l'atelier ; le délai de transport proprement dit continue de dépendre de la destination et s'affiche au moment du paiement (tarifs Stripe par zone).
- Reste en `.todo`, faute de réponse à ce jour : pourcentage d'acompte sur-mesure (art. 4-5), nom du médiateur de la consommation (art. 9) — obligatoire avant la mise en ligne définitive d'une vente en ligne.

## 2026-09-29 — Relecture éditoriale à la lumière de la V2

- Audit V2 (`archive/v2-parallax.html`) contre le site actuel, avec pour règle que le site actuel reste la référence. Boîte aux idées consultée : vide. La V2 fournit l'esprit, pas le skin (Nocturne reste acté).
- Retenu et appliqué : titre de la page Atelier « Artiste, oui / Artisane, surtout » (sur-titre « L'atelier d'Adèle Mette ») ; phrase sur la part artistique (« dans l'œil et dans le choix ») ; étape Composer « … jusqu'à ce que l'ensemble tienne » ; bloc atelier de l'accueil titré « Un vrai travail de main ».
- Adèle ne veut plus de la baseline « La matière du végétal, composée à la main » : retirée de l'ouverture de l'accueil. Point final retiré du titre principal de l'accueil (règle des titres) ; « Tableaux végétaux, pièces uniques » réduit à « Pièces uniques » (montrer avant de catégoriser ; « tableaux végétaux » reste dans les métadonnées).
- On parle du mur, pas du cadre du client : Adèle ne s'interdit pas de travailler dans un cadre apporté, mais ne veut plus en faire mention. Retiré de l'accueil, du sur-mesure, de la galerie, de Cadres anciens et de la page Contact. Titres « Une œuvre pour votre mur » et « Parlons de votre mur ».
- Le nom d'Adèle avait été ajouté sur l'Atelier et les formulaires : **erreur, annulée le jour même**.
- Sur-mesure : Adèle n'est pas enthousiaste pour le moment et ne veut pas de clients aux contraintes démesurées. La page reste en ligne telle quelle en attendant une discussion ; l'étape « une direction proposée avant de composer » n'est pas ajoutée tant que ce fonctionnement n'est pas confirmé.
- Non repris de la V2 : « Le végétal, autrement » (vague) ; « Chaque pièce part des végétaux eux-mêmes » (contredit le site : chaque œuvre part d'un cadre ancien) ; « aucun besoin d'entretien » (trop fort). En réserve, seulement si Adèle s'y reconnaît : « Pas de grand manifeste… », « sans chercher à en faire trop », « simple à vivre, mais jamais banal ». « Le geste avant le discours » et la règle sur le luxe sont inscrits dans la doctrine comme règles d'écriture, pas comme texte visible.
- Signalé : les photos de l'Herbier sont des photos de stock, à remplacer par les vraies pièces d'Adèle avant toute vente.

## 2026-09-29 — Aucun nom propre hors mentions légales

- Règle actée par Gwen : le nom d'Adèle Mette n'apparaît **nulle part** sur le site en dehors des pages légales (mentions légales, CGV). La marque est Adelem, c'est tout. Cela tranche le point « Place personnelle d'AdeleM sur le site », en attente depuis le 2026-09-13.
- Retiré : sur-titre de l'Atelier, formulaires, pages Contact et Merci, pied de page (« Adelem, tableaux végétaux d'Adèle Mette » devient « Adelem »), notes « à adapter avec Adèle » des textes d'exemple, données structurées Google (auteur et fondatrice remplacés par l'organisation Adelem).

## 2026-09-29 — Sur-mesure retiré du site

- Décision de Gwen : tout le sur-mesure est retiré. Raison : le formulaire gratuit (Formspree) ne permet pas d'envoyer une photo du mur, point de départ indispensable d'une demande sur mesure ; et Adèle ne veut pas, en l'état, de demandes aux contraintes démesurées. La façon de le réintroduire reste à réfléchir.
- Retiré : page `/sur-mesure` (redirigée temporairement vers `/galerie`), entrée du menu, bloc de l'accueil, renvoi en bas de la galerie, lien « Imaginer une œuvre dans cet esprit » des œuvres vendues (remplacé par « Voir les œuvres disponibles »), clauses sur-mesure des CGV (acompte, confirmation écrite, exclusion du droit de rétractation art. L221-28).
- Le point « pourcentage d'acompte sur-mesure » des CGV disparaît avec. Reste en `.todo` : le médiateur de la consommation.
- La doctrine garde sa section « Sur mesure » comme cible, non active.

## 2026-09-29 — Première sculpture d'exemple, correctif de débordement

- Sculpture d'exemple « Au vent » ajoutée à la demande de Gwen (`"demo": true`) : photo fournie par Gwen, titre, prix (520 €), dimensions, matières et textes **inventés** pour la démonstration. La photo n'est pas une pièce d'Adèle et a l'aspect d'une image générée : elle contrevient à la règle « vraies photos uniquement » et doit être remplacée avant la mise en ligne définitive.
- Fil d'Ariane des fiches : une sculpture renvoie désormais vers « Sculptures », plus vers « Œuvres ».
- Correctif : le champ caché anti-robots des formulaires débordait et créait un défilement horizontal sur toutes les pages avec formulaire (fiches, contact). Classe `.visually-hidden` renforcée.
- Constat de Gwen, à traiter : le discours du site tourne presque entièrement autour du cadre ancien, ce qui laisse les sculptures sans place dans le récit. Le ton est à revoir avant de développer la partie sculpture.

## 2026-09-29 — Le récit passe du cadre à la main

- Constat de Gwen : tout tournait autour du cadre ancien, ce qui laissait les sculptures sans place. Le cadre reste la signature des tableaux, pas la définition d'Adelem ; le fil commun devient la main et la matière.
- Réécrits : titre de l'accueil (« Tableaux de mousses et de lichens, sculptures, faits à la main »), description du site pour Google, ouverture de l'Atelier (matière d'abord, cadre ensuite pour les tableaux, « Les sculptures naissent du même regard »), étapes Chercher et Préparer (ex-Restaurer), introduction de la page Sculptures (la rareté dite comme une rareté, plus comme une excuse).
- Gwen : ne pas préciser la matière des sculptures (« pas en grès, juste sculptures »). Toute mention du grès retirée du site, y compris sur la sculpture d'exemple.

## 2026-09-29 — Chapitre Sculptures, cartels, témoignages, lieux

- Inspiré du site d'Anne-Laure Pérès (sculptrice), validé par Gwen :
  - **Accueil en chapitres** : après le mur des tableaux, un chapitre « Sculptures » (jusqu'à 3 sculptures disponibles, lien vers la page). Apparaît seulement s'il y a des sculptures disponibles.
  - **Cartels** des murs : le statut passe sur sa propre ligne, en petites capitales (Disponible en doré, Réservée, Collection privée) ; le prix reste à côté des dimensions pour les pièces disponibles.
  - **« Où voir les pièces »** : liste de galeries, dépôts ou expositions, alimentée dans `site.ts` (`lieux`). Invisible tant qu'elle est vide ; n'y mettre que des lieux réels.
  - **Témoignages** : sélection éditoriale sans étoiles ni widget tiers (les widgets reconnus, Trustpilot et autres, imposent badges et étoiles peu compatibles avec le positionnement ; les galeries et artisans haut de gamme n'en affichent pas). Alimentée dans `site.ts` (`temoignages`), invisible tant qu'elle est vide. Mentions exigées par les art. L111-7-2 et D111-17 du Code de la consommation affichées sous la sélection (accord, absence de contrepartie, absence de contrôle, classement chronologique, dates) et dans les mentions légales. Fiche Google Business Profile recommandée comme source complète des avis (`contact.google`), liée sous la sélection. À préciser : délai de publication et durée de conservation.
- Défiscalisation (art. 238 bis AB CGI, prolongé jusqu'au 31/12/2028 par la loi n° 2026-103) : recherche faite, rien publié. L'éligibilité des tableaux végétaux comme « œuvres originales » n'est pas établie ; à présenter seulement avec réserve, si Gwen le décide.

## 2026-09-29 — Défiscalisation dans les CGV, durée des témoignages, certificat

- Défiscalisation (art. 238 bis AB CGI) : ajoutée uniquement dans les CGV (section 9 « Acheteurs professionnels »), avec réserve sur l'éligibilité et mention « information générale ». Pas d'encart ailleurs.
- Adèle propose un certificat d'authenticité avec chaque pièce (document pas encore créé) : mentionné dans cette section des CGV.
- Témoignages : publiés dans le mois suivant leur réception, conservés dix ans (mentions légales).
- Gwen crée la fiche Google Business Profile d'Adelem ; son lien ira dans `contact.google`.

## 2026-09-29 — Boutons d'achat

- Mot retenu : « Acquérir — [prix] » (vocabulaire de galerie ; hypothèse prise faute de réponse de Gwen, facile à changer). Paiement en 3 fois : oui, et annoncé sous le bouton.
- Sous le bouton, une ligne : « Paiement sécurisé, en une fois ou en 3 fois · 14 jours pour changer d'avis ». Affichée seulement quand un lien de paiement existe.
- Nouveau champ facultatif « Livraison en France (€) » (œuvres et Herbier, Sanity + site), affiché sur la fiche ; ailleurs, tarif calculé au paiement.
- Mobile : barre d'achat fixée en bas de l'écran (titre, prix, « Acquérir ») quand on a défilé au-delà du bouton.
- Pièce vendue ou trio épuisé : plus d'impasse, inscription « Être prévenu des prochaines pièces » (via le formulaire Formspree) et lien vers les pièces disponibles.
- Page `/merci-achat` (non indexée) : suite après paiement (emballage, certificat, expédition sous 3 à 5 jours ouvrés, réception). À renseigner comme redirection de chaque lien Stripe.
- Réglages Stripe à faire par Gwen : `docs/stripe-reglages.md` (dont « limiter à 1 paiement » : une pièce unique ne doit pas pouvoir être vendue deux fois).

## 2026-09-29 — Nom Adelem, référencement Google

- Une SARL « ADELEM » existe (SIREN 880 525 407, Rhône, créée en 2020, services administratifs / gestion), sans lien avec Adelem. Une autre, à Paris, est radiée depuis 2024. Aucune **marque** « ADELEM » déposée dans la base INPI (vérifié le 2026-09-29). Recommandation : déposer la marque Adelem à l'INPI dans les classes utiles.
- Le résultat Google actuel (« Galerie d'œuvres végétales et sculptures… créations sur mesure », sans logo) est l'ancienne version Lovable gardée en mémoire par Google : le nouveau site est volontairement non indexé tant qu'il montre des œuvres d'exemple. Il se mettra à jour après l'activation de l'indexation (`PUBLIC_INDEX=true` sur Vercel) et le passage de Google.
- Titre de l'accueil pour Google : « Adelem, tableaux végétaux et sculptures » (au lieu de « … et cadres anciens »). Icône 96 × 96 ajoutée : Google demande une icône d'au moins 48 px, multiple de 48.

## 2026-09-29 — Échelle des sculptures

- Constat de Gwen : sur mobile, une sculpture seule paraissait minuscule (échelle réelle calée pour qu'un tableau de 90 cm tienne à l'écran). Les murs de sculptures (page Sculptures, chapitre de l'accueil) ont désormais leur propre échelle : la pièce la plus haute atteint au moins 330 px, la hauteur d'un grand tableau. Les murs de tableaux gardent l'échelle commune, pour que les formats restent comparables entre eux.

## 2026-09-29 — Année des œuvres

- Demande d'Adèle, validée par Gwen : l'année de création n'est plus affichée pour les pièces disponibles ou réservées (effet « invendu » et, pour du végétal stabilisé, question de l'âge de la matière). Elle reste affichée pour les pièces vendues (archives, continuité du travail), figure sur le certificat et la facture, et reste saisie dans l'administration.

## 2026-09-29 — Nouvelle signature

- Signature manuscrite fournie par Adèle, extraite d'une photo et vectorisée (`public/logo/adelem-signature.svg`), validée par Gwen. Elle remplace l'ancienne dans l'en-tête (150 px de large, la nouvelle étant plus allongée) et sur l'ouverture de l'accueil. L'ancien fichier `adelem-wordmark-charcoal.svg` est conservé dans le dépôt mais n'est plus utilisé.
