import { ArrowUpRight } from 'lucide-react';
import { ReliableImage } from '../readiness';
import { ResponsiveImage } from '../ResponsiveImage';
import type { ProjectPreview } from '../../content/types';
import { projectImages } from '../../content/media';
export function ProjectCover({project:p,hero=false,compact=false}:{project:ProjectPreview,hero?:boolean,compact?:boolean}){
 const image=projectImages[p.slug];
 const main=p.gallery[p.slug==='moodify'?7:0];
 const secondary=p.gallery[p.slug==='moodify'?3:p.slug==='mseller'?4:1];
 const frame=(screen:{src:string,width:number,height:number},role:string,essential=false)=><div className={`visual-frame visual-${role}`} style={{aspectRatio:`${screen.width} / ${screen.height}`}}><ReliableImage src={screen.src} alt="" aria-hidden="true" width={screen.width} height={screen.height} loading={essential?'eager':'lazy'} decoding="async" data-entry-media={essential?'true':undefined}/></div>;
 return <div className={`project-visual visual-${p.slug} ${hero?'visual-hero':''} ${compact?'visual-compact':''}`}>
  <div className="visual-label"><span>{p.name}</span><span>{p.number} / SELECTED WORK</span></div>
  <div className="visual-canvas">{compact?<>{frame(main,'main',hero)}{frame(p.slug==='beerich'?p.detail:secondary,'support')}{p.slug==='debt-ledger'&&frame(p.detail,'detail')}{p.slug==='beerich'&&frame(p.gallery[2],'third')}</>:<div className="visual-frame" style={{inset:0,width:'100%',height:'100%',maxWidth:'none',border:0,borderRadius:0,boxShadow:'none',background:'transparent',overflow:'visible'}}><ResponsiveImage sizes="(max-width: 760px) calc(100vw - 92px), (max-width: 999px) 70vw, 760px" className="visual-main" src={`/images/projects/${hero?image.detail:image.home}`} alt="" aria-hidden="true" width={hero?1672:1448} height={hero?941:1086} loading={hero?'eager':'lazy'} decoding="async" data-entry-media={hero?'true':undefined} data-project-media={hero?'detail':'home'} style={{position:'static',width:'100%',height:'100%',maxWidth:'none',objectFit:'contain',objectPosition:'center',transform:'none',transition:'inherit'}}/></div>}</div>
  <div className="visual-caption"><span>{p.slug==='debt-ledger'?'BALANCE · HISTORY · STATUS':p.slug==='mseller'?'THE WORKSPACE & THE NEXT STEP':p.slug==='beerich'?'PRESENT · INVESTMENT · FUTURE':'A CALMER WAY TO BEGIN'}</span><ArrowUpRight size={20}/></div>
 </div>;
}