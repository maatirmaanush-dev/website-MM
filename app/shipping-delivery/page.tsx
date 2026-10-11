import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { PageFAQ } from '@/components/shared/PageFAQ'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/shipping-delivery')
  const title = seo?.title || `Shipping & Delivery | Maatir Maanush`
  const description = seo?.description || `Shipping and delivery information for Maatir Maanush orders, including dispatch timelines, domestic and international shipping, and order assistance.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/shipping-delivery'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">Policies</p>
          <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-2">Shipping & Delivery Information</h1>
          <h2 className="font-serif italic text-earth-600 text-lg mb-4">Shipping &amp; Delivery</h2>
          <p className="font-sans text-sm text-earth-500 mb-12">Last updated: March 2025</p>
        </AnimatedReveal>

        <div className="space-y-12 font-sans text-earth-700 text-base leading-relaxed">
          {[
            {
              title: 'Processing Time',
              color: '#8B3A2A',
              content: `All orders are processed within 2–3 business days of confirmed payment. For made-to-order pieces (such as the Kantha Jacket), production time is communicated separately at the time of enquiry and can range from 6 to 18 weeks depending on the complexity of the piece.\n\nYou will receive a confirmation message on WhatsApp once your order has been dispatched, along with a tracking number.`,
            },
            {
              title: 'Domestic Shipping (India)',
              color: '#B07D2E',
              content: `We ship to all states and union territories within India via reputed courier partners (Bluedart, Delhivery, or DTDC depending on your pincode).\n\nâ€¢ Standard delivery: 5–8 business days\nâ€¢ Express delivery: 2–4 business days (available on request; additional charges apply)\n\nFree shipping is available on orders above â‚¹15,000. For orders below this threshold, a flat shipping fee of â‚¹200 applies.`,
            },
            {
              title: 'International Shipping',
              color: '#3D4F7C',
              content: `We ship internationally to most countries including the UK, USA, Canada, Australia, UAE, Singapore, and across Europe.\n\nâ€¢ Estimated delivery: 10–21 business days (varies by destination)\nâ€¢ International shipping charges are calculated at checkout based on the destination country and order weight.\nâ€¢ Customs duties, import taxes, and any local charges levied by the destination country are the responsibility of the buyer.`,
            },
            {
              title: 'Packaging',
              color: '#3D5A3E',
              content: `Every Maatir Maanush piece is packed with the utmost care it deserves. Pieces are placed in a cotton cloth bag, and shipped with care to prevent damage in transit. Gift wrapping is available on request.`,
            },
            {
              title: 'Damaged in Transit',
              color: '#5A3B6E',
              content: `If your order arrives damaged, please photograph the packaging and the piece immediately upon receipt and contact us via WhatsApp within 48 hours of delivery. We will arrange a replacement or refund on a case-by-case basis.`,
            },
            {
              title: 'Contact',
              color: '#8B3A2A',
              content: `For all shipping queries, please reach us via WhatsApp. We respond within 24 hours on business days.`,
            },
          ].map((section) => (
            <AnimatedReveal key={section.title}>
              <div className="flex gap-5">
                <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: section.color + '60' }} />
                <div>
                  <h2 className="font-serif text-xl text-earth-900 mb-3">{section.title}</h2>
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-3 text-sm leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
      <PageFAQ type="shipping" />
</main>
  )
}
