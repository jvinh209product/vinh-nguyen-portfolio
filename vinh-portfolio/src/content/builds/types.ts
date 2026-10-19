import type { BuildSlug } from '../builds';

export interface WalkthroughStep {
  title: string; action: string; response: string; lesson: string;
}
export interface ModelState {
  label: string; title: string; explanation: string; nodes: string[];
}
export interface BuildStory {
  slug: BuildSlug;
  question: string;
  concept: string;
  audience: string;
  bet: string;
  principle: string;
  scope: string;
  contribution: string;
  walkthrough: WalkthroughStep[];
  model: { intro: string; states: ModelState[] };
  decisions: { title: string; choice: string; tradeoff: string; next: string }[];
  craft: { stack: string; architecture: string; motion: string; storage: string };
  today: string[];
  next: string[];
  limits: string;
}
