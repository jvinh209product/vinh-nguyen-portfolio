import { renderToString } from 'react-dom/server';
import App from './App';
export { routes, pageMetadata } from './content/routes';

// Runs only during npm run build. No server is needed in production.
export function render(pathname: string) {
  return renderToString(<App pathname={pathname} />);
}
