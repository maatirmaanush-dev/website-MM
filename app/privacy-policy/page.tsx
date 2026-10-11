import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/privacy-policy')
  const title = seo?.title || `Privacy Policy | Maatir Maanush`
  const description = seo?.description || `Read the Maatir Maanush privacy policy to understand how personal information, customer data, and website interactions are collected and protected.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/privacy-policy'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

const sections = [
  {
    title: '1. Information We Collect',
    content: `When you interact with us via WhatsApp or our website, we may collect the following information:\n\nâ€¢ Name and contact details (phone number, email address, delivery address) provided voluntarily during purchase\nâ€¢ Messages and conversation history on WhatsApp\nâ€¢ General usage data collected automatically by our website (pages visited, device type, browser)\n\nWe do not collect payment card details. All payment is handled directly and securely by payment processors.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information you provide solely to:\n\nâ€¢ Process and fulfil your orders\nâ€¢ Communicate with you about your purchase\nâ€¢ Respond to your enquiries\nâ€¢ Improve our products and services\n\nWe do not use your information for automated marketing without your consent. We do not sell, rent, or share your personal information with third parties except as required to fulfil your order.`,
  },
  {
    title: '3. WhatsApp Communications',
    content: `Our primary communication channel is WhatsApp. By initiating contact with us via WhatsApp, you consent to receiving messages related to your enquiry or order. We do not add customers to broadcast lists or group chats without explicit consent.`,
  },
  {
    title: '4. Data Security',
    content: `We take reasonable measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security of your data.`,
  },
  {
    title: '5. Data Retention',
    content: `We retain your personal information for as long as is necessary to fulfil the purposes for which it was collected, or as required by law. You may request deletion of your personal data at any time by contacting us via WhatsApp.`,
  },
  {
    title: '6. Cookies',
    content: `Our website may use cookies and similar tracking technologies to improve your browsing experience. You can control cookie settings through your browser. Disabling cookies may affect some functionality of the website.`,
  },
  {
    title: '7. Your Rights',
    content: `You have the right to:\n\nâ€¢ Access the personal information we hold about you\nâ€¢ Request correction of inaccurate information\nâ€¢ Request deletion of your personal data\nâ€¢ Withdraw consent to data processing where applicable\n\nTo exercise any of these rights, please contact us via WhatsApp.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of our website after changes constitutes acceptance of the revised policy.`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">Legal</p>
          <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-2">Privacy Policy</h1>
          <h2 className="font-serif italic text-earth-600 text-lg mb-4">How We Collect &amp; Use Information</h2>
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
