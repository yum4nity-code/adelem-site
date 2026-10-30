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

## 2026-09-29 — Ouverture de l'accueil (mobile d'abord)

- Constat : photo d'ouverture floue et ternie par un voile trop sombre, deux signatures à l'écran (en-tête et ouverture), un écran et demi à faire défiler sur mobile avant la première œuvre.
- Appliqué : en-tête transparent posé sur la photo d'ouverture, sa signature masquée sur l'accueil (une seule signature à la fois) ; voile allégé au centre, plus sombre en haut (menu) et en bas (fondu) ; ombre douce sous la signature ; invitation « Découvrir » en bas ; ouverture raccourcie sur mobile (108 % de la hauteur d'écran au lieu de 140 %).
- Nouveau dans l'administration : **Accueil › Photo d'ouverture** (document unique), avec consigne (verticale, nette, bien éclairée, idéalement une vraie pièce) et point d'intérêt réglable. Sans photo choisie, l'accueil garde le choix automatique.
- Photo d'ouverture d'attente choisie par Gwen : celle de la V2 (mur de bois sombre, pièce végétale encadrée éclairée ; Unsplash, licence libre), chargée directement depuis Unsplash. Ce n'est pas une pièce d'Adelem : à remplacer par une vraie photo via Accueil › Photo d'ouverture.

## 2026-09-29 — Lisibilité du menu sur la photo d'ouverture

- Voile sombre en dégradé sur les 220 px du haut de la photo d'ouverture (indépendant de la photo choisie).
- Menu : caractères en poids 500 et 0,8 rem (au lieu de 400 et 0,72 rem), bouton « Menu » mobile aligné.
- Écartés : bandeau flouté (coupe la photo), recadrage (ne vaut que pour une photo), ombre sous les lettres (gardée en réserve).

## 2026-09-29 — Paiement de test Stripe sur les pièces d'exemple

- Compte Stripe « Adelem sandbox » (mode test) relié via le connecteur Stripe : 4 produits et 4 liens de paiement test créés (Canopée, Clairière, Sous-bois, Au vent), aux prix des fiches.
- Réglages des liens : 1 paiement maximum, adresse de livraison (FR, BE, LU, CH, MC, DE, IT, ES, NL) et téléphone demandés, pas de codes promo, redirection vers /merci-achat, rappel CGV et 14 jours sous le bouton.
- Case « J'accepte les CGV » non activée : Stripe exige d'abord l'URL des CGV dans Paramètres › Informations publiques.
- Pas de tarif de livraison dans les liens de test (montants à fixer).
- Liens posés dans les JSON de démo (champ lien_paiement) : ils disparaissent avec les pièces d'exemple.

## 2026-10-02 — Ouverture de l'accueil « mur de galerie »

- Décision de Gwen : la photo d'ouverture par défaut devient le tableau sous-bois aux arbres rouges, redressé, détouré au ras du cadre et posé sur un mur vert sombre éclairé en galerie (variante « B3 » choisie parmi plâtre blanc, lin et vert sauge). C'est un **photomontage** : le tableau est réel, le mur, l'ombre et la lumière sont reconstitués.
- Mise en page : la signature quitte le centre de la photo et se place au-dessus du tableau, comme le nom de l'artiste sur le mur d'une galerie. Une image portrait dédiée au mobile garde le tableau entier à l'écran.
- Ce mode (`mode: 'mur'` dans `src/data/site.ts`) ne s'applique qu'à la photo par défaut du site. Une photo choisie dans l'administration (Accueil › Photo d'ouverture) garde l'ouverture plein cadre habituelle : la règle « photos rectangulaires ordinaires » pour le circuit d'Adèle reste inchangée.
- Limite connue : photo source en basse définition (1269 × 952) ; à refaire depuis l'original du téléphone ou une nouvelle prise de vue pour la version définitive.
- 2026-10-03 : photo source remplacée par une nouvelle prise de vue de face envoyée par Adèle (2000 × 1500, redressée à 1791 × 1419). Même ratio de cadre (1,262), même emplacement dans les deux montages : la position de la signature est inchangée. Limite de basse définition levée. En attente de validation d'Adèle, comme toute l'identité Nocturne.

