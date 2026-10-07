# UI / interaction Round 2 — existing Sites draft

Implementation reference: `PORTFOLIO_UI_INTERACTION_ROUND2_UPDATE(1).md`. Baseline: unpublished Sites version 5 (`06fe3f326ce32cac1e926b3a10155defa6734c81`). This is an incremental update to the same Site. Publication requires the owner's explicit approval.

## Changes

- Hero: remove the forced break in “Complex domains.”, retain the existing font scale, and keep each phrase on its own desktop line. An approximately 0.93-second GSAP sequence starts after critical-content readiness. Nothing is hidden in server HTML or held back for 3D. The former generic homepage reveal is removed to avoid double animation; other page entrances remain.
- CTA: reusable `CTA` preserves anchor/button semantics, destinations, handlers, default colors, dimensions and labels. A warm yellow or light sage layer wipes left to right behind a clipped, high-contrast duplicate label. The duplicate is hidden from assistive technology. Focus stays visible, touch has an immediate pressed state, and reduced motion disables transitions.
- Portrait depth: two faint procedural SVG panels reinforce the existing rings/nodes. Pointer translation is capped at 8/6 px, scroll depth at 12 px; the portrait remains stable. Tablet/mobile remove the secondary plane and pointer motion.
- Work: `ProjectMedia` renders all four original homepage images edge to edge inside the same 4:3 frame, with no inserted titles/captions or colored padding. Case-study hero compositions remain untouched. Framing configuration is centered at scale 1 at rest. Fine desktop pointer hover adds only 2.5% zoom and at most 4/3 px translation.
- Different Domains: shared conceptual SVG objects and concise summaries replace the reading wall. Native details retain every original explanation, question and project link. Hover/focus previews, pointer pinning, native keyboard toggling, touch toggling and a no-JS fallback keep supporting content accessible. Native open/close works even where smooth intrinsic-height interpolation is unsupported.
- Motion/performance: shared 0.28/0.55/0.85-second timing and power3 easing. Event-driven parallax coalesces at most one pending frame. Three renders only while input changes or transforms settle; it no longer runs an idle spin loop. Offscreen/hidden/reduced-motion gating, lazy renderer/Lenis/route imports, readiness, existing AVIF/WebP variants and native touch scrolling remain. Domain expansion requests the existing coalesced ScrollTrigger layout refresh.

No new packages, image downloads, image generation, WebGL canvases, models, textures, fonts or runtime services are added. Canonical copy, all complete case studies, navigation/order and the six routes stay intact. Original image files and their committed responsive variants stay unchanged.

## Verification

TypeScript and the supported Sites production build pass. All six routes plus the 404 HTML are generated. The 110 distinct local route/asset references resolve, all eight homepage/detail mappings match the expected project, and all four homepage images are lazy-loaded with the correct 1448×1086 intrinsic dimensions. The full canonical JSON, all 44 case-study sections, generated case data, all public files, lockfile/dependency inputs, core stylesheet, routing and hosting identity are unchanged. Accessible visible text on About and the four case pages matches the version 5 build after excluding decorative SVG and aria-hidden CTA duplicates. Every full domain explanation/question remains in the server-rendered document.

Unit simulations exercise the actual parallax hook and Three component's frame callback: input bounds, one-frame coalescing, idle, visibility, offscreen, reduced-motion/data-saving/coarse-pointer gates and listener cleanup pass. Three settles in 47–53 simulated 60 Hz frames and schedules no more work while idle or inactive. Actual domain handlers pass hover/leave, pointer pin/toggle, keyboard activation, touch toggle and layout-refresh simulations. These are source-level tests, not browser or GPU tests. A font-metric estimate fits both desktop lines at 1000/1024/1100/1280/1440/1920 px; actual browser layout still needs review.

Production chunks retain independent GSAP (~44.4 kB gzip), Lenis (~6.2 kB) and Three (~240.0 kB) imports; none enters the homepage's static graph. Homepage code is ~6.9 kB gzip, shared Shell ~47.3 kB, CSS ~18.2 kB. The existing >500 kB lazy Three chunk warning and workspace npm http-proxy configuration warning remain; both builds succeed. These payload measurements do not establish rendering speed or an LCP score.

This session has no user-facing Sites Preview operation, and the managed browser skill required by Sites is unavailable. No preview server is started. Round 2 desktop/tablet/mobile rendering, hover/focus/tap, real GPU appearance/performance, browser console errors and image delivery on a live host are **not browser-verified**. Historical first-upgrade browser checks do not cover these new interactions. No Lighthouse or real-device performance score is claimed.

The only progressive simplification is native immediate disclosure on browsers without intrinsic-height interpolation. Low-capability, data-saving, reduced-motion and mobile environments use the existing static decorative fallback and native scroll. No feature is removed to accommodate Sites.

## Publication

Save the exact source/build as an unpublished version only. Do not call any deployment operation or change the existing project ID, audience, slug or public URL. Saving the draft does not generate or imply a reviewable hosted Preview.
