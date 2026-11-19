"use client";
import {useEffect,useState} from "react";
import {useTranslations} from "next-intl";
type Consent={necessary:true;analytics:boolean;marketing:boolean;updatedAt:string};
const KEY="leonida-cookie-consent-v1";
const MAX_AGE=180*24*60*60*1000;
function readConsent():Consent|null{
 try{
  const raw=localStorage.getItem(KEY);
  if(!raw)return null;
  const saved=JSON.parse(raw) as Consent;
  const age=Date.now()-Date.parse(saved.updatedAt);
  const valid=saved.necessary===true&&typeof saved.analytics==="boolean"&&typeof saved.marketing==="boolean"&&Number.isFinite(age)&&age>=0&&age<MAX_AGE;
  if(!valid){localStorage.removeItem(KEY);return null;}
  return saved;
 }catch{return null;}
}
export function CookieConsent(){const t=useTranslations("cookie");const [visible,setVisible]=useState(false);const [settings,setSettings]=useState(false);const [analytics,setAnalytics]=useState(false);const [marketing,setMarketing]=useState(false);
 useEffect(()=>{
  // localStorage is available only after hydration. Show consent only when no valid choice exists.
  if(!readConsent()){
   // eslint-disable-next-line react-hooks/set-state-in-effect
   setVisible(true);
  }
  const open=()=>{const saved=readConsent();setAnalytics(saved?.analytics??false);setMarketing(saved?.marketing??false);setSettings(true);setVisible(true);};
  window.addEventListener("open-cookie-settings",open);
  return()=>window.removeEventListener("open-cookie-settings",open);
 },[]);
 function save(a:boolean,m:boolean){const value:Consent={necessary:true,analytics:a,marketing:m,updatedAt:new Date().toISOString()};localStorage.setItem(KEY,JSON.stringify(value));setVisible(false);setSettings(false);}
 if(!visible)return null;
 return <div className="cookie-backdrop"><section className="cookie-panel" role="dialog" aria-modal="true" aria-labelledby="cookie-title"><span className="eyebrow">LEONIDA — PRIVACY</span><h2 id="cookie-title">{t("title")}</h2><p>{t("text")}</p>{settings&&<div className="cookie-options"><label><span>{t("necessary")}</span><input type="checkbox" checked readOnly disabled/></label><label><span>{t("analytics")}</span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label><label><span>{t("marketing")}</span><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)}/></label></div>}<div className="cookie-actions">{!settings?<><button className="button button-light" onClick={()=>save(true,true)}>{t("accept")}</button><button className="button button-ghost" onClick={()=>save(false,false)}>{t("reject")}</button><button className="cookie-text-button" onClick={()=>setSettings(true)}>{t("settings")}</button></>:<><button className="button button-light" onClick={()=>save(analytics,marketing)}>{t("save")}</button><button className="button button-ghost" onClick={()=>save(false,false)}>{t("reject")}</button></>}</div></section></div>;
}