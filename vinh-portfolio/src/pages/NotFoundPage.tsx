import { CTA } from '../components/CTA';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Shell } from '../components/Shell';
export default function NotFoundPage(){return <Shell><main id="main" className="not-found section"><span id="top" className="eyebrow">404 / A DIFFERENT DIRECTION</span><h1 tabIndex={-1}>Let’s get back<br/>to <em>the work.</em></h1><p>This page isn't here. You can explore my selected projects or get in touch.</p><div className="hero-actions"><CTA href="/#work" className="primary-link">Selected work <ArrowRight size={17}/></CTA><CTA href="/#contact" className="text-link">Contact Vinh <ArrowUpRight size={17}/></CTA></div></main></Shell>;}
