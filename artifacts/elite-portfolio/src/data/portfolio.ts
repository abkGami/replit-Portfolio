export type ProjectCategory = 'web' | 'mobile' | 'dapp';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  year: string;
  stack: string[];
  description: string;
  role: string;
  image: { src: string; alt: string; width: number; height: number };
  links: { repo?: string; live?: string; store?: string };
  featured?: boolean;
  metric: string;
}

export const profile = {
  name: 'Mara Voss',
  role: 'Product-minded software engineer',
  location: 'Berlin · working globally',
  email: 'hello@maravoss.dev',
  socials: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
};

export const projects: Project[] = [
  {
    id: 'northstar',
    title: 'Northstar',
    tagline: 'A calmer operating system for ambitious teams.',
    category: 'web',
    year: '2024',
    stack: ['TypeScript', 'React', 'Postgres'],
    description: 'Northstar turns a noisy backlog into a living map of decisions. I designed the interaction model, built the real-time workspace, and gave teams a clearer way to move from signal to shipping.',
    role: 'Product design · Lead engineering',
    image: { src: '', alt: 'Abstract navy and lime Northstar interface study', width: 1200, height: 840 },
    links: { live: 'https://example.com' },
    featured: true,
    metric: '−31% time to first decision',
  },
  {
    id: 'field-notes',
    title: 'Field Notes',
    tagline: 'Research capture for people who stay curious.',
    category: 'mobile',
    year: '2023',
    stack: ['React Native', 'Expo', 'SQLite'],
    description: 'An offline-first notes app for collecting fragments in the field. The challenge was keeping capture instant while making a growing personal archive feel quietly navigable.',
    role: 'Independent · Design & build',
    image: { src: '', alt: 'Abstract field notes mobile interface study', width: 1000, height: 1200 },
    links: { store: 'https://example.com' },
    metric: '4.8 / 5 private beta rating',
  },
  {
    id: 'ledger-zero',
    title: 'Ledger Zero',
    tagline: 'Financial clarity for the independent economy.',
    category: 'dapp',
    year: '2023',
    stack: ['Solidity', 'Ethers.js', 'Next.js'],
    description: 'A transparent treasury interface that makes programmable money legible to non-technical operators. I worked across contract architecture and the product layer that sits above it.',
    role: 'Founding engineer · 0 → 1',
    image: { src: '', alt: 'Abstract ledger zero protocol visualization', width: 1200, height: 840 },
    links: { repo: 'https://github.com' },
    featured: true,
    metric: '$2.4m settled in pilot',
  },
  {
    id: 'relay',
    title: 'Relay',
    tagline: 'The handoff between thinking and making.',
    category: 'web',
    year: '2022',
    stack: ['React', 'WebSockets', 'Framer Motion'],
    description: 'Relay is a shared canvas for product teams to turn rough ideas into scoped work without losing the original intent. I built the collaboration layer and a deliberately tactile editor.',
    role: 'Lead frontend engineer',
    image: { src: '', alt: 'Abstract relay collaboration interface study', width: 1200, height: 840 },
    links: { live: 'https://example.com' },
    metric: '2.1k weekly active makers',
  },
  {
    id: 'interval',
    title: 'Interval',
    tagline: 'Training data, without the spreadsheet fog.',
    category: 'mobile',
    year: '2022',
    stack: ['SwiftUI', 'HealthKit', 'CloudKit'],
    description: 'A training companion that treats recovery as seriously as performance. I shaped the visual language and shipped a precise, glanceable mobile experience for endurance athletes.',
    role: 'Product engineer · iOS',
    image: { src: '', alt: 'Abstract interval training mobile interface study', width: 1000, height: 1200 },
    links: { store: 'https://example.com' },
    metric: '18 min saved per weekly review',
  },
  {
    id: 'common-ground',
    title: 'Common Ground',
    tagline: 'Governance tools for groups with a point of view.',
    category: 'dapp',
    year: '2021',
    stack: ['Vue', 'GraphQL', 'Ethereum'],
    description: 'A governance toolkit for small collectives. Rather than hide complexity, Common Ground gives every proposal a readable history and every vote a human context.',
    role: 'Design systems · Engineering',
    image: { src: '', alt: 'Abstract common ground governance visualization', width: 1200, height: 840 },
    links: { repo: 'https://github.com' },
    metric: '89% proposal participation',
  },
];

export const skillGroups = [
  { label: 'Build', items: ['TypeScript', 'React / Next.js', 'React Native', 'Node.js', 'GraphQL'] },
  { label: 'Shape', items: ['Product strategy', 'Interaction design', 'Design systems', 'Prototyping', 'Art direction'] },
  { label: 'Explore', items: ['Web3 / Solidity', 'Three.js', 'SwiftUI', 'Data modeling', 'Accessibility'] },
];