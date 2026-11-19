"use client";
import {useMemo,useRef,useState} from "react";
import type {PointerEvent} from "react";
import {useTranslations} from "next-intl";
import {Search,Plus,Minus,LocateFixed,MapPin,ArrowUpRight} from "lucide-react";
import "./atlas.css";
const regions=[
 {id:"viceCity",name:"Vice City",x:725,y:245},
 {id:"keys",name:"Leonida Keys",x:775,y:485},
 {id:"grassrivers",name:"Grassrivers",x:545,y:330},
 {id:"portGellhorn",name:"Port Gellhorn",x:285,y:210},
 {id:"ambrosia",name:"Ambrosia",x:510,y:185},
 {id:"mountKalaga",name:"Mount Kalaga National Park",x:405,y:85}
] as const;
export function LeonidaAtlas(){
 const t=useTranslations("map");
 const [selected,setSelected]=useState<string>("viceCity");
 const [query,setQuery]=useState("");
 const [zoom,setZoom]=useState(1);
 const [offset,setOffset]=useState({x:0,y:0});
 const drag=useRef({x:0,y:0,originX:0,originY:0,active:false});
 const visible=useMemo(()=>regions.filter(r=>r.name.toLowerCase().includes(query.trim().toLowerCase())),[query]);
 const active=visible.find(r=>r.id===selected)??visible[0]??regions[0];
 function startDrag(e:PointerEvent<HTMLDivElement>){if((e.target as HTMLElement).closest("[data-pin]"))return;drag.current={x:e.clientX,y:e.clientY,originX:offset.x,originY:offset.y,active:true};e.currentTarget.setPointerCapture(e.pointerId);}
 function moveDrag(e:React.PointerEvent<HTMLDivElement>){if(!drag.current.active)return;setOffset({x:drag.current.originX+e.clientX-drag.current.x,y:drag.current.originY+e.clientY-drag.current.y});}
 function stopDrag(){drag.current.active=false;}
 return <div className="atlas">
  <div className="atlas-toolbar">
   <label className="atlas-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t("search")} aria-label={t("search")}/></label>
   <div className="atlas-zoom"><button onClick={()=>setZoom(v=>Math.min(1.8,v+.15))} aria-label={t("zoomIn")} title={t("zoomIn")}><Plus size={16}/></button><button onClick={()=>setZoom(v=>Math.max(.8,v-.15))} aria-label={t("zoomOut")} title={t("zoomOut")}><Minus size={16}/></button><button onClick={()=>{setZoom(1);setOffset({x:0,y:0});}} aria-label={t("reset")} title={t("reset")}><LocateFixed size={16}/></button></div>
  </div>
  <div className="atlas-layout">
   <div className="atlas-viewport" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
    <svg className="atlas-svg" viewBox="0 0 1000 620" role="group" aria-label={t("title")} style={{transform:"translate("+offset.x+"px,"+offset.y+"px) scale("+zoom+")"}}>
     <defs>
      <linearGradient id="land" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#52664f"/><stop offset="52%" stopColor="#2e5146"/><stop offset="100%" stopColor="#193b36"/></linearGradient>
      <linearGradient id="water" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#173537"/><stop offset="100%" stopColor="#102427"/></linearGradient>
      <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#9eae8b" strokeOpacity=".1" strokeWidth="1"/></pattern>
      <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
     </defs>
     <rect width="1000" height="620" fill="url(#water)"/><rect width="1000" height="620" fill="url(#grid)"/>
     <path d="M105 70 C190 28 295 30 380 52 C477 12 604 40 673 112 C728 170 758 230 744 294 C735 340 690 366 705 416 C720 465 814 497 777 548 C751 584 697 563 666 517 C625 457 610 398 558 368 C505 338 452 324 400 286 C331 236 243 239 197 189 C157 151 86 117 105 70Z" fill="url(#land)" stroke="#b5c79a" strokeOpacity=".48" strokeWidth="2"/>
     <path d="M173 101 C263 67 340 89 390 108 C470 79 583 103 641 165 C685 211 699 255 680 297 C662 342 609 351 619 408" fill="none" stroke="#c4d4a0" strokeOpacity=".11" strokeWidth="2"/>
     <path d="M210 158 C300 120 365 150 421 179 S551 217 602 263 S681 321 675 371" fill="none" stroke="#c4d4a0" strokeOpacity=".09" strokeWidth="1.5"/>
     <path d="M315 55 C328 118 375 152 420 182 C469 214 480 255 513 286 C555 326 624 346 662 399 C695 442 694 488 744 527" fill="none" stroke="#b8c98e" strokeOpacity=".7" strokeWidth="3" strokeDasharray="3 8"/>
     <path d="M174 206 C293 228 374 248 463 286 S596 335 663 387" fill="none" stroke="#d3cba0" strokeOpacity=".45" strokeWidth="2"/>
     <path d="M384 68 C392 124 439 174 495 199 C546 222 580 240 643 251" fill="none" stroke="#d3cba0" strokeOpacity=".4" strokeWidth="2"/>
     <path d="M165 116 C206 137 238 169 248 211 C257 250 291 270 337 276" fill="none" stroke="#a7c8a1" strokeOpacity=".32" strokeWidth="5"/>
     <g fill="#c2c99b" fillOpacity=".12"><circle cx="270" cy="130" r="55"/><circle cx="445" cy="255" r="78"/><circle cx="600" cy="205" r="65"/><circle cx="675" cy="300" r="45"/></g>
     <text x="170" y="48" fill="#d9e5a2" fillOpacity=".48" fontSize="12" letterSpacing="4">LEONIDA · NORTH</text><text x="730" y="590" fill="#d9e5a2" fillOpacity=".5" fontSize="11" letterSpacing="3">THE KEYS</text>
     {visible.map(r=><g key={r.id} data-pin="true" role="button" tabIndex={0} aria-label={r.name} aria-pressed={selected===r.id} onClick={()=>setSelected(r.id)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelected(r.id);}}} className={selected===r.id?"atlas-pin selected":"atlas-pin"} transform={"translate("+r.x+" "+r.y+")"}>
       {selected===r.id&&<circle r="31" className="atlas-pin-halo"/>}<circle r="18" className="atlas-pin-ring"/><circle r="5" className="atlas-pin-core"/><text x="0" y="-29" textAnchor="middle">{r.name.toUpperCase()}</text>
     </g>)}
    </svg>
    <div className="atlas-watermark">LEONIDA / COMMUNITY ATLAS</div>
    <div className="atlas-map-stamp"><span className="atlas-map-dot"/> {t("legend")} <b>06</b></div>
   </div>
   <aside className="atlas-sidebar">
    <div className="atlas-sidebar-top"><span className="eyebrow">{t("selected")}</span><span className="atlas-count">0{visible.length} / 06</span></div>
    <div className="atlas-active-icon"><MapPin size={22}/></div>
    <h2>{active.name}</h2><p className="atlas-region-desc">{t("regionDescriptions."+active.id)}</p>
    <span className="atlas-confirmed">{t("confirmed")}</span>
    <div className="atlas-region-list">{visible.map((r,i)=><button key={r.id} onClick={()=>setSelected(r.id)} className={selected===r.id?"atlas-region-button active":"atlas-region-button"}><span className="atlas-region-number">0{i+1}</span><span>{r.name}</span><ArrowUpRight size={14}/></button>)}{visible.length===0&&<p className="atlas-no-results">{t("noResults")}</p>}</div>
   </aside>
  </div>
  <p className="atlas-note">{t("note")}</p>
 </div>;
}