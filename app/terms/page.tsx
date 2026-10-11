import type { Metadata } from 'next'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Maatir Maanush',
  description: 'Read the terms and conditions for using the Maatir Maanush website, including policies related to orders, payments, shipping, and customer responsibilities.',
  alternates: {
    canonical: 'https://www.maatirmaanush.com/terms',
  },
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Maatir Maanush website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. We reserve the right to update these terms at any time without prior notice. Continued use of the website after changes constitutes acceptance of the revised terms.`,
  },
  {
    title: '2. Products and Descriptions',
    content: `We make every effort to accurately represent our products. Because all Maatir Maanush pieces are handcrafted, there will be natural variation between pieces and their descriptions or photographs. These variations are inherent to handcraft and do not constitute misrepresentation.\n\nColours may appear differently on different screens. We encourage customers to enquire via WhatsApp for additional photographs or information before purchasing.`,
  },
  {
    title: '3. Purchases and Payment',
    content: `All purchases are facilitated through direct WhatsApp conversation. Confirmed orders constitute a binding agreement between the buyer and Maatir Maanush. Full payment is required before dispatch. We accept bank transfers and UPI payments for domestic orders, and international wire transfers or PayPal for international orders.`,
  },
  {
    title: '4. Pricing',
    content: `All prices listed on the website are in Indian Rupees (INR) unless otherwise stated. Prices are subject to change without notice. Applicable taxes will be communicated at the time of purchase. International customers are responsible for any import duties or taxes levied by their country.`,
  },
  {
    title: '5. Intellectual Property',
    content: `All content on this website — including text, photographs, design elements, and brand identity — is the property of Maatir Maanush and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or use any content without our express written permission.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `Maatir Maanush shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability in any matter related to our products or services shall not exceed the purchase price of the item in question.`,
  },
  {
    title: '7. Governing Law',
    content: `These terms are governed by the laws of India. Any disputes arising from these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts of West Bengal, India.`,
  },
  {
    title: '8. Contact',
    content: `For any questions regarding these Terms of Service, please contact us via WhatsApp.`,
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">Legal</p>
          <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-2">Terms & Conditions</h1>
          <h2 className="font-serif italic text-earth-600 text-lg mb-4">Understanding Our Terms &amp; Policies</h2>
          <p className="font-sans text-sm text-earth-500 mb-12">Last updated: March 2025</p>
        </AnimatedReveal>
        <div className="space-y-10">
          {sections.map((s, i) => (
            <AnimatedReveal key={s.title} delay={i * 40}>
              <div className="border-t border-beige-200 pt-8">
                <h2 className="font-serif text-xl text-earth-900 mb-4">{s.title}</h2>
                {s.content.split('\n\n').map((p, j) => (
                  <p key={j} className="font-sans text-sm text-earth-700 leading-relaxed mb-3">{p}</p>
                ))}
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </main>
  )
}
