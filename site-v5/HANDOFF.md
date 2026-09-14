## V6 — expérience scroll chorégraphiée

Statut : **implémentée sur la homepage, QA desktop/mobile active**.

Moteur :
- GSAP + ScrollTrigger dans `assets/motion.js`
- `home.js` ne garde que les interactions ordinaires
- animations pilotées par le scroll, sans scroll forcé
- fallback `prefers-reduced-motion`

Séquences :
- hero : immersion matière → recul → révélation de l’œuvre → texte + sceau rond
- matière : macro → resserrement → texte
- geste : verbes successifs → preuve **8–10 jours**
- œuvres : Ensemble → Relief → Matière, avec deux visuels cohérents
- cadres : focus sur le cadre ancien
- sur mesure : contrainte de cadre + étapes progressives
- fin : logo rond officiel comme sceau final

Assets supplémentaires validés pour la maquette :
- `/Google Drive/Adelem-assets/adelem-gallery-angle.webp`
- `/Google Drive/Adelem-assets/adelem-gallery-room.webp`

Le wordmark et le badge rond officiels viennent des assets GitHub existants. Ne pas les régénérer.

QA :
- captures 25 / 50 / 75 / 90 % des principales séquences
- desktop + mobile
- dernier défaut mobile Sur mesure corrigé par composition horizontale `Sur mesure`

Vercel :
- `site-v5/vercel.json` est prêt et proxy les WebP Drive
- le connecteur Vercel renvoie actuellement des déploiements « créés » puis introuvables (404 / aucun projet listé)
- ne pas revenir à Netlify : crédits épuisés
- solution de déploiement à privilégier : import GitHub du repo dans Vercel, racine `site-v5`, si le connecteur direct reste incohérent


# HANDOFF — Adelem V5

## À lire AVANT de toucher au site

Commencer impérativement par :

`refonte:docs/synthese-questionnaire.md`

Ce document synthétise les réponses du questionnaire rempli par la mère de Gwen et constitue la source principale pour comprendre sa personnalité, son rapport à son travail, son positionnement, ce qu’elle veut éviter, sa vision artiste / artisane, ses œuvres, ses cadres anciens, ses sculptures, sa clientèle, les prix, le sur-mesure et le niveau de langage attendu.

Ne pas se contenter de `docs/questionnaire.md` sur `main` : ce fichier contient uniquement les 58 questions, pas les réponses.

Le site doit être cohérent avec la personne qui ressort du questionnaire, pas seulement avec une direction artistique abstraite.

## Nom de marque

La marque s’écrit désormais **Adelem**.

Le `m` final est minuscule.

Ne plus écrire `AdeleM`.

La signature graphique réelle doit toujours être utilisée lorsqu’on affiche la signature manuscrite. Ne jamais tenter de la redessiner ou de l’interpréter avec une autre typographie.

## Logo / badge

Base validée :
- signature manuscrite Adelem exacte
- m minuscule avec grande descendante
- cercle cuivre / rose poudré
- fond noir
- végétation sombre mais visible
- effet de profondeur dans les plantes
- composition végétale principalement sur le bord gauche et le bas
- centre suffisamment sombre pour conserver la lisibilité de la signature

Usages prévus : logo, site, étiquettes autocollantes, supports imprimés, cartes / packaging, réseaux sociaux.

Les assets de signature exacts déjà présents dans le repo sont dans :
`site/assets/logo/vector/`
et
`site/assets/logo/raster/`

Le nouveau master botanique enrichi validé dans la conversation source doit être repris comme prochain asset binaire si nécessaire. Ne jamais régénérer la signature : utiliser les assets GitHub exacts.

## Direction générale V5

La V4 reste intacte et disponible pendant la création de la V5.

La V5 doit sortir du rendu :
- marque déco premium générique
- landing page d’agence
- site qui explique constamment sa propre intention

Direction cible : **artiste / artisane + galerie contemporaine + matière réelle**.

Le visiteur doit ressentir Adelem avant de sentir le webdesign.

## Règle absolue

**Chaque écran doit pouvoir être screenshoté et avoir de la gueule tout seul.**

Mais cela ne signifie pas créer des espaces vides gratuitement ou des slogans artificiels. Chaque élément doit avoir une fonction.

## Langage éditorial

La mère de Gwen est intellectuellement fine. Le site doit lui faire confiance ainsi qu’au visiteur.

Éviter :
- slogans pseudo-profonds
- commentaires sur ce que le visiteur est censé ressentir
- brand content
- formules publicitaires génériques
- grands mots sur l’art

Titres privilégiés :
- Matière
- Le geste
- Œuvres
- Cadres anciens
- Sculptures
- Sur mesure
- Collections privées

Les textes doivent être simples, précis, sensibles, intelligents, courts et non prétentieux.

## Imagerie

Ne plus utiliser des images simplement parce qu’elles sont belles.

Le travail d’Adelem est dense. Ses tableaux ne sont pas trois fougères posées dans un cadre.

Les références visuelles doivent montrer :
- tableaux végétaux pleins
- compositions riches
- mousses
- lichens
- feuillages
- écorces
- relief important
- profondeur
- cadre réellement occupé par la matière
- vues trois-quarts
- macros
- mains travaillant une composition dense

Le geste doit montrer la fabrication d’une vraie œuvre dense, pas quelques fleurs dispersées sur une table.

## Typographie

La lisibilité prime.

La typographie doit être expressive, élégante et immédiatement lisible sur Android.

