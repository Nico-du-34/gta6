import type {Metadata} from "next";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import "../globals.css";
import {SiteHeader} from "@/components/site-header";
import {SiteFooter} from "@/components/site-footer";
import {CookieConsent} from "@/components/cookie-consent";
export const metadata:Metadata={
  title:{default:"Leonida — GTA VI Community",template:"%s — Leonida"},
  description:"Explorez Vice City et Leonida. Actualités, carte communautaire et espace dédié à Grand Theft Auto VI.",
  metadataBase:new URL("https://gta6.example.com"),
  openGraph:{title:"Leonida — GTA VI Community",description:"The streets of Leonida are calling.",type:"website"}
};
export function generateStaticParams(){return routing.locales.map(locale=>({locale}));}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;
  if(!hasLocale(routing.locales,locale))notFound();
  const messages=await getMessages();
  return <html lang={locale}><body><NextIntlClientProvider messages={messages}><SiteHeader/><main>{children}</main><SiteFooter/><CookieConsent/></NextIntlClientProvider></body></html>;
}