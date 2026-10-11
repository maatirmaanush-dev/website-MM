'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'

// Client half of /faq — the accordion needs useState. Metadata and canonical live
// in the server component at app/faq/page.tsx.

const faqs: { q: string; a: string; category: string }[] = [
  // Products
  {
    category: 'Products',
    q: 'Are all pieces truly handmade?',
    a: 'Yes, without exception. Every piece in our collection is hand-stitched by artisans in West Bengal. We do not use machine embroidery, printed Kantha patterns, or factory production of any kind. The time taken — often six to eighteen weeks per piece — reflects this.',
  },
  {
    category: 'Products',
    q: 'Will my piece look exactly like the photograph?',
    a: 'Because each piece is made by hand, there will be slight variations in stitch placement, colour saturation, and motif detail. These are not flaws — they are the fingerprints of the artisan. No two pieces are identical, and that is precisely the point.',
  },
  {
    category: 'Products',
    q: 'What fabrics do you use?',
    a: 'We work with Premium Gachhi Tussar Silk & 4 Ply Katan Silks only. All fabric sourcing is done with care for quality and sustainability.',
  },
  {
    category: 'Products',
    q: 'How do I know the price is fair?',
    a: 'Our prices reflect the true cost of handmade: weeks of skilled artisan labour, ethically sourced materials, and a fair price paid to the maker. Premium handcraft is expensive because it should be. We encourage you to compare the time and skill required against anything machine-made.',
  },
  // Enquiry & Purchase
  {
    category: 'Enquiry & Purchase',
    q: 'How do I buy a piece?',
    a: 'Click the "Enquire on WhatsApp" button on any product. You\'ll be connected directly to us with a pre-filled message about the piece you\'re interested in. We handle all sales through direct conversation — no anonymous checkout.',
  },
  {
    category: 'Enquiry & Purchase',
    q: 'Can I request a custom or made-to-order piece?',
    a: 'All our pieces including the sarees and outfits are one of a kind. We can discuss bespoke commissions for special occasions only once you approve of a particular kantha embroidered fabric and design. Please enquire via WhatsApp with as much detail as possible about what you have in mind.',
  },
  {
    category: 'Enquiry & Purchase',
    q: 'Do you hold pieces?',
    a: 'We can hold a piece for 48 hours while you decide. Because many pieces are one-of-a-kind, we cannot guarantee availability beyond that window.',
  },
  // Care
  {
    category: 'Care',
    q: 'How should I care for my Kantha piece?',
    a: 'Each piece comes with specific care instructions. As a general rule silk Kantha pieces require proper dry cleaning. Store folded in muslin to retain its natural colour and sheen. Never use bleach.',
  },
  {
    category: 'Care',
    q: 'The thread looks raised or puckered. Is that normal?',
    a: 'Yes. The characteristic ripple and slight puckering of Kantha cloth is inherent to the running stitch and is considered a mark of authenticity. It softens beautifully with use and washing.',
  },
  // Shipping
  {
    category: 'Shipping',
    q: 'Do you ship internationally?',
    a: 'Yes. We ship to most countries. International shipping charges and timelines vary by destination — please enquire via WhatsApp for specifics to your location.',
  },
  {
    category: 'Shipping',
    q: 'How long does delivery take?',
    a: 'Within India: 5–8 business days. International: 10–21 business days depending on destination and customs processing. Made-to-order pieces require additional lead time of 6–18 weeks.',
  },
]

const categories = Array.from(new Set(faqs.map((f) => f.category)))

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-beige-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left"
      >
        <span className="font-serif text-base text-earth-900">{q}</span>
        <ChevronDown
          size={18}
          className={cn(
            'flex-shrink-0 mt-0.5 text-earth-500 transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <p className="font-sans text-sm text-earth-700 leading-relaxed pb-5 pr-8">
          {a}
        </p>
      )}
    </div>
  )
}

export default function FaqContent() {
  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">Help</p>
          <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-4">Frequently Asked Questions</h1>
          <p className="font-sans text-earth-700">
            Can&apos;t find what you need?{' '}
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-earth-900 transition-colors"
            >
              Ask us on WhatsApp
            </a>
            .
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-4">
              {cat}
            </p>
            {faqs
              .filter((f) => f.category === cat)
              .map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
          </div>
        ))}
      </div>
    </main>
  )
}
