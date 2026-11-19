"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import type {CircleMarker,LayerGroup,Map as LeafletMap} from "leaflet";
import {useTranslations} from "next-intl";
import {Search,MapPin,ArrowUpRight,ExternalLink,Filter,LoaderCircle} from "lucide-react";
type Position={x:number;y:number};
type Place={id:string;name:string;position:Position|null;tags:string[];color:string|null;evidence:{name:"KNOWN"|"UNKNOWN";placement:"APPROXIMATE"|"UNPOSITIONED";uncertainty:string[]}};
type Snapshot={source:{name:string;map:string;revision:string;license:string;licenseUrl:string;attribution:string};counts:{total:number;positioned:number;unpositioned:number};landmarks:Place[]};
const MAP_BOUNDS=[[-16000,-32000],[24000,8000]] as [[number,number],[number,number]];
const UNCERTAINTY_TAGS=new Set(["unconfirmed","uncomfirmed","demolished","fictional","duplicate"]);
function categoryFor(place:Place){return place.tags.find(tag=>!/^l[1-5]$/i.test(tag)&&!UNCERTAINTY_TAGS.has(tag.toLowerCase()))??"other";}
function safeColor(place:Place){return place.color&&/^#[0-9a-f]{6}$/i.test(place.color)?place.color:"#d7e7a0";}
export function LeonidaAtlas(){
 const t=useTranslations("map");
 const containerRef=useRef<HTMLDivElement>(null);
 const mapRef=useRef<LeafletMap|null>(null);
 const layerRef=useRef<LayerGroup|null>(null);
 const markerRefs=useRef<Map<string,CircleMarker>>(new Map());
 const [snapshot,setSnapshot]=useState<Snapshot|null>(null);
 const [loading,setLoading]=useState(true);
 const [mapReady,setMapReady]=useState(false);
 const [error,setError]=useState("");
 const [query,setQuery]=useState("");
 const [category,setCategory]=useState("all");
 const [selectedId,setSelectedId]=useState<string|null>(null);
 const [showCount,setShowCount]=useState(16);
 useEffect(()=>{
  let active=true;
  fetch("/data/gtadb-landmarks.json",{cache:"force-cache"})
   .then(async response=>{if(!response.ok)throw new Error("HTTP "+response.status);return response.json() as Promise<Snapshot>;})
   .then(data=>{if(!active)return;if(!data||!Array.isArray(data.landmarks)||!data.counts)throw new Error("Invalid map data");setSnapshot(data);setLoading(false);})
   .catch(reason=>{if(!active)return;setError(reason instanceof Error?reason.message:"Unknown error");setLoading(false);});
  return()=>{active=false;};
 },[]);
 useEffect(()=>{
  if(!containerRef.current||!snapshot)return;
  let disposed=false;
  let map:LeafletMap|undefined;
  void import("leaflet").then(L=>{
   if(disposed||!containerRef.current)return;
   map=L.map(containerRef.current,{crs:L.CRS.Simple,minZoom:-2,maxZoom:2.4,zoomControl:false,attributionControl:false,preferCanvas:true,scrollWheelZoom:true});
   const bounds=L.latLngBounds(MAP_BOUNDS);
   L.imageOverlay("/data/leonida-basemap.svg",bounds,{interactive:false}).addTo(map);
   map.fitBounds(bounds);
   map.setMaxBounds(bounds.pad(.2));
   L.control.zoom({position:"topright"}).addTo(map);
   const layer=L.layerGroup().addTo(map);
   const renderer=L.canvas({padding:.4});
   const markers=new Map<string,CircleMarker>();
   snapshot.landmarks.forEach(place=>{
    if(!place.position)return;
    const marker=L.circleMarker([-place.position.y,place.position.x],{renderer,radius:4,weight:1,color:"#101817",fillColor:safeColor(place),fillOpacity:.88,opacity:.95});
    marker.on("click",()=>setSelectedId(place.id));
    marker.addTo(layer);
    markers.set(place.id,marker);
   });
   mapRef.current=map;layerRef.current=layer;markerRefs.current=markers;
   setMapReady(true);
   window.setTimeout(()=>map?.invalidateSize(),120);
  }).catch(reason=>{if(!disposed)setError(reason instanceof Error?reason.message:"Map could not be initialized");});
  return()=>{disposed=true;map?.remove();mapRef.current=null;layerRef.current=null;markerRefs.current.clear();};
 },[snapshot]);
 const categories=useMemo(()=>{
  if(!snapshot)return [];
  const counts=new Map<string,number>();
  snapshot.landmarks.forEach(place=>{const value=categoryFor(place);if(value!=="other")counts.set(value,(counts.get(value)??0)+1);});
  return [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,28);
 },[snapshot]);
 const filtered=useMemo(()=>{
  if(!snapshot)return [];
  const normalized=query.trim().toLocaleLowerCase();
  return snapshot.landmarks.filter(place=>{
   const matchesQuery=!normalized||place.name.toLocaleLowerCase().includes(normalized)||place.id.toLowerCase().includes(normalized)||place.tags.some(tag=>tag.toLocaleLowerCase().includes(normalized));
   const matchesCategory=category==="all"||place.tags.some(tag=>tag.toLowerCase()===category);
   return matchesQuery&&matchesCategory;
  });
 },[snapshot,query,category]);
 const visibleIds=useMemo(()=>new Set(filtered.filter(place=>place.position).map(place=>place.id)),[filtered]);
 useEffect(()=>{
  const layer=layerRef.current;if(!layer||!mapReady)return;
  markerRefs.current.forEach((marker,id)=>{
   const visible=visibleIds.has(id);
   if(visible&&!layer.hasLayer(marker))layer.addLayer(marker);
   if(!visible&&layer.hasLayer(marker))layer.removeLayer(marker);
   const selected=id===selectedId;
   marker.setStyle({radius:selected?7:4,weight:selected?2:1,fillOpacity:selected?1:.82,color:selected?"#ffffff":"#101817"});
  });
 },[visibleIds,selectedId,mapReady]);
 const selected=filtered.find(place=>place.id===selectedId)??null;
 const positionedFiltered=filtered.filter(place=>place.position).length;
 function choosePlace(place:Place){setSelectedId(place.id);if(place.position&&mapRef.current)mapRef.current.setView([-place.position.y,place.position.x],Math.max(mapRef.current.getZoom(),.4),{animate:true});}
 function categoryLabel(value:string){const key="categories."+value.toLowerCase();return t.has(key)?t(key):value.replaceAll("_"," ").replace(/\b\w/g,char=>char.toUpperCase());}
 function updateSearch(value:string){setQuery(value);setShowCount(16);setSelectedId(null);}
 function updateCategory(value:string){setCategory(value);setShowCount(16);setSelectedId(null);}
 return <div className="atlas atlas-live">
  <div className="atlas-toolbar">
   <label className="atlas-search"><Search size={17}/><input value={query} onChange={event=>updateSearch(event.target.value)} placeholder={t("search")} aria-label={t("search")}/>{query&&<button type="button" onClick={()=>updateSearch("")} aria-label={t("clearSearch")}>×</button>}</label>
   <div className="atlas-stats"><span><b>{snapshot?.counts.total.toLocaleString()??"—"}</b> {t("places")}</span><span><b>{snapshot?.counts.positioned.toLocaleString()??"—"}</b> {t("positioned")}</span><span><b>{snapshot?.counts.unpositioned.toLocaleString()??"—"}</b> {t("unpositioned")}</span></div>
  </div>
  <div className="atlas-layout">
   <section className="atlas-map-panel">
    <div className="atlas-map-topline"><span className="eyebrow"><span className="atlas-live-dot"/> {t("communityReconstruction")}</span><span className="atlas-map-revision">GTADB · {snapshot?.source.revision.slice(0,7)??"—"}</span></div>
    <div className="atlas-map-frame">
     <div ref={containerRef} className="atlas-map-canvas" aria-label={t("mapCanvasLabel")}/>
     {loading&&<div className="atlas-map-overlay"><LoaderCircle className="atlas-spinner" size={24}/><span>{t("loading")}</span></div>}
     {error&&<div className="atlas-map-overlay atlas-map-error"><strong>{t("loadError")}</strong><span>{error}</span><button className="button button-light" onClick={()=>window.location.reload()}>{t("retry")}</button></div>}
     {mapReady&&<div className="atlas-map-bottom"><span><i/> {t("approximatePositions")}</span><span>{t("dragZoom")}</span></div>}
    </div>
    <div className="atlas-map-footer"><span>{t("clickMarker")}</span><span>{t("mapScaleNotice")}</span></div>
   </section>
   <aside className="atlas-sidebar">
    <div className="atlas-sidebar-top"><div><span className="eyebrow">{t("database")}</span><h2>{t("explorePlaces")}</h2></div><span className="atlas-count">{filtered.length.toLocaleString()}</span></div>
    <label className="atlas-filter-label"><Filter size={14}/>{t("category")}</label>
    <select className="atlas-category-select" value={category} onChange={event=>updateCategory(event.target.value)}><option value="all">{t("allCategories")}</option>{categories.map(([value,count])=><option value={value} key={value}>{categoryLabel(value)} ({count.toLocaleString()})</option>)}</select>
    <div className="atlas-results-heading"><span>{t("results")}</span><span>{positionedFiltered.toLocaleString()} {t("onMap")}</span></div>
    <div className="atlas-region-list">
     {filtered.slice(0,showCount).map((place,index)=><button type="button" key={place.id} onClick={()=>choosePlace(place)} className={selectedId===place.id?"atlas-region-button active":"atlas-region-button"}><span className="atlas-region-number">{String(index+1).padStart(2,"0")}</span><span className="atlas-result-copy"><strong>{place.name}</strong><small>{categoryLabel(categoryFor(place))} · {place.position?t("approximate"):t("noExactPosition")}</small></span>{place.position?<span className="atlas-result-pin"><MapPin size={14}/></span>:<span className="atlas-result-unplaced">—</span>}</button>)}
     {!loading&&filtered.length===0&&<p className="atlas-no-results">{t("noResults")}</p>}
     {filtered.length>showCount&&<button className="atlas-show-more" onClick={()=>setShowCount(value=>value+16)}>{t("showMore")} ({(filtered.length-showCount).toLocaleString()})</button>}
    </div>
    {selected&&<section className="atlas-selected"><div className="atlas-selected-top"><span className="eyebrow">{t("selectedPlace")}</span><span className="atlas-selected-id">{selected.id}</span></div><h3>{selected.name}</h3><p className="atlas-selected-status">{selected.position?t("approximatePositions"):t("noExactPosition")}</p>{selected.position&&<p className="atlas-coordinates">X {selected.position.x.toFixed(1)} <span>·</span> Y {selected.position.y.toFixed(1)}</p>}{selected.evidence.name==="UNKNOWN"&&<p className="atlas-warning">{t("unknownName")}</p>}{selected.evidence.uncertainty.length>0&&<p className="atlas-warning">{t("uncertaintyNotice")}</p>}<div className="atlas-tags">{selected.tags.slice(0,8).map(tag=><span key={tag}>{tag}</span>)}</div></section>}
   </aside>
  </div>
  <footer className="atlas-sources">
   <div className="atlas-source-credit"><span className="eyebrow">{t("dataAndCredits")}</span><p>{t("attributionText")}</p><a href={snapshot?.source.licenseUrl??"https://creativecommons.org/licenses/by/4.0/"} target="_blank" rel="noreferrer">{t("ccByLicense")} <ExternalLink size={12}/></a></div>
   <div className="atlas-source-links"><span>{t("compareCommunityMaps")}</span><a href="https://map.stateofleonida.net/" target="_blank" rel="noreferrer">State of Leonida v17 <ArrowUpRight size={13}/></a><a href="https://www.ign.com/maps/gta-6/leonida" target="_blank" rel="noreferrer">IGN <ArrowUpRight size={13}/></a><a href="https://www.gtabase.com/gta-6/map/" target="_blank" rel="noreferrer">GTABase <ArrowUpRight size={13}/></a><a href="https://leonidaverse.com/fr/gta-6-map" target="_blank" rel="noreferrer">Leonidaverse <ArrowUpRight size={13}/></a></div>
   <p className="atlas-disclaimer">{t("notRockstarOfficial")}</p>
  </footer>
 </div>;
}