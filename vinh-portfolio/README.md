# Vinh Nguyen portfolio — Round 2 / version 6 export

This complete standalone package represents **ChatGPT Sites unpublished version 6 / Round 2**, source commit `3ac0219add70c5bfc4faf78941c0f2575e64eea2`. Application source, configuration, content, original images, responsive variants and licenses are copied from that exact saved source. Only Sites hosting metadata/workflow notes are omitted, and this README and `VALIDATION.md` are updated for the export. `EXPORT-MANIFEST.json` records source hashes and provenance. No Site or GitHub changes, publication or deployment are performed by this export.

Standalone React + TypeScript + Vite portfolio with the homepage motion, 3D and performance upgrade. The version 6 hero, CTA wipes, full-bleed Work imagery, parallax, interactive domains, approved copy, typography, palette, navigation, footer and complete case studies are retained. See `ROUND2.md` for the exact saved refinements and `VALIDATION.md` for this export’s checks. `UPGRADE.md` is historical background for the first upgrade.

## Run locally

Use Node.js **24** (recorded in `.nvmrc`) and npm; the project requires Node >=22.13.0. Open a terminal in this `vinh-portfolio` folder:

```sh
npm ci
npm run dev
```

For a reproducible installation use `npm ci`. Build and inspect production:

```sh
npm run check
npm run build
npm run preview
```

Open Vite's HTTP URL. Production files are in `dist/`. No server, ChatGPT Sites runtime, authentication, database, D1, R2 or remote asset service is required.

## Structure

| Path | Purpose |
| --- | --- |
| `src/main.tsx`, `App.tsx`, `route-loader.ts` | Load the requested page and hydrate its complete static HTML |
| `src/pages` | Home, About, four case entries, shared case renderer and not-found page |
| `src/components/Hero.tsx`, `CTA.tsx`, `Domains.tsx` | Version 6 hero entrance, shared CTA wipe and accessible domain disclosures |
| `src/components/Shell.tsx`, `Prose.tsx` | Existing navigation, footer, contact and content rendering |
| `src/components/work` | Shared homepage `ProjectMedia`; preserved detail/next-case `ProjectCover` |
| `src/components/3d` | Static hero system and lazy procedural Three/R3F scene |
| `src/components/motion.tsx`, `motion-engine.ts` | Scoped GSAP/ScrollTrigger, preference, marquee and reveals |
| `src/lib/use-surface-parallax.ts` | Input-driven, bounded parallax with visibility/device gating |
| `src/lib/smooth-scroll.ts`, `motion.ts` | Desktop Lenis and motion constants |
| `src/components/readiness.tsx` | Critical image readiness and short loader |
| `src/components/ledger.tsx`, `ui` | Existing ledger and Radix primitives |
| `src/content/public.json` | Single editable source for original copy |
| `src/content/home.json`, `about.json`, `projects` | Generated route data; do not edit directly |
| `src/content/media.ts`, `image-manifest.json` | Image mapping, framing and responsive variants |
| `src/styles/globals.css`, `enhancements.css`, `round2.css` | Original styles and scoped additions |
| `public/images` | All original assets, unchanged |
| `public/images/optimized` | Committed AVIF/WebP derivatives |
| `scripts/split-content.mjs` | Generates route data before the build |
| `src/entry-server.tsx`, `scripts/prerender.mjs` | Build-time-only static rendering |
| `scripts/optimize-images.mjs` | Offline image pipeline using Sharp |

Fonts remain Arial/Helvetica and Georgia/Times with system fallbacks; no external font requests are added.

## Content and assets

Edit copy only in `src/content/public.json`; builds regenerate the route data. Each complete case ships in its own route chunk. All 48 original raster assets and the favicon remain intact. Nine primary images have responsive AVIF/WebP variants with known dimensions. The portrait is high priority; below-fold covers remain lazy. Original sources remain the final format fallback.

After deliberately changing an original source image, regenerate and commit the derivatives and manifest:

```sh
npm run images
npm run build
```

Deployment does not re-encode images. The pipeline never redraws, retouches or crops originals.

## Motion and 3D

Static HTML, text and the portrait render first. On visible desktop heroes with a fine pointer, critical readiness and an idle callback permit the lazy scene to load. A WebGL2 capability check runs before importing Three. Mobile, reduced motion, data-saving connections and unsupported devices keep the static ring system.

The procedural scene has no models, textures, Drei, shadows or postprocessing. DPR is capped. Demand rendering responds to pointer/scroll input, stops after transforms settle, and pauses offscreen or in hidden tabs. Decoration cannot intercept pointers or convey essential information. Domain objects are embedded SVG, with no extra renderer or continuous loops; native details keep all explanations accessible on hover/focus/tap and without JavaScript. CTA fill and label clipping preserve contrast; the decorative duplicate label is aria-hidden.

Lenis interpolates desktop wheels with a short response. It shares GSAP's ticker only while scrolling, removes its callback when idle and resets its clock on restart. Touch stays native. Keyboard input cancels interpolation; anchors preserve URL history and target focus. Dialogs/viewers scroll natively. Reduced motion destroys smoothing and disables WebGL. The footer preference remains available. Listeners, observers, timers and animation instances clean up on teardown.

## Routes

| URL | Production HTML |
| --- | --- |
| `/` | `dist/index.html` |
| `/about` | `dist/about.html` |
| `/work/debt-ledger` | `dist/work/debt-ledger.html` |
| `/work/mseller` | `dist/work/mseller.html` |
| `/work/beerich` | `dist/work/beerich.html` |
| `/work/moodify` | `dist/work/moodify.html` |
| `/404` and unknown paths | `dist/404.html` |

React server rendering runs only at build time. Complete HTML stays visible while the matching page module loads, then React hydrates it. Native document navigation, CSS view transitions, anchors, history and direct refreshes remain. No router framework or blanket SPA fallback is needed.

## Environment

No secrets, analytics keys or email service are required. `.env.example` documents this optional public canonical origin:

```dotenv
VITE_SITE_URL=https://your-domain.example
```

Use `.env.local` locally or the host's build environment. Without it, canonical paths are relative. `VITE_` values are public and must never contain secrets.

## GitHub and Vercel

Apply this complete source on **`upgrade/home-motion-3d`** in the existing repository. Copy the entire contents of the extracted `vinh-portfolio` folder into your existing Vite project root (the directory containing `package.json`), preserving its relative paths. Do not add an extra nesting level to an already-configured Vercel root. The ZIP is a complete project, not a patch; exclude `node_modules`, `dist` and private environment files. When applying over the previous export, remove the obsolete `src/components/portfolio.tsx`, which was split into shared/page components.

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Root directory | Folder containing `package.json` |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 24.x |

The existing `vercel.json` preserves clean URLs. Push the branch to generate Vercel Preview when the repository is connected. Review that Preview, including 3D on a GPU-enabled browser, before merging into `main`. This package has not been pushed, merged or deployed automatically. GitHub repository: `jvinh209product/vinh-nguyen-portfolio`; intended branch: `upgrade/home-motion-3d`. Do not apply it directly to `main`.

## Cloudflare Pages

Connect the repository with build command `npm run build`, output `dist` and build environment `NODE_VERSION=24`. No Functions, Workers or bindings are required. Pages serves the prerendered HTML at extensionless URLs; `404.html` retains the not-found experience. Alternatively upload the built `dist` contents through Direct Upload.
