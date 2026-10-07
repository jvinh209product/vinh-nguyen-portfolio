# Validation — ChatGPT Sites unpublished version 6 / Round 2

## Exported source

This complete project represents **ChatGPT Sites unpublished version 6 / Round 2**.

- Exact source commit: `3ac0219add70c5bfc4faf78941c0f2575e64eea2`.
- Saved version: `appgprj_6aaeb1ee32d48191857cc844aabc9f2e~appgver_45c3e524fd508191b9f2bfa470686ab8`.
- Native version history confirms version 6 has no deployment. Published version 4 remains at commit `b1963b5c0b843299b1c43dee4cace4b443ee7d03` with its existing deployment and public URL.
- Exported directly from the version 6 Git commit, not from the published website, a remembered design, or a deployment-only archive.
- 182 application, configuration, content, license and asset files match the source commit byte for byte. `EXPORT-MANIFEST.json` records every source hash and the documented export-only exceptions.

The unused `.openai/hosting.json` and Sites workflow note `SITES-DRAFT.md` are omitted. README and this report are updated for independent hosting; `EXPORT-MANIFEST.json` is added. Application code, package versions, lockfile, Vite/TypeScript/Vercel configuration, metadata, styles and assets are unchanged. No runtime feature was replaced or removed.

## Clean installation and build

Test environment: Node.js 24.19.0, npm 11.9.0, Linux. `.nvmrc` specifies 24; package engines require Node >=22.13.0.

| Check | Result |
| --- | --- |
| Clean dependency install | Pass; 163 packages installed from the public npm registry into an initially empty dependency directory |
| TypeScript | Pass; `tsc --noEmit` is part of the production build |
| Vite client build | Pass |
| Vite build-time server renderer | Pass |
| Static prerender | Pass; all seven required HTML files generated |
| Temporary renderer cleanup | Pass; `.prerender` is removed after prerendering |
| Development CLI | Pass; `npm run dev -- --help` resolves Vite 8.0.13; no development server or browser test was started |

The clean install used `npm ci --no-audit --no-fund --fetch-retries=0 --fetch-timeout=30000`. These flags only control networking and install output; the lockfile, versions and install lifecycle remain unchanged. The build used ordinary `npm run build`, without any Sites helper, authentication, hosting manifest or platform service.

Normal use after extraction:

```sh
npm ci
npm run dev
npm run build
```

`node_modules` and generated `dist` are intentionally excluded from the source ZIP. All dependency declarations and the complete npm lockfile are included.

## Routes, refresh behavior and content

| Route | Complete prerendered file | Result |
| --- | --- | --- |
| `/` | `dist/index.html` | Pass |
| `/about` | `dist/about.html` | Pass |
| `/work/debt-ledger` | `dist/work/debt-ledger.html` | Pass |
| `/work/mseller` | `dist/work/mseller.html` | Pass |
| `/work/beerich` | `dist/work/beerich.html` | Pass |
| `/work/moodify` | `dist/work/moodify.html` | Pass |
| `/404` | `dist/404.html` | Pass |

All pages contain their actual prerendered content, correct titles/descriptions and route markers. Canonical metadata behavior is preserved, including optional `VITE_SITE_URL`. All 110 distinct local route/asset references and referenced anchor targets resolve. No imports or required files are missing. All 44 case-study sections remain: Debt Ledger 11, mSeller 11, BeeRich 12, Moodify 10. Generated case data matches the complete canonical copy.

Vercel retains `framework: vite`, `buildCommand: npm run build`, `outputDirectory: dist`, `cleanUrls: true` and `trailingSlash: false`. Each case URL maps to its own HTML file, so direct refresh requires no blanket SPA rewrite or manual route changes. The same static HTML structure remains compatible with Cloudflare Pages. No remote deployment or hosted-browser refresh test was performed during this export.

Pass: all 135 generated production files are byte-for-byte identical to the saved version 6 build, excluding only unused Sites hosting metadata. This includes the generated pages, client assets and public assets.

## Images and visual assets

