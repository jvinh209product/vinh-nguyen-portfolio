import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { loadPage } from './route-loader';
import { normalizePath, pageMetadata, routes } from './content/routes';
import './styles/globals.css';

const root = document.getElementById('root')!;
const pathname = normalizePath(location.pathname);
const metadata = pageMetadata(pathname);
document.title = metadata.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
if (metadata.canonical) {
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  const origin = import.meta.env.VITE_SITE_URL || location.origin;
  canonical.href = new URL(metadata.canonical, origin).href;
}

// Keep native document navigation and CSS cross-document view transitions.
// The production build supplies complete HTML for every existing route.
const expected = routes.includes(pathname) ? pathname : '/404';
loadPage(pathname).then(Page => {
  const app = <App Page={Page}/>;
  if (root.dataset.prerendered === expected) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
    // Development uses Vite's HTML shell rather than the prerendered pages.
    if (location.hash) requestAnimationFrame(() => requestAnimationFrame(() => {
      try { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(); } catch {}
    }));
  }
}).catch(error => {
  // A failed optional JS fetch must not replace the complete prerendered story.
  console.error('Portfolio enhancements could not load; the static page remains available.', error);
});
