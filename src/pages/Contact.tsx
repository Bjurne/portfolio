import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'pending' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('pending')

    const form = new FormData(event.currentTarget)
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      message: String(form.get('message') ?? ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="flex flex-col gap-6 text-left">
      <h1 className="text-3xl font-semibold text-text-heading">Contact</h1>
      <p className="text-text">Have a question or an opportunity? Send a message below.</p>

      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-text">
          Name
          <input
            name="name"
            type="text"
            required
            className="rounded-lg border border-border bg-bg px-3 py-2 text-text-heading outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-text">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-lg border border-border bg-bg px-3 py-2 text-text-heading outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-text">
          Message
          <textarea
            name="message"
            required
            rows={5}
            className="resize-none rounded-lg border border-border bg-bg px-3 py-2 text-text-heading outline-none focus:border-accent"
          />
        </label>

        <button
          type="submit"
          disabled={status === 'pending'}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === 'pending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'success' && (
          <p className="text-sm text-accent" role="status">
            Thanks! I&apos;ll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-500" role="alert">
            Something went wrong &mdash; please try again or email me directly.
          </p>
        )}
      </form>
    </section>
  )
}
