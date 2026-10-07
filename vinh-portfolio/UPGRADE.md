# Upgrade report — 6 October 2026

This report describes the first upgrade package. The current Sites draft also includes the subsequent Round 2 refinements documented in `ROUND2.md`. Its full-bleed media and input-driven 3D supersede the initial treatments described below. Historical bundle sizes and browser results here are not measurements of Round 2.

Prepared from the complete standalone export, with the live Vercel homepage checked against the recovered structure. Canonical copy and original public assets remain identical. No live site or production branch was changed.

## Changed areas

| Area | Files | Result |
| --- | --- | --- |
| Work images | `work/ProjectMedia.tsx`, `content/media.ts`, `enhancements.css` | One 548:411 viewport, shared spacing, original colors/artwork, small optical scale adjustments and fine-pointer hover |
| Asset delivery | `ResponsiveImage.tsx`, `image-manifest.json`, `optimize-images.mjs`, `public/images/optimized` | Responsive AVIF/WebP, dimensions, original fallback and loading priorities |
| Scroll/motion | `smooth-scroll.ts`, `motion.ts`, `motion.tsx`, `readiness.tsx`, `HomePage.tsx` | Lenis/GSAP synchronization, idle ticker cleanup, native input/history, scoped reveals and coalesced refreshes |
| Hero | `3d/HeroSystem.tsx`, `HeroScene.tsx`, `ProductSystemObject.tsx` | One lazy procedural scene with static fallback, visibility gating and capped DPR |
| Page loading | `route-loader.ts`, `App.tsx`, `main.tsx`, `entry-server.tsx`, `pages`, `split-content.mjs`, `prerender.mjs` | Route chunks and case data split; complete prerendered HTML preserved |
| Shared UI | `Shell.tsx`, `Prose.tsx`, `work/ProjectCover.tsx` | Existing shared content extracted; case/detail compositions retained |

The old `portfolio.tsx` is removed. `public.json` remains the editable source; generated route JSON is committed and regenerated during builds. All six route names and Vercel configuration remain.

The homepage image viewport is now genuinely 4:3, with labels/captions in normal flow. This makes the Work frame taller than the old letterboxed canvas. The left-media/right-copy structure, sticky stage, grid, order and breakpoints remain. Detail hero dimensions/fitting are unchanged.

## Added packages

| Package | Pinned version | Purpose |
| --- | --- | --- |
| `@react-three/fiber` | 9.8.1 | Lazy React/Three rendering |
| `three` | 0.183.2 | Procedural geometry/materials |
| `lenis` | 1.3.26 | Desktop wheel interpolation |
| `sharp` (dev) | 0.35.5 | Offline responsive images |
| `@types/three` (dev) | 0.183.1 | TypeScript types |

Existing package versions remain pinned. Three 0.183.2 avoids the newer Clock deprecation warning in Fiber's clock integration. No Drei, model/texture loaders, postprocessing or router is added. The lockfile is updated.

## Images

62 responsive AVIF/WebP files derive from eight project assets and the portrait. All original files remain intact. Proportions, transparent portrait pixels, UI detail and full compositions are preserved; there is no source cropping or retouching. Only small safe-area CSS scales normalize homepage framing.

| Four-image group | Original bytes | Largest AVIF bytes, combined | 640 px AVIF bytes, combined |
| --- | ---: | ---: | ---: |
| Homepage covers | 10,488,835 | 449,733 | 140,715 |
| Detail covers | 10,892,066 | 528,798 | 129,425 |

Largest AVIF variants reduce those cover files by about 95–96%. These are file-size comparisons, not page-load timings. WebP/original fallback remains available.

## Bundles

Rounded production sizes:

| Bundle | Minified kB | Gzip kB |
| --- | ---: | ---: |
| Bootstrap/React | 208.9 | 65.8 |
| Shared Shell/UI | 142.5 | 47.2 |
| Homepage | 12.8 | 4.3 |
| Responsive image component/manifest | 6.8 | 1.5 |
| Deferred GSAP/ScrollTrigger | 112.9 | 44.4 |
| Deferred Lenis integration | 20.8 | 6.2 |
| Deferred hero renderer | 898.1 | 240.0 |
| Each case route/data | 9.3–11.4 | 3.4–3.9 |
| Shared case renderer | 13.7 | 4.5 |

The static homepage import graph totals about **371.8 kB minified / 117.8 kB gzip** before enhancements. The prior live main JS was 411.2 kB minified. This is a payload comparison, not an LCP benchmark. Case data, GSAP, Lenis and Three load separately. Mobile/reduced/data-saving/unsupported-WebGL visitors never request the renderer.

## Warnings and remaining risks

- Vite flags the lazy renderer above 500 kB minified. The warning remains visible; eligible desktop visitors still download roughly 240 kB gzip for 3D.
- npm prints a workspace-level `http-proxy` configuration warning. Installs/builds succeed.
- The QA browser disables WebGL. Its static fallback/capability gate were tested; interactive materials, GPU frame timing and offscreen rendering still require a GPU-enabled Vercel Preview. Demand scheduling and cleanup were reviewed in source.
- No Lighthouse score, real-phone touch benchmark or universal 60 fps is claimed. Check Preview on a mid-range phone and normal network conditions.
- Existing CSS document transitions depend on browser support.

Apply on `upgrade/home-motion-3d`, run `npm ci` and `npm run build`, then push for Vercel Preview. Remove obsolete `src/components/portfolio.tsx` when replacing old files. Do not merge into `main` before visual Preview review.
