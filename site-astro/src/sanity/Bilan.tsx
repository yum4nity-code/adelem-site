// « Bilan des ventes » dans l'admin (2026-11-02, Gwen) : valeur des pièces en vente et des pièces vendues,
// calculée en direct à partir des œuvres publiées. Prix « sur le site » = prix d'Adèle + envoi en France (prix-envoi.ts).
import { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { prixAffiche } from '../data/prix-envoi';

type Piece = { _id: string; titre: string; statut?: string; prix?: number; poids_kg?: number; largeur_cm?: number; hauteur_cm?: number };

const QUERY = `*[_type == "oeuvre" && defined(titre) && !(_id in path("drafts.**"))] | order(titre asc) {
  _id, titre, statut, prix, poids_kg, largeur_cm, hauteur_cm }`;

const euros = (n: number) => n.toLocaleString('fr-FR') + ' €';

export function Bilan() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [pieces, setPieces] = useState<Piece[] | null>(null);
  const [erreur, setErreur] = useState('');
  useEffect(() => {
    client.fetch<Piece[]>(QUERY).then(setPieces).catch((e) => setErreur(String(e)));
  }, [client]);

  if (erreur) return <p style={{ padding: 24 }}>Impossible de charger les œuvres : {erreur}</p>;
  if (!pieces) return <p style={{ padding: 24 }}>Chargement…</p>;

  const site = (p: Piece) => prixAffiche(p.prix, p.poids_kg, p.largeur_cm, p.hauteur_cm) ?? 0;
  const groupe = (statuts: string[]) => {
    const liste = pieces.filter((p) => statuts.includes(p.statut ?? 'disponible'));
    const avecPrix = liste.filter((p) => p.prix && p.prix > 0);
    return {
      liste,
      site: avecPrix.reduce((s, p) => s + site(p), 0),
      atelier: avecPrix.reduce((s, p) => s + (p.prix ?? 0), 0),
      sansPrix: liste.length - avecPrix.length,
    };
  };
  const enVente = groupe(['disponible', 'reservee']);
  const vendues = groupe(['vendue']);

  const carte = (titre: string, g: ReturnType<typeof groupe>, note: string) => (
    <div style={{ border: '1px solid rgba(128,128,128,.3)', borderRadius: 6, padding: 20, display: 'grid', gap: 6 }}>
      <div style={{ fontSize: 13, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '.08em' }}>{titre}</div>
      <div style={{ fontSize: 32, fontWeight: 600 }}>{euros(g.site)}</div>
      <div style={{ fontSize: 14 }}>{g.liste.length} pièce{g.liste.length > 1 ? 's' : ''} · votre prix (hors envoi) : {euros(g.atelier)}</div>
      {g.sansPrix > 0 && <div style={{ fontSize: 13, opacity: 0.7 }}>{g.sansPrix} sans prix, non comptée{g.sansPrix > 1 ? 's' : ''}</div>}
      <div style={{ fontSize: 12, opacity: 0.6 }}>{note}</div>
    </div>
  );

  const ligne = (p: Piece) => (
    <tr key={p._id}>
      <td style={{ padding: '6px 12px 6px 0' }}>{p.titre}</td>
      <td style={{ padding: '6px 12px', opacity: 0.75 }}>{p.statut === 'vendue' ? 'Vendue' : p.statut === 'reservee' ? 'Réservée' : 'Disponible'}</td>
      <td style={{ padding: '6px 12px', textAlign: 'right' }}>{p.prix ? euros(p.prix) : '—'}</td>
      <td style={{ padding: '6px 0 6px 12px', textAlign: 'right', fontWeight: 600 }}>{p.prix ? euros(site(p)) : '—'}</td>
    </tr>
  );

  return (
    <div style={{ padding: 24, display: 'grid', gap: 24, maxWidth: 900 }}>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {carte('En vente', enVente, 'Pièces disponibles ou réservées, au prix affiché sur le site (envoi en France compris).')}
        {carte('Vendues', vendues, 'Au prix actuellement saisi : si un prix a changé depuis la vente, le montant réel peut différer (voir Stripe).')}
      </div>
      <table style={{ borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ textAlign: 'left', opacity: 0.6, fontSize: 12 }}>
            <th style={{ padding: '6px 12px 6px 0' }}>Pièce</th>
            <th style={{ padding: '6px 12px' }}>Statut</th>
            <th style={{ padding: '6px 12px', textAlign: 'right' }}>Votre prix</th>
            <th style={{ padding: '6px 0 6px 12px', textAlign: 'right' }}>Sur le site</th>
          </tr>
        </thead>
        <tbody>{[...enVente.liste, ...vendues.liste].map(ligne)}</tbody>
      </table>
    </div>
  );
}
