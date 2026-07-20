export function About() {
  return (
    <section className="flex flex-col gap-6 text-left">
      <h1 className="text-3xl font-semibold text-text-heading">About</h1>
      <p className="text-text">
        Intermediate fullstack developer with a strong frontend focus. Comfortable across the
        React ecosystem, TypeScript, and modern build tooling &mdash; currently exploring
        animation, theming, and performance patterns for production UIs.
      </p>
      <div>
        <h2 className="mb-2 text-xl font-medium text-text-heading">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vite', 'Testing'].map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border px-3 py-1 text-sm text-text"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
