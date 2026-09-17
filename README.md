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

La boîte principale est désormais un **Google Doc partagé, séparé du dépôt GitHub**, afin qu'Adèle puisse y déposer une idée depuis son propre ChatGPT sans avoir à manipuler le code :

**AdeleM — Boîte aux idées**  
https://docs.google.com/document/d/1UTr09YCduog4OAU-dDFu3PGSWuql3Fs2i0i3iOqTCCU/edit

Adèle peut simplement dire à son ChatGPT :

> **« Ajoute à la boîte aux idées AdeleM : … »**

Son assistant doit ajouter l'idée à la fin du document avec la date, l'auteur `Adèle` et le statut `À étudier`, sans toucher aux idées précédentes.

Toute IA qui construit ou modifie le site doit **consulter cette boîte avant une session significative**. Les idées ne deviennent pas automatiquement des décisions : les décisions validées restent consignées dans `docs/decisions.md`.

`IDEAS_INBOX.md` reste présent comme historique / secours local, mais **le Google Doc partagé est la source de vérité pour les nouvelles idées**.

Le prompt d'initialisation à donner une fois au ChatGPT d'Adèle est dans `PROMPT_ADELE_CHATGPT.md`.

## Structure

- `AGENTS.md` — protocole obligatoire pour toute personne / IA qui intervient sur le projet
- `PROMPT_ADELE_CHATGPT.md` — prompt initial à coller dans le ChatGPT d'Adèle
- `IDEAS_INBOX.md` — historique / secours local de la boîte aux idées
- `site/` — version de travail du site
- `archive/` — versions historiques figées
- `docs/doctrine-adelem.md` — doctrine de marque et principes de conversion
- `docs/questionnaire.md` — questions envoyées à AdeleM
- `docs/decisions.md` — journal des décisions structurantes

## État actuel

La V2 parallax historique est conservée intacte dans `archive/v2-parallax.html`.

Une copie sert de point de départ dans `site/index.html`. La prochaine refonte de fond commencera après analyse des réponses au questionnaire AdeleM.
