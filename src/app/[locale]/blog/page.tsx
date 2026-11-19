import {getTranslations} from "next-intl/server";
import type {Metadata} from "next";
import {ArrowUpRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import "./blog.css";
export async function generateMetadata():Promise<Metadata>{const t=await getTranslations("blog");return {title:t("title")};}
const images={
 gallery:"https://www.rockstargames.com/VI/_next/static/media/Jason_Lucia_Rooftop_landscape.0c6p5do~-8~7..jpg?akim=1&imdensity=1&imwidth=3840",
 regions:"https://www.rockstargames.com/VI/_next/static/media/Leonida_Keys_Postcard_landscape.05oezf2h--~ed.jpg?akim=1&imdensity=1&imwidth=3840",
 community:"https://www.rockstargames.com/VI/_next/static/media/Jason_and_Lucia_Beach_landscape.0419q._86ukpt.jpg?akim=1&imdensity=1&imwidth=3840"
};
export default async function BlogPage(){const t=await getTranslations();return <section className="subpage"><div className="subpage-cover blog-cover"/><div className="subpage-inner"><span className="eyebrow">THE DAILY — LEONIDA</span><h1>{t("blog.title")}</h1><p className="subpage-lead">{t("blog.subtitle")}</p><div className="blog-stories">
 <a className="blog-story" href="https://www.rockstargames.com/VI/launch-gallery" target="_blank" rel="noreferrer"><div className="blog-story-image" style={{backgroundImage:"url("+images.gallery+")"}}><span className="blog-story-number">01 / 03</span></div><div className="blog-story-body"><span className="blog-story-meta">{t("blog.newsTag")} · 05 NOV 2026</span><h2>{t("blog.galleryTitle")}</h2><p>{t("blog.galleryDescription")}</p><span className="blog-story-link">{t("blog.read")} <ArrowUpRight size={15}/></span></div></a>
 <Link className="blog-story" href="/map"><div className="blog-story-image" style={{backgroundImage:"url("+images.regions+")"}}><span className="blog-story-number">02 / 03</span></div><div className="blog-story-body"><span className="blog-story-meta">{t("blog.guideTag")} · FIELD GUIDE 001</span><h2>{t("blog.regionsTitle")}</h2><p>{t("blog.regionsDescription")}</p><span className="blog-story-link">{t("blog.read")} <ArrowUpRight size={15}/></span></div></Link>
 <a className="blog-story" href="https://discord.gg/N2rDUN6ex" target="_blank" rel="noreferrer"><div className="blog-story-image" style={{backgroundImage:"url("+images.community+")"}}><span className="blog-story-number">03 / 03</span></div><div className="blog-story-body"><span className="blog-story-meta">{t("blog.communityTag")} · LEONIDA NETWORK</span><h2>{t("blog.communityTitle")}</h2><p>{t("blog.communityDescription")}</p><span className="blog-story-link">{t("blog.read")} <ArrowUpRight size={15}/></span></div></a>
 </div><p className="blog-footnote">Independent fan project. Official media and trademarks remain the property of their respective owners.</p></div></section>;}