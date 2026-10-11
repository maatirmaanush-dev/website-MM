'use client'

import { useState } from 'react'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'

export default function AccountPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    // Open WhatsApp with contact info pre-filled for retargeting
    const msg = `Hi, I'd like to stay updated on new drops and collections.\n\nName: ${form.name}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ''}`
    const url = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? '919999999999'}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-lg mx-auto">
        <AnimatedReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">Stay Connected</p>
          <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-4">Join Our List</h1>
          <p className="font-sans text-sm text-earth-600 mb-12 leading-relaxed">
            Be the first to know about new drops, restocks, and exclusive pieces. We do not spam — only pieces worth your attention.
          </p>
        </AnimatedReveal>

        {submitted ? (
          <AnimatedReveal>
            <div className="bg-beige-100 p-10 text-center">
              <p className="font-serif text-2xl text-earth-900 mb-3">You&apos;re on the list.</p>
              <p className="font-sans text-sm text-earth-600">
                We&apos;ve received your details on WhatsApp. We&apos;ll reach out when there&apos;s something worth sharing.
              </p>
            </div>
          </AnimatedReveal>
        ) : (
          <AnimatedReveal delay={80}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-2">
                  Full Name <span className="text-earth-900">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full border border-beige-300 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder:text-earth-400 focus:outline-none focus:border-earth-900 transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-2">
                  Phone Number <span className="text-earth-900">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full border border-beige-300 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder:text-earth-400 focus:outline-none focus:border-earth-900 transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-2">
                  Email Address <span className="text-earth-400">(optional)</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@email.com"
                  className="w-full border border-beige-300 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder:text-earth-400 focus:outline-none focus:border-earth-900 transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-earth-900 text-beige-50 font-sans text-xs tracking-[0.15em] uppercase py-4 hover:bg-earth-700 transition-colors duration-300 mt-2"
              >
                Join via WhatsApp
              </button>

              <p className="text-xs font-sans text-earth-400 text-center leading-relaxed">
                Submitting opens WhatsApp with your details pre-filled. We only use your contact info to notify you about new pieces and collections.
              </p>
            </form>
          </AnimatedReveal>
        )}
      </div>
    </main>
  )
}
