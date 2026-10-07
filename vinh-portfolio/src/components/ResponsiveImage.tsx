import type { ImgHTMLAttributes } from 'react';
import manifest from '../content/image-manifest.json';
import { ReliableImage } from './readiness';

type ImageAsset = { width: number; height: number; avifSrcSet: string; webpSrcSet: string };
export function ResponsiveImage({ src = '', sizes = '100vw', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const asset = (manifest as Record<string, ImageAsset>)[src];
  if (!asset) return <ReliableImage src={src} {...props}/>;
  return <picture className="responsive-picture">
    <source type="image/avif" srcSet={asset.avifSrcSet} sizes={sizes}/>
    <source type="image/webp" srcSet={asset.webpSrcSet} sizes={sizes}/>
    <ReliableImage width={asset.width} height={asset.height} {...props} src={src} srcSet={asset.webpSrcSet} sizes={sizes}/>
  </picture>;
}
