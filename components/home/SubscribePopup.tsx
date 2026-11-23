'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X, Loader2 } from 'lucide-react'

// Storage keys
const VISITED_KEY = 'mm_visited'          // localStorage — set after first visit
const SUBSCRIBED_KEY = 'mm_subscribed'    // localStorage — never show again once subscribed
const SEEN_SESSION_KEY = 'mm_popup_seen'  // sessionStorage — show at most once per session

const SHOW_DELAY_MS = 2500

function safeGet(storage: () => Storage, key: string) {
  try { return storage().getItem(key) } catch { return null }
}
function safeSet(storage: () => Storage, key: string, value: string) {
  try { storage().setItem(key, value) } catch { /* storage blocked */ }
}

function isFromGoogleSearch() {
  try {
    if (!document.referrer) return false
    const host = new URL(document.referrer).hostname
    return /(^|\.)google\.[a-z.]+$/i.test(host)
  } catch {
    return false
  }
}

/**
 * Popup display mode, for testing.
 *
 *  'always'  — show on every homepage load, ignoring visit/subscribe history.
 *  'once'    — reset the history, then show once like a first-time visitor.
 *  'default' — production behaviour (first visit or Google search, once per session).
 *
 * How to set it (first match wins):
 *  1. URL:  /?popup=always  |  /?popup=once  |  /?popup=default
 *     The choice is remembered in this browser tab (sessionStorage), so you can
 *     keep reloading "/" without the query string. Use ?popup=default to go back.
 *  2. Env:  NEXT_PUBLIC_SUBSCRIBE_POPUP_MODE=always | once  (in .env.local,
 *     restart `npm run dev`). Leave unset in production.
 */
type PopupMode = 'always' | 'once' | 'default'
const MODE_SESSION_KEY = 'mm_popup_mode'

