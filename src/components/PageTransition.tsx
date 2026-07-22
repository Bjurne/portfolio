import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLocation, useOutlet } from 'react-router'
import { useTheme } from '@/theme/theme-context'
import { routeTransitions } from '@/theme/transitions'
import { getPageDirection, type TransitionDirection } from '@/lib/pageLoop'

export function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const shouldReduceMotion = useReducedMotion()
  const { preset } = useTheme()
  const { variants, transition } = routeTransitions[preset]

  // Derived during render so the exiting page's variants, re-evaluated by AnimatePresence via
  // its `custom` prop, agree with the entering page's direction.
  const [previousPathname, setPreviousPathname] = useState(location.pathname)
  const [direction, setDirection] = useState<TransitionDirection>('forward')
  if (previousPathname !== location.pathname) {
    setDirection(getPageDirection(previousPathname, location.pathname))
    setPreviousPathname(location.pathname)
  }

  const activeVariants = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : variants

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.main
        key={location.pathname}
        custom={direction}
        variants={activeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="mx-auto w-full max-w-4xl flex-1 px-4 pt-10 pb-24 sm:px-8"
      >
        {outlet}
      </motion.main>
    </AnimatePresence>
  )
}
