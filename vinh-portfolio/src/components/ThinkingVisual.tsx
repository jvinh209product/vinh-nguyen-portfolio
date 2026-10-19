const labels = ['Human context', 'Information and action', 'Events, rules and state', 'Options and trade-offs', 'Recovery and continuation', 'Observe, test and learn'];

/** The selected reasoning step crossfades to its own explanatory drawing. */
export function ThinkingVisual({ active }: { active: number }) {
  return <div className="thinking-visual" id="thinking-visual" aria-hidden="true">
    {labels.map((label, index) => <svg key={label} className="thinking-visual__state" data-active={active === index}
      viewBox="0 0 480 280" fill="none">
      <g stroke="var(--border)" strokeWidth="1"><path d="M30 245H450"/><circle cx="240" cy="134" r="101"/></g>
      {index === 0 ? <>
        <g stroke="var(--foreground)" strokeOpacity=".35"><ellipse cx="240" cy="134" rx="157" ry="52" transform="rotate(-15 240 134)"/><ellipse cx="240" cy="134" rx="149" ry="60" transform="rotate(25 240 134)"/></g>
        <circle cx="240" cy="108" r="21" fill="var(--foreground)"/><path d="M203 167q0-36 37-36t37 36" fill="var(--foreground)"/>
        <g fill="var(--surface)" stroke="var(--interaction-accent)"><circle cx="98" cy="143" r="20"/><circle cx="359" cy="83" r="20"/><circle cx="344" cy="199" r="20"/></g>
        <path d="m91 143 5 5 9-11M350 83h18m-9-9v18m-23 107h16" stroke="var(--interaction-accent)" strokeWidth="2"/>
      </> : index === 1 ? <>
        <path d="M110 140H370M238 140V78h78" stroke="var(--interaction-accent)" strokeWidth="2"/>
        <rect x="58" y="102" width="102" height="76" rx="7" fill="var(--surface)" stroke="var(--foreground)" strokeOpacity=".5"/>
        <path d="M79 124h61m-61 15h45m-45 15h52" stroke="var(--foreground)" strokeOpacity=".4"/>
        <path d="m240 99 42 41-42 42-42-42Z" fill="var(--paper)" stroke="var(--interaction-accent)" strokeWidth="2"/>
        <circle cx="372" cy="140" r="30" fill="var(--foreground)"/><path d="m361 140 8 8 15-18" stroke="var(--paper)" strokeWidth="2"/>
        <circle cx="329" cy="78" r="12" fill="var(--interaction-accent)"/>
      </> : index === 2 ? <>
        <g stroke="var(--foreground)" strokeOpacity=".35"><path d="M77 152H393"/><path d="M155 152V87h100m0 0v65"/></g>
        {[95,240,385].map((x,i)=><g key={x}><circle cx={x} cy="152" r="28" fill={i===1?'var(--foreground)':'var(--surface)'} stroke="var(--foreground)" strokeOpacity=".5"/>
          <path d={i===1?'M230 145h20m-20 7h20m-20 7h12':('M'+(x-6)+' 145h12v14h-12Z')} stroke={i===1?'var(--paper)':'var(--foreground)'}/></g>)}
        <circle cx="255" cy="87" r="12" fill="var(--interaction-accent)"/><path d="M109 204h46m63 0h46m63 0h46" stroke="var(--interaction-accent)" strokeWidth="2"/>
      </> : index === 3 ? <>
        <path d="M240 91v43m0 0-116 46m116-46 116 46" stroke="var(--foreground)" strokeOpacity=".5" strokeWidth="2"/>
        <circle cx="240" cy="80" r="24" fill="var(--foreground)"/><circle cx="124" cy="185" r="29" fill="var(--surface)" stroke="var(--foreground)"/>
        <circle cx="356" cy="185" r="29" fill="var(--surface)" stroke="var(--interaction-accent)" strokeWidth="2"/>
        <path d="M236 129h8v16h-8Z" fill="var(--interaction-accent)"/>
        <g fill="var(--foreground)" fontSize="18" fontFamily="Arial,Helvetica,sans-serif" textAnchor="middle"><text x="124" y="191">A</text><text x="356" y="191">B</text></g>
        <path d="m227 80 9 9 17-18" stroke="var(--paper)" strokeWidth="2"/>
      </> : index === 4 ? <>
        <path d="M76 151H208q28 0 28-27V97q0-26 28-26h28m-56 80q0 60 66 60h52q33 0 33-33v-27" stroke="var(--foreground)" strokeOpacity=".4" strokeWidth="2"/>
        <path d="M236 151q0 60 66 60h52q33 0 33-33v-27" stroke="var(--interaction-accent)" strokeWidth="2.5"/>
        <circle cx="82" cy="151" r="19" fill="var(--surface)" stroke="var(--foreground)"/>
        <circle cx="301" cy="71" r="15" fill="var(--surface)" stroke="var(--foreground)" strokeOpacity=".35"/><path d="m295 65 12 12m0-12-12 12" stroke="var(--foreground)" strokeOpacity=".5"/>
        <circle cx="387" cy="139" r="26" fill="var(--foreground)"/><path d="m377 139 7 7 14-15" stroke="var(--paper)" strokeWidth="2"/>
        <path d="m297 205 7 6-7 6" stroke="var(--interaction-accent)" strokeWidth="2"/>
      </> : <>
        <path d="M240 55q134 0 134 84t-134 84q-134 0-134-84t134-84" stroke="var(--foreground)" strokeOpacity=".35" strokeWidth="2"/>
        <path d="M106 139q0-84 134-84" stroke="var(--interaction-accent)" strokeWidth="2.5"/><path d="m231 49 9 6-9 6" stroke="var(--interaction-accent)" strokeWidth="2"/>
        {[[240,55],[374,139],[240,223],[106,139]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="14" fill={i===0?'var(--interaction-accent)':'var(--surface)'} stroke="var(--foreground)" strokeOpacity=".5"/>)}
        <rect x="209" y="109" width="62" height="60" rx="7" fill="var(--foreground)"/><path d="M224 123h32m-32 13h23m-23 13h28" stroke="var(--paper)" strokeOpacity=".7"/>
      </>}
      <text x="240" y="270" textAnchor="middle" fill="var(--muted-foreground)" fontFamily="Arial,Helvetica,sans-serif" fontSize="11" letterSpacing="1.4">{label.toUpperCase()}</text>
    </svg>)}
  </div>;
}
