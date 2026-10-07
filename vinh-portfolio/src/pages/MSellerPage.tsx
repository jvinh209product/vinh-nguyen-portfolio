import CasePage from './CasePage';
import project from '../content/projects/mseller.json';
import home from '../content/home.json';
export default function MSellerPage() { return <CasePage project={project} next={home.projects[2]}/>; }
