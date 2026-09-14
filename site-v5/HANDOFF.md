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

### 1A — Logo / badge
Direction visuelle validée.
Signature exacte déjà présente dans le repo.
Ne pas régénérer ni redessiner le logo.

### 1B — Tableau d’accueil
Image dense générée et retrouvée dans la Library :
`Framed Moss Forest in Antique Gold.png`.

Statut : **validée visuellement, intégration binaire GitHub en attente**.

Le site affiche encore le placeholder distant actuel tant qu’un chemin de transfert binaire sûr n’est pas disponible.

### 1C — Le geste
Image générée et retrouvée dans la Library :
`Crafting a Gilded Mosswork мастерpiece.png`.

Statut : **validée visuellement, intégration binaire GitHub en attente**.

Le site affiche encore le placeholder distant actuel tant qu’un chemin de transfert binaire sûr n’est pas disponible.

### 1D — Intégration
Le commit `b29f65f` prétendait brancher les images validées, mais le fichier `assets/generated-images.js` contenait en réalité un message d’erreur de transfert de fichier.

Ce fichier a été neutralisé proprement dans `89bf073`.
Ne pas recommencer un transfert de plusieurs Mo via base64/chunks.

### 1E — Contrôle
- sortie nettoyée des phrases explicitement rejetées : `f185e74`
- orthographe textuelle de marque alignée sur **Adelem** : `ab56e93`
- prochain contrôle : preview réelle desktop/mobile après intégration binaire sûre des deux images

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

1. **Ne pas régénérer 1B ni 1C** : les deux images existent et ont été retrouvées
2. Trouver un chemin **binaire sûr** pour les intégrer au repo sans base64 massif
3. Brancher uniquement 1B et vérifier la preview
4. Brancher uniquement 1C et vérifier la preview
5. Faire le contrôle mobile/desktop
6. Continuer ensuite la homepage écran par écran
