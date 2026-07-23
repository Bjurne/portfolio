import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { useTheme } from '@/theme/theme-context'
import { routeTransitions } from '@/theme/transitions'

type NavArrowDirection = 'down' | 'left'

interface PageNavButtonProps {
  arrow: NavArrowDirection
  /** Primary (accent-filled) style when this click will navigate; muted otherwise. */
  active: boolean
  ariaLabel: string
  onClick: () => void
}

export function PageNavButton({ arrow, active, ariaLabel, onClick }: PageNavButtonProps) {
  const { preset } = useTheme()
  const { transition } = routeTransitions[preset]

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'grid size-12 shrink-0 place-items-center rounded-full border shadow-lg transition-colors',
        active
          ? 'border-accent bg-accent text-accent-contrast hover:opacity-90'
          : 'border-border bg-surface text-text hover:border-accent hover:text-accent',
      )}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="currentColor"
        aria-hidden="true"
        animate={{ rotate: arrow === 'left' ? 90 : 0 }}
        transition={transition}
      >
        <path d="M12 4a1 1 0 0 1 1 1v11.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V5a1 1 0 0 1 1-1Z" />
      </motion.svg>
    </button>
  )
}
