# Réglages Stripe pour les boutons « Acquérir »

À faire une fois dans le tableau de bord Stripe, puis pour chaque pièce. Aucun code à écrire : le site affiche le bouton dès qu'un lien est collé dans l'administration (champ « Lien de paiement »).

## Une fois pour tout le compte

1. **Apparence** (Paramètres › Image de marque) : logo Adelem, couleur de fond `#1B211B`, couleur d'accent `#C9AF78`.
2. **Moyens de paiement** (Paramètres › Moyens de paiement) : carte bancaire, Apple Pay, Google Pay, PayPal, Klarna (paiement en 3 fois). Vérifier que le paiement en 3 fois est bien proposé en France au moment de l'activation.
3. **Conditions générales** (Paramètres › Public details) : lien vers `https://adelem.fr/cgv`.
4. **Reçus** (Paramètres › E-mails clients) : activer l'envoi du reçu après paiement.
5. **Factures** : activer la facture après paiement, avec la mention « TVA non applicable, art. 293 B du CGI ».
6. **Tarifs de livraison** (Produits › Tarifs de livraison) : un tarif par zone (France, Europe, reste du monde). Pour chaque pièce, partir de son poids (champ « Poids » de l'administration) et de ses dimensions.

## Pour chaque pièce (Payment Link)

1. Créer un produit : titre de la pièce, prix, une photo.
2. Créer un lien de paiement pour ce produit, avec :
   - **Quantité fixe à 1** ;
   - **Limiter le nombre de paiements à 1** : la pièce est unique, le lien se désactive après la vente ;
   - **Adresse de livraison obligatoire**, et les tarifs de livraison de la pièce ;
   - **Acceptation des CGV obligatoire** ;
   - **Codes promo désactivés** ;
   - **Après le paiement** : rediriger vers `https://adelem.fr/merci-achat` ;
   - pour l'Herbier : un **champ personnalisé** « Message pour un cadeau (facultatif) ».
3. Coller le lien dans le champ « Lien de paiement » de la pièce dans l'administration. Remplir aussi « Livraison en France » pour afficher ce tarif sur la fiche.

## Après une vente

Passer la pièce en « Vendue » dans l'administration : la fiche affiche « Collection privée » et propose d'être prévenu des prochaines pièces.
