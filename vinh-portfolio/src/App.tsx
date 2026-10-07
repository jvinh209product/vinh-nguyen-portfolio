import type { ComponentType } from 'react';
import { PageBoundary } from './components/page-boundary';

export default function App({ Page }: { Page: ComponentType }) {
  return <PageBoundary><Page/></PageBoundary>;
}
