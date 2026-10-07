import CasePage from './CasePage';
import project from '../content/projects/moodify.json';
import home from '../content/home.json';
export default function MoodifyPage() { return <CasePage project={project} next={home.projects[0]}/>; }
