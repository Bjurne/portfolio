export interface Project {
  slug: string
  title: string
  summary: string
  description: string
  stack: string[]
  link?: string
}

export const projects: Project[] = [
  {
    slug: 'portfolio-site',
    title: 'This Portfolio',
    summary: 'A mobile-first React SPA with themeable design tokens and animated route transitions.',
    description:
      'Built with Vite, React 19, TypeScript, React Router, Tailwind CSS v4, and Motion. ' +
      'Demonstrates a CSS-variable driven theming system and route-level page transitions.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'React Router'],
    link: undefined,
  },
]
