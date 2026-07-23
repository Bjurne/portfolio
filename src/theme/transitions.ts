import type { Transition, Variants } from 'motion/react'
import type { PresetId } from './presets'
import type { TransitionDirection } from '@/lib/pageLoop'

/** Dispatched on `window` once a page's enter animation finishes, i.e. once its real layout has
 * actually landed - AnimatePresence's mode="wait" means that can be well after the route change. */
export const PAGE_TRANSITION_SETTLED_EVENT = 'portfolio:page-transition-settled'

export interface RouteTransitionConfig {
  /** initial/exit read the transition direction via motion's `custom` prop. */
  variants: Variants
  transition: Transition
}

export const routeTransitions: Record<PresetId, RouteTransitionConfig> = {
  default: {
    variants: {
      initial: (direction: TransitionDirection) => ({
        opacity: 0,
        y: direction === 'backward' ? -12 : 12,
      }),
      animate: { opacity: 1, y: 0 },
      exit: (direction: TransitionDirection) => ({
        opacity: 0,
        y: direction === 'backward' ? 12 : -12,
      }),
    },
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
}
