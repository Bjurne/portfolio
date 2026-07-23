import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('ScrollPageNav', () => {
  it('shows a next-page button on Home that navigates to About', async () => {
    const user = userEvent.setup()
    render(<App />)

    await screen.findByRole('heading', { name: /hi, i'm kristoffer/i })

    const nextButton = screen.getByRole('button', { name: 'Go to About' })
    await user.click(nextButton)

    expect(await screen.findByRole('heading', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Go to Projects' })).toBeInTheDocument()
  })

  it('shows a back-to-projects button on a project detail page instead of the loop button', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: 'Projects' }))
    await user.click(await screen.findByRole('heading', { name: 'This Portfolio' }))
    await screen.findByRole('heading', { name: 'This Portfolio' })

    expect(screen.queryByRole('button', { name: /go to|scroll down/i })).not.toBeInTheDocument()
    const backButton = screen.getByRole('button', { name: 'Back to projects' })

    await user.click(backButton)
    expect(await screen.findByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  })
})
