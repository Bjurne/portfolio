import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { router } from '@/app/router'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
