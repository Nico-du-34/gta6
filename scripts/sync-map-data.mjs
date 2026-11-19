import {createHash} from "node:crypto";
import {mkdir,writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const DATA_REVISION="5c1d69ff864623d181da5457afaacd00b623e1a4";
const DATA_SHA256="2209a4ff385815cad4d1f217248daaae3e29d029c34c137ce870eee1e8181083";
const DATA_URL="https://raw.githubusercontent.com/rolux/gtadb.org/"+DATA_REVISION+"/map/data/6/landmarks.json";
const BASEMAP_REVISION="0c7434f5bd5ed59a58aaa75a3ba7c3734fa0c4d0";
const BASEMAP_URL="https://raw.githubusercontent.com/navanem/gta6-leonida-atlas/"+BASEMAP_REVISION+"/public/assets/gta6-leonida-atlas/basemap.svg";
const OUTPUT_DIR=path.join(ROOT,"public","data");
const OUTPUT_DATA=path.join(OUTPUT_DIR,"gtadb-landmarks.json");
const OUTPUT_BASEMAP=path.join(OUTPUT_DIR,"leonida-basemap.svg");
const uncertaintyPatterns=[
  ["unconfirmed",/\\bun(?:confirmed|comfirmed)\\b/i],
  ["may-not-exist",/\\bmay(?:-not-|not\\s+)exist\\b/i],
  ["cancelled",/\\bcancelled\\b/i],
  ["fictional",/\\bfictional\\b/i],
  ["demolished",/\\bdemolished\\b/i],
  ["duplicate",/\\bduplicate\\b/i]
];
function pair(id,label,value){
  if(!Array.isArray(value))throw new Error(id+": "+label+" must be an array");
  if(value.length===0)return null;
  if(value.length!==2||!value.every(Number.isFinite))throw new Error(id+": invalid "+label);
  return {x:value[0],y:value[1]};
}
function normalize(source){
  if(!source||Array.isArray(source)||typeof source!=="object")throw new Error("GTADB source must be an object");
  const landmarks=Object.entries(source).map(([id,row])=>{
    if(!/^L\\d+$/.test(id)||!Array.isArray(row)||row.length!==9)throw new Error("Invalid GTADB record "+id);
    const [rawName,rawPosition,rawPhotoSize,realWorldAddress,realWorldCoordinates,realWorldPhotoSize,rawTags,rawColor,editedAt]=row;
    if(typeof rawName!=="string"||typeof realWorldAddress!=="string"||!Array.isArray(rawTags)||!rawTags.every(x=>typeof x==="string")||typeof rawColor!=="string"||!Array.isArray(editedAt)||editedAt.length!==3||!editedAt.every(Number.isFinite))throw new Error("Invalid GTADB fields for "+id);
    if(!Array.isArray(rawPhotoSize)||!Array.isArray(realWorldPhotoSize))throw new Error("Invalid photo-size fields for "+id);
    const position=pair(id,"inGameCoordinates",rawPosition);
    const unknownName=rawName.trim().length===0||rawName.includes("?");
    const signals=[rawName,...rawTags];
    const uncertainty=uncertaintyPatterns.filter(([,pattern])=>signals.some(value=>pattern.test(value))).map(([name])=>name);
    if(unknownName)uncertainty.unshift("unknown-name");
    const tags=[...new Set(rawTags.map(tag=>tag.trim()).filter(Boolean))];
    const name=rawName.trim()||"Unknown place ("+id+")";
    return {
      id,
      name,
      position,
      tags,
      color:/^#[0-9a-f]{6}$/i.test(rawColor)?rawColor:null,
      updatedAt:editedAt,
      evidence:{
        name:unknownName?"UNKNOWN":"KNOWN",
        placement:position?"APPROXIMATE":"UNPOSITIONED",
        uncertainty
      }
    };
  });
  const positionedCount=landmarks.filter(item=>item.position!==null).length;
  const unpositionedCount=landmarks.length-positionedCount;
  if(landmarks.length!==3431||positionedCount!==3340||unpositionedCount!==91){
    throw new Error("Unexpected GTADB snapshot counts: "+landmarks.length+" total, "+positionedCount+" positioned, "+unpositionedCount+" unpositioned");
  }
  return {
    source:{
      name:"GTADB / Map GTA community reconstruction",
      repository:"https://github.com/rolux/gtadb.org",
      map:"https://map.gtadb.org",
      revision:DATA_REVISION,
      license:"CC BY 4.0",
      licenseUrl:"https://creativecommons.org/licenses/by/4.0/",
      sha256:DATA_SHA256,
      attribution:"GTADB / Map GTA and contributors — CC BY 4.0. Community locations and coordinates are approximate; this is not an official Rockstar map."
    },
    counts:{total:landmarks.length,positioned:positionedCount,unpositioned:unpositionedCount},
    landmarks
  };
}
async function download(url){
  const response=await fetch(url,{headers:{"user-agent":"LeonidaCommunityMap/1.0"}});
  if(!response.ok)throw new Error("Download failed ("+response.status+") for "+url);
  return Buffer.from(await response.arrayBuffer());
}
await mkdir(OUTPUT_DIR,{recursive:true});
const raw=await download(DATA_URL);
const hash=createHash("sha256").update(raw).digest("hex");
if(hash!==DATA_SHA256)throw new Error("GTADB checksum mismatch. Expected "+DATA_SHA256+" but received "+hash);
const snapshot=normalize(JSON.parse(raw.toString("utf8")));
const basemap=await download(BASEMAP_URL);
const basemapText=basemap.toString("utf8");
if(!basemapText.startsWith("<svg")||!basemapText.includes('viewBox="-32000 -24000 40000 40000"'))throw new Error("Unexpected YANIS basemap geometry; refusing to publish mismatched coordinates.");
await writeFile(OUTPUT_DATA,JSON.stringify(snapshot,null,2)+"\\n","utf8");
await writeFile(OUTPUT_BASEMAP,basemap);
console.log("Synced "+snapshot.counts.total+" GTADB locations ("+snapshot.counts.positioned+" positioned, "+snapshot.counts.unpositioned+" without coordinates).");
console.log("Basemap: YANIS v16 / GTADB, pinned revision "+BASEMAP_REVISION+".");
console.log("Attribution: "+snapshot.source.attribution);
