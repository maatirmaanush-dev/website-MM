'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'

type FAQItem = { q: string; a: string }

const faqSets: Record<string, FAQItem[]> = {
  general: [
    { q: 'What is Kantha embroidery?', a: 'Kantha is one of the oldest embroidery traditions in Bengal, dating back over 500 years. It uses a simple running stitch worked across layered cloth to create intricate patterns. Each piece is entirely handmade — no machines, no shortcuts.' },
    { q: 'Are pieces made to order?', a: 'Yes. Every piece at Maatir Maanush is either made to order or a one-of-a-kind completed piece. This means lead times of 4–12 weeks depending on the item. We communicate the exact timeline at the time of enquiry.' },
    { q: 'How do I care for my Kantha piece?', a: 'Dry clean for the first wash. Subsequent washes can be done by hand in cold water with mild detergent. Do not machine wash or tumble dry. Store folded in a muslin bag, away from direct sunlight.' },
    { q: 'Do you ship internationally?', a: 'Yes — to the UK, USA, Canada, Australia, UAE, Singapore, and across Europe. International delivery typically takes 10–21 business days. Customs duties are the responsibility of the buyer.' },
    { q: 'Can I request a custom or bespoke piece?', a: 'Yes. Bespoke orders are a core part of what we do — you can specify fabric, colour, motif, and sizing. Reach out via WhatsApp to start the conversation. Bespoke pieces typically take 8–18 weeks.' },
  ],
  product: [
    { q: 'Is this piece ready to ship or made to order?', a: 'Most of our pieces are made to order by artisans in rural Bengal. Lead times are specified on each product page. Once dispatched, domestic delivery takes 5–8 business days.' },
    { q: 'What sizes are available?', a: 'Most garments are available in S, M, and L. For bespoke sizing, reach out on WhatsApp — we can accommodate custom measurements at no extra cost on most pieces.' },
    { q: 'Can I see the piece before buying?', a: 'We can arrange additional photos or a short video via WhatsApp. For customers in Kolkata, in-person viewing may be possible on request.' },
    { q: 'What fabric is used?', a: 'Fabrics vary by piece — handwoven cotton, silk, Gacchi Tussar, and Katan silk are most common. Fabric details are listed on each product page. All are natural fibres.' },
    { q: 'What is your return policy?', a: 'We accept returns on ready pieces within 7 days of delivery if the piece is unworn and in original condition. Made-to-order pieces cannot be returned unless defective. Reach out via WhatsApp to initiate a return.' },
  ],
  collections: [
    { q: 'How often do you release new pieces?', a: 'We release new pieces on a rolling basis — there is no fixed drop schedule. Follow us on Instagram or join our updates list to be notified when new pieces are added.' },
    { q: 'Are pieces one-of-a-kind?', a: 'Most pieces are one-of-a-kind. Where a design is repeated, the handmade nature means no two pieces are ever truly identical — variations in colour and stitch density will always exist.' },
    { q: 'Can I filter by price or fabric?', a: 'You can browse by category from our New Drops page. For specific filtering by price or fabric, reach out on WhatsApp and we will curate a selection for you.' },
    { q: 'Do you offer gift packaging?', a: 'Yes. Every Maatir Maanush piece ships in our signature packaging. Gift wrapping with a handwritten note is available on request — mention it when you enquire.' },
    { q: 'How do I know a piece is genuine Kantha?', a: 'All our pieces are authenticated by the artisan community we work with. Each piece comes with a tag that identifies the artisan and region of origin. We do not source from factories.' },
  ],
  kantha: [
    { q: 'What makes Kantha different from other embroidery?', a: 'Kantha uses a simple running stitch — the same stitch repeated thousands of times across a piece. The complexity comes not from the stitch itself but from its arrangement: density, direction, colour, and the motifs it builds.' },
    { q: 'Is Kantha suitable for daily wear?', a: 'Yes. Kantha on cotton is durable and well-suited to daily wear. Kantha on silk is more delicate and better suited to occasions. Care instructions vary by fabric — see the product page for specifics.' },
    { q: 'What are the most common Kantha motifs?', a: 'The lotus, fish, tree of life, sun and moon, and paisley are among the most traditional motifs. Each carries cultural and symbolic meaning rooted in Bengali folk tradition, Hindu iconography, and Buddhist symbolism.' },
    { q: 'Where are your artisans based?', a: 'Our artisans are based in rural West Bengal — primarily Murshidabad, Birbhum, and the districts around Shantiniketan, where the Kantha tradition has been strongest.' },
    { q: 'Is Kantha a GI-tagged craft?', a: 'Yes. Kantha embroidery from West Bengal holds a Geographical Indication (GI) tag, recognising it as a craft specific to the region and protecting the artisans\' heritage.' },
  ],
  about: [
    { q: 'Who founded Maatir Maanush?', a: 'Maatir Maanush was founded with the mission of connecting Kantha artisans in rural Bengal directly with customers who value handmade, heritage craft. Our story is one of craft, community, and radical transparency.' },
    { q: 'Do you work directly with artisans?', a: 'Yes — always. We have no intermediary agents or bulk sourcing arrangements. Each piece is commissioned from or purchased directly from the artisan who made it.' },
    { q: 'Are artisans fairly compensated?', a: 'Fair compensation is central to our model. We price our pieces to reflect the true cost of skilled, time-intensive handwork. Artisans receive the majority of each sale price.' },
    { q: 'Can I visit the artisans or the studio?', a: 'Occasional artisan visits are arranged for interested customers. Reach out via WhatsApp if you are interested — we will let you know when the next visit is being planned.' },
    { q: 'Do you collaborate with other brands or designers?', a: 'We are open to collaborations that align with our values. Please reach out via email at hello@maatirmaanush.com with details of your proposal.' },
  ],
  contact: [
    { q: 'What is the fastest way to reach you?', a: 'WhatsApp is our fastest channel — we typically respond within 4 hours on business days. For non-urgent queries, email hello@maatirmaanush.com.' },
    { q: 'What are your business hours?', a: 'We are available Monday to Saturday, 10am–7pm IST. We may respond outside these hours but cannot guarantee it.' },
    { q: 'Can I place an order directly on WhatsApp?', a: 'Yes — WhatsApp is our primary ordering channel. Share the product you are interested in, your size, and delivery address. We will send you payment details and confirm the order.' },
    { q: 'Do you have a physical store?', a: 'We do not have a permanent retail store. We occasionally participate in craft fairs and pop-ups — follow us on Instagram for announcements.' },
    { q: 'How do I track my order?', a: 'Once your order is dispatched, we will send you a tracking number on WhatsApp. Domestic orders ship with Bluedart, Delhivery, or DTDC.' },
  ],
  shipping: [
    { q: 'How long does delivery take?', a: 'Domestic delivery takes 5–8 business days (standard) or 2–4 business days (express). International delivery takes 10–21 business days depending on destination.' },
    { q: 'Do you offer free shipping?', a: 'Free shipping is available on domestic orders above ₹15,000. For orders below this threshold, a flat fee of ₹200 applies. International shipping is calculated at checkout.' },
    { q: 'Do you ship to my country?', a: 'We ship to most countries including the UK, USA, Canada, Australia, UAE, Singapore, and across Europe. If you are unsure, reach out on WhatsApp with your location.' },
    { q: 'What if my order arrives damaged?', a: 'Photograph the packaging and the piece immediately and contact us on WhatsApp within 48 hours. We will arrange a replacement or refund on a case-by-case basis.' },
    { q: 'Are customs duties included in the price?', a: 'No. International orders may be subject to customs duties and import taxes in the destination country. These are the responsibility of the buyer and are not included in our prices.' },
  ],
  returns: [
    { q: 'Can I return a piece I am not happy with?', a: 'We accept returns on ready pieces within 7 days of delivery, unworn and in original condition. Please contact us on WhatsApp to initiate a return.' },
    { q: 'Can I return a made-to-order piece?', a: 'Made-to-order pieces cannot be returned unless they arrive defective or significantly different from what was agreed. Each made-to-order piece is confirmed with photos before dispatch.' },
    { q: 'How long does a refund take?', a: 'Refunds are processed within 5–7 business days of receiving the returned piece. The refund will be issued via the original payment method.' },
    { q: 'What if my piece has a defect?', a: 'Contact us on WhatsApp with photos within 48 hours of receiving the piece. We will arrange a replacement or full refund immediately.' },
    { q: 'Who pays for return shipping?', a: 'For returns due to defects or our error, we cover return shipping. For all other returns, the buyer is responsible for return shipping costs.' },
  ],
  blog: [
    { q: 'How often do you publish new articles?', a: 'We publish new pieces in the journal on a rolling basis — typically once or twice a month. Follow us on Instagram to be notified of new stories.' },
    { q: 'Can I contribute a story to the journal?', a: 'We welcome pitches from writers, researchers, and practitioners working in craft, textile heritage, or related fields. Email hello@maatirmaanush.com with a short proposal.' },
    { q: 'Are the artisans featured in the journal compensated?', a: 'Yes. Artisans who participate in profiles and stories are compensated for their time. We do not publish artisan stories without their knowledge and consent.' },
    { q: 'Can I share journal articles?', a: 'Yes — please share freely with attribution to Maatir Maanush and a link to the original article. We ask that you do not reproduce full articles without permission.' },
    { q: 'Is there a newsletter?', a: 'We are working on a newsletter. In the meantime, the best way to stay updated is to follow us on Instagram or reach out on WhatsApp to be added to our updates list.' },
  ],
}

interface PageFAQProps {
  type?: keyof typeof faqSets
  title?: string
}

export function PageFAQ({ type = 'general', title = 'Frequently Asked Questions' }: PageFAQProps) {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = faqSets[type] ?? faqSets.general

  return (
    <section className="mt-16 sm:mt-24 py-20 px-6 lg:px-10 bg-beige-100">
      <div className="max-w-3xl mx-auto">
        <AnimatedReveal className="mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">FAQ</p>
          <h2 className="font-serif text-3xl text-earth-900">{title}</h2>
        </AnimatedReveal>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <AnimatedReveal key={i} delay={i * 40}>
              <div className="border-t border-beige-200 last:border-b">
                <button
                  className="w-full flex items-start justify-between gap-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-serif text-base text-earth-900">{faq.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-earth-500">
                    {open === i ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                {open === i && (
                  <div className="pb-5 -mt-1">
                    <p className="font-sans text-sm text-earth-700 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal delay={220}>
          <div className="mt-8 text-center">
            <p className="font-sans text-sm text-earth-600 mb-3">Still have questions?</p>
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
