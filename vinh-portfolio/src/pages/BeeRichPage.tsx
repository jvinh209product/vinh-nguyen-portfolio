import CasePage from './CasePage';
import project from '../content/projects/beerich.json';
import home from '../content/home.json';
export default function BeeRichPage() { return <CasePage project={project} next={home.projects[3]}/>; }
