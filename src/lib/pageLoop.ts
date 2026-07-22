export type TransitionDirection = 'forward' | 'backward'

/** Home -> About -> Projects -> Contact -> Home, looping indefinitely. */
export const pageLoopOrder: string[] = ['/', '/about', '/projects', '/contact']

export const pageLoopLabels: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/projects': 'Projects',
  '/contact': 'Contact',
}

export function isLoopPage(pathname: string): boolean {
  return pageLoopOrder.includes(pathname)
}

export function getNextPath(pathname: string): string {
  const index = pageLoopOrder.indexOf(pathname)
  if (index === -1) return pathname
  return pageLoopOrder[(index + 1) % pageLoopOrder.length]
}

export function getPreviousPath(pathname: string): string {
  const index = pageLoopOrder.indexOf(pathname)
  if (index === -1) return pathname
  return pageLoopOrder[(index - 1 + pageLoopOrder.length) % pageLoopOrder.length]
}

/** Direction between two loop pages, taking the shorter way around the loop. Falls back to 'forward' if either page isn't part of the loop. */
export function getPageDirection(fromPathname: string, toPathname: string): TransitionDirection {
  const fromIndex = pageLoopOrder.indexOf(fromPathname)
  const toIndex = pageLoopOrder.indexOf(toPathname)
  if (fromIndex === -1 || toIndex === -1) return 'forward'

  const diff = (toIndex - fromIndex + pageLoopOrder.length) % pageLoopOrder.length
  return diff <= pageLoopOrder.length / 2 ? 'forward' : 'backward'
}
