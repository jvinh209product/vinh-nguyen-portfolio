import { useRef, type CSSProperties } from 'react';
import { ResponsiveImage } from '../ResponsiveImage';
import type { ProjectPreview } from '../../content/types';
import { mediaFraming, projectImages } from '../../content/media';
import { useSurfaceParallax } from '../../lib/use-surface-parallax';

/** Shared full-bleed homepage media; case-study compositions stay intact. */
export function ProjectMedia({ project }: { project: ProjectPreview }) {
  const scope = useRef<HTMLDivElement>(null);
  const framing = mediaFraming[project.slug];
  useSurfaceParallax(scope);
  return <div ref={scope} className={`project-visual project-media visual-${project.slug}`} style={{ '--media-scale': framing.scale } as CSSProperties}>
    <div className="project-media__viewport">
      <ResponsiveImage className="project-media__image"
        src={`/images/projects/${projectImages[project.slug].home}`}
        alt={`${project.name} interface overview`} width={1448} height={1086}
        sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 999px) calc(44.4vw - 15px), (max-height: 649px) calc(44.4vw - 15px), (min-width: 1440px) 624px, 43.2vw"
        loading="lazy" decoding="async" data-project-media="home"
        style={{ objectPosition: framing.position }}/>
    </div>
  </div>;
}
