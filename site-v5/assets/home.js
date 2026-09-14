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
applyImageOverride('.gesture-sequence-image',imageOverrides.gesture);


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


const gestureSequence=document.querySelector('.gesture-sequence');
const gestureStage=document.querySelector('.gesture-sequence-stage');
const gestureWords=[...document.querySelectorAll('.gesture-sequence-verbs span')];

function syncGestureSequence(){
  if(!gestureSequence||!gestureStage) return;
  const travel=Math.max(1,gestureSequence.offsetHeight-window.innerHeight);
  const p=clamp01(-gestureSequence.getBoundingClientRect().top/travel);
  const centers=[.10,.22,.34,.46,.58,.70];

  gestureWords.forEach(function(word,index){
    const distance=Math.abs(p-centers[index]);
    const opacity=clamp01(1-distance/.085);
    word.style.opacity=opacity.toFixed(4);
    word.style.transform='translateY('+((1-opacity)*24).toFixed(1)+'px)';
  });

  const summary=clamp01((p-.76)/.18);
  gestureStage.style.setProperty('--gesture-summary-o',summary.toFixed(4));
  gestureStage.style.setProperty('--gesture-summary-y',((1-summary)*28).toFixed(1)+'px');
  gestureStage.style.setProperty('--gesture-scale',(1.08-.055*p).toFixed(4));
  gestureStage.style.setProperty('--gesture-x',(-2.6*p).toFixed(2)+'%');
}

let gestureTicking=false;
function requestGestureSync(){
  if(gestureTicking) return;
  gestureTicking=true;
  requestAnimationFrame(function(){
    syncGestureSequence();
    gestureTicking=false;
  });
}

syncGestureSequence();
window.addEventListener('scroll',requestGestureSync,{passive:true});
window.addEventListener('resize',requestGestureSync,{passive:true});


const viewingRoom=document.querySelector('.viewing-room');
const viewingStage=document.querySelector('.viewing-room-stage');
const viewingModes=[...document.querySelectorAll('.viewing-room-modes span')];

function syncViewingRoom(){
  if(!viewingRoom||!viewingStage) return;
  const travel=Math.max(1,viewingRoom.offsetHeight-window.innerHeight);
  const p=clamp01(-viewingRoom.getBoundingClientRect().top/travel);
  const intro=1-clamp01((p-.18)/.18);
  const focus=clamp01(p/.62);
  const detail=clamp01((p-.34)/.58);

  viewingStage.style.setProperty('--works-title-o',intro.toFixed(4));
  viewingStage.style.setProperty('--works-title-y',((1-intro)*-18).toFixed(1)+'px');

  if(window.innerWidth<=900){
    viewingStage.style.setProperty('--works-outer',(.92+.08*focus).toFixed(4));
    viewingStage.style.setProperty('--works-detail',(1+.40*detail).toFixed(4));
  }else{
    viewingStage.style.setProperty('--works-x',(17*(1-focus)).toFixed(2)+'vw');
    viewingStage.style.setProperty('--works-outer',(.78+.22*focus).toFixed(4));
    viewingStage.style.setProperty('--works-detail',(1+.48*detail).toFixed(4));
  }

  const active=p<.34?0:(p<.68?1:2);
  viewingModes.forEach(function(mode,index){
    mode.classList.toggle('active',index===active);
  });
}

let worksTicking=false;
function requestWorksSync(){
  if(worksTicking) return;
  worksTicking=true;
  requestAnimationFrame(function(){
    syncViewingRoom();
    worksTicking=false;
  });
}

syncViewingRoom();
window.addEventListener('scroll',requestWorksSync,{passive:true});
window.addEventListener('resize',requestWorksSync,{passive:true});
