export const config = { runtime: 'edge' }

// NOTE (Kristoffer) - We should probably implement GDPR compliance for our ContactForm

interface ContactPayload {
  name: string
  email: string
  message: string
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (typeof body !== 'object' || body === null) return false
  const { name, email, message } = body as Record<string, unknown>
  return (
    typeof name === 'string' &&
    name.trim().length > 0 &&
    typeof email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    typeof message === 'string' &&
    message.trim().length > 0
  )
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const body = await request.json().catch(() => null)
  if (!isValidPayload(body)) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !toEmail) {
    return Response.json({ error: 'Contact form is not configured' }, { status: 500 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Contact Form <contact@resend.dev>',
      to: toEmail,
      reply_to: body.email,
      subject: `New message from ${body.name}`,
      text: body.message,
    }),
  })

  if (!res.ok) {
    return Response.json({ error: 'Failed to send message' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
