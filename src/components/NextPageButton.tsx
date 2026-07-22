import { cn } from '@/lib/cn'

interface NextPageButtonProps {
  /** True once the current page is scrolled to its bottom, meaning the button now advances to the next page. */
  atBottom: boolean
  nextPageLabel: string
  onClick: () => void
}

export function NextPageButton({ atBottom, nextPageLabel, onClick }: NextPageButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={atBottom ? `Go to ${nextPageLabel}` : 'Scroll down'}
      className={cn(
        'grid size-12 shrink-0 place-items-center rounded-full border shadow-lg transition-colors',
        atBottom
          ? 'border-accent bg-accent text-accent-contrast hover:opacity-90'
          : 'border-border bg-surface text-text hover:border-accent hover:text-accent',
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M12 4a1 1 0 0 1 1 1v11.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V5a1 1 0 0 1 1-1Z" />
      </svg>
    </button>
  )
}