Tester notamment :
Matière, Œuvres, Collections privées, Le végétal autrement, œ, é, è, à, ç.

Pas de fonte spectaculaire illisible simplement pour donner un effet galerie.

## Storyboard homepage

1. Ouverture
2. Matière
3. Le geste
4. Œuvres
5. Cadres anciens
6. Sculptures
7. Sur mesure
8. Collections privées
9. Sortie

## Méthode de travail obligatoire

Travail en micro-étapes.

**Une micro-étape = un seul objectif visible.**

Ne jamais refaire plusieurs sections simultanément.

Format de suivi :
- étape active
- statut : à faire / en cours / fait / rejeté
- action exacte
- résultat
- prochaine étape

L’utilisateur veut pouvoir suivre très facilement l’avancement car les gros traitements simultanés ont provoqué trop de dérives.

## Board actuel

### Homepage — socle artistique
Statut : **reconstruite et contrôlée en desktop + mobile**.

Séquences actives :
- **Ouverture** : immersion dans la matière puis recul révélant l’œuvre encadrée
- **Matière** : macro tactile puis resserrement et apparition de l’explication
- **Le geste** : suite Chercher → Restaurer → Composer → Déplacer → Retirer → Recommencer, puis preuve factuelle des 8 à 10 jours possibles sur un grand format
- **Œuvres** : viewing room sombre, une pièce à la fois, lecture Ensemble → Relief → Matière
- **Cadres anciens** : cadre restauré présenté comme partie constitutive de l’œuvre
- **Sculptures** : traitement typographique abstrait, sans photo stock prétendant montrer le travail réel
- **Sur mesure** : méthode en quatre étapes, sans faux intérieur décoratif
- **Sortie** : signature Adelem exacte + faits, aucun CTA inventé

Principe de création consigné dans :
`docs/adelem-creative-persona.md`.

### Assets validés
Ne pas régénérer :
- `/Google Drive/Adelem-assets/adelem-hero.webp` — ~113 Ko
- `/Google Drive/Adelem-assets/adelem-geste.webp` — ~97 Ko

GitHub ne transporte pas ces binaires.
Le workflow QA les télécharge depuis Drive avant de lancer le site local.

**Interdit :** base64, fragmentation ou chunks GitHub pour ces images.

### QA visuelle
Le contrôle n’est plus dépendant d’un hébergeur.

Workflow :
`.github/workflows/adelem-visual-qa.yml`

Il :
1. récupère les deux WebP depuis Drive
2. lance `site-v5/` localement
3. capture automatiquement desktop et mobile
4. capture aussi plusieurs états intermédiaires des séquences scrollées

Dernier contrôle mobile : Œuvres, Cadres anciens, Sculptures / Sur mesure et sortie passent visuellement.

### Preview publique
La preview Netlify `adelem-v5-preview.netlify.app` existe mais **n’est plus la source de vérité** : le compte Netlify a refusé les nouveaux déploiements pour dépassement de crédits.

Le workflow Netlify a été supprimé pour éviter de continuer à consommer / échouer.

Tant qu’un nouvel hébergement public stable n’est pas validé :
- GitHub = code
- Google Drive = binaires validés
- GitHub Actions = QA visuelle réelle

### Étape active
**Construire la galerie / page Œuvres**.

La homepage crée le désir.
La galerie doit maintenant changer de régime : compréhension rapide, disponibilité, dimensions, matières, prix et acquisition.

Ne rien inventer : tant que les données réelles d’une œuvre manquent, utiliser un état explicitement incomplet plutôt qu’un faux prix ou une fausse disponibilité.

## Audit anti-générique

Pour chaque écran demander :

1. Peut-on remplacer Adelem par une autre marque sans que cela choque ?
2. Le texte explique-t-il trop ?
3. Le vide a-t-il une vraie fonction ?
4. L’image représente-t-elle réellement son travail ?
5. Est-ce immédiatement lisible sur téléphone ?
6. Le screenshot fonctionne-t-il seul ?

Si le premier point est oui, ou qu’un autre échoue clairement : l’écran doit être retravaillé.

## Homepage vs commerce

Homepage :

émotion → singularité → matière → geste → projection

Pas de prix sur la homepage.

Dans la galerie et les fiches œuvres :
- prix
- dimensions
- disponibilité
- matières
- relief
- livraison
- acquisition

Règle :

**mystère pour créer le désir, clarté pour conclure la vente**

## Ne pas refaire

Ont été explicitement rejetés :
- signature Adelem réinventée
- logo généré approximativement
- tableaux végétaux trop vides
- quelques fougères sur fond blanc
- Bodoni illisible
- hero trop sombre / funéraire
- grands espaces sans fonction
- watermark décoratif
- “Pas un catalogue”
- “Le cadre donne le ton”
- “Voir les œuvres. Parler d’un lieu. Entrer dans l’atelier.”
- “Découvrir l’univers Adelem”

## Priorité de reprise

1. Construire **Œuvres** comme vraie galerie marchande
2. Construire le gabarit **fiche œuvre**
3. Construire **Atelier / savoir-faire**
4. Construire **Sur mesure**
5. Rebrancher ensuite une preview publique stable
6. Ne rendre accessibles dans la navigation que les pages réellement terminées

## Déploiement V6
- 14/09/2026 : le repo est désormais relié à Vercel via le projet `adelem-site-prlz`.
- Cette modification sert aussi de déclencheur Git pour générer une preview de la branche `v5-homepage-art-direction`.
