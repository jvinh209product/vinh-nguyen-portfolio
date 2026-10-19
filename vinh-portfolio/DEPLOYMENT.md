# Deploy this export through the existing GitHub and Vercel project

This is documentation only. No repository, branch, pull request, Vercel project or deployment was created by the export.

## Verified source and repository locations

- Export: published portfolio Version 10, source commit `e68d03bf4a6fb8bd24940fe0023259be75759cf8`.
- Repository: https://github.com/jvinh209product/vinh-nguyen-portfolio
- Read-only GitHub `main` inspection at 2026-10-14T08:11:46.565Z: commit `0f163d7e8563d3f16ab161f1ae55712cbce842b3`; application folder **`vinh-portfolio/`** confirmed.
- ZIP root: `package.json`, `src/`, `public/`, and `scripts/` directly at root.
- Existing repository `vinh-portfolio/vercel.json` matches this export's configuration.
- Vercel dashboard, actual Project/Root Directory/Production Branch, domains and environment variables: **NOT INSPECTED**. Confirm these before integrating; retain the existing project and domains.

## Recommended update path

1. Download and extract the ZIP outside the repository. Confirm `package.json` is immediately visible. Recheck the repository's latest `main`; it may have changed since this export.
2. Create a new branch from the latest `main`, suggested **`upgrade/latest-published-portfolio-sync`**. Do not upload directly onto `main`.
3. Copy the ZIP's **contents into the existing `vinh-portfolio/` directory**. Include `.env.example`, `.gitignore` and `.nvmrc`. The correct result is `vinh-portfolio/package.json`; avoid `vinh-portfolio/vinh-portfolio/package.json`. Protect repository `.git/`, existing private `.env` files and unrelated files outside this application folder. Never commit private `.env` files.
4. Review the diff. GitHub web uploads replace matching files but **do not delete old tracked files**. Compare the manifest's included file inventory with the old application. Review obsolete/renamed files individually and remove those no longer needed as part of this branch; do not delete the whole repository or `main` folder. The comparison at export time found these old paths absent from the export:

- `ROUND2.md`
- `UPGRADE.md`

5. Run the commands below from `vinh-portfolio/`. Commit the complete application and lockfile on the new branch, then push that branch yourself. Preserve the production `main` branch until review.

```sh
npm ci
npm run check
npm run build
```

6. If the existing Vercel project is connected to this repo, open its branch Preview deployment. Confirm the **actual Preview URL** in Vercel; none is supplied or fabricated by this export.
7. Review every route in the manifest. Check direct refresh, correct case images, internal Prev/Next/Back links, compact original-app Next Case CTAs, footer action alignment, all outbound URLs, image viewers, keyboard/focus behavior, desktop/mobile layouts, reduced motion, loader, GSAP/Lenis/3D and per-page SEO/404. Check at least desktop 1440/1920px and mobile 390px in a real browser. Investigate actual regressions before merging; the export's build checks do not prove browser playback or a Vercel deployment.
8. Open a PR into `main`, review it, and **merge only after approval**. Let the **existing Vercel project** deploy its configured Production Branch. Verify the existing production domain and route behavior after deployment. Do not create a new project, rename domains or force-push `main`.

## Expected configuration from the actual source

| Setting | Value / check |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `vinh-portfolio` in this repository; confirm the existing dashboard setting |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output Directory | `dist` |
| Node version | 24.x from `.nvmrc`; package engine `>=22.13.0` |
| Routing | Existing `cleanUrls: true`, `trailingSlash: false`; route-specific prerendered HTML |
| Environment | No required secrets; optional public `VITE_SITE_URL` |
| Production Branch | Confirm existing setting; intended handoff targets `main` after approval |
| Production domain/canonical | Confirm existing Vercel domain; unset canonical build value produces relative paths |

The GitHub directory name is **not** an asset URL prefix: do not change Vite `base` to `/vinh-portfolio/`. Do not add a blanket SPA rewrite; it would bypass the intended route HTML/metadata.

## Rollback

Record the previous production deployment and approved merge commit before release. If necessary, restore the previous successful deployment through the existing Vercel project's deployment controls, keeping its domains. For a source rollback, create a branch from current `main`, revert the reviewed merge/change, open a PR and deploy the approved revert. Avoid force-pushing or destructive resets of shared `main`.
