# Vinh Nguyen portfolio

The standalone export of the approved portfolio, copied from published version 4 on 5 October 2026. The original content, CSS, project media, React components, GSAP timelines, ScrollTrigger settings, loading percentage, navigation, and interactions are retained.

This is a React + TypeScript + Vite project. It has no dependency on ChatGPT Sites, authentication, databases, object storage, or a hosted application server. The existing live site was not changed during this export.

## Quick start

Install **Node.js 24 LTS** and npm. Extract this ZIP and open a terminal inside the `vinh-portfolio` folder, where `package.json` is located.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To build and inspect the production output:

```sh
npm run build
npm run preview
```

The finished website is in `dist/`. Do not open the HTML files directly with `file://`; use the preview command or a web host.

`package-lock.json` is included. After the first installation, `npm ci` is available for clean, reproducible installations. `npm run check` performs TypeScript validation.

## GitHub and Vercel

1. Create a GitHub repository and upload the **contents** of `vinh-portfolio`, including `src`, `public`, `scripts`, `package.json`, `package-lock.json`, and configuration files. Do not upload `node_modules`, `dist`, or private `.env` files. The included `.gitignore` covers these when using Git.
2. In Vercel, add a new project and import that repository.
3. Select the following settings. If you uploaded the enclosing folder, set the Root Directory to that folder instead.

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Root directory | The directory containing `package.json` |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 24.x |

4. Deploy. The included `vercel.json` supplies the build/output settings and clean URLs.
5. Optionally attach a custom domain in Vercel. Set `VITE_SITE_URL` to its HTTPS origin and redeploy to generate absolute canonical URLs for that domain.

No secrets or environment variables are required for deployment. The project has not been uploaded to your GitHub account or deployed to your Vercel account automatically.

## Cloudflare Pages

Connect the GitHub repository to a **Cloudflare Pages** project. Use build command `npm run build`, output directory `dist`, and set the build environment's `NODE_VERSION` to `24`. There are no Functions, Workers, D1, R2, bindings, or account-specific IDs to configure.

You can also build locally and upload the contents of `dist` using Pages Direct Upload.

Pages serves the generated HTML at extensionless URLs. The generated `404.html` preserves the existing not-found page. A blanket SPA `_redirects` fallback is unnecessary because each current page is built into its own HTML file.

## Routes and page loading

| URL | Production file |
| --- | --- |
| `/` | `dist/index.html` |
| `/about` | `dist/about.html` |
| `/work/debt-ledger` | `dist/work/debt-ledger.html` |
| `/work/mseller` | `dist/work/mseller.html` |
| `/work/beerich` | `dist/work/beerich.html` |
| `/work/moodify` | `dist/work/moodify.html` |
| Not-found page | `dist/404.html` |

The build uses React's built-in server renderer **only at build time** to create static HTML. React then hydrates that HTML in the browser. This preserves immediately available page content, direct-link refreshes, anchors, native document navigation, and the existing CSS cross-document transitions without requiring an application server or adding a router framework.

`src/content/routes.ts` controls the existing routes and metadata. `src/App.tsx` chooses the unchanged page component. `scripts/prerender.mjs` generates the HTML after Vite builds the browser assets. The temporary `.prerender` directory is removed after a successful build. All deployed files remain in the standard Vite `dist` directory.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/App.tsx`, `src/main.tsx` | Portable page selection and React hydration |
| `src/entry-server.tsx` | Build-time HTML rendering only |
| `src/components/portfolio.tsx` | Original homepage, case studies, about page, header and footer |
| `src/components/motion.tsx`, `motion-engine.ts` | Original GSAP, ScrollTrigger, marquee and motion preferences |
| `src/components/readiness.tsx` | Original percentage loader and image fallback behavior |
| `src/components/ledger.tsx` | Original interactive debt-ledger example |
| `src/components/ui` | The existing portable Radix-based UI primitives used by the site |
| `src/content/public.json` | Complete original text and project data |
| `src/styles/globals.css` | Unchanged original site styles and responsive breakpoints |
| `src/vendor` | Existing local UI styles and their license |
| `public/images` | All 48 original image files, including the eight latest PNG replacements |
| `public/favicon.svg` | Original favicon |
| `scripts/prerender.mjs` | Static page generation during the build |
| `vercel.json` | Vercel configuration |

The source layout intentionally retains the original page component rather than splitting or restructuring approved sections. There are no remote image or font dependencies. Fonts remain Arial/Helvetica and Georgia/Times New Roman with the original system fallbacks.

## Environment variables

There are **no required variables, API keys, analytics credentials, or email-service secrets**. Email and LinkedIn links keep their current behavior. Motion preference and one-session loading state continue to use the visitor's browser storage.

The optional public setting below is documented in `.env.example`:

```dotenv
VITE_SITE_URL=https://your-domain.example
```

For local configuration, copy `.env.example` to `.env.local` and set the value only if needed. On Vercel or Cloudflare Pages, use the project's build environment settings. Without it, generated canonical paths are relative and the browser resolves them to the current host. `VITE_` values are included in browser code and must never contain secrets.

## Fidelity and technical migration

- Source of truth: published version 4, commit `b1963b5c0b843299b1c43dee4cace4b443ee7d03`.
- All public assets are preserved byte for byte. No images were generated, resized, recompressed, or retouched.
- Original content, layout CSS, UI primitives, motion code, and loading code are preserved. Sites/Vinext/Cloudflare runtime configuration and unrelated starter dependencies are excluded.
- Native anchor links are retained; navigation is not converted to a different animated router.
- CSS view transitions remain subject to the visitor's browser support, exactly as on the original website. Unsupported browsers use normal navigation.
- The build-time renderer replaces the original runtime rendering. No server bundle, platform credentials, source-control credentials, or private configuration needs to be deployed.

See `VALIDATION.md` for the checks performed on this export and their scope.

## Hosting references

- Vercel clean URLs: https://vercel.com/docs/project-configuration/vercel-json#cleanurls
- Cloudflare Pages routing and custom 404 pages: https://developers.cloudflare.com/pages/configuration/serving-pages/
