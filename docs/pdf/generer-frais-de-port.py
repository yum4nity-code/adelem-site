import math
from reportlab.lib.pagesizes import A4, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
F='/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('S',F+'DejaVuSans.ttf')); pdfmetrics.registerFont(TTFont('SB',F+'DejaVuSans-Bold.ttf')); pdfmetrics.registerFont(TTFont('SI',F+'DejaVuSans-Oblique.ttf'))
VERT=colors.HexColor('#1B211B'); OR=colors.HexColor('#C9AF78'); CLAIR=colors.HexColor('#F3EFE6'); GRIS=colors.HexColor('#6B6B63'); EST=colors.HexColor('#FFF4D6')

# --- Données officielles Colissimo 2026 (laposte.fr/tarif-colissimo, domicile) ---
FR={5:17.39,10:25.29,15:31.99}; UE={5:28.59,10:46.99,15:67.99}; UK={5:32.59,10:50.99,15:71.99}; MC={5:78.69,10:148.99,15:210.79}
VOL_FR=6.0
# --- Hypothèses (estimations) ---
fmt=[('Petit',5,5.0,150),('Moyen',10,10.0,650),('Grand',15,18.0,700)]
ass=lambda v: 3+0.01*v
def e(x): return f"{x:,.2f} €".replace(',',' ').replace('.',',')
def e0(x): return f"{x:.0f} €"
cost={}
for n,kg,emb,val in fmt:
    a=ass(val)
    cost[n]={'FR':FR[kg]+(VOL_FR if n=='Grand' else 0)+emb+a,'UE':UE[kg]+emb+a,'UK':UK[kg]+emb+a,'MC':MC[kg]+emb+a,'emb':emb,'ass':a,'val':val,'kg':kg}
up5=lambda x: 5*math.ceil((x+2)/5)   # arrondi au 5 € supérieur, avec 2 € de marge minimum
grille={n:{'EU':up5(max(c['UE'],c['UK'])),'MC':up5(c['MC'])} for n,c in cost.items()}
grille['Grand']['MC']=None

st=lambda **k: ParagraphStyle('x',fontName=k.pop('f','S'),fontSize=k.pop('s',9),leading=k.pop('l',12),textColor=k.pop('c',colors.black),**k)
H1=st(f='SB',s=17,l=21,c=VERT); H2=st(f='SB',s=11.5,l=15,c=VERT,spaceBefore=8,spaceAfter=4); P=st(); Pi=st(f='SI',s=8,l=10.5,c=GRIS); C=st(s=8.6,l=11); CB=st(f='SB',s=8.6,l=11); CW=st(f='SB',s=8.6,l=11,c=colors.white)
def T(rows,widths,est_cells=(),bold_cols=(),total_row=None):
    data=[[Paragraph(str(x),CW if i==0 else (CB if j in bold_cols else C)) for j,x in enumerate(r)] for i,r in enumerate(rows)]
    t=Table(data,colWidths=[w*mm for w in widths],repeatRows=1)
    s=[('BACKGROUND',(0,0),(-1,0),VERT),('GRID',(0,0),(-1,-1),.4,colors.HexColor('#BDB8AA')),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
       ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,CLAIR]),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]
    for (c,r) in est_cells: s.append(('BACKGROUND',(c,r),(c,r),EST))
    if total_row is not None: s+= [('LINEABOVE',(0,total_row),(-1,total_row),1.2,VERT)]
    t.setStyle(TableStyle(s)); return t

story=[Paragraph('Adelem — Frais de port : récapitulatif chiffré',H1),
 Paragraph('29 septembre 2026 · Tarifs Colissimo 2026 à domicile (source officielle La Poste). Les cases <b>jaunes</b> sont des estimations, tout le reste est un tarif publié.',Pi),Spacer(1,6)]

story.append(Paragraph('1. Les formats d’envoi (calculés automatiquement à partir des dimensions et du poids saisis dans l’administration)',H2))
story.append(T([
 ['Format','Plus grand côté de la pièce','Largeur + hauteur + profondeur','Poids de la pièce','Colis estimé (pièce + 10 cm par dimension)','Tranche Colissimo','Exemples'],
 ['Petit','≤ 40 cm','—','≤ 4 kg','≤ 50 × 50 × 15 cm, ≤ 5 kg','5 kg','Sous-bois (34 × 30 × 4)'],
 ['Moyen','≤ 65 cm','≤ 120 cm','≤ 8 kg','somme ≤ 150 cm, ≤ 10 kg (taille normale)','10 kg','Clairière (50 × 60 × 7), Au vent (5 kg)'],
 ['Grand','≤ 90 cm','≤ 170 cm','≤ 12 kg','somme ≤ 200 cm, ≤ 15 kg (« volumineux »)','15 kg','Canopée (79 × 60 × 8), une pièce 70 × 90'],
 ['Hors format','> 90 cm','> 170 cm','> 12 kg','refusé par Colissimo (somme > 200 cm)','—','Envoi organisé avec l’atelier'],
],[24,33,36,27,62,24,62],est_cells=[(4,1),(4,2),(4,3)],bold_cols=(0,)))
story.append(Paragraph('Règle : la pièce prend le plus petit format dont elle respecte les trois limites (côté, somme, poids). Emballage estimé : +1 kg (petit), +2 kg (moyen), +3 kg (grand).',Pi))

