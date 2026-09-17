# AGENTS.md — protocole de reprise AdeleM

Ce fichier s'applique à toute personne, assistant IA ou agent de code qui intervient sur le dépôt AdeleM.

## Avant toute modification

Lire obligatoirement, dans cet ordre :

1. `README.md`
2. `docs/doctrine-adelem.md`
3. `docs/decisions.md`
4. **la boîte aux idées partagée AdeleM** : https://docs.google.com/document/d/1UTr09YCduog4OAU-dDFu3PGSWuql3Fs2i0i3iOqTCCU/edit
5. `IDEAS_INBOX.md` uniquement comme historique / secours local
6. vérifier l'état réel des fichiers concernés dans `site/`

## Boîte aux idées — règle obligatoire

La **source de vérité des idées entrantes** est désormais le Google Doc partagé :

**AdeleM — Boîte aux idées**  
https://docs.google.com/document/d/1UTr09YCduog4OAU-dDFu3PGSWuql3Fs2i0i3iOqTCCU/edit

Toute IA qui conçoit, modifie ou fait évoluer le site doit consulter cette boîte **avant une session significative de travail** et prendre connaissance de toutes les entrées `À étudier`.

Si l'IA n'a pas accès au document, elle ne doit pas l'ignorer silencieusement : elle doit signaler que l'accès à la boîte est manquant et demander l'accès ou le contenu avant de prendre une décision susceptible de contredire une idée récente d'Adèle.

Une entrée dans la boîte aux idées :

- n'est **pas** automatiquement une décision ;
- ne doit jamais être supprimée ;
- doit rester fidèle à l'intention exprimée par son auteur ;
- peut être marquée `Validée`, `Implémentée`, `Écartée` ou `À préciser` lorsqu'une décision est réellement prise ;
- si elle devient une décision structurante, celle-ci doit aussi être inscrite dans `docs/decisions.md`.

## Quand Adèle dépose une idée depuis ChatGPT

Si l'utilisateur demande d'ajouter une idée AdeleM et que l'assistant dispose d'un accès Google Drive en écriture au document partagé, il doit :

1. ouvrir **AdeleM — Boîte aux idées** ;
2. ajouter l'idée **à la fin du document** ;
3. ne jamais écraser, supprimer ni reformuler les entrées existantes ;
4. utiliser le format prévu dans le document ;
5. attribuer l'idée à `Adèle` sauf indication contraire ;
6. laisser le statut `À étudier` sauf si une décision explicite est prise au même moment ;
7. confirmer uniquement après que l'écriture a réellement réussi.

Le prompt d'initialisation à donner au ChatGPT d'Adèle est conservé dans `PROMPT_ADELE_CHATGPT.md`.

## Rôle de `IDEAS_INBOX.md`

`IDEAS_INBOX.md` reste dans le dépôt comme **historique / secours local**. Il n'est plus la boîte principale. Ne pas supposer qu'il contient les idées les plus récentes si le Google Doc partagé n'a pas été consulté.

## Discipline projet

- Respecter la doctrine AdeleM avant d'ajouter une fonctionnalité ou un effet visuel.
- Ne pas inventer de validation qui n'a pas eu lieu.
- Ne pas remplacer une décision existante par une interprétation implicite.
- Toute décision structurante doit rester traçable dans `docs/decisions.md`.
- La boîte aux idées sert à capter les intuitions rapidement sans les perdre et sans polluer le code ni les décisions validées.
