import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { isAtPageBottom, isAtPageTop, scrollTowardsBottom } from '@/lib/scroll'
import {
  getNextPath,
  getPreviousPath,
  isLoopPage,
  isProjectDetailPage,
  pageLoopLabels,
} from '@/lib/pageLoop'
import { PAGE_TRANSITION_SETTLED_EVENT } from '@/theme/transitions'
import { PageNavButton } from './PageNavButton'

const WHEEL_THRESHOLD = 12
const SWIPE_THRESHOLD = 48
const NAV_COOLDOWN_MS = 700
const PROJECTS_PATH = '/projects'

export function ScrollPageNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [atBottom, setAtBottom] = useState(false)
  const lockedRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)

  const active = isLoopPage(location.pathname)
  const isDetail = isProjectDetailPage(location.pathname)

  useEffect(() => {
    if (!active) return

    const updateAtBottom = () => setAtBottom(isAtPageBottom())
    updateAtBottom()

    // AnimatePresence (mode="wait") mounts the new page's real content only once the outgoing
    // page's exit animation finishes, then animates the new page in - so its real height doesn't
    // land until that entrance animation completes, well after this effect runs.
    window.addEventListener(PAGE_TRANSITION_SETTLED_EVENT, updateAtBottom)

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
      window.removeEventListener(PAGE_TRANSITION_SETTLED_EVENT, updateAtBottom)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', updateAtBottom)
      window.removeEventListener('resize', updateAtBottom)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [active, location.pathname, navigate])

  if (isDetail) {
    return (
      <PageNavButton
        arrow="left"
        active
        ariaLabel="Back to projects"
        onClick={() => navigate(PROJECTS_PATH)}
      />
    )
  }

  if (!active) return null

  function handleButtonClick() {
    if (atBottom) {
      navigate(getNextPath(location.pathname))
    } else {
      scrollTowardsBottom()
    }
  }

  return (
    <PageNavButton
      arrow="down"
      active={atBottom}
      ariaLabel={atBottom ? `Go to ${pageLoopLabels[getNextPath(location.pathname)]}` : 'Scroll down'}
      onClick={handleButtonClick}
    />
  )
}
