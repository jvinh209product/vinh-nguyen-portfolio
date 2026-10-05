import { HomePage, AboutPage, CasePage, NotFoundPage } from './components/portfolio';
import { PageBoundary } from './components/page-boundary';
import { normalizePath, routes } from './content/routes';

export default function App({ pathname }: { pathname: string }) {
  const path = normalizePath(pathname);
  const page = path === '/' ? <HomePage />
    : path === '/about' ? <AboutPage />
    : routes.includes(path) ? <CasePage slug={path.slice('/work/'.length)} />
    : <NotFoundPage />;
  return <PageBoundary>{page}</PageBoundary>;
}
