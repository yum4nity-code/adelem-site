// Champ « Prix » de l'admin : sous le prix saisi par Adèle, le prix qui sera affiché sur le site (envoi inclus).
import { useFormValue, type NumberInputProps } from 'sanity';
import { ajoutEnvoi, poidsEstime, prixAffiche } from '../data/prix-envoi';

export function PrixInput(props: NumberInputProps) {
  const prix = props.value as number | undefined;
  const poids = useFormValue(['poids_kg']) as number | undefined;
  const l = useFormValue(['largeur_cm']) as number | undefined;
  const h = useFormValue(['hauteur_cm']) as number | undefined;
  const affiche = prixAffiche(prix, poids, l, h);
  const base = poids && poids > 0 ? `${poids} kg emballé` : `poids estimé ${poidsEstime(l, h)} kg, à préciser plus bas`;
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {props.renderDefault(props)}
      {affiche && (
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, opacity: 0.75 }}>
          Prix affiché sur le site : <strong>{affiche} €</strong> (votre prix + {ajoutEnvoi(poids, l, h)} € d’envoi en France, {base}, arrondi au 5 € supérieur).
        </p>
      )}
    </div>
  );
}
