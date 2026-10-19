import { useId, useState } from 'react';
import type { BuildKind } from '../../content/builds';
import type { BuildStory, ModelState } from '../../content/builds/types';

function EvidenceDiagram({ state, active }: { state: ModelState; active: number }) {
  const focus = [1, 2, 5][active];
  return <svg viewBox="0 0 680 230" role="img" aria-label={'Connected decision workflow. ' + state.title}>
    <path d="M60 110H620" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".3"/>
    {state.nodes.map((node, i) => <g key={node} transform={'translate(' + (60 + i * 112) + ',110)'}>
      <circle r={i === focus ? 28 : 18} fill={i === focus ? 'var(--model-accent)' : 'var(--model-surface)'} stroke="currentColor" strokeOpacity=".5"/>
      <text textAnchor="middle" y="5" fontSize="12" fill={i === focus ? '#101A24' : 'currentColor'}>{i + 1}</text>
      <text textAnchor="middle" y="58" fontSize="13" fill="currentColor">{node}</text>
    </g>)}
  </svg>;
}
function CityDiagram({ state, active }: { state: ModelState; active: number }) {
  const routes = ['M120 190L215 130L300 176L405 110L530 170', 'M120 190L215 130L300 176L385 228L470 178L530 170', 'M120 190L205 237L300 176L405 110L530 170'];
  return <svg viewBox="0 0 680 320" role="img" aria-label={state.title + ' The dashed route is the comparison path; the colored route follows the selected explanation.'}>
    <g fill="none" stroke="currentColor" strokeOpacity=".13">
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={'M' + (95 + i * 95) + ' 85L' + (245 + i * 75) + ' 270'}/>)}
      {[0, 1, 2, 3].map(i => <path key={i} d={'M80 ' + (145 + i * 35) + 'L600 ' + (65 + i * 48)}/>)}
    </g>
    <path d={routes[(active + 1) % 3]} fill="none" stroke="currentColor" strokeOpacity=".3" strokeDasharray="5 7" strokeWidth="3"/>
    <path d={routes[active]} fill="none" stroke="var(--model-accent)" strokeWidth="5" strokeLinejoin="round"/>
    {[[120,190],[300,176],[405,110],[530,170]].map(([x,y],i) => <g key={i}>
      <circle cx={x} cy={y} r="10" fill="var(--model-surface)" stroke="currentColor"/>
      <text x={x} y={y-22} fontSize="12" fill="currentColor" textAnchor="middle">{String(i+1).padStart(2,'0')}</text>
    </g>)}
    <text x="340" y="300" textAnchor="middle" fontSize="12" fill="currentColor">STATE → POLICY → ROUTE → CUSTOMER CONSEQUENCE</text>
  </svg>;
}
function OfficeDiagram({ state, active }: { state: ModelState; active: number }) {
  return <div className="office-model" role="img" aria-label={state.title + ' Time, scope, and people remain connected across Discover, Define, Build, Launch, and Learn.'}>
    <div className="office-chapters">{state.nodes.map((node,i) => <div key={node}><span>0{i+1}</span><strong>{node}</strong></div>)}</div>
    {['Time available','Scope committed','People affected'].map((row,i) => <div className={['office-constraint',i===active?'selected':''].join(' ')} key={row}>
      <span>{row}</span><div aria-hidden="true">{state.nodes.map(node => <span key={node}/>)}</div>
    </div>)}
    <p>One state carries the cost forward.</p>
  </div>;
}
function GardenDiagram({ state, active }: { state: ModelState; active: number }) {
  return <svg viewBox="0 0 680 300" role="img" aria-label={state.title + ' A reader can understand, experience, and practice without receiving a spiritual score.'}>
    <g fill="none" stroke="currentColor" opacity=".2"><circle cx="340" cy="143" r="108"/><ellipse cx="340" cy="143" rx="200" ry="100"/><path d="M80 240Q340 175 600 240"/></g>
    {[175,340,505].map((x,i) => <g key={x}>
      <circle cx={x} cy={143 + (i===1?-20:10)} r={i===active?30:23} fill={i===active?'var(--model-accent)':'var(--model-surface)'} stroke="currentColor" strokeOpacity=".4"/>
      <path d={'M'+(x-6)+' '+(143+(i===1?-20:10)+7)+'q-4-20 14-23q4 15-14 23'} fill={i===active?'#101A24':'currentColor'} opacity=".8"/>
      <text x={x} y="215" fill="currentColor" fontSize="12" textAnchor="middle">{state.nodes[i]}</text>
    </g>)}
    <text x="340" y="281" fill="currentColor" fontSize="12" textAnchor="middle">AN INVITATION, NOT A SCORE</text>
  </svg>;
}
export function BuildProcessDiagram({ kind, model }: { kind: BuildKind; model: BuildStory['model'] }) {
  const [active,setActive]=useState(0), id=useId();
  const state=model.states[active];
  return <div className={'build-model theme-ink model-' + kind}>
    <p className="build-model-intro">{model.intro}</p>
    <div className="build-model-controls" role="group" aria-label="Choose an explanation">
      {model.states.map((item,i) => <button type="button" key={item.label} aria-pressed={active===i} aria-controls={id}
        onClick={()=>setActive(i)}>{item.label}</button>)}
    </div>
    <div className="build-model-visual">
      {kind==='evidence'?<EvidenceDiagram state={state} active={active}/>:kind==='city'?<CityDiagram state={state} active={active}/>:kind==='office'?<OfficeDiagram state={state} active={active}/>:<GardenDiagram state={state} active={active}/>}
    </div>
    {kind!=='office'&&<ol className="build-model-chain">{state.nodes.map(node=><li key={node}>{node}</li>)}</ol>}
    <div className="build-model-explanation" id={id} aria-live="polite"><h3>{state.title}</h3><p>{state.explanation}</p></div>
  </div>;
}
