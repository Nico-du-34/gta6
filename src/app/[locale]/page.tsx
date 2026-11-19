import {getTranslations} from "next-intl/server";
import {ArrowDown,ArrowUpRight,Map,Newspaper,Users} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {MotionReveals} from "@/components/motion-reveals";

const artwork={
 hero:"https://www.rockstargames.com/VI/_next/static/media/Jason_and_Lucia_Beach_landscape.0419q._86ukpt.jpg?akim=1&imdensity=1&imwidth=3840",
 map:"https://www.rockstargames.com/VI/_next/static/media/Leonida_Keys_Postcard_landscape.05oezf2h--~ed.jpg?akim=1&imdensity=1&imwidth=3840",
 news:"https://www.rockstargames.com/VI/_next/static/media/Vice_City_Postcard_landscape.0v2njmlk2n-qm.jpg?akim=1&imdensity=1&imwidth=3840",
 community:"https://www.rockstargames.com/VI/_next/static/media/Jason_Lucia_Rooftop_landscape.0c6p5do~-8~7..jpg?akim=1&imdensity=1&imwidth=3840",
 wild:"https://www.rockstargames.com/VI/_next/static/media/Mount_Kalaga_National_Park_Postcard_landscape.0c1cb4ocq16n3.jpg?akim=1&imdensity=1&imwidth=3840"
};
export default async function Home(){
 const t=await getTranslations();
 return <div className="home">
  <MotionReveals/>
  <section className="hero">
   <div className="hero-backdrop" style={{backgroundImage:`linear-gradient(90deg,rgba(4,4,4,.84),rgba(4,4,4,.24) 68%),linear-gradient(0deg,#0d0d0c 0%,transparent 43%),url("${artwork.hero}")`}}/>
   <div className="hero-grain"/>
   <div className="hero-content">
    <div className="eyebrow" data-reveal="hero"><span className="eyebrow-line"/> {t("hero.eyebrow")}</div>
    <p className="hero-kicker" data-reveal="hero">{t("hero.title")}</p>
    <h1 className="hero-title" data-reveal="hero">{t("hero.city")}<span className="hero-period">.</span></h1>
    <p className="hero-description" data-reveal="hero">{t("hero.description")}</p>
    <div className="hero-actions" data-reveal="hero"><Link className="button button-light" href="/map">{t("hero.primary")} <ArrowUpRight size={16}/></Link><a className="button button-ghost" href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer">{t("hero.secondary")} <ArrowUpRight size={16}/></a></div>
   </div>
   <span className="hero-location">LEONIDA / THE SUNSHINE STATE</span>
   <div className="hero-bottom"><span>26°07&apos; N — 80°08&apos; W</span><span className="scroll-cue"><ArrowDown size={14}/> SCROLL TO DISCOVER</span><span>EST. 2026 / COMMUNITY ARCHIVE</span></div>
  </section>
  <div className="ticker"><div className="ticker-track">{Array.from({length:4}).map((_,i)=><span key={i}>{t("ticker")} <b>✳</b> </span>)}</div></div>
  <section className="section intro-section">
   <div className="section-index" data-reveal>01 / THE EXPERIENCE</div>
   <div className="intro-copy" data-reveal><span className="eyebrow">A COMMUNITY FIELD GUIDE</span><h2>{t("sections.discover")}</h2><p>{t("sections.discoverSub")}</p></div>
   <div className="intro-mark" aria-hidden="true">VI<span>.</span></div>
  </section>
  <section className="feature-grid">
   <Link href="/map" className="feature-card feature-map" data-reveal="card"><div className="feature-image" style={{backgroundImage:`url("${artwork.map}")`}}/><div className="feature-shade"/><div className="feature-top"><span>01 — FIELD GUIDE</span><Map size={19}/></div><div className="feature-copy"><h3>{t("cards.map")}</h3><p>{t("cards.mapText")}</p><span className="feature-link">{t("sections.mapCta")} <ArrowUpRight size={16}/></span></div></Link>
   <Link href="/blog" className="feature-card feature-news" data-reveal="card"><div className="feature-image" style={{backgroundImage:`url("${artwork.news}")`}}/><div className="feature-shade"/><div className="feature-top"><span>02 — THE DAILY</span><Newspaper size={19}/></div><div className="feature-copy"><h3>{t("cards.news")}</h3><p>{t("cards.newsText")}</p><span className="feature-link">{t("sections.allNews")} <ArrowUpRight size={16}/></span></div></Link>
   <a href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer" className="feature-card feature-community" data-reveal="card"><div className="feature-image" style={{backgroundImage:`url("${artwork.community}")`}}/><div className="feature-shade"/><div className="feature-top"><span>03 — TOGETHER</span><Users size={19}/></div><div className="feature-copy"><h3>{t("cards.community")}</h3><p>{t("cards.communityText")}</p><span className="feature-link">{t("sections.discord")} <ArrowUpRight size={16}/></span></div></a>
  </section>
  <section className="manifesto">
   <div className="manifesto-image" style={{backgroundImage:`url("${artwork.wild}")`}}/>
   <div className="manifesto-content" data-reveal><span className="eyebrow">THE SUNSHINE STATE</span><h2>NOT JUST A PLACE.<br/><em>A STATE OF MIND.</em></h2><p>From the neon-soaked avenues to the quiet roads beyond the city. Leonida is yours to explore.</p><Link href="/map" className="text-link">{t("sections.mapCta")} <ArrowUpRight size={17}/></Link></div>
  </section>
  <section className="community-strip" data-reveal><div><span className="eyebrow">YOUR STORY STARTS HERE</span><h2>{t("sections.community")}</h2><p>{t("sections.communitySub")}</p></div><a className="button button-light" href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer">{t("sections.discord")} <ArrowUpRight size={16}/></a></section>
 </div>;
}