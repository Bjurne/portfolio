import { NavLink } from 'react-router'
import { cn } from '@/lib/cn'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border px-4 py-3 sm:px-8">
      <NavLink to="/" className="text-lg font-semibold text-text-heading">
        Kristoffer
      </NavLink>
      <nav className="flex w-full flex-wrap items-center justify-center gap-1 sm:w-auto sm:justify-end sm:gap-2">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'rounded-full px-3 py-1.5 text-sm transition-colors',
                isActive ? 'bg-accent text-accent-contrast' : 'text-text hover:text-accent',
              )
            }
          >
            {label}
          </NavLink>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  )
}
