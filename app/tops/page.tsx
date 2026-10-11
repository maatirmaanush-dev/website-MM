import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import Link from 'next/link'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'
import { PageFAQ } from '@/components/shared/PageFAQ'
import { NEW_DROPS_PATH } from '@/lib/site-links'
import { categoryRobotsMeta } from '@/lib/category-meta'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/tops')
  const title = seo?.title || `Kantha Tops - Maatir Maanush`
  const description = seo?.description || `Kantha embroidered tops for contemporary layering, handcrafted in Bengal.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/tops'}`,
    },
    ...(await categoryRobotsMeta('Tops')),
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default function TopsPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-2">
            <Link href={NEW_DROPS_PATH} className="hover:text-earth-900 transition-colors">New Drops</Link>
            <span className="mx-2">&middot;</span>Tops
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-4">Tops</h1>
          <p className="font-sans text-sm text-earth-600 mb-12 leading-relaxed">
            Kantha embroidered tops for contemporary layering. New pieces dropping soon.
          </p>

          <div className="w-16 h-px bg-earth-300 mx-auto mb-12" />

          <p className="font-serif text-2xl text-earth-900 mb-4">Coming Soon</p>
          <p className="font-sans text-sm text-earth-600 mb-8 max-w-sm mx-auto">
            This category is being curated. In the meantime, reach out on WhatsApp to enquire about bespoke pieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-earth-900 text-beige-50 font-sans text-sm tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-earth-700 transition-colors duration-300"
            >
              <MessageCircle size={15} />
              Enquire
            </a>
            <Link
              href={NEW_DROPS_PATH}
              className="inline-flex items-center justify-center border border-earth-900 text-earth-900 font-sans text-sm tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-earth-900 hover:text-beige-50 transition-all duration-300"
            >
              All Categories
            </Link>
          </div>
        </AnimatedReveal>
      </div>
      <PageFAQ type="collections" />
</main>
  )
}
