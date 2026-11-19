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
