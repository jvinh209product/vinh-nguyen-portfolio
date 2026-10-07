import data from './home.json';

export const homeTitle = 'Vinh Nguyen — Product Thinking, Business Analysis & UX';
export const homeDescription = 'Selected work and product thinking by Vinh Nguyen, exploring personal finance, merchant workflows, debt tracking, and digital wellbeing.';
const titles: Record<string, string> = {
  'debt-ledger': 'Debt Ledger — Business Logic & Product Delivery — Vinh Nguyen',
  mseller: 'mSeller — Merchant Workflows & UX — Vinh Nguyen',
  beerich: 'BeeRich — Personal Finance Product Experience — Vinh Nguyen',
  moodify: 'Moodify — Digital Wellbeing Experience Design — Vinh Nguyen',
};

export const routes = ['/', '/about', ...data.projects.map(project => `/work/${project.slug}`)];
export function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/';
}
export function pageMetadata(pathname: string) {
  const path = normalizePath(pathname);
  if (path === '/') return { title: homeTitle, description: homeDescription, canonical: '/' };
  if (path === '/about') return {
    title: 'About Vinh Nguyen — Business Analysis, Product & UX',
    description: 'The experience and working principles behind Vinh Nguyen’s work in business analysis, product ownership, and UI/UX.',
    canonical: path,
  };
  const project = data.projects.find(project => path === `/work/${project.slug}`);
  if (project) return {
    title: titles[project.slug],
    description: project.slug === 'moodify'
      ? 'An experience design study exploring onboarding, meditation discovery, practitioner profiles, and a personal wellbeing overview.'
      : project.deck,
    canonical: path,
  };
  return { title: homeTitle, description: homeDescription, canonical: null };
}
