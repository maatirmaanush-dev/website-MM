import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import { PageFAQ } from '@/components/shared/PageFAQ'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/returns')
  const title = seo?.title || `Returns & Exchanges | Maatir Maanush`
  const description = seo?.description || `Returns and exchange information for Maatir Maanush orders, including eligibility, timelines, and assistance for a seamless shopping experience.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/returns'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">Policies</p>
          <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-2">Returns & Exchanges</h1>
          <h2 className="font-serif italic text-earth-600 text-lg mb-4">Eligibility for Returns &amp; Exchanges</h2>
          <p className="font-sans text-sm text-earth-500 mb-12">Last updated: March 2025</p>
        </AnimatedReveal>

        <div className="space-y-12 font-sans text-earth-700 text-sm leading-relaxed">
          <AnimatedReveal>
            <div className="bg-beige-100 border-l-4 border-earth-500 p-6 rounded-sm">
              <p className="font-serif text-earth-900 text-base mb-2">Our Commitment</p>
              <p>
                Because every Maatir Maanush piece is handcrafted and one-of-a-kind, we ask that you enquire
                thoroughly before purchasing. We encourage questions, additional photographs, and direct conversation
                via WhatsApp before you commit to a piece. We want you to love what you receive.
              </p>
            </div>
          </AnimatedReveal>

          {[
            {
              title: 'Return Eligibility',
              color: '#8B3A2A',
              content: `We accept returns within 7 days of delivery, subject to the following conditions:\n\nâ€¢ The piece must be unused, unwashed, and in its original condition\nâ€¢ The original packaging cotton bag & wrapping material must be intact\nâ€¢ The piece must not have been altered, embellished, soiled or treated in any way\n\nWe do not accept returns on:\nâ€¢ Made-to-order pieces (unless defective)\nâ€¢ Sale or discounted items\nâ€¢ Pieces that have been used, washed, or altered\n\nTo initiate a return, contact us via WhatsApp within 7 days of receiving your order. We will provide return shipping instructions.`,
            },
            {
              title: 'Exchanges',
              color: '#B07D2E',
              content: `Exchanges are possible subject to availability. Because most of our pieces are one-of-a-kind, an exact exchange may not always be possible. We will work with you to find a suitable alternative.\n\nExchange requests must be raised within 7 days of delivery. The original piece must be returned in the same condition as described under Return Eligibility above.`,
            },
            {
              title: 'Defective or Incorrect Pieces',
              color: '#3D5A3E',
              content: `If you receive a piece that is defective or different from what was confirmed in your WhatsApp conversation, please contact us immediately with photographs. We will arrange a full refund or replacement at no cost to you.\n\nNote: Natural variation in stitch density, colour, and motif placement is inherent to handcraft and does not constitute a defect.`,
            },
            {
              title: 'Refunds',
              color: '#3D4F7C',
              content: `Once your returned piece is received and inspected, we will process your refund within 7–10 business days. Refunds are issued to the original payment method.\n\nOriginal shipping charges are non-refundable. Return shipping costs are the responsibility of the buyer unless the return is due to our error.`,
            },
            {
              title: 'International Returns',
              color: '#5A3B6E',
              content: `We accept international returns under the same conditions as domestic returns. International return shipping is entirely at the buyer's cost. We recommend using a tracked shipping service, as we cannot be responsible for pieces lost in return transit.`,
            },
          ].map((section) => (
            <AnimatedReveal key={section.title}>
              <div className="flex gap-5">
                <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: section.color + '60' }} />
                <div>
                  <h2 className="font-serif text-xl text-earth-900 mb-3">{section.title}</h2>
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-3">{para}</p>
                  ))}
                </div>
              </div>
            </AnimatedReveal>
          ))}

          <AnimatedReveal>
            <p className="border-t border-beige-200 pt-8">
              For any questions about returns or exchanges, please{' '}
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-900 underline underline-offset-4 hover:text-earth-500 transition-colors"
              >
                reach us on WhatsApp
              </a>
              . We respond within 24 hours on business days.
            </p>
          </AnimatedReveal>
        </div>
      </div>
      <PageFAQ type="returns" />
</main>
  )
}
