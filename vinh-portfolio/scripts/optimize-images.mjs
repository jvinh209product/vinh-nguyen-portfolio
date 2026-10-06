import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projects = ['01-home-debtledger', '02-home-mseller', '03-home-beerich', '04-home-moodify', '01-detail-debtledger', '02-detail-mseller', '03-detail-beerich', '04-detail-moodify'];
const sources = [...projects.map(name => `/images/projects/${name}.png`), '/images/vinh-portrait.webp'];
const output = 'public/images/optimized';
await mkdir(output, { recursive: true });
const manifest = {};
let originalBytes = 0, desktopBytes = 0, mobileBytes = 0;

// Never crop, retouch, or overwrite the approved originals. 4:4:4 keeps small
// coloured UI text sharp; dimensions are capped at the source's actual width.
for (const source of sources) {
  const buffer = await readFile(`public${source}`);
  const metadata = await sharp(buffer).metadata();
  const widths = source.includes('portrait') ? [400, 640, 800]
    : source.includes('-home-') ? [640, 960, 1448] : [640, 960, 1440, 1672];
  const name = path.parse(source).name;
  const files = { avif: [], webp: [] };
  originalBytes += buffer.length;
  for (const width of widths.filter(width => width <= metadata.width)) {
    const resized = sharp(buffer).resize({ width, withoutEnlargement: true });
    const avif = await resized.clone().avif({ quality: 72, effort: 4, chromaSubsampling: '4:4:4' }).toBuffer();
    const webp = await resized.clone().webp({ quality: 92, effort: 6 }).toBuffer();
    for (const [format, result] of [['avif', avif], ['webp', webp]]) {
      const filename = `${name}-${width}.${format}`;
      await writeFile(path.join(output, filename), result);
      files[format].push(`/images/optimized/${filename} ${width}w`);
    }
    if (width === widths[0]) mobileBytes += avif.length;
    if (width === widths.at(-1)) desktopBytes += avif.length;
  }
  manifest[source] = {
    width: metadata.width, height: metadata.height,
    avifSrcSet: files.avif.join(', '), webpSrcSet: files.webp.join(', '),
  };
  console.log(`${name}: ${metadata.width}×${metadata.height}; ${widths.join('/')} px, AVIF + WebP`);
}
await writeFile('src/content/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ originalBytes, desktopAvifBytes: desktopBytes, mobileAvifBytes: mobileBytes }));
