import type { Transition, Variants } from 'motion/react'
import type { PresetId } from './presets'

export interface RouteTransitionConfig {
  variants: Variants
  transition: Transition
}

export const routeTransitions: Record<PresetId, RouteTransitionConfig> = {
  default: {
    variants: {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
    },
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
}
