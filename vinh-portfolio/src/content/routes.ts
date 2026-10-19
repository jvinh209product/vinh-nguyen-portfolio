import data from './home.json';
import { builds } from './builds';
import { projectImages } from './media';

export const homeTitle = 'Vinh Nguyen — Product Builder × Product Designer';
export const homeDescription = 'Product reasoning, experience design, and independent interactive builds by Vinh Nguyen. Explore Debt Ledger, mSeller, BeeRich, Moodify, BETTERBET, PULSE CITY, SHIP IT, and GIEO.';
const titles: Record<string, string> = {
  'debt-ledger': 'Debt Ledger — Business Logic & Product Delivery — Vinh Nguyen',
  mseller: 'mSeller — Merchant Workflows & UX — Vinh Nguyen',
  beerich: 'BeeRich — Personal Finance Product Experience — Vinh Nguyen',
  moodify: 'Moodify — Digital Wellbeing Experience Design — Vinh Nguyen',
};
export interface PageMetadata {
  title: string; description: string; canonical: string | null; image: string | null;
}
export const routes = ['/', '/about', ...data.projects.map(project => '/work/' + project.slug), ...builds.map(build => '/work/' + build.slug)];
export function normalizePath(pathname: string) { return pathname.replace(/\/+$/, '') || '/'; }
export function pageMetadata(pathname: string): PageMetadata {
  const path = normalizePath(pathname);
  if (path === '/') return { title: homeTitle, description: homeDescription, canonical: '/', image: '/images/vinh-portrait.webp' };
  if (path === '/about') return {
    title: 'About Vinh Nguyen — Business Analysis, Product & UX',
    description: 'The experience and working principles behind Vinh Nguyen’s work in business analysis, product ownership, and UI/UX.',
    canonical: path, image: '/images/vinh-portrait.webp',
  };
  const project = data.projects.find(project => path === '/work/' + project.slug);
  if (project) return {
    title: titles[project.slug],
    description: project.slug === 'moodify'
      ? 'An experience design study exploring onboarding, meditation discovery, practitioner profiles, and a personal wellbeing overview.'
      : project.deck,
    canonical: path,
    image: '/images/projects/' + projectImages[project.slug].detail,
  };
  const build = builds.find(build => path === '/work/' + build.slug);
  if (build) return {
    title: build.name + ' — ' + build.category.split(' · ')[0] + ' — Vinh Nguyen',
    description: build.line + ' ' + build.summary,
    canonical: path, image: build.detailMedia.src,
  };
  return { title: homeTitle, description: homeDescription, canonical: null, image: null };
}
