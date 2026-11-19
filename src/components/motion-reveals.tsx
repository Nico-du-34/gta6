"use client";
import {useEffect} from "react";
import {usePathname} from "@/i18n/navigation";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export function MotionReveals(){
 const pathname=usePathname();
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const context=gsap.context(()=>{
   if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
   const heroItems=gsap.utils.toArray<HTMLElement>('[data-reveal="hero"]');
   if(heroItems.length){
    const intro=gsap.timeline({defaults:{ease:"power4.out"}});
    intro.fromTo(heroItems[0],{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.65},.18);
    intro.fromTo(heroItems[1],{autoAlpha:0,y:22},{autoAlpha:1,y:0,duration:.72},.3);
    intro.fromTo(heroItems[2],{autoAlpha:0,yPercent:48,clipPath:"inset(0 0 100% 0)"},{autoAlpha:1,yPercent:0,clipPath:"inset(0 0 0% 0)",duration:1.05},.42);
    intro.fromTo(heroItems[3],{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.7},.7);
    intro.fromTo(heroItems[4],{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.65},.82);
   }
   const revealTargets=[
    ...gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-reveal="hero"])'),
    ...gsap.utils.toArray<HTMLElement>(".subpage-inner > .eyebrow, .subpage-inner > h1, .subpage-inner > .subpage-lead"),
    ...gsap.utils.toArray<HTMLElement>(".blog-story, .atlas-map-panel, .atlas-sidebar, .atlas-sources"),
    ...gsap.utils.toArray<HTMLElement>(".legal-page > *")
   ];
   revealTargets.forEach((element,index)=>{
    const isCard=element.matches('[data-reveal="card"],.blog-story');
    gsap.fromTo(element,
     {autoAlpha:0,y:isCard?32:23,clipPath:isCard?"inset(0 0 6% 0)":"inset(0 0 0 0)"},
     {autoAlpha:1,y:0,clipPath:"inset(0 0 0 0)",duration:isCard?.88:.72,ease:"power3.out",delay:isCard?(index%3)*.065:0,
      scrollTrigger:{trigger:element,start:"top 88%",once:true}}
    );
   });
   const backdrop=document.querySelector<HTMLElement>(".hero-backdrop");
   if(backdrop){
    gsap.to(backdrop,{yPercent:8,scale:1.1,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:.7}});
   }
   gsap.utils.toArray<HTMLElement>(".feature-card").forEach(card=>{
    const image=card.querySelector<HTMLElement>(".feature-image");
    if(image)gsap.to(image,{yPercent:-4,ease:"none",scrollTrigger:{trigger:card,start:"top bottom",end:"bottom top",scrub:.55}});
   });
  });
  return()=>{context.revert();ScrollTrigger.refresh();};
 },[pathname]);
 return null;
}