function getPopupMode(): PopupMode {
  const valid = (v: string | null | undefined): v is PopupMode =>
    v === 'always' || v === 'once' || v === 'default'

  try {
    const param = new URLSearchParams(window.location.search).get('popup')
    if (valid(param)) {
      // Only 'always' is remembered; 'once' is a one-shot reset.
      if (param === 'always') window.sessionStorage.setItem(MODE_SESSION_KEY, param)
      else window.sessionStorage.removeItem(MODE_SESSION_KEY)
      return param
    }
    const remembered = window.sessionStorage.getItem(MODE_SESSION_KEY)
    if (valid(remembered)) return remembered
  } catch { /* storage blocked */ }

  const env = process.env.NEXT_PUBLIC_SUBSCRIBE_POPUP_MODE
  return valid(env) ? env : 'default'
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function SubscribePopup() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const sourceRef = useRef<'google' | 'first-visit'>('first-visit')
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Decide whether to show: first-ever visit, or arriving from a Google search.
  useEffect(() => {
    const ls = () => window.localStorage
    const ss = () => window.sessionStorage

    // Testing overrides — see getPopupMode() for how to switch.
    const mode = getPopupMode()
    if (mode === 'always') {
      const t = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS)
      return () => window.clearTimeout(t)
    }
    if (mode === 'once') {
      // Wipe the saved flags so the next load behaves like a brand-new visitor.
      try {
        ls().removeItem(VISITED_KEY)
        ls().removeItem(SUBSCRIBED_KEY)
        ss().removeItem(SEEN_SESSION_KEY)
      } catch { /* storage blocked */ }
    }

    if (safeGet(ls, SUBSCRIBED_KEY)) return
    if (safeGet(ss, SEEN_SESSION_KEY)) return

    const fromGoogle = isFromGoogleSearch()
    const firstVisit = !safeGet(ls, VISITED_KEY)
    safeSet(ls, VISITED_KEY, '1')

    if (!fromGoogle && !firstVisit) return
    sourceRef.current = fromGoogle ? 'google' : 'first-visit'

    const t = window.setTimeout(() => {
      safeSet(ss, SEEN_SESSION_KEY, '1')
      setOpen(true)
    }, SHOW_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [])

  // Lock scroll, close on Escape, focus first field.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    const focusT = window.setTimeout(() => nameInputRef.current?.focus({ preventScroll: true }), 350)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(focusT)
    }
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const cleanName = name.trim()
    const cleanPhone = phone.replace(/[\s()-]/g, '')
    if (cleanName.length < 2) return setError('Please enter your name.')
    if (!/^\+?\d{10,15}$/.test(cleanPhone)) return setError('Please enter a valid contact number.')

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, phone: cleanPhone, company, source: sourceRef.current }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Something went wrong. Please try again.')
      safeSet(() => window.localStorage, SUBSCRIBED_KEY, '1')
      setStatus('success')
      window.setTimeout(() => setOpen(false), 2800)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-[mmFadeIn_.35s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribe-popup-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-earth-900/55 backdrop-blur-[2px] cursor-default"
      />

      {/* Card */}
      <div className="relative w-full max-w-[860px] min-h-[560px] sm:min-h-0 sm:aspect-[5/4] overflow-hidden rounded-sm shadow-2xl animate-[mmPopIn_.45s_cubic-bezier(0.25,0.46,0.45,0.94)]">
        <Image
          src="/images/popup/subscribe-bg.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 92vw, 860px"
          className="object-cover object-left-top sm:object-center"
        />
        {/* Mobile: soften the lower half so the form reads over the embroidery */}
        <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-transparent via-beige-50/80 via-45% to-beige-50/95" />

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close subscription popup"
          className="absolute top-3 right-3 z-10 p-2 rounded-full text-earth-800 hover:bg-earth-900/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content — sits in the empty right side of the artwork on desktop */}
        <div className="relative flex h-full min-h-[560px] sm:min-h-0 items-end sm:items-center px-6 pb-8 pt-[52%] sm:p-0 sm:pl-[45%] sm:pr-[7%]">
          <div className="w-full text-center sm:text-left">
            {status === 'success' ? (
              <div className="py-6">
                <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#B3261E] mb-3">
                  Thank you
                </p>
                <h2 id="subscribe-popup-title" className="font-serif text-3xl sm:text-4xl text-earth-900 leading-tight">
                  You&rsquo;re woven in.
                </h2>
                <p className="mt-3 font-sans text-sm text-earth-700 leading-relaxed">
                  We&rsquo;ll reach out with new drops and stories from our artisans.
                </p>
              </div>
            ) : (
              <>
                <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#B3261E] mb-3">
                  Join the Maatir Maanush circle
                </p>
                <h2 id="subscribe-popup-title" className="font-serif text-3xl sm:text-[2.6rem] text-earth-900 leading-[1.1]">
                  Stay in the, <br className="hidden sm:block" />Kantha Loop.
                </h2>
                <p className="mt-3 font-sans text-sm text-earth-700 leading-relaxed max-w-sm mx-auto sm:mx-0">
                  Be the first to hear about new Kantha drops, limited editions and artisan stories.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-3">
                  <label className="sr-only" htmlFor="subscribe-name">Your name</label>
                  <input
                    name="name"
                    ref={nameInputRef}
                    id="subscribe-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    className="w-full bg-white/80 border border-earth-500/40 rounded-sm px-4 py-3 font-sans text-sm text-earth-900 placeholder:text-earth-600/60 focus:outline-none focus:border-earth-700 focus:bg-white transition-colors"
                  />

                  <label className="sr-only" htmlFor="subscribe-phone">Contact number</label>
                  <input
                    name="phone"
                    id="subscribe-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Contact number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s()-]/g, ''))}
                    maxLength={20}
                    className="w-full bg-white/80 border border-earth-500/40 rounded-sm px-4 py-3 font-sans text-sm text-earth-900 placeholder:text-earth-600/60 focus:outline-none focus:border-earth-700 focus:bg-white transition-colors"
                  />

                  {/* Honeypot — hidden from people, bots tend to fill it */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="absolute -left-[9999px] w-px h-px opacity-0"
                    aria-hidden="true"
                  />

                  {error && (
                    <p role="alert" className="font-sans text-xs text-[#B3261E]">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-earth-900 text-beige-50 rounded-sm px-6 py-3.5 font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#8E1F17] disabled:opacity-70 transition-colors duration-300 ease-premium"
                  >
                    {status === 'loading' && <Loader2 size={14} className="animate-spin" />}
                    Subscribe Now
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-4 font-sans text-xs text-earth-600 underline underline-offset-4 hover:text-earth-900"
                >
                  Maybe later
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
