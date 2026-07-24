export type TransitionDirection = 'forward' | 'backward'
export type TransitionAxis = 'x' | 'y'

export interface PageTransitionPlan {
  axis: TransitionAxis
  direction: TransitionDirection
}

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

/** A project's detail page (/projects/:slug) - reached from, and backed out to, /projects. */
export function isProjectDetailPage(pathname: string): boolean {
  return pathname.startsWith('/projects/')
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
function getLoopDirection(fromPathname: string, toPathname: string): TransitionDirection {
  const fromIndex = pageLoopOrder.indexOf(fromPathname)
  const toIndex = pageLoopOrder.indexOf(toPathname)
  if (fromIndex === -1 || toIndex === -1) return 'forward'

  const diff = (toIndex - fromIndex + pageLoopOrder.length) % pageLoopOrder.length
  return diff <= pageLoopOrder.length / 2 ? 'forward' : 'backward'
}

/** Vertical slide between loop pages, or a horizontal "drill in/out" of a project's detail page. */
export function getPageTransitionPlan(fromPathname: string, toPathname: string): PageTransitionPlan {
  const enteringDetail = isProjectDetailPage(toPathname) && !isProjectDetailPage(fromPathname)
  const leavingDetail = isProjectDetailPage(fromPathname) && !isProjectDetailPage(toPathname)

  if (enteringDetail) return { axis: 'x', direction: 'forward' }
  if (leavingDetail) return { axis: 'x', direction: 'backward' }
  return { axis: 'y', direction: getLoopDirection(fromPathname, toPathname) }
}
