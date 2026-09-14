const menu=document.querySelector('.menu-panel');
const openBtn=document.querySelector('.menu-btn');
const closeBtn=document.querySelector('.menu-close');

function setMenu(open){
  if(!menu) return;
  menu.classList.toggle('open',open);
  menu.setAttribute('aria-hidden',open?'false':'true');
  document.body.style.overflow=open?'hidden':'';
}

openBtn?.addEventListener('click',()=>setMenu(true));
closeBtn?.addEventListener('click',()=>setMenu(false));
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape') setMenu(false)});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.14});

document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));


function applyImageOverride(selector,url){
  if(!url) return;
  const img=document.querySelector(selector);
  if(!img) return;
  const fallback=img.currentSrc||img.src;
  img.addEventListener('error',()=>{
    if(img.src!==fallback) img.src=fallback;
  },{once:true});
  img.src=url;
}

const imageOverrides=window.ADELEM_IMAGE_OVERRIDES||{};
applyImageOverride('.hero-portal-image',imageOverrides.hero);
applyImageOverride('.gesture-photo img',imageOverrides.gesture);


const heroPortal=document.querySelector('.hero-portal');
const heroStage=document.querySelector('.hero-portal-stage');

function clamp01(value){
  return Math.min(1,Math.max(0,value));
}

function syncHeroPortal(){
  if(!heroPortal||!heroStage) return;
  const travel=Math.max(1,heroPortal.offsetHeight-window.innerHeight);
  const p=clamp01(-heroPortal.getBoundingClientRect().top/travel);
  const copy=clamp01((p-.40)/.30);
  const cartel=clamp01((p-.68)/.22);
  const cue=1-clamp01(p/.30);
  const veil=.24*(1-clamp01(p/.62));

  heroStage.style.setProperty('--hero-tx',(19*p).toFixed(2)+'vw');
  heroStage.style.setProperty('--hero-sx',(1-.41*p).toFixed(4));
  heroStage.style.setProperty('--hero-sy',(1-.16*p).toFixed(4));
  heroStage.style.setProperty('--hero-ty',(6.3*p).toFixed(2)+'vh');
  heroStage.style.setProperty('--hero-msx',(1-.08*p).toFixed(4));
  heroStage.style.setProperty('--hero-msy',(1-.42*p).toFixed(4));
  heroStage.style.setProperty('--hero-img-scale',(1.18-.18*p).toFixed(4));
  heroStage.style.setProperty('--hero-copy-o',copy.toFixed(4));
  heroStage.style.setProperty('--hero-copy-y',(34*(1-copy)).toFixed(1)+'px');
  heroStage.style.setProperty('--hero-cartel-o',cartel.toFixed(4));
  heroStage.style.setProperty('--hero-cue-o',cue.toFixed(4));
  heroStage.style.setProperty('--hero-veil-o',veil.toFixed(4));
}

let heroTicking=false;
function requestHeroSync(){
  if(heroTicking) return;
  heroTicking=true;
  requestAnimationFrame(function(){
    syncHeroPortal();
    heroTicking=false;
  });
}

syncHeroPortal();
window.addEventListener('scroll',requestHeroSync,{passive:true});
window.addEventListener('resize',requestHeroSync,{passive:true});


const materialReveal=document.querySelector('.material-reveal');
const materialStage=document.querySelector('.material-reveal-stage');

function syncMaterialReveal(){
  if(!materialReveal||!materialStage) return;
  const travel=Math.max(1,materialReveal.offsetHeight-window.innerHeight);
  const p=clamp01(-materialReveal.getBoundingClientRect().top/travel);
  const geometry=clamp01(p/.74);
  const copy=clamp01((p-.46)/.24);
  const index=clamp01((p-.22)/.34);

  if(window.innerWidth<=900){
    materialStage.style.setProperty('--mat-b',(44*geometry).toFixed(2)+'vh');
    materialStage.style.setProperty('--mat-scale',(1.68-.54*geometry).toFixed(4));
    materialStage.style.setProperty('--mat-copy-o',copy.toFixed(4));
    materialStage.style.setProperty('--mat-copy-y',(28*(1-copy)).toFixed(1)+'px');
    materialStage.style.setProperty('--mat-index-o',index.toFixed(4));
    return;
  }

  materialStage.style.setProperty('--mat-r',(43*geometry).toFixed(2)+'vw');
  materialStage.style.setProperty('--mat-l',(3.6*geometry).toFixed(2)+'vw');
  materialStage.style.setProperty('--mat-t',(5.5*geometry).toFixed(2)+'vh');
  materialStage.style.setProperty('--mat-b',(5.5*geometry).toFixed(2)+'vh');
  materialStage.style.setProperty('--mat-scale',(1.68-.54*geometry).toFixed(4));
  materialStage.style.setProperty('--mat-x',(8+24*geometry).toFixed(2)+'%');
  materialStage.style.setProperty('--mat-copy-o',copy.toFixed(4));
  materialStage.style.setProperty('--mat-copy-y',(28*(1-copy)).toFixed(1)+'px');
  materialStage.style.setProperty('--mat-index-o',index.toFixed(4));
}

let materialTicking=false;
function requestMaterialSync(){
  if(materialTicking) return;
  materialTicking=true;
  requestAnimationFrame(function(){
    syncMaterialReveal();
    materialTicking=false;
  });
}

syncMaterialReveal();
window.addEventListener('scroll',requestMaterialSync,{passive:true});
window.addEventListener('resize',requestMaterialSync,{passive:true});
