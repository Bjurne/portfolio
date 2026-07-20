import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App routing', () => {
  it('renders the home page by default and navigates to About', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(await screen.findByRole('heading', { name: /hi, i'm kristoffer/i })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'About' }))

    expect(await screen.findByRole('heading', { name: 'About' })).toBeInTheDocument()
  })
})
