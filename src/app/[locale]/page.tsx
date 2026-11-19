import {getTranslations} from "next-intl/server";
import {ArrowDown,ArrowUpRight,Map,Newspaper,Users} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {HeroScene} from "@/components/hero-scene";
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
   <div className="hero-backdrop" style={{backgroundImage:`linear-gradient(90deg,rgba(5,8,9,.79),rgba(5,8,9,.17) 70%),linear-gradient(0deg,#080b0c 0%,transparent 42%),url("${artwork.hero}")`}}/>
   <div className="hero-grain"/><HeroScene/>
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
   <Link href="/map" className="feature-card feature-map"><div className="feature-image" style={{backgroundImage:`url("${artwork.map}")`}}/><div className="feature-shade"/><div className="feature-top"><span>01 — FIELD GUIDE</span><Map size={20}/></div><div className="feature-copy"><h3>{t("cards.map")}</h3><p>{t("cards.mapText")}</p><span className="feature-link">{t("sections.mapCta")} <ArrowUpRight size={16}/></span></div></Link>
   <Link href="/blog" className="feature-card feature-news"><div className="feature-image" style={{backgroundImage:`url("${artwork.news}")`}}/><div className="feature-shade"/><div className="feature-top"><span>02 — THE DAILY</span><Newspaper size={20}/></div><div className="feature-copy"><h3>{t("cards.news")}</h3><p>{t("cards.newsText")}</p><span className="feature-link">{t("sections.allNews")} <ArrowUpRight size={16}/></span></div></Link>
   <a href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer" className="feature-card feature-community"><div className="feature-image" style={{backgroundImage:`url("${artwork.community}")`}}/><div className="feature-shade"/><div className="feature-top"><span>03 — TOGETHER</span><Users size={20}/></div><div className="feature-copy"><h3>{t("cards.community")}</h3><p>{t("cards.communityText")}</p><span className="feature-link">{t("sections.discord")} <ArrowUpRight size={16}/></span></div></a>
  </section>
  <section className="manifesto"><div className="manifesto-image" style={{backgroundImage:`url("${artwork.wild}")`}}/><div className="manifesto-content"><span className="eyebrow">THE SUNSHINE STATE</span><h2>NOT JUST A PLACE.<br/><em>A STATE OF MIND.</em></h2><p>From the neon-soaked avenues to the quiet roads beyond the city. Leonida is yours to explore.</p><Link href="/map" className="text-link">{t("sections.mapCta")} <ArrowUpRight size={17}/></Link></div></section>
  <section className="community-strip"><div><span className="eyebrow">YOUR STORY STARTS HERE</span><h2>{t("sections.community")}</h2><p>{t("sections.communitySub")}</p></div><a className="button button-light" href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer">{t("sections.discord")} <ArrowUpRight size={16}/></a></section>
 </div>;
}