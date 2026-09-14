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
  document.querySelectorAll(selector).forEach(img=>{
    const fallback=img.currentSrc||img.src;
    img.addEventListener('error',()=>{
      if(img.src!==fallback) img.src=fallback;
    },{once:true});
    img.src=url;
  });
}

const imageOverrides=window.ADELEM_IMAGE_OVERRIDES||{};
applyImageOverride('.hero-portal-image',imageOverrides.hero);
applyImageOverride('.material-reveal-media img',imageOverrides.hero);
applyImageOverride('.gesture-sequence-image',imageOverrides.gesture);
applyImageOverride('.viewing-room-main',imageOverrides.galleryAngle);
applyImageOverride('.viewing-room-alt',imageOverrides.galleryRoom);
applyImageOverride('.frames-image img',imageOverrides.galleryRoom);

// Header: present on entry, then only returns when the visitor intentionally scrolls upward.
const siteNav=document.querySelector('.site-nav');
let lastY=window.scrollY;
let navTicking=false;

function syncNavDirection(){
  if(!siteNav) return;
  const y=window.scrollY;
  const goingDown=y>lastY;
  siteNav.classList.toggle('nav-hidden',goingDown && y>140 && !menu?.classList.contains('open'));
  siteNav.classList.toggle('nav-scrolled',y>40);
  lastY=y;
}

window.addEventListener('scroll',()=>{
  if(navTicking) return;
  navTicking=true;
  requestAnimationFrame(()=>{
    syncNavDirection();
    navTicking=false;
  });
},{passive:true});
