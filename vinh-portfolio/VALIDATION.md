# Export validation

Validated on 5 October 2026 against the source of published portfolio version 4, commit `b1963b5c0b843299b1c43dee4cace4b443ee7d03`.

## Source and asset preservation

- All 49 original public assets match the published source byte for byte: 48 images and the favicon SVG. All 48 raster images were opened and decoded successfully.
- The 18 retained original source files match byte for byte, including the complete portfolio component, content JSON, stylesheet, GSAP code, loading logic, debt example, required UI primitives, utility code, and vendor styles/license.
- No case-study text was rewritten or shortened. The four case studies retain 44 story sections in total.
- No generated or substitute images were introduced. The eight current image assignments were verified separately in the browser:

| Project | Homepage asset | Detail hero asset |
| --- | --- | --- |
| Debt Ledger | `01-home-debtledger.png` | `01-detail-debtledger.png` |
| mSeller | `02-home-mseller.png` | `02-detail-mseller.png` |
| BeeRich | `03-home-beerich.png` | `03-detail-beerich.png` |
| Moodify | `04-home-moodify.png` | `04-detail-moodify.png` |

These are the filenames actually used by the current published version. Images remain centered with `object-fit: contain`. The original image containers, backgrounds, labels, and captions are preserved.

## Installation and build

| Check | Result |
| --- | --- |
| Initial `npm install` | Passed |
| Clean `npm ci` using the included lockfile | Passed |
| `npm run dev` and loading the transformed entry module | Passed |
| `npm run build` after clean installation | Passed |
| TypeScript validation / imports | Passed as part of the build |
| Static HTML generation | Six normal pages plus `404.html` |
| Local asset, internal route, and anchor references in generated HTML | No missing targets |
| Platform runtime dependencies | No Sites, Vinext, D1, R2, authentication, or platform API dependency |

Validation used Node.js 24 and npm 11. The lockfile resolves packages from the public npm registry. Dependency versions are pinned. No private environment file or credential is included.

## Browser checks

The production output was opened in Chromium, with direct navigation to every case-study route and a direct refresh of a case-study page. The homepage, About page, and not-found page also rendered successfully.

- Desktop viewport: 1363 × 936. The selected-work visual measured 581.109375 × 435.828125 CSS pixels and the detail hero measured 1195.375 × 672.390625, matching the existing version at that viewport.
- All six pages were checked in 390-pixel mobile and 768-pixel tablet viewport frames. Their document scroll widths matched their client widths, with no horizontal page overflow. A 360-pixel viewport was also used to check navigation and the About page.
- The mobile navigation opened and its About link navigated successfully.
- GSAP initialized in full-motion mode. Scrolling switched the sticky selected-work image through Debt Ledger, mSeller, BeeRich, and Moodify; the header height changed to its existing 78-pixel scrolled state.
- The marquee moved, and its pause/resume controls changed state correctly. Reduced-motion selection persisted across navigation and disabled marquee motion. Full motion could be restored.
- Gallery notes expanded; the image viewer opened, enlarged the image, and closed with Escape.
- The debt example applied a payment to produce VND 600,000 outstanding and kept that balance unchanged for a duplicate notification.
- The loading overlay settled without blocking page content. Its original percentage progression, timing, cache/session behavior, and fallback logic are unchanged in source.

## Scope

The migration changed the build system and page bootstrap, replacing the hosted runtime with Vite browser assets and build-time static HTML. It did not change the live Site or its repository.

Browser checks covered Chromium and representative desktop/mobile/tablet widths; they are not an exhaustive test of every browser or physical device. Native view-transition support and font rasterization remain browser/OS dependent. The rapid iframe navigation checks produced one browser-native aborted view-transition notification; subsequent pages and interactions loaded correctly.

Vercel and Cloudflare Pages routing configurations follow their documented static HTML behavior. This export has not been deployed to an external hosting account, so domain, DNS, and provider-account deployment checks remain for the actual deployment. No access to ChatGPT Sites is required to install, build, or host this project.
