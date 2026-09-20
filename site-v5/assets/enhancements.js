(()=>{const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const open=document.querySelector('.menu-btn'),close=document.querySelector('.menu-close'),panel=document.querySelector('.menu-panel');
open?.setAttribute('aria-expanded','false');
open?.addEventListener('click',()=>{open.setAttribute('aria-expanded','true');setTimeout(()=>close?.focus(),reduce?0:420)});
close?.addEventListener('click',()=>{open?.setAttribute('aria-expanded','false');setTimeout(()=>open?.focus(),0)});
panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>open?.setAttribute('aria-expanded','false')));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel?.classList.contains('open'))open?.setAttribute('aria-expanded','false')});
const revealTargets=document.querySelectorAll('.monumental-coming figure,.product-story figure,.slow-section figure,.editorial-media,.installed-card figure');
revealTargets.forEach(el=>el.classList.add('image-reveal'));
if(reduce){revealTargets.forEach(el=>el.classList.add('is-revealed'))}else{
 const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');io.unobserve(entry.target)}}),{threshold:.14,rootMargin:'0px 0px -7%'});
 revealTargets.forEach(el=>io.observe(el));
}
const tabs=[...document.querySelectorAll('[data-view-tab]')],panels=[...document.querySelectorAll('[data-view-panel]')];
function selectView(name,focus=false){tabs.forEach(tab=>{const active=tab.dataset.viewTab===name;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus()});panels.forEach(p=>{const active=p.dataset.viewPanel===name;p.hidden=!active;p.classList.toggle('active',active)})}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectView(tab.dataset.viewTab));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let next=e.key==='Home'?0:e.key==='End'?tabs.length-1:e.key==='ArrowRight'?(index+1)%tabs.length:(index-1+tabs.length)%tabs.length;selectView(tabs[next].dataset.viewTab,true)})});
const bridges=document.querySelectorAll('.page-bridge');
if(reduce){bridges.forEach(el=>el.classList.add('bridge-visible'))}else{const bo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('bridge-visible');bo.unobserve(e.target)}}),{threshold:.08});bridges.forEach(el=>bo.observe(el))}
if(document.body.matches('.product-page,.catalogue-page')){const bar=document.createElement('div');bar.className='reading-progress';bar.setAttribute('aria-hidden','true');bar.innerHTML='<i></i>';document.body.append(bar);let ticking=false;addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--reading-progress',max>0?Math.min(scrollY/max,1):0);ticking=false})},{passive:true})}
})();