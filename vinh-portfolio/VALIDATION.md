# Validation — 6 October 2026

## Build and integrity

- Dependency installation, TypeScript and full Vite client/SSR/prerender build pass on Node 24.19.0 / npm 11.9.0. The complete ZIP was extracted separately; clean `npm ci` and `npm run build` also pass from that packaged source.
- Seven complete static outputs are generated: six pages plus not-found. The temporary SSR directory is removed after building.
- `public.json` is identical to the export. Generated case data equals each original project: Debt Ledger 11 sections, mSeller 11, BeeRich 12, Moodify 10; 44 total.
- All 49 original public assets (48 raster images and favicon) are byte-for-byte identical.
- All 109 local asset/route references across built HTML exist, including responsive candidates. No duplicate PNG image preload is generated.
- Deployable source requires no Sites runtime, authentication, storage bindings, secrets or application server.

## Production browser checks

| Check | Result |
| --- | --- |
| Homepage and About direct access/refresh | Pass |
| Four case routes direct access/refresh | Pass |
| Four homepage mappings | Individually verified in desktop stage |
| Four detail mappings | Individually verified in corresponding pages |
| Desktop media viewport | All four 523.89 × 392.91 px at tested width |
| Mobile media viewport | All four 283 × 212.25 px in 390 px frame |
| Tablet media viewport | All four 278.5 × 208.88 px in 768 px frame |
| Mobile routes | All six checked at 360 px; no document overflow or missing visible images |
| Tablet | Home, About and Moodify checked at 768 px |
| Desktop | About 1363 px browser width; no document overflow |
| Mobile menu | Opens, follows Work link and closes |
| Smooth anchors | Work/Back to top checked; hash and target focus preserved |
| Reduced motion | Disables Lenis/WebGL; System restores full layout |
| Case gallery | Enlarge, zoom, close and nested native-scroll exclusion work |
| Loader | Critical readiness completes independently of 3D/case chunks |
| Final console | No new application errors or ScrollTrigger warnings observed |

Browser-extension metadata errors are unrelated to the app. An earlier development build attempted unsupported WebGL and logged renderer errors; the final capability gate keeps static content and avoids downloading/invoking Three on this browser.

## Correct asset mapping

| Project | Homepage fallback | Detail fallback |
| --- | --- | --- |
| Debt Ledger | `01-home-debtledger.png` | `01-detail-debtledger.png` |
| mSeller | `02-home-mseller.png` | `02-detail-mseller.png` |
| BeeRich | `03-home-beerich.png` | `03-detail-beerich.png` |
| Moodify | `04-home-moodify.png` | `04-detail-moodify.png` |

Responsive candidates derive from exactly these sources. Screenshots, boards and SVG/favicon remain local.

## Remaining Preview gate

No GitHub branch was pushed/merged and the live Vercel site was not changed. The GitHub plugin was installed during delivery, but repository operations were not exposed to this active session. Repository identity and a callable GitHub connection are still needed to create Preview.

Before merging `upgrade/home-motion-3d`, use a GPU-enabled desktop and real phone to check 3D placement/materials, subtle input/scroll response, offscreen/hidden-tab pause, context-loss fallback, actual loading performance and touch scrolling. This environment cannot render WebGL or provide a meaningful GPU/Lighthouse benchmark.
