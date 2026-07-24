import type { Transition, Variants } from 'motion/react'
import type { PresetId } from './presets'
import type { PageTransitionPlan, TransitionAxis } from '@/lib/pageLoop'

/** Dispatched on `window` once a page's enter animation finishes, i.e. once its real layout has
 * actually landed - AnimatePresence's mode="wait" means that can be well after the route change. */
export const PAGE_TRANSITION_SETTLED_EVENT = 'portfolio:page-transition-settled'

export interface RouteTransitionConfig {
  /** initial/exit read the transition plan (axis + direction) via motion's `custom` prop. */
  variants: Variants
  transition: Transition
}

const SLIDE_DISTANCE: Record<TransitionAxis, number> = { y: 12, x: 24 }

/** +distance for 'forward', -distance for 'backward'. */
function directionalOffset(plan: PageTransitionPlan): number {
  const distance = SLIDE_DISTANCE[plan.axis]
  return plan.direction === 'backward' ? -distance : distance
}

function slide(plan: PageTransitionPlan, delta: number) {
  return plan.axis === 'x' ? { opacity: 0, x: delta } : { opacity: 0, y: delta }
}

export const routeTransitions: Record<PresetId, RouteTransitionConfig> = {
  default: {
    variants: {
      initial: (plan: PageTransitionPlan) => slide(plan, directionalOffset(plan)),
      animate: { opacity: 1, x: 0, y: 0 },
      exit: (plan: PageTransitionPlan) => slide(plan, -directionalOffset(plan)),
    },
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
}
