"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
export function MotionReveals(){useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{gsap.utils.toArray<HTMLElement>(".intro-copy,.feature-card,.manifesto-content,.community-strip").forEach((el)=>gsap.fromTo(el,{y:42,opacity:0},{y:0,opacity:1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}));});return()=>ctx.revert();},[]);return null;}