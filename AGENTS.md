# AGENTS.md — protocole de reprise AdeleM

Ce fichier s'applique à toute personne, assistant IA ou agent de code qui intervient sur le dépôt AdeleM.

## Avant toute modification

Lire obligatoirement, dans cet ordre :

1. `README.md`
2. `docs/doctrine-adelem.md`
3. `docs/decisions.md`
4. **`IDEAS_INBOX.md`**
5. vérifier l'état réel des fichiers concernés dans `site/`

## Boîte aux idées — règle obligatoire

`IDEAS_INBOX.md` est la boîte aux lettres commune d'Adèle et du projet.

Toute IA qui conçoit, modifie ou fait évoluer le site doit la lire avant une session significative et prendre connaissance de toutes les entrées `À étudier`.

Une entrée dans la boîte aux idées :

- n'est **pas** automatiquement une décision ;
- ne doit jamais être supprimée ;
- doit rester fidèle à l'intention exprimée par son auteur ;
- peut être marquée `Validée`, `Implémentée`, `Écartée` ou `À préciser` lorsqu'une décision est réellement prise ;
- si elle devient une décision structurante, celle-ci doit aussi être inscrite dans `docs/decisions.md`.

## Quand Adèle dépose une idée depuis ChatGPT

Si l'utilisateur demande d'ajouter une idée AdeleM et que l'assistant dispose d'un accès GitHub en écriture à `yum4nity-code/adelem-site`, il doit :

1. lire `IDEAS_INBOX.md` ;
2. ajouter l'idée **à la fin du fichier** ;
3. ne jamais écraser les entrées existantes ;
4. utiliser le format prévu dans le fichier ;
5. attribuer l'idée à Adèle sauf indication contraire ;
6. laisser le statut `À étudier` sauf si une décision explicite est prise au même moment.

## Discipline projet

- Respecter la doctrine AdeleM avant d'ajouter une fonctionnalité ou un effet visuel.
- Ne pas inventer de validation qui n'a pas eu lieu.
- Ne pas remplacer une décision existante par une interprétation implicite.
- Toute décision structurante doit rester traçable dans `docs/decisions.md`.
- La boîte aux idées sert à capter les intuitions rapidement sans les perdre et sans polluer le code ni les décisions validées.
