'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What is Kantha embroidery?',
    a: 'Kantha is one of the oldest embroidery traditions in Bengal, dating back over 500 years. It uses a simple running stitch worked across layered cloth to create intricate patterns and textures. Each piece is entirely handmade — no machines, no shortcuts. The motifs carry centuries of cultural memory: the lotus, the fish, the tree of life.',
  },
  {
    q: 'Are your pieces made to order?',
    a: 'Yes. Every piece at Maatir Maanush is either made to order or a one-of-a-kind piece already completed by the artisan. We do not hold large inventories. This means production time typically ranges from 4–12 weeks depending on the piece. We will always communicate the lead time clearly when you enquire.',
  },
  {
    q: 'How do I care for my Kantha piece?',
    a: 'We recommend dry cleaning for the first wash. Subsequent washes can be done by hand in cold water with a mild detergent. Do not machine wash or tumble dry. Store folded in a muslin bag away from direct sunlight. With proper care, a Kantha piece will last decades.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. We ship to most countries including the UK, USA, Canada, Australia, UAE, Singapore, and across Europe. International delivery typically takes 10–21 business days. Customs duties and import taxes are the responsibility of the buyer. Please see our Shipping & Delivery page for full details.',
  },
  {
    q: 'Can I request a custom or bespoke piece?',
    a: 'Yes — bespoke orders are a core part of what we do. You can specify fabric, colour palette, motif preferences, and sizing. Reach out via WhatsApp to start the conversation. Bespoke pieces require a deposit upfront and have longer lead times (typically 8–18 weeks).',
  },
]

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 lg:px-10 bg-beige-100">
      <div className="max-w-3xl mx-auto">
        <AnimatedReveal className="mb-14">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
          />
        </AnimatedReveal>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <AnimatedReveal key={i} delay={i * 40}>
              <div className="border-t border-beige-200 last:border-b">
                <button
                  className="w-full flex items-start justify-between gap-6 py-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-serif text-lg text-earth-900">{faq.q}</span>
                  <span className="flex-shrink-0 mt-1 text-earth-500">
                    {open === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {open === i && (
                  <div className="pb-6 -mt-2">
                    <p className="font-sans text-sm text-earth-700 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal delay={250}>
          <div className="mt-10 text-center">
            <p className="font-sans text-sm text-earth-600 mb-4">Have a question that&apos;s not listed here?</p>
            <Link
              href="/contact-us"
              className="inline-flex items-center font-sans text-xs tracking-[0.1em] uppercase text-earth-900 border-b border-earth-900 pb-0.5 hover:text-earth-500 hover:border-earth-500 transition-colors duration-200"
            >
              Contact us →
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
