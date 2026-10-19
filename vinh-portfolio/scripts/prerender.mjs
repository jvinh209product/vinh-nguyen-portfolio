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
const escape = value => String(value).replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[character]));
const urlFor = value => siteUrl ? new URL(value, siteUrl).href : value;
const meta = (name, value, property = false) => '<meta ' + (property ? 'property' : 'name') + '="' + name + '" content="' + escape(value) + '" />';

for (const route of [...routes, '/404']) {
  const metadata = pageMetadata(route);
  const canonical = metadata.canonical ? '<link rel="canonical" href="' + escape(urlFor(metadata.canonical)) + '" />' : '';
  const social = [
    meta('og:type', route.startsWith('/work/') ? 'article' : 'website', true),
    meta('og:site_name', 'Vinh Nguyen', true),
    meta('og:title', metadata.title, true),
    meta('og:description', metadata.description, true),
    meta('twitter:card', metadata.image ? 'summary_large_image' : 'summary'),
    meta('twitter:title', metadata.title),
    meta('twitter:description', metadata.description),
    ...(metadata.canonical ? [meta('og:url', urlFor(metadata.canonical), true)] : []),
    ...(metadata.image ? [meta('og:image', urlFor(metadata.image), true), meta('twitter:image', urlFor(metadata.image))] : []),
    ...(route === '/404' ? [meta('robots', 'noindex')] : []),
  ].join('\n    ');
  const html = template
    .replace(/<title>.*?<\/title>/s, '<title>' + escape(metadata.title) + '</title>')
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, meta('description', metadata.description))
    .replace('<!--route-canonical-->', canonical)
    .replace('<!--route-social-->', social)
    .replace('<div id="root">', '<div id="root" data-prerendered="' + route + '">')
    .replace(/<!--app-start-->[\s\S]*?<!--app-end-->/, await render(route));
  const output = route === '/' ? 'dist/index.html' : 'dist' + route + '.html';
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
  console.log('Prerendered ' + route + ' → ' + output);
}
await rm('.prerender', { recursive: true, force: true });
