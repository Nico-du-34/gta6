# Leonida — GTA VI Community Archive

Community hub dedicated to Grand Theft Auto VI. Independent fan project, not affiliated with Rockstar Games or Take-Two Interactive.

## Stack
- Next.js 15 / React 19 / TypeScript
- next-intl — French, English, Spanish, German, Italian and Portuguese
- GSAP + Three.js / React Three Fiber for motion and 3D scenes
- Custom responsive design system

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Routes
- / — French home
- /en, /es, /de, /it, /pt — localized home
- /blog — community news
- /map — Leonida map landing / placeholder
- /privacy — privacy information

## Before production
- Replace the temporary metadata URL and complete publisher / hosting / data-controller details on the privacy page.
- Add real interactive map data and an editorial CMS for the blog.
- Review official artwork usage permissions and Rockstar fan-content guidance. Assets belong to their respective rights holders.
- If analytics, ads, embeds or marketing pixels are introduced, implement consent-aware loading and a tested consent withdrawal path before enabling them.
- Add sitemap, robots policy, canonical URL, social preview image, and automated tests.
- Cookie choices are stored in localStorage. No non-essential tracking scripts are installed in this starter.

## Community
https://discord.gg/N2rDUN6ex

## Artwork
Official GTA VI artwork and screenshots: https://www.rockstargames.com/VI/media


## Interactive Leonida map data

The map is powered by a reproducible data-sync step. `npm run dev` and `npm run build` download a pinned GTADB / Map GTA landmark snapshot and a pinned YANIS v16 community basemap into `public/data/`. The script verifies the GTADB SHA-256 checksum and validates the coordinate frame before writing the files.

- **Landmark data:** GTADB / Map GTA and contributors, revision `5c1d69ff864623d181da5457afaacd00b623e1a4`, licensed **CC BY 4.0**. Attribution is displayed in the map UI and must remain with any redistribution.
- **Basemap:** YANIS v16 / GTADB community reconstruction, pinned from the public Leonida Atlas snapshot. Its positions and geography are approximate, not an official Rockstar map.
- **No copied IGN / Leonidaverse / State of Leonida marker database:** those sites are linked as comparison references. Their private or unlicensed marker sets are not bulk-republished here.

Manual refresh / verify:

```bash
npm run map:sync
```
