import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ApiError, sendContact } from '../lib/api'
import ContactForm from './ContactForm'

vi.mock('../lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../lib/api')>()
  return { ...actual, sendContact: vi.fn() }
})

async function fillAndSubmit() {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Name'), 'Test User')
  await user.type(screen.getByLabelText('Email'), 'test@example.com')
  await user.selectOptions(screen.getByLabelText('Project type'), 'scraping')
  await user.selectOptions(screen.getByLabelText('Budget (USD)'), 'unsure')
  await user.type(screen.getByLabelText('Message'), 'I need data from a website.')
  await user.click(screen.getByRole('button', { name: 'Send project details' }))
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.mocked(sendContact).mockReset()
  })

  it('sends the form values and shows a success message', async () => {
    vi.mocked(sendContact).mockResolvedValue(undefined)
    render(<ContactForm />)

    await fillAndSubmit()

    expect(await screen.findByText('Sent. I will reply by email.')).toBeInTheDocument()
    expect(sendContact).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      project_type: 'scraping',
      budget: 'unsure',
      message: 'I need data from a website.',
      website: '',
    })
  })

  it('shows the rate-limit message on a 429', async () => {
    vi.mocked(sendContact).mockRejectedValue(new ApiError(429))
    render(<ContactForm />)

    await fillAndSubmit()

    expect(await screen.findByText(/Too many attempts/)).toBeInTheDocument()
  })

  it('shows a generic error on other failures', async () => {
    vi.mocked(sendContact).mockRejectedValue(new ApiError(502))
    render(<ContactForm />)

    await fillAndSubmit()

    expect(await screen.findByText('Something went wrong. Please try again.')).toBeInTheDocument()
  })
})
