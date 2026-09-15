(() => {
  if(!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // ADELEM_MOBILE_STATIC_FLOW: mobile uses a normal document flow for comfort and clarity.
  if(window.matchMedia('(max-width: 900px)').matches) return;

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){
    gsap.set([
      '.hero-portal-copy','.hero-round-badge','.hero-portal-cartel',
      '.material-reveal-copy','.material-reveal-index',
      '.gesture-sequence-summary','.viewing-room-intro',
      '.bespoke-heading','.bespoke-map','.bespoke-foot','.closing-badge'
    ],{clearProps:'all',autoAlpha:1});
    return;
  }

  const mm=gsap.matchMedia();

  mm.add('(min-width: 901px)',()=>{
    const hero=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{
        trigger:'.hero-portal',
        start:'top top',
        end:'bottom bottom',
        scrub:.65,
        invalidateOnRefresh:true
      }
    });
    hero
      .set('.hero-portal-media',{clipPath:'inset(0vh 0vw 0vh 0vw)'})
      .set('.hero-portal-image',{scale:1.82,xPercent:5})
      .set('.hero-portal-copy',{autoAlpha:0,y:34})
      .set('.hero-round-badge',{autoAlpha:0,scale:.86,rotate:-9})
      .set('.hero-portal-cartel',{autoAlpha:0})
      .to('.hero-portal-media',{clipPath:'inset(8vh 4.8vw 8vh 43vw)',duration:1},0)
      .to('.hero-portal-image',{scale:1.02,xPercent:0,duration:1},0)
      .to('.hero-portal-cue',{autoAlpha:0,duration:.16},0)
      .to('.hero-portal-copy',{autoAlpha:1,y:0,duration:.28},.38)
      .to('.hero-round-badge',{autoAlpha:.92,scale:1,rotate:-2,duration:.20},.66)
      .to('.hero-portal-cartel',{autoAlpha:1,duration:.16},.74);

    const material=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{
        trigger:'.material-reveal',
        start:'top top',
        end:'bottom bottom',
        scrub:.7,
        invalidateOnRefresh:true
      }
    });
    material
      .set('.material-reveal-media',{clipPath:'inset(0vh 0vw 0vh 0vw)'})
      .set('.material-reveal-media img',{scale:2.72,xPercent:0})
      .set('.material-reveal-copy',{autoAlpha:0,y:28})
      .set('.material-reveal-index',{autoAlpha:0})
      .to('.material-reveal-media',{clipPath:'inset(6vh 44vw 6vh 4vw)',duration:1},0)
      .to('.material-reveal-media img',{scale:1.68,xPercent:-4,duration:1},0)
      .to('.material-reveal-index',{autoAlpha:1,duration:.18},.22)
      .to('.material-reveal-copy',{autoAlpha:1,y:0,duration:.26},.56);

    const words=gsap.utils.toArray('.gesture-sequence-verbs span');
    const gesture=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{
        trigger:'.gesture-sequence',
        start:'top top',
        end:'bottom bottom',
        scrub:.5,
        invalidateOnRefresh:true
      }
    });
    gesture
      .set(words,{autoAlpha:0,y:22})
      .set('.gesture-sequence-summary',{autoAlpha:0,y:26})
      .fromTo('.gesture-sequence-image',{scale:1.10,xPercent:1},{scale:1.02,xPercent:-2.4,duration:1},0);

    const centers=[.06,.18,.30,.42,.54,.66];
    words.forEach((word,i)=>{
      gesture
        .to(word,{autoAlpha:1,y:0,duration:.055},centers[i])
        .to(word,{autoAlpha:0,y:-14,duration:.055},centers[i]+.075);
    });
    gesture.to('.gesture-sequence-summary',{autoAlpha:1,y:0,duration:.16},.78);

    const room=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{
        trigger:'.viewing-room',
        start:'top top',
        end:'bottom bottom',
        scrub:.65,
        invalidateOnRefresh:true,
        onUpdate:self=>{
          const p=self.progress;
          const active=p<.34?0:(p<.68?1:2);
          document.querySelectorAll('.viewing-room-modes span').forEach((el,i)=>{
            el.classList.toggle('active',i===active);
          });
        }
      }
    });
    room
      .set('.viewing-room-artwork',{xPercent:-50,yPercent:-50,x:'17vw',scale:.78})
      .set('.viewing-room-main',{scale:1,autoAlpha:1})
      .set('.viewing-room-alt',{scale:1.04,autoAlpha:0})
      .set('.viewing-room-intro',{autoAlpha:1,y:0})
      .to('.viewing-room-intro',{autoAlpha:0,y:-18,duration:.18},.16)
      .to('.viewing-room-artwork',{x:'0vw',scale:1,duration:.42},.12)
      .to('.viewing-room-main',{scale:1.16,duration:.42},.28)
      .to('.viewing-room-alt',{autoAlpha:1,duration:.16},.50)
      .to('.viewing-room-main',{autoAlpha:.08,duration:.16},.50)
      .to('.viewing-room-alt',{scale:1.30,xPercent:-4,duration:.38},.58);

    gsap.fromTo('.frames-image img',
      {scale:1.18,yPercent:-4},
      {
        scale:1.04,yPercent:4,ease:'none',
        scrollTrigger:{
          trigger:'.frames-story',
          start:'top bottom',
          end:'bottom top',
          scrub:.6
        }
      }
    );
    gsap.fromTo('.frames-copy > *',
      {autoAlpha:0,y:26},
      {
        autoAlpha:1,y:0,stagger:.08,duration:.5,
        scrollTrigger:{
          trigger:'.frames-copy',
          start:'top 72%',
          toggleActions:'play none none reverse'
        }
      }
    );

    const bespokeItems=gsap.utils.toArray('.bespoke-map li');
    const bespoke=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{
        trigger:'.bespoke-stage',
        start:'top top',
        end:'bottom bottom',
        scrub:.6,
        invalidateOnRefresh:true,
        onUpdate:self=>{
          const active=Math.min(3,Math.floor(self.progress*4));
          bespokeItems.forEach((el,i)=>el.classList.toggle('active',i===active));
        }
      }
    });
    bespoke
      .set('.bespoke-heading',{autoAlpha:1,y:0})
      .set('.bespoke-frame-ghost',{autoAlpha:.25,scale:1.30,rotate:.8})
      .set(bespokeItems,{x:22})
      .set('.bespoke-foot',{autoAlpha:0,y:18})
      .to('.bespoke-frame-ghost',{autoAlpha:.72,scale:.90,rotate:0,duration:.42},0)
      .to('.axis-x',{scaleX:1,duration:.28,transformOrigin:'left center'},.18)
      .to('.axis-y',{scaleY:1,duration:.28,transformOrigin:'center top'},.30);

    bespokeItems.forEach((item,i)=>{
      const pos=.16+i*.17;
      bespoke.to(item,{x:0,duration:.12},pos);
      if(i>0) bespoke.to(bespokeItems[i-1],{x:0,duration:.08},pos);
    });
    bespoke.to('.bespoke-foot',{autoAlpha:1,y:0,duration:.12},.82);

    gsap.fromTo('.closing-badge',
      {autoAlpha:0,scale:.76,rotate:-9},
      {
        autoAlpha:1,scale:1,rotate:0,duration:1.2,ease:'power2.out',
        scrollTrigger:{trigger:'.closing',start:'top 72%',toggleActions:'play none none reverse'}
      }
    );
    gsap.fromTo('.closing-facts',
      {autoAlpha:0,y:18},
      {
        autoAlpha:1,y:0,duration:.8,delay:.18,ease:'power2.out',
        scrollTrigger:{trigger:'.closing',start:'top 66%',toggleActions:'play none none reverse'}
      }
    );
  });

  mm.add('(max-width: 900px)',()=>{
    const hero=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{trigger:'.hero-portal',start:'top top',end:'bottom bottom',scrub:.6}
    });
    hero
      .set('.hero-portal-media',{clipPath:'inset(0)'})
      .set('.hero-portal-image',{scale:1.58,xPercent:2})
      .set('.hero-portal-copy',{autoAlpha:0,y:24})
      .set('.hero-round-badge',{autoAlpha:0,scale:.84,rotate:-8})
      .to('.hero-portal-media',{clipPath:'inset(8vh 5vw 35vh 5vw)',duration:1},0)
      .to('.hero-portal-image',{scale:1.02,duration:1},0)
      .to('.hero-portal-cue',{autoAlpha:0,duration:.15},0)
      .to('.hero-portal-copy',{autoAlpha:1,y:0,duration:.28},.48)
      .to('.hero-round-badge',{autoAlpha:.92,scale:1,rotate:-2,duration:.18},.66);

    const material=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{trigger:'.material-reveal',start:'top top',end:'bottom bottom',scrub:.65}
    });
    material
      .set('.material-reveal-media',{clipPath:'inset(0)'})
      .set('.material-reveal-media img',{scale:2.08})
      .set('.material-reveal-copy',{autoAlpha:0,y:24})
      .to('.material-reveal-media',{clipPath:'inset(0 0 38vh 0)',duration:1},0)
      .to('.material-reveal-media img',{scale:1.28,duration:1},0)
      .to('.material-reveal-index',{autoAlpha:1,duration:.18},.20)
      .to('.material-reveal-copy',{autoAlpha:1,y:0,duration:.22},.60);

    const words=gsap.utils.toArray('.gesture-sequence-verbs span');
    const gesture=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{trigger:'.gesture-sequence',start:'top top',end:'bottom bottom',scrub:.45}
    });
    gesture
      .set(words,{autoAlpha:0,y:18})
      .set('.gesture-sequence-summary',{autoAlpha:0,y:22})
      .fromTo('.gesture-sequence-image',{scale:1.08},{scale:1.01,duration:1},0);
    const centers=[.06,.18,.30,.42,.54,.66];
    words.forEach((word,i)=>{
      gesture
        .to(word,{autoAlpha:1,y:0,duration:.055},centers[i])
        .to(word,{autoAlpha:0,y:-10,duration:.055},centers[i]+.075);
    });
    gesture.to('.gesture-sequence-summary',{autoAlpha:1,y:0,duration:.16},.78);

    const room=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{
        trigger:'.viewing-room',
        start:'top top',
        end:'bottom bottom',
        scrub:.6,
        onUpdate:self=>{
          const p=self.progress;
          const active=p<.34?0:(p<.68?1:2);
          document.querySelectorAll('.viewing-room-modes span').forEach((el,i)=>{
            el.classList.toggle('active',i===active);
          });
        }
      }
    });
    room
      .set('.viewing-room-artwork',{xPercent:-50,yPercent:-50,x:0,scale:.92})
      .set('.viewing-room-main',{scale:1,autoAlpha:1})
      .set('.viewing-room-alt',{scale:1.04,autoAlpha:0})
      .to('.viewing-room-intro',{autoAlpha:0,y:-14,duration:.17},.15)
      .to('.viewing-room-artwork',{scale:1,duration:.34},.15)
      .to('.viewing-room-main',{scale:1.14,duration:.35},.31)
      .to('.viewing-room-alt',{autoAlpha:1,duration:.14},.51)
      .to('.viewing-room-main',{autoAlpha:.06,duration:.14},.51)
      .to('.viewing-room-alt',{scale:1.25,xPercent:-3,duration:.34},.60);

    const bespokeItems=gsap.utils.toArray('.bespoke-map li');
    const bespoke=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{
        trigger:'.bespoke-stage',
        start:'top top',
        end:'bottom bottom',
        scrub:.55,
        onUpdate:self=>{
          const active=Math.min(3,Math.floor(self.progress*4));
          bespokeItems.forEach((el,i)=>el.classList.toggle('active',i===active));
        }
      }
    });
    bespoke
      .set('.bespoke-frame-ghost',{autoAlpha:.22,scale:1.08})
      .set(bespokeItems,{x:14})
      .set('.bespoke-foot',{autoAlpha:0,y:14})
      .to('.bespoke-frame-ghost',{autoAlpha:.70,scale:.88,duration:.38},0);
    bespokeItems.forEach((item,i)=>{
      const pos=.18+i*.17;
      bespoke.to(item,{x:0,duration:.12},pos);
      if(i>0) bespoke.to(bespokeItems[i-1],{x:0,duration:.08},pos);
    });
    bespoke.to('.bespoke-foot',{autoAlpha:1,y:0,duration:.12},.82);

    gsap.fromTo('.closing-badge',
      {autoAlpha:0,scale:.82,rotate:-7},
      {autoAlpha:1,scale:1,rotate:0,duration:.9,ease:'power2.out',
       scrollTrigger:{trigger:'.closing',start:'top 78%',toggleActions:'play none none reverse'}}
    );
  });

  window.addEventListener('load',()=>ScrollTrigger.refresh());
})();