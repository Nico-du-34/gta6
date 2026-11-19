"use client";
import {useEffect,useState} from "react";
import {Link,usePathname,useRouter} from "@/i18n/navigation";
import {useLocale,useTranslations} from "next-intl";
import {Menu,X,Globe,ArrowUpRight} from "lucide-react";
const locales=[["fr","FR"],["en","EN"],["es","ES"],["de","DE"],["it","IT"],["pt","PT"]];
export function SiteHeader(){
 const [open,setOpen]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const t=useTranslations("nav");
 const locale=useLocale();
 const pathname=usePathname();
 const router=useRouter();
 useEffect(()=>{
  const update=()=>setScrolled(window.scrollY>24);
  update();
  window.addEventListener("scroll",update,{passive:true});
  return()=>window.removeEventListener("scroll",update);
 },[]);
 return <header className={scrolled?"site-header is-scrolled":"site-header"}>
  <Link href="/" className="brand" onClick={()=>setOpen(false)}><span className="brand-symbol">VI</span><span className="brand-name">LEONIDA<small>COMMUNITY ARCHIVE</small></span></Link>
  <nav className={open?"nav nav-open":"nav"}>
   <Link href="/" onClick={()=>setOpen(false)}>{t("home")}</Link>
   <Link href="/blog" onClick={()=>setOpen(false)}>{t("news")}</Link>
   <Link href="/map" onClick={()=>setOpen(false)}>{t("map")}</Link>
   <a href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer" onClick={()=>setOpen(false)}>{t("community")} <ArrowUpRight size={13}/></a>
   <div className="language-switch"><Globe size={14}/><select aria-label="Language" value={locale} onChange={event=>{router.replace(pathname,{locale:event.target.value});setOpen(false);}}>{locales.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></div>
  </nav>
  <button className="mobile-menu" aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>{open?<X size={21}/>:<Menu size={21}/>}</button>
 </header>;
}