import type { ComponentType } from 'react';
import { normalizePath } from './content/routes';

// Both the build-time renderer and browser select the same page module. No
// case-study copy or renderer is imported by the homepage's critical bundle.
const pages: Record<string, () => Promise<{ default: ComponentType }>> = {
  '/': () => import('./pages/HomePage'),
  '/about': () => import('./pages/AboutPage'),
  '/work/debt-ledger': () => import('./pages/DebtLedgerPage'),
  '/work/mseller': () => import('./pages/MSellerPage'),
  '/work/beerich': () => import('./pages/BeeRichPage'),
  '/work/moodify': () => import('./pages/MoodifyPage'),
  '/work/betterbet': () => import('./pages/BetterBetPage'),
  '/work/pulse-city': () => import('./pages/PulseCityPage'),
  '/work/ship-it': () => import('./pages/ShipItPage'),
  '/work/gieo': () => import('./pages/GieoPage'),
};
export async function loadPage(pathname: string) {
  const loader = pages[normalizePath(pathname)] || (() => import('./pages/NotFoundPage'));
  return (await loader()).default;
}
