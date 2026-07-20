import { createBrowserRouter } from 'react-router'
import { Layout } from './Layout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Projects } from '@/pages/Projects'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { Contact } from '@/pages/Contact'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/projects', element: <Projects /> },
      { path: '/projects/:slug', element: <ProjectDetail /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
])
