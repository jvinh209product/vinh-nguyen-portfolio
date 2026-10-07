import CasePage from './CasePage';
import project from '../content/projects/debt-ledger.json';
import home from '../content/home.json';
export default function DebtLedgerPage() { return <CasePage project={project} next={home.projects[1]}/>; }
