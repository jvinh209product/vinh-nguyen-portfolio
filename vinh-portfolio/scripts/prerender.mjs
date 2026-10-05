import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { loadEnv } from 'vite';
import { render, routes, pageMetadata } from '../.prerender/entry-server.js';

const template = await readFile('dist/index.html', 'utf8');
const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env };
let siteUrl = env.VITE_SITE_URL?.trim();
if (siteUrl) {
  const url = new URL(siteUrl);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('VITE_SITE_URL must use http or https.');
  siteUrl = url.origin;
}
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

for (const route of [...routes, '/404']) {
  const metadata = pageMetadata(route);
  const canonical = metadata.canonical
    ? `<link rel="canonical" href="${escape(siteUrl ? new URL(metadata.canonical, siteUrl).href : metadata.canonical)}" />`
    : '';
  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escape(metadata.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(metadata.description)}" />`)
    .replace('<!--route-canonical-->', canonical)
    .replace('<div id="root">', `<div id="root" data-prerendered="${route}">`)
    .replace(/<!--app-start-->[\s\S]*?<!--app-end-->/, render(route));
  const output = route === '/' ? 'dist/index.html' : `dist${route}.html`;
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
  console.log(`Prerendered ${route} → ${output}`);
}

await rm('.prerender', { recursive: true, force: true });
