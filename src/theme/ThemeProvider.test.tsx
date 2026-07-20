import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './theme-context'

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme}>
      current: {theme}
    </button>
  )
}

describe('ThemeProvider', () => {
  it('defaults to light and toggles to dark on click', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )

    expect(screen.getByRole('button')).toHaveTextContent('current: light')
    expect(document.documentElement.dataset.theme).toBe('light')

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveTextContent('current: dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
