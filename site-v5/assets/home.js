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
applyImageOverride('.hero-artwork img',imageOverrides.hero);
applyImageOverride('.gesture-photo img',imageOverrides.gesture);
