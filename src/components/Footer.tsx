import { ScrollPageNav } from './ScrollPageNav'

export function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 flex min-h-16 items-center justify-center border-t border-border bg-bg px-4 text-sm text-text sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-full h-16 bg-gradient-to-b from-transparent to-bg"
      />
      <p className="text-center">
        &copy; {new Date().getFullYear()} Kristoffer Svedlund. Built with React &amp; Motion.
      </p>
      <div className="absolute top-0 right-4 -translate-y-1/2 sm:right-8">
        <ScrollPageNav />
      </div>
    </footer>
  )
}
