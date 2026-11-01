// Aperçu de partage (WhatsApp, Messages…) : pour une pièce nettement verticale qui a au moins deux photos,
// une image composée « vue de face + gros plan » remplit mieux le format très horizontal des aperçus (1200 × 630).
type Donnees = { hauteur_cm: number; largeur_cm: number; photos: { src: string }[] };
export const apercuCompose = (d: Donnees) => d.hauteur_cm / d.largeur_cm >= 1.15 && d.photos.length >= 2;
