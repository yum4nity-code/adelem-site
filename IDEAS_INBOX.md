# 📬 Boîte aux idées AdeleM

Cette page est la **boîte aux lettres commune du projet AdeleM**.

Elle permet à Adèle (ou à toute personne autorisée) de déposer une idée depuis son ChatGPT sans avoir besoin de connaître le code du site.

## Comment l'utiliser

Adèle peut simplement écrire dans son ChatGPT :

> **Ajoute à la boîte aux idées AdeleM : [mon idée]**

Si son ChatGPT est connecté à GitHub avec un accès en écriture au dépôt `yum4nity-code/adelem-site`, l'assistant doit **ajouter l'idée à la fin de ce fichier**, sans effacer ni réécrire les idées déjà présentes.

### Format obligatoire pour toute nouvelle idée

```md
## AAAA-MM-JJ — Titre court de l'idée

- **Auteur :** Adèle / autre
- **Statut :** À étudier
- **Idée :** description libre, fidèle à ce qui a été demandé
- **Contexte / intention :** facultatif
```

L'assistant qui reçoit l'idée ne doit pas la transformer en décision de design ou de développement. Son rôle est d'abord de **la déposer fidèlement ici**.

---

## Règles pour l'IA qui construit le site

Avant toute session de conception ou de modification significative du site :

1. **Lire ce fichier en entier.**
2. Repérer toutes les idées dont le statut est `À étudier`.
3. Les confronter à `docs/doctrine-adelem.md`, à `docs/decisions.md` et à l'état réel du site.
4. Ne pas considérer une idée comme validée simplement parce qu'elle est dans cette boîte.
5. Si une idée est retenue, documenter la décision dans `docs/decisions.md` puis mettre son statut ici à `Validée`, `Implémentée`, `Écartée` ou `À préciser`.
6. **Ne jamais supprimer une idée** : conserver l'historique et modifier uniquement son statut / ajouter une note de décision.

Cette boîte est volontairement séparée du journal des décisions :

- `IDEAS_INBOX.md` = **ce qu'Adèle imagine / demande / propose** ;
- `docs/decisions.md` = **ce qui a réellement été décidé pour le site**.

---

# Idées reçues

<!-- Les nouvelles idées doivent être ajoutées SOUS cette ligne, de la plus ancienne à la plus récente. -->
