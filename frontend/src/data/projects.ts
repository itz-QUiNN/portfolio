export interface CaseStudySections {
  problem: string
  solution: string
  architecture: string[]
  challenges: string[]
  result: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  stack: string[]
  caseStudy?: CaseStudySections
}

// Everything below is placeholder until replaced with real project details.
export const projects: Project[] = [
  {
    slug: 'tcgplayer-price-intelligence',
    title: 'TCGplayer Price Intelligence',
    summary: 'Placeholder: collects marketplace pricing and exports it for analysis.',
    stack: ['Python', 'Playwright', 'SQLite', 'CSV', 'PyInstaller'],
    caseStudy: {
      problem: 'Placeholder: what was hard or manual before this existed.',
      solution: 'Placeholder: what you built and how it changed the workflow.',
      architecture: ['Website', 'Playwright', 'Extraction', 'Validation', 'CSV / SQLite'],
      challenges: [
        'Placeholder: a real technical challenge and how you solved it.',
        'Placeholder: a second challenge.',
      ],
      result: 'Placeholder: a concrete outcome. No invented metrics.',
    },
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

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
