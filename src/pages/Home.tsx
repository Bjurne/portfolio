import { Link } from 'react-router'

export function Home() {
  return (
    <section className="flex flex-col items-start gap-6 py-10 text-left">
      <p className="text-sm font-medium text-accent">Frontend / Fullstack Developer</p>
      <h1 className="text-4xl font-semibold text-text-heading sm:text-5xl">
        Hi, I&apos;m Kristoffer.
      </h1>
      <p className="max-w-xl text-lg text-text">
        I build fast, accessible web apps with React and TypeScript. This site is itself a
        demo &mdash; check out the theme toggle and page transitions.
      </p>
      <div className="flex gap-3">
        <Link
          to="/projects"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
        >
          View projects
        </Link>
        <Link
          to="/contact"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
        >
          Get in touch
        </Link>
      </div>
    </section>
  )
}
