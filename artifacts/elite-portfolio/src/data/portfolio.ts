export type ProjectCategory = "web" | "mobile" | "dapp";

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
  curated?: boolean;
  metric: string;
}

export const profile = {
  name: "Yahaya Abubakar Adebayo",
  role: "Product-minded software engineer",
  location: "Berlin · working globally",
  email: "hello@maravoss.dev",
  socials: [
    { label: "GitHub", href: "https://github.com/abkGami" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abkgami/" },
  ],
};

export const projects: Project[] = [
  {
    id: "northstar",
    title: "Northstar",
    tagline: "A calmer operating system for ambitious teams.",
    category: "web",
    year: "2024",
    stack: ["TypeScript", "React", "Postgres"],
    description:
      "Northstar turns a noisy backlog into a living map of decisions. I designed the interaction model, built the real-time workspace, and gave teams a clearer way to move from signal to shipping.",
    role: "Product design · Lead engineering",
    image: {
      src: "",
      alt: "Abstract navy and lime Northstar interface study",
      width: 1200,
      height: 840,
    },
    links: { live: "https://example.com" },
    featured: true,
    metric: "−31% time to first decision",
    curated: true,
  },
  {
    id: "field-notes",
    title: "Field Notes",
    tagline: "Research capture for people who stay curious.",
    category: "mobile",
    year: "2023",
    stack: ["React Native", "Expo", "SQLite"],
    description:
      "An offline-first notes app for collecting fragments in the field. The challenge was keeping capture instant while making a growing personal archive feel quietly navigable.",
    role: "Independent · Design & build",
    image: {
      src: "",
      alt: "Abstract field notes mobile interface study",
      width: 1000,
      height: 1200,
    },
    links: { store: "https://example.com" },
    metric: "4.8 / 5 private beta rating",
    curated: true,
  },
  {
    id: "ledger-zero",
    title: "Ledger Zero",
    tagline: "Financial clarity for the independent economy.",
    category: "dapp",
    year: "2023",
    stack: ["Solidity", "Ethers.js", "Next.js"],
    description:
      "A transparent treasury interface that makes programmable money legible to non-technical operators. I worked across contract architecture and the product layer that sits above it.",
    role: "Founding engineer · 0 → 1",
    image: {
      src: "",
      alt: "Abstract ledger zero protocol visualization",
      width: 1200,
      height: 840,
    },
    links: { repo: "https://github.com" },
    featured: true,
    metric: "$2.4m settled in pilot",
    curated: true,
  },
  {
    id: "relay",
    title: "Relay",
    tagline: "The handoff between thinking and making.",
    category: "web",
    year: "2022",
    stack: ["React", "WebSockets", "Framer Motion"],
    description:
      "Relay is a shared canvas for product teams to turn rough ideas into scoped work without losing the original intent. I built the collaboration layer and a deliberately tactile editor.",
    role: "Lead frontend engineer",
    image: {
      src: "",
      alt: "Abstract relay collaboration interface study",
      width: 1200,
      height: 840,
    },
    links: { live: "https://example.com" },
    metric: "2.1k weekly active makers",
    curated: true,
  },
  {
    id: "interval",
    title: "Interval",
    tagline: "Training data, without the spreadsheet fog.",
    category: "mobile",
    year: "2022",
    stack: ["SwiftUI", "HealthKit", "CloudKit"],
    description:
      "A training companion that treats recovery as seriously as performance. I shaped the visual language and shipped a precise, glanceable mobile experience for endurance athletes.",
    role: "Product engineer · iOS",
    image: {
      src: "",
      alt: "Abstract interval training mobile interface study",
      width: 1000,
      height: 1200,
    },
    links: { store: "https://example.com" },
    metric: "18 min saved per weekly review",
    curated: true,
  },
  {
    id: "common-ground",
    title: "Common Ground",
    tagline: "Governance tools for groups with a point of view.",
    category: "dapp",
    year: "2021",
    stack: ["Vue", "GraphQL", "Ethereum"],
    description:
      "A governance toolkit for small collectives. Rather than hide complexity, Common Ground gives every proposal a readable history and every vote a human context.",
    role: "Design systems · Engineering",
    image: {
      src: "",
      alt: "Abstract common ground governance visualization",
      width: 1200,
      height: 840,
    },
    links: { repo: "https://github.com" },
    metric: "89% proposal participation",
    curated: true,
  },
  {
    id: "signalframe",
    title: "Signalframe",
    tagline: "Dashboards that explain themselves.",
    category: "web",
    year: "2021",
    stack: ["TypeScript", "D3.js", "Fastify"],
    description:
      "An analytics surface for teams drowning in charts. Every metric in Signalframe carries its own context — sources, caveats and the question it was actually meant to answer.",
    role: "Lead frontend engineer",
    image: {
      src: "",
      alt: "Abstract signalframe analytics interface study",
      width: 1200,
      height: 840,
    },
    links: { live: "https://example.com" },
    metric: "−44% time to insight in trials",
  },
  {
    id: "quorum",
    title: "Quorum",
    tagline: "Reputation you can read, not just trust.",
    category: "dapp",
    year: "2022",
    stack: ["Solidity", "The Graph", "React"],
    description:
      "A reputation layer for small on-chain collectives. Quorum makes contribution history legible before the vote, so trust has somewhere concrete to stand.",
    role: "Protocol · Interface engineering",
    image: {
      src: "",
      alt: "Abstract quorum reputation visualization",
      width: 1200,
      height: 840,
    },
    links: { repo: "https://github.com" },
    metric: "3 collectives governed in pilot",
  },
  {
    id: "observatory",
    title: "Observatory",
    tagline: "A sky companion for patient people.",
    category: "mobile",
    year: "2021",
    stack: ["React Native", "Expo", "Mapbox"],
    description:
      "An offline-tolerant sky map for amateur astronomers. Observatory trades spectacle for precision — charts that stay honest at 2 a.m., when the cold is doing the filtering.",
    role: "Product engineer · Mobile",
    image: {
      src: "",
      alt: "Abstract observatory sky map interface study",
      width: 1000,
      height: 1200,
    },
    links: { store: "https://example.com" },
    metric: "4.6 / 5 App Store rating",
  },
  {
    id: "margins",
    title: "Margins",
    tagline: "A reading app that respects attention.",
    category: "web",
    year: "2020",
    stack: ["Svelte", "Node.js", "Redis"],
    description:
      "A distraction-free reading environment that treats long-form attention as the product. Margins keeps progress, highlights and pacing in one calm interface — no feeds, no streaks, no guilt.",
    role: "Solo · Design & build",
    image: {
      src: "",
      alt: "Abstract margins reading interface study",
      width: 1200,
      height: 840,
    },
    links: { repo: "https://github.com" },
    metric: "12k books imported in year one",
  },
];

export const curatedProjects: Project[] = projects.filter(
  (project) => project.curated,
);

export const skillGroups = [
  {
    label: "Build",
    items: [
      "TypeScript",
      "React / Next.js",
      "React Native",
      "Node.js",
      "GraphQL",
    ],
  },
  {
    label: "Shape",
    items: [
      "Product strategy",
      "Interaction design",
      "Design systems",
      "Prototyping",
      "Art direction",
    ],
  },
  {
    label: "Explore",
    items: [
      "Web3 / Solidity",
      "Three.js",
      "SwiftUI",
      "Data modeling",
      "Accessibility",
    ],
  },
];
