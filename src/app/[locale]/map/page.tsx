import {getTranslations} from "next-intl/server";
import type {Metadata} from "next";
import {LeonidaAtlas} from "@/components/leonida-atlas";
export async function generateMetadata():Promise<Metadata>{const t=await getTranslations("map");return {title:t("title")};}
export default async function MapPage(){const t=await getTranslations();return <section className="subpage"><div className="subpage-cover map-cover"/><div className="subpage-inner"><span className="eyebrow">FIELD GUIDE — 001</span><h1>{t("map.title")}</h1><p className="subpage-lead">{t("map.subtitle")}</p><LeonidaAtlas/></div></section>;}