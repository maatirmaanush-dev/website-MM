import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import { MessageCircle, Mail, Video } from 'lucide-react'
import { PageFAQ } from '@/components/shared/PageFAQ'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/contact-us')
  const title = seo?.title || `Contact Us | Maatir Maanush`
  const description = seo?.description || `Get in touch with Maatir Maanush for product enquiries, styling assistance, collaborations, and customer support.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/contact-us'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">Reach Us</p>
          <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-2">Get in Touch</h1>
          <h2 className="font-serif italic text-earth-600 text-lg mb-4">Let&apos;s Start a Conversation</h2>
          <p className="font-sans text-sm text-earth-600 mb-16 max-w-lg leading-relaxed">
            We are a small, hands-on team. The fastest way to reach us is via WhatsApp — we respond within a few hours on business days.
          </p>
        </AnimatedReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AnimatedReveal delay={60}>
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 p-8 border border-beige-200 hover:border-earth-900 hover:bg-earth-900 transition-all duration-300"
            >
              <MessageCircle size={24} className="text-earth-700 group-hover:text-beige-50 transition-colors duration-300" />
              <div>
                <p className="font-serif text-xl text-earth-900 group-hover:text-beige-50 mb-1 transition-colors duration-300">WhatsApp</p>
                <p className="font-sans text-xs text-earth-500 group-hover:text-beige-200/70 leading-relaxed transition-colors duration-300">
                  Our primary channel. Message us for product enquiries, custom orders, order tracking, and general questions.
                </p>
              </div>
              <span className="text-xs font-sans tracking-[0.1em] uppercase text-earth-700 group-hover:text-beige-50 transition-colors duration-300">
                Message us â†’
              </span>
            </a>
          </AnimatedReveal>

          <AnimatedReveal delay={120}>
            <a
              href="mailto:hello@maatirmaanush.com"
              className="group flex flex-col gap-4 p-8 border border-beige-200 hover:border-earth-900 hover:bg-earth-900 transition-all duration-300"
            >
              <Mail size={24} className="text-earth-700 group-hover:text-beige-50 transition-colors duration-300" />
              <div>
                <p className="font-serif text-xl text-earth-900 group-hover:text-beige-50 mb-1 transition-colors duration-300">Email</p>
                <p className="font-sans text-xs text-earth-500 group-hover:text-beige-200/70 leading-relaxed transition-colors duration-300">
                  For wholesale enquiries, press, collaborations, and anything that requires a longer conversation.
                </p>
              </div>
              <span className="text-xs font-sans text-earth-700 group-hover:text-beige-50 transition-colors duration-300 break-all">
                hello@maatirmaanush.com
              </span>
            </a>
          </AnimatedReveal>

          <AnimatedReveal delay={180}>
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 p-8 border border-beige-200 hover:border-earth-900 hover:bg-earth-900 transition-all duration-300"
            >
              <Video size={24} className="text-earth-700 group-hover:text-beige-50 transition-colors duration-300" />
              <div>
                <p className="font-serif text-xl text-earth-900 group-hover:text-beige-50 mb-1 transition-colors duration-300">Book a Video Call</p>
                <p className="font-sans text-xs text-earth-500 group-hover:text-beige-200/70 leading-relaxed transition-colors duration-300">
                  Book a 30 min – 1 hour video call with our store and check all the latest collections virtually before they launch online. Fill up your details along with your preferred date and time.
                </p>
                <p className="font-sans text-xs text-earth-500 group-hover:text-beige-200/70 mt-2 transition-colors duration-300">
                  Operational hours: Mon – Sat
                </p>
              </div>
              <span className="text-xs font-sans tracking-[0.1em] uppercase text-earth-700 group-hover:text-beige-50 transition-colors duration-300">
                Book via WhatsApp â†’
              </span>
            </a>
          </AnimatedReveal>
        </div>

        <AnimatedReveal delay={180}>
          <div className="border-t border-beige-200 pt-12">
            <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-6">Follow Us</p>
            <div className="flex gap-6">
              <a
                href="https://instagram.com/maatirmaanush"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-sans text-sm text-earth-700 hover:text-earth-900 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
                Instagram
              </a>
              <a
                href="https://facebook.com/maatirmaanush"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-sans text-sm text-earth-700 hover:text-earth-900 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                Facebook
              </a>
            </div>
          </div>
        </AnimatedReveal>

      </div>
      <PageFAQ type="contact" />
</main>
  )
}
