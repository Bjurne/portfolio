import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLocation, useOutlet } from 'react-router'
import { useTheme } from '@/theme/theme-context'
import { PAGE_TRANSITION_SETTLED_EVENT, routeTransitions } from '@/theme/transitions'
import { getPageTransitionPlan, type PageTransitionPlan } from '@/lib/pageLoop'

export function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const shouldReduceMotion = useReducedMotion()
  const { preset } = useTheme()
  const { variants, transition } = routeTransitions[preset]

  // Derived during render so the exiting page's variants, re-evaluated by AnimatePresence via
  // its `custom` prop, agree with the entering page's transition plan.
  const [previousPathname, setPreviousPathname] = useState(location.pathname)
  const [plan, setPlan] = useState<PageTransitionPlan>({ axis: 'y', direction: 'forward' })
  if (previousPathname !== location.pathname) {
    setPlan(getPageTransitionPlan(previousPathname, location.pathname))
    setPreviousPathname(location.pathname)
  }

  const activeVariants = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : variants

  return (
    <AnimatePresence mode="wait" initial={false} custom={plan}>
      <motion.main
        key={location.pathname}
        custom={plan}
        variants={activeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        onAnimationComplete={(definition) => {
          // AnimatePresence reuses this same callback for the exit animation too (definition
          // "exit"), fired while the outgoing page is still on screen - only the "animate"
          // completion means this page's real layout has actually landed.
          if (definition === 'animate') {
            window.dispatchEvent(new Event(PAGE_TRANSITION_SETTLED_EVENT))
          }
        }}
        className="mx-auto w-full max-w-4xl flex-1 px-4 pt-10 pb-24 sm:px-8"
      >
        {outlet}
      </motion.main>
    </AnimatePresence>
  )
}
