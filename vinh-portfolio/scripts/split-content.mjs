import { readFile, writeFile, mkdir } from 'node:fs/promises';

// public.json remains the single editable source of the existing portfolio copy.
// Only the content for the requested page is included in each browser bundle.
const data = JSON.parse(await readFile('src/content/public.json', 'utf8'));
const previewKeys = ['slug', 'name', 'number', 'focus', 'line', 'description', 'deck', 'gallery', 'detail'];
const projects = data.projects.map(project => Object.fromEntries(previewKeys.map(key => [key, project[key]])));
await mkdir('src/content/projects', { recursive: true });
await writeFile('src/content/home.json', JSON.stringify({ projects, domains: data.domains, steps: data.steps, personal: data.personal }, null, 2) + '\n');
await writeFile('src/content/about.json', JSON.stringify(data.about, null, 2) + '\n');
for (const project of data.projects) await writeFile(`src/content/projects/${project.slug}.json`, JSON.stringify(project, null, 2) + '\n');
