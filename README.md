# AdeleM — site officiel

Projet du site AdeleM, marque de créations végétales et sculpturales réalisées à la main.

> Toute personne ou IA qui intervient sur le site doit lire `AGENTS.md` avant de modifier le projet.

## Vision

Le site n'est ni une simple vitrine ni une boutique e-commerce classique. Il doit fonctionner comme une **galerie marchande hybride haut de gamme** : le visiteur ressent d'abord l'œuvre, comprend ensuite sa valeur, puis peut acheter simplement et sans friction.

Parcours recherché :

**désir → compréhension → confiance → projection → prix → achat**

## Principes

- Positionner AdeleM comme une signature, pas comme une boutique de décoration végétale générique
- Assumer l'identité « artiste-artisane »
- Valoriser la matière, le relief, le geste manuel et l'atelier
- Faire une place réelle aux sculptures
- Présenter clairement les prix
- Conserver un contact humain pour les œuvres importantes et le sur-mesure
- Ne pas utiliser de promotions artificielles
- Garder les œuvres vendues dans des archives pour construire un corpus
- Utiliser les formats comme une vraie architecture de gamme
- Homepage lente, immersive et émotionnelle
- Parcours d'achat rapide, clair et rassurant
- Aucun point final dans les titres

## 📬 Boîte aux idées d'Adèle

Le fichier **`IDEAS_INBOX.md`** est la boîte aux lettres commune du projet.

Adèle peut simplement dire à son ChatGPT :

> **« Ajoute à la boîte aux idées AdeleM : … »**

Si son ChatGPT est connecté à GitHub avec un accès en écriture à ce dépôt, l'idée doit être ajoutée à la fin de `IDEAS_INBOX.md` avec la date, l'auteur et le statut `À étudier`.

Toute IA qui construit ou modifie le site doit **lire cette boîte avant une session significative**. Les idées ne deviennent pas automatiquement des décisions : les décisions validées restent consignées dans `docs/decisions.md`.

## Structure

- `AGENTS.md` — protocole obligatoire pour toute personne / IA qui intervient sur le projet
- `IDEAS_INBOX.md` — boîte aux idées d'Adèle et du projet
- `site/` — version de travail du site
- `archive/` — versions historiques figées
- `docs/doctrine-adelem.md` — doctrine de marque et principes de conversion
- `docs/questionnaire.md` — questions envoyées à AdeleM
- `docs/decisions.md` — journal des décisions structurantes

## État actuel

La V2 parallax historique est conservée intacte dans `archive/v2-parallax.html`.

Une copie sert de point de départ dans `site/index.html`. La prochaine refonte de fond commencera après analyse des réponses au questionnaire AdeleM.
