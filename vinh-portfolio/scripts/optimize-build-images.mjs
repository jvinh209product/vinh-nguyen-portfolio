import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Process only the canonical V2.2 mockups. Existing Work assets/variants stay intact.
const config = await readFile('src/content/builds.ts', 'utf8');
const match = config.match(/export const builds: readonly BuildPreview\[\] = (\[[\s\S]*?\]);/);
if (!match) throw new Error('Could not read the authored build media configuration.');
const builds = JSON.parse(match[1]);
const assets = [...new Map(builds.flatMap(build => [build.media, build.detailMedia, ...build.supportingMedia])
  .map(asset => [asset.src, asset])).values()];
const output = 'public/images/optimized';
await mkdir(output, { recursive: true });
const manifest = JSON.parse(await readFile('src/content/image-manifest.json', 'utf8'));
const result = { sources: assets.length, variants: 0, sourceBytes: 0, mobileAvifBytes: 0 };

for (const asset of assets) {
  if (!asset.src.startsWith('/images/builds/v2-2/')) throw new Error('Unexpected source: ' + asset.src);
  const input = await readFile('public' + asset.src);
  const metadata = await sharp(input).metadata();
  if (metadata.width !== asset.width || metadata.height !== asset.height) throw new Error('Wrong intrinsic dimensions: ' + asset.src);
  result.sourceBytes += input.length;
  const widths = [...new Set([480, 768, 1200, metadata.width].filter(width => width <= metadata.width))];
  const files = { avif: [], webp: [] };
  const stem = path.basename(asset.src, path.extname(asset.src));
  for (const width of widths) {
    const resized = sharp(input).keepIccProfile().resize({ width, withoutEnlargement: true });
    const [avif, webp] = await Promise.all([
      resized.clone().avif({ quality: 80, effort: 3, chromaSubsampling: '4:4:4' }).toBuffer(),
      resized.clone().webp({ quality: 92, effort: 4 }).toBuffer(),
    ]);
    for (const [format, bytes] of [['avif', avif], ['webp', webp]]) {
      const filename = 'v22-' + stem + '-' + width + '.' + format;
      await writeFile(path.join(output, filename), bytes);
      files[format].push('/images/optimized/' + filename + ' ' + width + 'w');
      result.variants++;
    }
    if (width === widths[0]) result.mobileAvifBytes += avif.length;
  }
  manifest[asset.src] = {
    width: metadata.width, height: metadata.height,
    avifSrcSet: files.avif.join(', '), webpSrcSet: files.webp.join(', '),
  };
  console.log(stem + ': ' + metadata.width + '×' + metadata.height + '; AVIF + WebP at ' + widths.join('/'));
}
await writeFile('src/content/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(result));
