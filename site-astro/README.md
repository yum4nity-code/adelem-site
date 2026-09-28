# Adelem — nouveau site (Astro)

Site statique, sans dépendance à Lovable. Contenu et design repris de l'ancien site (voir `../docs/lovable-extract/`).

## Commandes (PowerShell, dans ce dossier)
```powershell
npm install
npm run dev      # aperçu local sur http://localhost:4321
npm run build    # génère le site dans dist/
```

## Ajouter une œuvre
1. Copier `src/content/oeuvres/_modele.json` en `src/content/oeuvres/<identifiant>.json` (ex. `canopee.json`) et le remplir.
2. Mettre les photos dans `public/oeuvres/<identifiant>/` avec les noms indiqués dans le fichier.
3. L'œuvre apparaît automatiquement dans la galerie, sa page et le sitemap.

## Avant la mise en ligne
- `src/data/site.ts` : e-mail, téléphone, adresse, TVA, hébergeur, médiateur, point d'envoi du formulaire.
- `src/pages/cgv.astro` : remplacer les passages surlignés, puis retirer `/cgv` et `/mentions-legales` du filtre sitemap dans `astro.config.mjs`.