## 2026-10-10 — Fiche Œuvre de l'admin sur une seule page

- Constat de Gwen : impossible de trouver où saisir la description, le cadre et les matières. Les champs existaient, mais dans un second onglet « Détails » que l'admin n'ouvre pas par défaut.
- Appliqué : plus d'onglets, une seule page dans l'ordre de saisie : Photos, Titre, Type, Description, Disponibilité, Prix, dimensions, Matières, Le cadre (précisions), Provenance du cadre, Année, Poids, Entretien, Certificat, Lien de paiement, Livraison en France, Mise en avant.
- « Quelques mots sur l'œuvre » devient « Description ». « Le cadre » devient « Le cadre (précisions) », sur deux lignes (bois, style, époque, état, restauration).
- Pour une sculpture, Matières, Le cadre et Provenance du cadre sont masqués (règle : la matière des sculptures n'est pas indiquée). Aucune donnée existante n'est modifiée : mêmes noms de champs.

## 2026-10-10 — Fiches : photo principale + vignettes

- Demande de Gwen : comme une fiche produit, les photos suivantes apparaissent en petit sous la photo principale ; un clic les affiche en grand à sa place. Pour tous les produits.
- Œuvres et sculptures : la vue de face reste à l'échelle réelle ; une autre photo s'affiche entière dans le même cadre (la page ne saute pas). L'ancienne section des grandes photos plus bas est supprimée (doublon).
- Herbier : nouveau champ facultatif « Autres photos » dans l'admin (avec légende). Une photo de détail y prend sa hauteur naturelle (70 % de l'écran au plus), le bandeau du trio étant trop bas.
- Composant commun `src/components/Vignettes.astro`. Sans JavaScript, chaque vignette ouvre la photo. Vignettes Sanity carrées de 240 px (recadrage et point d'intérêt respectés).

## 2026-10-25 — Murs de tableaux : échelle adoucie
- Demande d'Adèle, validée par Gwen : les petits formats (21 × 29 cm) étaient à peine visibles avec l'accrochage à l'échelle réelle.
- Les murs de tableaux (accueil, galerie) n'affichent plus la largeur réelle mais une largeur « adoucie » : 95 × (largeur / 95)^0,3 en cm d'affichage (d'abord 0,55, jugé encore trop petit par Gwen le même soir). L'ordre des tailles est conservé, l'écart est fortement resserré (un 21 cm fait environ les trois quarts d'un 62 cm). Sur téléphone (une œuvre par rangée), chaque tableau occupe au moins 72 % de la largeur de l'écran et son cartel est centré dessous. Les proportions de chaque tableau ne changent pas.
- La mention « présentées à leur échelle réelle » est remplacée par « Dimensions exactes indiquées sous chaque œuvre ». Les murs de sculptures gardent leur échelle locale.

## 2026-10-26 — Photos : recadrage automatique du fond vide
- Incident : Balade d'automne a paru rapetisser sur les murs après une modification dans l'admin. Cause réelle : sa photo de face avait été remplacée par un PNG détouré carré (2500 × 2500, fond transparent), le cadre n'occupant qu'environ 57 % de la largeur. Le titre n'y était pour rien.
- Décision : à chaque construction, chaque photo est analysée (`site-astro/src/sanity/cadrage.ts`). Un fond transparent ou uni (quatre coins de même couleur) est retiré, puis la vue de face est mise aux proportions du cadre en élargissant la zone (sans rogner l'œuvre quand c'est possible). Un recadrage fait dans l'admin reste respecté. Photo non analysable : gardée telle quelle (avertissement dans le journal de construction).
- `sharp` passe en dépendance directe.

## 2026-10-26 — Murs de tableaux : taille d'après le plus grand côté
- Constat (Gwen, sur téléphone) : avec le minimum de 72 % de l'écran, le 21 × 29 (en hauteur) paraissait plus grand que Balade d'automne (62 × 49, en largeur).
- Décision : la taille affichée suit le plus grand côté du cadre, à la puissance 0,35 (référence 95 cm), sur ordinateur comme sur téléphone. Un petit tableau reste bien visible mais plus petit qu'un grand dans les deux sens. Le minimum de 72 % est retiré pour les tableaux et gardé pour les murs de sculptures.
- Repères à 390 px : 62 × 49 ≈ 295 × 233 px, 47,5 × 38 ≈ 268 × 215 px, 21 × 29 ≈ 163 × 226 px. Sur ordinateur : 450 × 356, 410 × 328, 250 × 345.

## 2026-10-26 — Liste de modifications d'Adèle (« ADELEM modifs site »)
- Galerie classée par collection et non plus par taille : Signature (tout cadre ancien, petit ou grand, avec le texte d'Adèle), Cadres contemporains, Déco et cadeaux. Nouveau champ « Collection » dans /admin (Signature par défaut, masqué pour les sculptures). Une rubrique vide n'apparaît pas.
- Menu : mots écrits normalement (« Galerie », « À propos »), même police sur téléphone et ordinateur ; plus de petites capitales espacées.
- Herbier retiré du menu, remplacé par une page À propos (infos générales : végétal stabilisé, entretien, fait main en France, cadres anciens, sculptures, livraison). /herbier renvoie vers /a-propos (redirection Astro dans astro.config.mjs : les redirections de vercel.json ne sont pas appliquées sur ce projet, /sur-mesure y est passée aussi) ; pages Herbier gardées en src/pages/_herbier* (ignorées par Astro) ; le type Herbier reste dans l'admin, rien n'est supprimé.
- Sculptures : le grès est désormais mentionné (page À propos), à la demande d'Adèle. Règle de Gwen (2026-10-26) : on suit les demandes d'Adèle tant qu'elles ne nuisent pas au site.
- En attente d'Adèle : provenance des végétaux, inspiration des sculptures.

## 2026-10-27 — Galerie en trois thèmes, menu sans Sculptures
- Galerie : trois thèmes, avec des liens en haut de page — Végétaux stabilisés (collections Signature, Cadres contemporains, Déco & cadeaux), Sculptures, Fleurs en porcelaine froide. Le thème vient du champ « Type » de l'admin (Végétaux stabilisés / Sculpture / Fleurs en porcelaine froide), la collection du champ « Collection » (visible pour les végétaux seulement). Un thème sans pièce affiche « Les pièces arrivent bientôt. ». La mention « Dimensions exactes… » sous le titre Galerie est retirée (elle reste sous le mur de l'accueil).
- Menu : Galerie, Atelier, À propos, Contact. /sculptures renvoie vers /galerie#sculptures ; page source gardée en _sculptures.astro.
- Titres Galerie, Atelier, À propos à la même taille (classe .titre-page). Atelier : « Artiste, oui / Artisane, surtout » devient une accroche plus petite sous le titre.
- Accueil : l'invitation à défiler (« Découvrir » + trait) n'est plus affichée sur ordinateur (souris), gardée sur téléphone.
- La phrase « matières stabilisées » des fiches ne s'affiche que pour les végétaux (pas pour la porcelaine froide).
- Mise à jour du même jour (Gwen) : pas tout à la suite, une page par menu. /galerie = trois titres (Végétaux stabilisés, Sculptures, Fleurs en porcelaine froide) ; /galerie/vegetaux-stabilises = trois titres (Signature, Cadres contemporains, Déco & cadeaux) ; chaque collection et chaque autre thème a sa page (/galerie/vegetaux-stabilises/signature, …/cadres-contemporains, …/deco-et-cadeaux, /galerie/sculptures, /galerie/fleurs-en-porcelaine-froide), avec ses pièces vendues en bas. Arborescence dans src/data/galerie.ts. Fiche d'œuvre : fil d'Ariane et retour vers sa page de galerie.

## 2026-10-27 — Page Atelier : texte d'Adèle
- Titre « L'atelier » (taille des titres de page) ; « Artiste, oui / Artisane, surtout » à la taille des titres du menu de la galerie (« Végétaux stabilisés »).
- Nouveau texte d'Adèle (document « Atelier »), typographie seule ajustée. Provenance : « végétaux du monde entier, traités en France », reprise dans À propos.
- Les dates des cadres (1850–1970) disparaissent du texte Atelier à sa demande ; elles restent sur À propos et Cadres anciens tant qu'Adèle n'a pas tranché.

## 2026-10-27 — Menus de la galerie : une photo derrière chaque titre
- Chaque titre (Galerie et Végétaux stabilisés) est une tuile posée sur une photo assombrie. Téléphone : la tuile au milieu de l'écran s'éclaire ; ordinateur : au survol.
- Photo choisie : l'œuvre cochée « Photo de la rubrique » dans l'admin (nouveau champ), sinon la plus récente de la rubrique (disponibles d'abord ; sa 2e photo si elle existe, sinon la vue de face).
- Rubrique sans œuvre : image d'ambiance Unsplash (mousse, lichen, mains dans la terre, pétales), servie depuis images.unsplash.com, jamais un objet fini. Remplacée automatiquement dès la première pièce publiée.

## 2026-10-27 — Parcours client : accueil → fiche → rebond
- Photo d'accueil cliquable : elle mène à la fiche de l'œuvre montrée (légende discrète « Titre → »). Photo choisie dans l'admin : nouveau champ « Œuvre montrée sur la photo » (Réglages de l'accueil) ; vide = photo non cliquable. Photo par défaut (photomontage) : Balade d'automne, par son identifiant Sanity (stable même si le titre change).
- Destination tranchée : la fiche de l'œuvre (ni la galerie, ni le paiement direct).
- Fiche : retour visible « ← Rubrique » en haut ; en bas, « Dans la même collection » (3 pièces, complétées par d'autres rubriques si besoin) + liens « Toute la collection … » et « La galerie ».

## 2026-10-27 — Bas de page refait
- Bande de confiance (Pièce unique · Fait main en France · Emballage sur mesure), signature, colonnes Explorer / Acheter / Contact (e-mail, Instagram, formulaire), « © Adelem · Mentions légales ». Espace vide au-dessus réduit.
- « Recevoir les nouvelles pièces » : champ e-mail envoyé par Formspree (même formulaire que le contact). Adèle reçoit un e-mail par inscription ; Formspree conserve les adresses (point de départ de la future newsletter, à monter avec Gwen). Plan gratuit Formspree : 50 envois par mois, tous formulaires confondus.

## 2026-10-27 — Ouverture à Google et mentions légales
- Indexation ouverte (décision de Gwen) : plus de « noindex » par défaut ; PUBLIC_INDEX=false dans Vercel pour la couper. Adresse canonique : https://www.adelem.fr (adelem.fr y redirige), plan du site et robots.txt alignés.
- Mentions légales complètes : adresse 116 rue du Vicariat, 82110 Cazes-Mondenard (fournie par Gwen, message d’Adèle du 28/09), téléphone +33 6 80 37 54 01, « TVA non applicable, art. 293 B du CGI » (confirmé par Gwen), hébergeur Vercel Inc. (vercel.com/legal/privacy-notice).
- Mentions du « triptyque Herbier » retirées des pages Livraison et CGV.
- À faire (Gwen en parle à Adèle) : le titre de l'accueil et le titre Google ne citent pas les fleurs en porcelaine froide.

## 2026-10-27 — Aperçus de partage et données pour Google
- Image de partage par défaut (public/partage.jpg, 1200 × 630) : le photomontage de l'accueil sous la signature, pour toutes les pages sans image propre (accueil, galerie, atelier…).
- Fiches d'œuvres : aperçu 1200 × 630 dédié, l'œuvre entière sur le fond vert du site (les PNG détourés ne sortent plus noirs ou blancs).
- Accueil : données « WebSite » (nom Adelem) pour que Google affiche le nom du site.
- Icône du site (choix de Gwen, 2026-10-27) : image fournie par Gwen — badge « Adelem » en cuivre sur vert, cercle garni de mousse, lichen, écorce et feuillage (public/logo/adelem-badge-vegetal-photo.png), déclinée en 16 à 512 px. Essais écartés : « A » de la signature seul, icônes Canva, badge vectoriel avec mousse dessinée.

## 2026-10-27 — Textes des rubriques modifiables dans l'admin
- Nouveau document unique « Textes de la galerie » dans /admin : un texte par rubrique (Végétaux stabilisés, Signature, Cadres contemporains, Déco & cadeaux, Sculptures, Fleurs en porcelaine froide), affiché sous le titre de la page. Vide = rien n'est affiché ; Signature garde son texte actuel tant que la case est vide. Les retours à la ligne sont respectés.
- Webhook Sanity → Vercel vérifié le 2026-10-27 : aucun filtre (création, modification, suppression de tout document du jeu production) ; les textes de la galerie et la photo d’ouverture relancent donc bien la mise à jour du site. Rien à changer.

## 2026-10-27 — Ouverture de l'accueil en pleine définition (ordinateur)
- Le tableau n'est plus incrusté dans la photo du mur (2560 px de large, tableau à 940 px : flou sur grand écran). Sur ordinateur, le mur seul (public/images/ouverture-mur-fond-desktop.webp, 3840 × 2160, tableau retiré) sert de fond, et le tableau est posé par-dessus depuis sa photo détourée dans l'admin (≈ 1 400 px de cadre, servie par Sanity), avec une ombre portée en CSS. Même place, même taille que l'ancien montage (calcul dans index.astro).
- Téléphone : photomontage d'origine inchangé. Sans photo détourée (photo choisie dans l'admin, ou autre œuvre), retour automatique à l'ancien comportement.

## 2026-10-27 — Netteté des images sur ordinateur (audit des pages)
- Mesuré en ligne (définition de l'image ÷ taille affichée) sur accueil, galerie, rubriques, fiche, atelier.
- Seul défaut corrigible : les vignettes « D'autres pièces » de la fiche (240 px servis pour ≈ 275 px affichés) → vignettes en 640 px.
- Limites qui viennent des photos elles-mêmes (non corrigeables côté site) : certaines photos de détail envoyées dans l'admin sont petites (ex. PNG 1200 px où l'œuvre occupe ≈ 640 px) ; photo de l'atelier en 900 px. Pour plus de netteté : envoyer des photos plus grandes (≥ 2000 px côté œuvre).

## 2026-10-27 — Fond d'ouverture sans marches de couleur (ordinateur)
- Constat : le dégradé du mur avançait par paliers visibles (« banding ») : ≈ 40 teintes de vert seulement, et la compression WebP (42 Ko en 4K) aplatissait les nuances en plaques.
- Correction : dégradé recalculé en précision continue (lissage large, la lumière du mur est inchangée : écart moyen < 0,3 niveau), grain fin + tramage ajoutés, enregistré en JPEG qualité 90 sans sous-échantillonnage des couleurs (≈ 400 Ko), format qui conserve le grain (le WebP l'effaçait, même en qualité 92).
- Fichier : public/images/ouverture-mur-fond-desktop.jpg (l'ancien .webp reste dans l'historique Git). Téléphone inchangé (ne charge pas cette image).
- Même traitement pour l'image du téléphone (public/images/ouverture-mur-mobile.jpg, ≈ 370 Ko) : mur lissé + grain, tableau et ombre de contact gardés pixel pour pixel (zone du cadre x 99–981, y 947–1597 conservée telle quelle).

## 2026-10-27 — Signature d'accueil remontée de 18 px (mobile et ordinateur)
- L'écart signature → cadre (≈ 22 px) était plus petit que cadre → accroche ; la signature paraissait posée sur le cadre. Écart porté à 40 px (index.astro, .hero-mur .marque-hero), taille de la signature inchangée.

## 2026-10-27 — Mode test des paiements Stripe
- Un lien de paiement Stripe de test (buy.stripe.com/test_…) collé dans l'admin n'affiche PAS le bouton « Acquérir » aux visiteurs : ils voient toujours « Demander cette œuvre ».
- Pour tester : ouvrir une fiche avec `?test-paiement` (mémorisé sur l'appareil, mention « Mode test · aucun vrai paiement ») ; `?test-paiement=non` pour revenir à la vue visiteur.
- Un vrai lien (sans « test_ ») s'affiche pour tout le monde, sans rien changer au code : c'est le passage en production.

## 2026-10-27 — Paiements Stripe en mode test (compte « Adelem sandbox »)
- Tarifs de livraison : France 0 € (livraison offerte) ; Europe ≤ 2 kg 25 € ; 2 à 5 kg 30 € ; > 5 kg 50 € (poids emballé de l'admin).
- Un seul lien de paiement par pièce (une pièce unique ne doit pas pouvoir être vendue deux fois) : pays FR, MC, BE, LU, CH, DE, IT, ES, NL ; deux options proposées : « Livraison offerte en France » et le forfait Europe de la pièce. Stripe ne sait pas lier un tarif à un pays sur un lien de paiement : un client européen pourrait choisir l'option France ; message affiché au paiement pour l'éviter, à contrôler à l'expédition.
- Réglages : 1 paiement maximum, téléphone demandé, facture avec « TVA non applicable, art. 293 B du CGI », redirection /merci-achat, message si la pièce est déjà vendue.
- Liens de test collés dans l'admin pour les 4 pièces disponibles ; invisibles des visiteurs (voir « Mode test des paiements »).
- Reste : case CGV obligatoire (URL des CGV à renseigner dans Stripe › Paramètres › Informations publiques), puis refaire produits/tarifs/liens sur le compte réel au moment de l'activation (nouveau SIRET).

## 2026-10-27 — Bouton d'achat : « Acquérir » seul, plus de bouton grisé au retour
- Libellé « Acquérir » sans le prix (le prix est affiché juste au-dessus) — demande de Gwen.
- Bouton grisé après « Précédent » sur téléphone : le survol (:hover) restait collé après le toucher, avec un fond sombre qui rendait le texte illisible. Survol réservé aux souris (`@media (hover: hover)`) et éclairci (#d9d3c6) pour rester lisible ; vérifié sur téléphone simulé (clic, retour) et ordinateur.
- PayPal : non disponible sur le compte Stripe tant qu'il n'est pas activé dans le tableau de bord (Paramètres › Moyens de paiement › PayPal, conditions à accepter par le titulaire du compte) ; impossible par l'API.

## 2026-10-28 — Fiche avec achat en ligne : formulaire de question, barre d'achat

- Constat de Gwen (mobile, mode test) : sous le bouton « Acquérir », le formulaire restait titré « Demander [œuvre] », et la barre d'achat fixée en bas recouvrait le bouton « Envoyer ».
- Décision de Gwen (même jour, après un premier essai qui gardait le formulaire retitré « Une question sur… ? ») : formulaire jugé trop lourd sous le bouton d'achat, d'autant que l'inscription aux nouvelles pièces suit en bas de page. Quand une pièce a un lien de paiement, **plus de formulaire sur la fiche** : seul le lien « Une question sur cette pièce ? » reste, vers `/contact?piece=[titre]`, qui reprend la pièce dans l'objet (« Question : … »), un champ caché et le début du message. Sans lien de paiement, rien ne change (formulaire « Demander [œuvre] »). En mode test, l'affichage suit le mode test.
- La barre d'achat mobile s'efface tant que le formulaire est à l'écran ; elle revient plus bas (suggestions).

## 2026-10-28 — Phrase fixe sur le végétal stabilisé corrigée (demande d'Adèle)

- Adèle : la phrase automatique des fiches était fausse (« à l’abri de la lumière directe ») ; c'est le **soleil direct** qu'il faut éviter, pas la lumière. Elle demande aussi de retirer « courant » après « entretien », et de garder la phrase.
- Nouvelle phrase (fiches œuvres non-sculptures + Herbier) : « Matières naturelles stabilisées : elles gardent forme et couleur sans arrosage ni entretien, à l’abri du soleil direct. »
## 2026-10-28 — Fiche œuvre réorganisée (proposition de Gwen, ajustée) + livraison offerte en France
- Ordre : étiquette-retour « ← Signature · Pièce unique » ; titre ; accroche (sous-titre) ; prix et dimensions sur une ligne ; bouton pleine largeur « Acquérir cette pièce » ; « Livraison offerte en France · Sans arrosage ni entretien » ; « Une question sur cette pièce ? » ; histoire (3 lignes + Lire la suite) ; volets « Matières et dimensions », « Entretien », « Livraison et retours ».
- Gardé le style du site (serif, angles droits, pas de carte arrondie) et la vue du tableau à l'échelle avec ses vignettes.
- Retiré la ligne « Paiement sécurisé… » (Gwen : déjà visible sur la page de paiement).
- Livraison offerte en France validée par Adèle : page Livraison, CGV (art. 3 et 6) et fiche mises à jour. Le champ « Livraison en France (€) » n'est plus affiché.

## 2026-10-28 — Texte « Adelem » d'Adèle sur À propos ; plus aucune date de cadre
- Texte d'Adèle placé en tête de À propos (titre « Adelem », 3 paragraphes). Corrections validées par Gwen : « garantie 10 ans par les fournisseurs » → « au moins 10 ans selon les fournisseurs » (ne pas laisser croire à une garantie Adelem), « terre cuite » → « la terre » (le grès n'est pas de la terre cuite), « vintages » → « anciens ».
- « Ancien » plutôt que « vintage » (plus haut de gamme, cohérent avec la collection Signature) ; Atelier corrigé aussi.
- Adèle craint de devoir prouver l'âge des cadres : une date ou un siècle associé à un objet engage le vendeur (décret n° 81-255) ; « ancien » seul n'en donne pas. Fourchette « 1850 à 1970 » retirée de À propos et Cadres anciens. Règle : aucune date ni siècle sur une fiche sans preuve (étiquette, facture, expertise) ; décrire le cadre plutôt que son âge.

## 2026-10-28 — Pièce réservée
- Plus de gros bouton « Demander cette œuvre » sur une pièce réservée (faux espoir, demandes à refuser). À la place : « Réservée » + prix en petit, inscription « Être prévenu si elle se libère » (sujet du mail : « Être prévenu si « titre » se libère »), lien « Voir les pièces disponibles ». Ni « Livraison offerte », ni question, ni formulaire en bas pour une pièce réservée.
- Dimensions de la ligne prix au format français (47,5 et non 47.5).

## 2026-10-28 — Vente Stripe → pièce « Vendue » automatiquement
- Fonction Vercel `api/stripe-webhook.mjs` (https://www.adelem.fr/api/stripe-webhook) : Stripe l'appelle après un paiement ; signature vérifiée (HMAC, 5 min de tolérance) ; pièce retrouvée par la métadonnée « oeuvre » du lien, sinon (clé restreinte facultative) par l'adresse du lien collée dans l'admin ; statut passé à « vendue » (version publiée + brouillon s'il existe). Le webhook Sanity existant reconstruit le site.
- Secrets uniquement dans Vercel (STRIPE_WEBHOOK_SECRET, SANITY_WRITE_TOKEN, STRIPE_API_KEY facultative), créés par Gwen.
- Testé hors ligne : vente → 2 mises à jour ; signature fausse ou trop vieille → refus ; autres événements et paiements non aboutis ignorés.

## 2026-10-28 — Sculpture démesurée sur téléphone
- Le minimum de 72 % de largeur des murs de sculptures rendait une pièce haute et étroite énorme (plus haute que l'écran). Hauteur plafonnée à 62 % de l'écran (largeur = 62svh × largeur/hauteur) ; testé : 26 × 39 inchangé, 15 × 40 passe de ≈ 790 px à 520 px de haut.

## 2026-10-30 — Collection noire ; Herbier retiré de l'admin
- Admin : « Herbier (petits formats) » retiré du menu et des nouveaux documents (les données restent, rien n'est supprimé). Nouvelle valeur de collection « Collection noire » (œuvres de type tableau) et texte « Collection noire » dans « Textes de la galerie ».
- Site : 4e tuile sous Végétaux stabilisés → /galerie/vegetaux-stabilises/collection-noire (même fonctionnement que les autres ; « bientôt » tant qu'il n'y a pas de pièce).
- Image d'ambiance provisoire : gros plan Unsplash d'un coin de cadre en bois (photo-1634970064884-88918a3be8c8), passé en noir et blanc sombre par filtre CSS. Remplacée automatiquement par la photo de la première pièce de la collection. Aucune photo libre de droits de cadre noir ancien trouvée et vérifiable.
- (2026-10-30) Ordre des collections : Signature, Cadres contemporains, Collection noire, Déco & cadeaux (site et admin). Pages des collections : collection retrouvée par sa clé, plus par sa position.
- (2026-10-30) Fiche œuvre sur ordinateur : la photo s'aligne en haut, au niveau des infos (avant : centrée verticalement, donc trop basse quand le texte est long).

## 2026-10-30 — Page Contact embellie
- Téléphone en chiffres alignés (la serif affichait des chiffres « à l'ancienne » qui montaient et descendaient).
- Colonne gauche : lien « Écrire sur WhatsApp » (wa.me, même numéro), « L'atelier se visite sur rendez-vous, à Cazes-Mondenard (Tarn-et-Garonne) » (validé par Gwen ; à confirmer avec Adèle), carte de correspondance couleur papier : badge végétal Adelem + « Je lis et je réponds moi-même à chaque message. » + signature à l'encre.
- Colonne formulaire : rappel de la pièce quand on vient d'une fiche (?piece=Titre : photo, titre, prix, « ← Revenir à la pièce ») ; sujet en un clic (Une pièce / Un cadeau / Autre chose, champ « objet », « Une pièce » pré-coché depuis une fiche).
- (2026-10-30) Retiré : « L'atelier se visite sur rendez-vous » — pas de visite de l'atelier (Gwen). Ne jamais proposer de visite.
- (2026-10-30) Bas de page épuré : bande de confiance inchangée ; deux blocs (signature + phrase, « Recevoir les nouvelles pièces ») ; une ligne de liens (e-mail · Instagram · Livraison · Conditions de vente · Mentions légales · ©). Colonnes « Explorer » (doublon du menu) et « Écrire à l'atelier » (doublon de l'e-mail) retirées. Contact page : carte plus inclinée (3,5°) et badge agrandi.

## 2026-10-30 — Audit webmaster (sécurité, visibilité, référencement, organisation)
- Corrigé : en-têtes de sécurité sur tout le site (X-Content-Type-Options, Referrer-Policy, X-Frame-Options SAMEORIGIN, Permissions-Policy) ; HTTPS strict (HSTS) déjà fourni par Vercel. Pas de CSP pour l'instant (Studio, Stripe, Formspree, Sanity, Unsplash : à faire en « report-only » d'abord).
- Corrigé : descriptions Google de 150 à 160 caractères (fiches : histoire résumée à un mot entier ; rubriques : texte de la rubrique ou phrase par défaut ; Contact).
- Vérifié : aucun lien interne cassé, un seul titre principal par page, toutes les images ont un texte alternatif, robots.txt et sitemap en place, données structurées (WebSite, VisualArtwork/Offer).
- À faire par Gwen/Adèle : DMARC absent (enregistrement _dmarc dans OVH) ; double authentification sur GitHub, Vercel, Sanity, Stripe, OVH ; médiateur de la consommation (obligatoire avant de vendre, CGV art. 9) ; nouveau SIRET ; fiche Google Business ; sauvegarde régulière de l'admin.
