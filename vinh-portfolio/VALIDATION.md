# Latest published portfolio export — validation

**Exported source:** published Version 10, commit `e68d03bf4a6fb8bd24940fe0023259be75759cf8`.

**Publication status verified: YES.** The complete available saved-version history and its publication statuses identify the most recent successful production deployment matching the current live URL. Its immutable source commit was checked out and archived. No later draft was present. Older saved-only versions were excluded. The Site was not modified, saved, published or republished.

**Export timestamp:** 2026-10-14T08:27:21.254933+00:00 UTC / 2026-10-14T15:27:21.254933+07:00 Asia/Saigon.

## Actual checks

| Check | Result | Evidence |
| --- | --- | --- |
| ZIP root and completeness | PASS | Application root is ZIP root; matching package/lock/config/build scripts/source/assets/docs included |
| ZIP integrity | PASS | ZIP CRC test; complete extraction and file hash checks |
| Clean installation | PASS | `npm ci`, 163 packages, Node v24.19.0 / npm 11.9.0 |
| TypeScript | PASS | `npm run check` / `tsc --noEmit` |
| Production build/prerender | PASS | `npm run build`; client + build-time SSR + 11 discovered HTML outputs |
| Source preservation | PASS | 364 application/configuration/asset files match the published commit byte-for-byte |
| Public Site parity | PASS | All 11 live route responses contain matching prerender markers; complete authored root markup and SEO metadata match the clean export |
| Route/asset references | PASS | 763 local references checked; none missing |
| Optimized manifest | PASS | 236 unique source/variant references present in both public source and built output |
| Demo link mappings | PASS | Canonical live URLs preserved; Home and both detail actions point to the correct external product; internal links remain internal |
| Portable runtime | PASS | Build uses only standard npm tools; no Sites imports/APIs/storage, absolute internal paths or credentials required |
| Browser visual/interaction QA | NOT VERIFIED | Supported browser control unavailable; rendered bounds, mobile overflow, keyboard playback, GSAP/Lenis/3D behavior were not browser-tested |
| Development browser smoke | NOT VERIFIED | No preview server started without supported browser control |
| Vercel deployment/settings | NOT VERIFIED | Export only; no deployment, dashboard or production-domain inspection |
| Cloudflare Pages deployment | NOT VERIFIED | Compatibility documentation included; no deployment performed |

## Discovered route inventory

| Route | Generated HTML | Match to live markup/SEO |
| --- | --- | --- |
| `/` | PASS | PASS |
| `/about` | PASS | PASS |
| `/work/debt-ledger` | PASS | PASS |
| `/work/mseller` | PASS | PASS |
| `/work/beerich` | PASS | PASS |
| `/work/moodify` | PASS | PASS |
| `/work/betterbet` | PASS | PASS |
| `/work/pulse-city` | PASS | PASS |
| `/work/ship-it` | PASS | PASS |
| `/work/gieo` | PASS | PASS |
| `/404` | PASS | PASS |

`/404` retains the published not-found content and `noindex` metadata; its explicit current Site URL returns HTTP 200, matching the existing implementation. Unknown-path response behavior after Vercel deployment remains for Preview verification. No blanket SPA rewrite, new robots file or invented sitemap was added.

## External products checked

| Product | HTTP status | Exact current source URL |
| --- | --- | --- |
| BETTERBET. | 200 | https://betterbet-lab.vercel.app/ |
| PULSE CITY | 200 | https://pulse-city-three.vercel.app/ |
| SHIP IT! | 200 | https://pmshipit-pmshipit.vercel.app/ |
| GIEO. | 200 | https://gieo-gieo.vercel.app/ |

These are HTTP/title and rendered-link checks, not visual verification of the external products. LinkedIn/email links are preserved and reference-audited; LinkedIn authentication/contact delivery was not tested. The products' repositories are not bundled.

## Preservation and export-only differences

- No runtime, component, copy, style, media, dependency, lockfile or routing configuration was rewritten.
- Private `.openai/hosting.json` was omitted. Historical Sites/upgrade notes were omitted to avoid stale handoff instructions.
- `README.md` and this report were refreshed; `DEPLOYMENT.md` and `EXPORT-MANIFEST.json` were added.
- All 277 public assets, including 208 optimized variants and 28 image-manifest entries, remain intact. No media was omitted or regenerated.
- Shared compiled CSS rules have identical definitions. Three unused utilities originally discovered from old notes are absent from the initial clean stylesheet; none is used in published markup or TSX classes. Build hashes may differ while the authored experience remains intact.

## Non-blocking warnings and limits

- The unchanged deferred HeroScene chunk exceeds Vite's 500 kB advisory. No motion/3D refactor was attempted.
- The host npm environment warns about its `http-proxy` setting; installation and build completed successfully.
- Actual Vercel Project settings, Production Branch, canonical environment value and domains were not inspected. Use the existing project and verify its Preview before merging.
- The final ZIP is checked again after validation documentation is finalized. Reports describe the frozen application payload; final clean commands and file-hash checks are retained with this export's verification record.

No GitHub push/merge or Vercel deployment occurred.
