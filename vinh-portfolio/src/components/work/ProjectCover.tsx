import { ArrowUpRight } from 'lucide-react';
import { ResponsiveImage } from '../ResponsiveImage';
import type { ProjectPreview } from '../../content/types';
import { projectImages } from '../../content/media';
export function ProjectCover({project:p,hero=false}:{project:ProjectPreview,hero?:boolean}){
 const image=projectImages[p.slug];
 return <div className={`project-visual visual-${p.slug} ${hero?'visual-hero visual-detail-mockup':''}`}>
  <div className="visual-label"><span>{p.name}</span><span>{p.number} / SELECTED WORK</span></div>
  <div className="visual-canvas"><div className="visual-frame" style={{inset:0,width:'100%',height:hero?'auto':'100%',maxWidth:'none',border:0,borderRadius:0,boxShadow:'none',background:'transparent',overflow:'visible'}}><ResponsiveImage sizes={hero?'(min-width: 1024px) calc(88vw - 48px), (min-width: 768px) calc(92vw - 48px), (min-width: 761px) calc(100vw - 88px), calc(100vw - 60px)':'(max-width: 760px) calc(100vw - 84px), (max-width: 1023px) 65vw, 55vw'} className="visual-main" src={`/images/projects/${hero?image.detail:image.home}`} alt="" aria-hidden="true" width={hero?1672:1448} height={hero?941:1086} loading={hero?'eager':'lazy'} decoding="async" data-entry-media={hero?'true':undefined} data-project-media={hero?'detail':'home'} style={{position:'static',width:'100%',height:hero?'auto':'100%',maxWidth:'none',objectFit:'contain',objectPosition:'center',transform:'none',transition:'inherit'}}/></div></div>
  <div className="visual-caption"><span>{p.slug==='debt-ledger'?'BALANCE · HISTORY · STATUS':p.slug==='mseller'?'THE WORKSPACE & THE NEXT STEP':p.slug==='beerich'?'PRESENT · INVESTMENT · FUTURE':'A CALMER WAY TO BEGIN'}</span><ArrowUpRight size={20}/></div>
 </div>;
}
