import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLocation, useOutlet } from 'react-router'
import { useTheme } from '@/theme/theme-context'
import { routeTransitions } from '@/theme/transitions'

export function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const shouldReduceMotion = useReducedMotion()
  const { preset } = useTheme()
  const { variants, transition } = routeTransitions[preset]

  const activeVariants = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : variants

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        variants={activeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-8"
      >
        {outlet}
      </motion.main>
    </AnimatePresence>
  )
}
