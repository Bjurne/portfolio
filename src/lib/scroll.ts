const EDGE_THRESHOLD_PX = 4

export function isAtPageBottom(): boolean {
  const doc = document.documentElement
  return window.innerHeight + window.scrollY >= doc.scrollHeight - EDGE_THRESHOLD_PX
}

export function isAtPageTop(): boolean {
  return window.scrollY <= EDGE_THRESHOLD_PX
}

/** Scrolls towards the bottom of the page by one viewport-ish step, clamped to the page's max scroll. */
export function scrollTowardsBottom(): void {
  const doc = document.documentElement
  const maxScroll = doc.scrollHeight - window.innerHeight
  const step = window.innerHeight * 0.8
  window.scrollTo({ top: Math.min(window.scrollY + step, maxScroll), behavior: 'smooth' })
}
