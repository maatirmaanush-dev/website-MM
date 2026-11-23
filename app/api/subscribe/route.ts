import { NextResponse } from 'next/server'

// Forwards subscription sign-ups to a Google Apps Script web app that appends
// them to a Google Sheet. The web-app URL stays server-side so it can't be
// scraped and spammed directly. See scripts/google-sheets-subscribe.gs.

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('[subscribe] GOOGLE_SHEETS_WEBHOOK_URL is not set')
    return NextResponse.json({ error: 'Subscriptions are not configured yet.' }, { status: 500 })
  }

  let body: { name?: unknown; phone?: unknown; company?: unknown; source?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: real users never fill the hidden "company" field.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : ''
  const phone = typeof body.phone === 'string' ? body.phone.replace(/[\s()-]/g, '') : ''
  const source = typeof body.source === 'string' ? body.source.slice(0, 50) : 'direct'

  if (name.length < 2) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  }
  if (!/^\+?\d{10,15}$/.test(phone)) {
    return NextResponse.json({ error: 'Please enter a valid contact number.' }, { status: 400 })
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name,
        phone,
        source,
        secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET || '',
      }),
      redirect: 'follow',
      cache: 'no-store',
    })
    const data = await res.json().catch(() => null)
    if (!res.ok || !data?.ok) {
      console.error('[subscribe] Sheet webhook failed', res.status, data)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[subscribe] Sheet webhook error', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 502 })
  }
}
