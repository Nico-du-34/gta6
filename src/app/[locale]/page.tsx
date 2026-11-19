import {getTranslations} from "next-intl/server";
import {ArrowDown,ArrowUpRight,Map,Newspaper,Users,Compass} from "lucide-react";
import Link from "next/link";
const image=(id:string,w=2200)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
export default async function Home(){
 const t=await getTranslations();
 return <div className="home">
  <section className="hero">
   <div className="hero-backdrop" style={{backgroundImage:`linear-gradient(90deg,rgba(5,8,9,.79),rgba(5,8,9,.17) 70%),linear-gradient(0deg,#080b0c 0%,transparent 42%),url(${image("photo-1519608487953-e999c86e7455")})`}}/>
   <div className="hero-grain"/>
   <div className="hero-content"><div className="eyebrow"><span className="eyebrow-line"/> {t("hero.eyebrow")}</div>
    <p className="hero-kicker">{t("hero.title")}</p><h1 className="hero-title">{t("hero.city")}<span className="hero-period">.</span></h1>
    <p className="hero-description">{t("hero.description")}</p>
    <div className="hero-actions"><Link className="button button-light" href="/map">{t("hero.primary")} <ArrowUpRight size={16}/></Link><a className="button button-ghost" href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer">{t("hero.secondary")} <ArrowUpRight size={16}/></a></div>
   </div>
   <div className="hero-bottom"><span>26°07' N — 80°08' W</span><span className="scroll-cue"><ArrowDown size={14}/> SCROLL TO DISCOVER</span><span>LEONIDA, USA</span></div>
  </section>
  <div className="ticker"><div className="ticker-track">{Array.from({length:4}).map((_,i)=><span key={i}>{t("ticker")} <b>✳</b> </span>)}</div></div>
  <section className="section intro-section"><div className="section-index">01 / THE EXPERIENCE</div><div className="intro-copy"><span className="eyebrow">A COMMUNITY FIELD GUIDE</span><h2>{t("sections.discover")}</h2><p>{t("sections.discoverSub")}</p></div><div className="intro-mark">VI<span>.</span></div></section>
  <section className="feature-grid">
   <Link href="/map" className="feature-card feature-map"><div className="feature-image" style={{backgroundImage:`url(${image("photo-1500530855697-b586d89ba3ee")})`}}/><div className="feature-shade"/><div className="feature-top"><span>01 — FIELD GUIDE</span><Map size={20}/></div><div className="feature-copy"><h3>{t("cards.map")}</h3><p>{t("cards.mapText")}</p><span className="feature-link">{t("sections.mapCta")} <ArrowUpRight size={16}/></span></div></Link>
   <Link href="/blog" className="feature-card feature-news"><div className="feature-image" style={{backgroundImage:`url(${image("photo-1519608487953-e999c86e7455")})`}}/><div className="feature-shade"/><div className="feature-top"><span>02 — THE DAILY</span><Newspaper size={20}/></div><div className="feature-copy"><h3>{t("cards.news")}</h3><p>{t("cards.newsText")}</p><span className="feature-link">{t("sections.allNews")} <ArrowUpRight size={16}/></span></div></Link>
   <a href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer" className="feature-card feature-community"><div className="feature-image" style={{backgroundImage:`url(${image("photo-1519608487953-e999c86e7455")})`}}/><div className="feature-shade"/><div className="feature-top"><span>03 — TOGETHER</span><Users size={20}/></div><div className="feature-copy"><h3>{t("cards.community")}</h3><p>{t("cards.communityText")}</p><span className="feature-link">{t("sections.discord")} <ArrowUpRight size={16}/></span></div></a>
  </section>
  <section className="manifesto"><div className="manifesto-image" style={{backgroundImage:`url(${image("photo-1533105079780-92b9be482077")})`}}/><div className="manifesto-content"><span className="eyebrow">THE SUNSHINE STATE</span><h2>NOT JUST A PLACE.<br/><em>A STATE OF MIND.</em></h2><p>From the neon-soaked avenues to the quiet roads beyond the city. Leonida is yours to explore.</p><Link href="/map" className="text-link">{t("sections.mapCta")} <ArrowUpRight size={17}/></Link></div></section>
  <section className="community-strip"><div><span className="eyebrow">YOUR STORY STARTS HERE</span><h2>{t("sections.community")}</h2><p>{t("sections.communitySub")}</p></div><a className="button button-light" href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer">{t("sections.discord")} <ArrowUpRight size={16}/></a></section>
 </div>;
}