import { renderToString } from 'react-dom/server';
import App from './App';
import { loadPage } from './route-loader';
export { routes, pageMetadata } from './content/routes';

// Runs only during npm run build. No server is needed in production.
export async function render(pathname: string) {
  const Page = await loadPage(pathname);
  return renderToString(<App Page={Page}/>);
}
