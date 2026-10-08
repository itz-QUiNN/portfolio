export interface Project {
  slug: string
  title: string
  summary: string
  stack: string[]
}

// Summaries and stacks are placeholders until replaced with real project details.
export const projects: Project[] = [
  {
    slug: 'tcgplayer-price-intelligence',
    title: 'TCGplayer Price Intelligence',
    summary: 'Placeholder: collects marketplace pricing and exports it for analysis.',
    stack: ['Python', 'Playwright', 'SQLite', 'CSV', 'PyInstaller'],
  },
  {
    slug: 'youtube-extraction',
    title: 'YouTube Data Extraction',
    summary: 'Placeholder: turns video URLs into structured JSON.',
    stack: [],
  },
  {
    slug: 'ecommerce-automation',
    title: 'E-commerce Automation',
    summary: 'Placeholder: automates a repetitive e-commerce workflow.',
    stack: [],
  },
  {
    slug: 'real-estate-data',
    title: 'Real Estate Data Collection',
    summary: 'Placeholder: gathers property listings into a usable dataset.',
    stack: [],
  },
]
