import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { LeonidaAtlas } from "@/components/leonida-atlas";
import "@/components/atlas.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("map");
  return { title: t("title") };
}

export default async function MapPage() {
  const t = await getTranslations();

  return (
    <section className="subpage map-page">
      <div className="subpage-cover map-cover" aria-hidden="true" />
      <div className="subpage-inner map-page-inner">
        <div className="map-page-heading">
          <div>
            <span className="eyebrow">ATLAS COMMUNAUTAIRE / 001</span>
            <h1>{t("map.title")}</h1>
          </div>
          <p className="subpage-lead">{t("map.subtitle")}</p>
        </div>
        <LeonidaAtlas />
      </div>
    </section>
  );
}
