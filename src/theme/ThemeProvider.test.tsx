import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './theme-context'

function ThemeProbe() {
  const { preset, mode, toggleMode } = useTheme()
  return (
    <button onClick={toggleMode}>
      current: {preset}-{mode}
    </button>
  )
}

describe('ThemeProvider', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('defaults to default-light and toggles mode to dark on click', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )

    expect(screen.getByRole('button')).toHaveTextContent('current: default-light')
    expect(document.documentElement.dataset.preset).toBe('default')
    expect(document.documentElement.dataset.mode).toBe('light')

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveTextContent('current: default-dark')
    expect(document.documentElement.dataset.preset).toBe('default')
    expect(document.documentElement.dataset.mode).toBe('dark')
  })

  it('migrates a legacy bare light/dark localStorage value', () => {
    window.localStorage.setItem('portfolio-theme', 'dark')

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )

    expect(screen.getByRole('button')).toHaveTextContent('current: default-dark')
    expect(document.documentElement.dataset.preset).toBe('default')
    expect(document.documentElement.dataset.mode).toBe('dark')
  })
})