All 111 public assets are included and match version 6: 48 original raster images, the favicon and 62 optimized AVIF/WebP variants. The responsive image manifest and offline Sharp optimization script are included. No image was regenerated, retouched, substituted or re-encoded during this export.

| Project | Homepage image | Detail image |
| --- | --- | --- |
| Debt Ledger | `01-home-debtledger.png` | `01-detail-debtledger.png` |
| mSeller | `02-home-mseller.png` | `02-detail-mseller.png` |
| BeeRich | `03-home-beerich.png` | `03-detail-beerich.png` |
| Moodify | `04-home-moodify.png` | `04-detail-moodify.png` |

All eight mappings are individually checked in generated HTML. Project assets live in `public/images/projects`; the portrait is `public/images/vinh-portrait.webp`; committed variants live in `public/images/optimized`. Nine primary source images have responsive variants: four homepage covers, four detail covers and the portrait. Original aspect ratios, loading priorities, intrinsic dimensions and fallback formats are retained. Four homepage cover AVIFs total 140,715 bytes at 640 px, versus 10,488,835 bytes for the originals. Four detail cover AVIFs total 129,425 bytes at 640 px, versus 10,892,066 bytes for their originals.

SVG domain forms and hero planes, procedural 3D geometry and materials remain in the exact component source. Lucide icons are supplied by the pinned dependency and bundled at build time. There are no omitted model/texture files or local font files: the current font stacks use Arial/Helvetica and Georgia/Times/system fallbacks.

## Animations and performance

Version 6 behavior is retained:

- Desktop “Complex domains.” on one line, its separate “Clear experiences.” line and readiness-gated hero entrance.
- Stable portrait with restrained geometric depth, pointer response and scroll parallax.
- Shared warm/sage CTA wipe, synchronized label clipping, legible contrast and focus states.
- Four full-bleed 4:3 Work panels, original project order, focal configuration, hover scaling and bounded pointer parallax.
- Concise domain summaries, shared SVG concepts, full supporting explanations and native details with hover/focus/tap access.
- Existing GSAP/ScrollTrigger lifecycle, marquee controls, sticky Work stage, thinking sequence, page transitions and percentage readiness overlay.
- Lenis only on suitable desktop pointers, shared ticker only while scrolling, native touch/keyboard/history/dialog behavior and cleanup.
- Lazy Three/R3F renderer, WebGL2 capability check, capped DPR, static mobile/reduced-motion/data-saving fallback, demand frames that stop after transforms settle and offscreen/tab visibility gating.
- Existing route/data splitting, locally stored AVIF/WebP candidates, reserved media dimensions, lazy below-fold imagery and high-priority portrait.

No packages or versions were added/changed. The initial homepage graph still excludes Three, GSAP, Lenis and case-study renderer/data chunks. Three is approximately 240 kB gzip and remains an optional deferred desktop enhancement.

The prior Round 2 source-level motion simulations passed bounds, one-frame coalescing, input settling, idle/inactive behavior, visibility, device/reduced-motion gates, disclosure handlers and listener cleanup. This export keeps that implementation unchanged. New browser, touch-device, GPU or Lighthouse tests were not performed; no visual review or frame-rate score is claimed.

## Warnings, portability and safety

- Vite retains its existing warning for the optional Three chunk above 500 kB minified. Builds complete successfully; the chunk remains deferred and is not requested by ineligible environments.
- npm reports the execution workspace's `http-proxy` configuration warning. That configuration is not part of the exported project; installation and builds succeed.
- Smooth disclosure height interpolation and CSS document transitions remain progressive enhancements. Existing native disclosure/static alternatives remain as in version 6.
- No Sites runtime, Sites API, ChatGPT authentication, D1/R2 binding, unpublished hosting URL, remote asset service or server deployment is needed. Omitted hosting metadata was configuration only; no visible feature required substitution.
- No secrets are included. `.env.example` documents only optional public `VITE_SITE_URL`; private environment files and Git credentials/history are excluded.
- This export did not publish a Site, create a Site, change the existing Site/source or URL, push to GitHub, create/modify a GitHub branch or merge into `main`. Intended repository: `jvinh209product/vinh-nguyen-portfolio`; intended review branch: `upgrade/home-motion-3d`.
