import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PageTransition } from '@/components/PageTransition'

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col bg-bg text-text">
      <Nav />
      <PageTransition />
      <Footer />
    </div>
  )
}
