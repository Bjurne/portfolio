import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { isAtPageBottom, isAtPageTop, scrollTowardsBottom } from '@/lib/scroll'
import { getNextPath, getPreviousPath, isLoopPage, pageLoopLabels } from '@/lib/pageLoop'
import { NextPageButton } from './NextPageButton'

const WHEEL_THRESHOLD = 12
const SWIPE_THRESHOLD = 48
const NAV_COOLDOWN_MS = 700

export function ScrollPageNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [atBottom, setAtBottom] = useState(false)
  const lockedRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)

  const active = isLoopPage(location.pathname)

  useEffect(() => {
    if (!active) return

    const updateAtBottom = () => setAtBottom(isAtPageBottom())
    updateAtBottom()

    // AnimatePresence delays mounting the new route's content until the outgoing page's exit
    // animation finishes, so its real height lands well after this effect runs. Re-check once
    // that actually happens instead of trusting the pathname-change timing alone.
    const resizeObserver = new ResizeObserver(updateAtBottom)
    resizeObserver.observe(document.documentElement)

    function goTo(path: string) {
      if (lockedRef.current) return
      lockedRef.current = true
      navigate(path)
      window.setTimeout(() => {
        lockedRef.current = false
      }, NAV_COOLDOWN_MS)
    }

    function handleWheel(event: WheelEvent) {
      if (event.deltaY > WHEEL_THRESHOLD && isAtPageBottom()) {
        goTo(getNextPath(location.pathname))
      } else if (event.deltaY < -WHEEL_THRESHOLD && isAtPageTop()) {
        goTo(getPreviousPath(location.pathname))
      }
      updateAtBottom()
    }

    function handleTouchStart(event: TouchEvent) {
      touchStartYRef.current = event.touches[0]?.clientY ?? null
    }

    function handleTouchEnd(event: TouchEvent) {
      const startY = touchStartYRef.current
      touchStartYRef.current = null
      if (startY === null) return

      const endY = event.changedTouches[0]?.clientY ?? startY
      const swipedUpBy = startY - endY // positive: finger moved up, i.e. "scroll down" intent

      if (swipedUpBy > SWIPE_THRESHOLD && isAtPageBottom()) {
        goTo(getNextPath(location.pathname))
      } else if (swipedUpBy < -SWIPE_THRESHOLD && isAtPageTop()) {
        goTo(getPreviousPath(location.pathname))
      }
      updateAtBottom()
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('scroll', updateAtBottom, { passive: true })
    window.addEventListener('resize', updateAtBottom)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', updateAtBottom)
      window.removeEventListener('resize', updateAtBottom)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [active, location.pathname, navigate])

  if (!active) return null

  function handleButtonClick() {
    if (atBottom) {
      navigate(getNextPath(location.pathname))
    } else {
      scrollTowardsBottom()
    }
  }

  return (
    <NextPageButton
      atBottom={atBottom}
      nextPageLabel={pageLoopLabels[getNextPath(location.pathname)]}
      onClick={handleButtonClick}
    />
  )
}
