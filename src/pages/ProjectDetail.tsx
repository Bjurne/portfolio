import { Link, Navigate, useParams } from 'react-router'
import { projects } from '@/data/projects'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/projects" replace />

  return (
    <article className="flex flex-col gap-6 text-left">
      <Link to="/projects" className="text-sm text-accent hover:underline">
        &larr; Back to projects
      </Link>
      <h1 className="text-3xl font-semibold text-text-heading">{project.title}</h1>
      <p className="text-text">{project.description}</p>
      <ul className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-full bg-surface px-3 py-1 text-sm text-text">
            {tech}
          </li>
        ))}
      </ul>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-accent hover:underline"
        >
          View project &rarr;
        </a>
      )}
    </article>
  )
}