story.append(Paragraph('2. Tarifs Colissimo 2026 officiels (domicile, hors emballage et assurance)',H2))
story.append(T([
 ['Tranche','France métropolitaine','Union européenne + Suisse','Royaume-Uni','Reste du monde (zone C)'],
 ['5 kg (Petit)',e(FR[5]),e(UE[5]),e(UK[5]),e(MC[5])],
 ['10 kg (Moyen)',e(FR[10]),e(UE[10]),e(UK[10]),e(MC[10])],
 ['15 kg (Grand)',e(FR[15])+' + 6,00 € volumineux',e(UE[15]),e(UK[15]),e(MC[15])],
],[40,62,58,50,58],bold_cols=(0,)))

story.append(PageBreak())
story.append(Paragraph('3. Coût réel estimé d’un envoi (Colissimo + emballage + assurance)',H2))
rows=[['Format','Emballage','Assurance (3 € + 1 % de la valeur)','France (payé par l’atelier)','UE + Suisse','Royaume-Uni','Reste du monde (zone C)']]
for n,c in cost.items():
    rows.append([n,e(c['emb']),f"{e(c['ass'])} (pièce à {c['val']} €)",e(c['FR']),e(c['UE']),e(c['UK']),e(c['MC'])])
story.append(T(rows,[22,24,52,46,36,36,46],est_cells=[(1,1),(1,2),(1,3),(2,1),(2,2),(2,3)]+[(k,r) for k in range(3,7) for r in (1,2,3)],bold_cols=(0,)))
story.append(Paragraph('Les totaux sont en jaune car ils incluent l’emballage et l’assurance estimés. L’assurance varie avec le prix de chaque pièce ; Colissimo n’assure pas au-delà de 1 000 € de valeur.',Pi))

story.append(Paragraph('4. Grille proposée — ce que paie l’acheteur',H2))
g=[['Format','France','Europe (UE, Suisse, Royaume-Uni)','Reste du monde','Coût réel couvert (Europe / Monde)']]
for n in ['Petit','Moyen','Grand']:
    c=cost[n]; mc=grille[n]['MC']
    g.append([n,'Offerte',e0(grille[n]['EU']),e0(mc) if mc else 'Sur devis',f"{e(max(c['UE'],c['UK']))} / {e(c['MC'])}"])
g.append(['Hors format','Sur devis','Sur devis','Sur devis','—'])
story.append(T(g,[26,30,62,40,90],bold_cols=(0,1,2,3)))
story.append(Paragraph('Montants arrondis aux 5 € supérieurs, avec au moins 2 € de marge sur le coût réel estimé du pays le plus cher de la zone. Grand format vers le reste du monde : sur devis (environ 240 € de coût réel).',Pi))

story.append(Paragraph('5. Ce que la livraison offerte en France coûte à l’atelier',H2))
ex=[['Pièce (exemple)','Prix','Format','Frais absorbés (estimés)','Part du prix']]
for t,p,n in [('Sous-bois',130,'Petit'),('Clairière',650,'Moyen'),('Canopée',690,'Grand')]:
    c=cost[n]['FR']-cost[n]['ass']+ass(p); ex.append([t,e0(p),n,e(c),f"{100*c/p:.0f} %"])
story.append(T(ex,[45,28,28,50,30],est_cells=[(3,1),(3,2),(3,3),(4,1),(4,2),(4,3)],bold_cols=(0,)))

story.append(Paragraph('6. Points à trancher',H2))
for s_ in ['<b>Petites pièces :</b> la livraison offerte coûte environ 20 % du prix d’une pièce à 130 €. Options : l’intégrer au prix, ou « livraison offerte en France dès 300 € ».',
           '<b>Pièces de plus de 1 000 € :</b> l’assurance Colissimo plafonne à 1 000 €. Options : devis, ou assurance spécialisée œuvres d’art.',
           '<b>À vérifier avant mise en ligne :</b> dimensions maximales Colissimo à l’international (non indiquées par La Poste). Si un grand colis est refusé dans certains pays, le grand format Europe passe sur devis.']:
    story.append(Paragraph('• '+s_,P)); story.append(Spacer(1,3))
story.append(Spacer(1,6))
story.append(Paragraph('Sources : laposte.fr/tarif-colissimo (tarifs 2026) · aide.laposte.fr (dimensions autorisées) · tarif-lettre.com/taille-colissimo (supplément volumineux 6 €) · tarif-lettre.com/colissimo-recommande (assurance, plafond 1 000 €).',Pi))

def pied(c,d):
    c.saveState(); c.setFont('S',7); c.setFillColor(GRIS); c.drawRightString(landscape(A4)[0]-14*mm,8*mm,f'Adelem · frais de port · page {d.page}'); c.restoreState()
doc=SimpleDocTemplate('/home/claude/adelem-site/docs/pdf/adelem-frais-de-port.pdf',pagesize=landscape(A4),leftMargin=14*mm,rightMargin=14*mm,topMargin=12*mm,bottomMargin=14*mm,title='Adelem — Frais de port',author='Adelem')
doc.build(story,onFirstPage=pied,onLaterPages=pied)
for n in grille: print(n,grille[n],{k:round(v,2) for k,v in cost[n].items() if k in('FR','UE','UK','MC')})
