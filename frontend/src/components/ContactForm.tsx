import { useState } from 'react'
import type { FormEvent } from 'react'

import { sendContact } from '../lib/api'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'mt-2 w-full rounded-md border border-line bg-surface px-3 py-2 text-ink placeholder:text-muted'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      await sendContact({
        name: String(data.get('name')),
        email: String(data.get('email')),
        project_type: String(data.get('project_type')),
        budget: String(data.get('budget')),
        message: String(data.get('message')),
        website: String(data.get('website')),
      })
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 grid max-w-2xl gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="text-sm">
          Name
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="text-sm">
          Project type
          <select name="project_type" required defaultValue="" className={field}>
            <option value="" disabled>
              Select one
            </option>
            <option value="scraping">Web scraping</option>
            <option value="automation">Browser automation</option>
            <option value="data-pipeline">Data pipeline</option>
            <option value="other">Something else</option>
          </select>
        </label>
        <label className="text-sm">
          Budget (USD)
          <select name="budget" required defaultValue="" className={field}>
            <option value="" disabled>
              Select one
            </option>
            <option value="under-500">Under 500</option>
            <option value="500-2000">500 to 2,000</option>
            <option value="2000-5000">2,000 to 5,000</option>
            <option value="5000-plus">5,000+</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </label>
      </div>

      <label className="text-sm">
        Message
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={field}
        />
      </label>

      {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity duration-(--motion-micro) hover:opacity-90 disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send project details'}
        </button>
        <p role="status" className="text-sm text-muted">
          {status === 'sent' && 'Sent. I will reply by email.'}
          {status === 'error' && 'Something went wrong. Please try again.'}
        </p>
      </div>
    </form>
  )
}
