# Extraction du site Lovable (adelem.fr) — 28/09/2026

Extraction faite depuis le site publié, faute d'accès au dépôt privé `yum4nity-code/adelem`.
Elle contient tout le contenu et la direction visuelle ; le code source React n'est pas inclus.

## Fichiers
| Fichier | Contenu |
| --- | --- |
| `content-fr.json` | Tous les textes FR du site (navigation, pages, formulaire, fiche œuvre, compte, commandes) |
| `artworks-config.json` | Les 6 œuvres de démonstration (titre, format, prix, statut…) et la configuration |
| `design-tokens.css` | Couleurs (OKLCH) et polices |

Les versions EN et 中文 existent dans le bundle mais ne sont pas extraites (décision : site en français).

## Pile technique Lovable
- React 19 + TanStack Router (rendu serveur), Tailwind, hébergé par Lovable
- Backend **Supabase (Lovable Cloud)**, projet `hvtdldhjowvsrkwvkkkq`
- Connexion Google via `oauth.lovable.app`
- Stripe chargé sur la fiche œuvre, parcours de paiement en **mode démonstration**

## Pages
`/`, `/galerie`, `/oeuvres/$id`, `/cadres-anciens`, `/sculptures`, `/sur-mesure`, `/oeuvres-installees`,
`/atelier`, `/savoir-faire`, `/professionnels`, `/collections`, `/contact`, `/merci`,
`/auth`, `/compte`, `/commandes` (espace privé).
Absentes : `/mentions-legales`, `/cgv`, `/sitemap.xml`.

## Données Supabase utilisées
| Table / bucket | Usage |
| --- | --- |
| `contact_requests` | Demandes du formulaire de contact (nom, e-mail, téléphone, message, œuvre, intention, cadre, dimensions, newsletter) |
| `contact_request_photos` + bucket `contact-photos` | Jusqu'à 5 photos jointes par demande |
| `newsletter_subscriptions` + RPC `subscribe_newsletter` | Inscriptions newsletter |
| `profiles` | Comptes clients (Google) |
| `orders` | Commandes (statuts : en attente → livrée / remboursée) |

**Aucune fonction d'envoi d'e-mail n'est appelée** : une demande de contact est enregistrée en base,
mais personne n'est prévenu. Les demandes éventuelles sont à consulter dans Lovable → Cloud → Database.

## Contenu à ne pas reprendre tel quel
- Les 6 œuvres sont fictives (« Fiche de démonstration », « Visuel d'exemple »).
- Images de démonstration : non réutilisées (décision : aucun visuel IA).
- `contact.successText` contient une note interne visible des visiteurs :
  « Ce délai peut être ajusté ici selon le rythme de l'atelier ».
- `contactStatus` : « Coordonnées en cours de validation ».
- « certificat d'authenticité inclus » affiché partout : à confirmer par Adèle.
