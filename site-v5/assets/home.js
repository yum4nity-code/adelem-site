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
