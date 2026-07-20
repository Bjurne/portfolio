import { Link } from 'react-router'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section className="flex flex-col gap-6 text-left">
      <h1 className="text-3xl font-semibold text-text-heading">Projects</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              to={`/projects/${project.slug}`}
              className="block h-full rounded-xl border border-border p-5 transition-colors hover:border-accent"
            >
              <h2 className="mb-2 text-lg font-medium text-text-heading">{project.title}</h2>
              <p className="text-sm text-text">{project.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
