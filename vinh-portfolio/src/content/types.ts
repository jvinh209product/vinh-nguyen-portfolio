import type data from './public.json';
export type Project = typeof data.projects[number];
export type Screen = Project['gallery'][number];
export type ProjectPreview = Pick<Project, 'slug' | 'name' | 'number' | 'focus' | 'line' | 'description' | 'deck' | 'gallery' | 'detail'>;
