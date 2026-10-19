import { useRef } from 'react';
import { Maximize2 } from 'lucide-react';
import { ResponsiveImage } from '../ResponsiveImage';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useSurfaceParallax } from '../../lib/use-surface-parallax';
import type { BuildImage, BuildPreview } from '../../content/builds';
import { BuildSignature, useBuildSignature } from './BuildSignature';

/** Finished photographic mockups are kept intact; motifs remain in a separate rail. */
export function BuildMedia({ build, entry = false, viewer = false, media: suppliedMedia, signature = true }: {
  build: BuildPreview; entry?: boolean; viewer?: boolean; media?: BuildImage; signature?: boolean;
}) {
  const scope = useRef<HTMLDivElement>(null);
  useSurfaceParallax(scope, { maxX: 2, maxY: 2 });
  useBuildSignature(scope, build.kind);
  const media = suppliedMedia || (viewer ? build.detailMedia : build.media);
  const role = entry ? 'detail-hero' : suppliedMedia ? 'supporting' : 'home';
  const sizes = entry ? '(min-width: 1024px) 50vw, (min-width: 768px) 92vw, calc(100vw - 40px)' :
    suppliedMedia ? '(min-width: 1024px) calc(88vw - 280px), (min-width: 768px) 92vw, calc(100vw - 40px)' :
    '(min-width: 1024px) calc((88vw - 40px) / 2), (min-width: 768px) 92vw, calc(100vw - 40px)';
  const visual = <div className="build-media-shell" ref={scope} data-media-role={role} data-media-source={media.src}>
    <div className="build-media" style={{ aspectRatio: media.width + ' / ' + media.height }}>
      <div className="build-media__scene">
        <ResponsiveImage src={media.src} alt={media.alt} width={media.width} height={media.height}
          style={{ objectPosition: media.position }} sizes={sizes}
          loading={entry ? 'eager' : 'lazy'} fetchPriority={entry ? 'high' : 'auto'}
          decoding="async" data-entry-media={entry ? 'true' : undefined}/>
      </div>
    </div>
    {signature && <BuildSignature kind={build.kind}/>}
  </div>;
  if (!viewer) return <div className="build-cover-media">{visual}<p className="build-media-caption">{media.caption}</p></div>;
  return <figure className="build-capture"><Dialog>
    <DialogTrigger asChild><button className="build-media-button" aria-label={'Enlarge ' + build.name + ' supplied product mockup'}>
      {visual}<span className="build-enlarge"><Maximize2 size={15}/> Enlarge mockup</span>
    </button></DialogTrigger>
    <DialogContent className="screen-dialog build-image-dialog" data-lenis-prevent>
      <DialogTitle>{build.name} — supplied product mockup</DialogTitle>
      <DialogDescription>{media.alt}</DialogDescription>
      <div className="viewer-image board-viewer" tabIndex={0} role="region" aria-label={'Enlarged ' + build.name + ' supplied product mockup'}>
        <ResponsiveImage src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="90vw"/>
      </div>
    </DialogContent>
  </Dialog><figcaption>{media.caption}</figcaption></figure>;
}
