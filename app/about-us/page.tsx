import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { BrandStory } from '@/components/about/BrandStory'
import { ArtisanCommunity } from '@/components/about/ArtisanCommunity'
import { HeritageTimeline } from '@/components/about/HeritageTimeline'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'
import { PageFAQ } from '@/components/shared/PageFAQ'
import { NEW_DROPS_PATH } from '@/lib/site-links'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/about-us')
  const title = seo?.title || `About Maatir Maanush & Geeti Bhojnagawala`
  const description = seo?.description || `Founded by Kantha stylist Geeti Bhojnagawala, Maatir Maanush brings together artisanal heritage and contemporary women's clothing inspired by timeless craftsmanship.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/about-us'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-16">
      {/* Hero */}
      <div className="relative h-[80vh] min-h-[500px] bg-earth-900">
        <ImageWithFallback
          src="/images/about/artisan-1.jpg"
          alt="Artisan at work"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 15%' }}
          priority
          fallbackLabel="Artisan at work"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-6 lg:px-10">
          <div className="max-w-7xl w-full mx-auto">
            <h1 className="font-serif text-beige-50 leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              About Maatir Maanush
            </h1>
          </div>
        </div>
      </div>

      <BrandStory />
      <ArtisanCommunity />
      <HeritageTimeline />

      {/* Why Maatir Maanush */}
      <section className="bg-beige-100 py-12 sm:py-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <p className="text-xs tracking-[0.25em] uppercase text-earth-500 font-sans mb-6 text-center">
            Not fashion. A revolution stitched in comfort and heritage.
          </p>

          {/* Headline */}
          <h2 className="font-serif text-earth-900 text-center leading-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            We don&apos;t make clothes.<br className="hidden sm:block" /> We make companions.
          </h2>

          {/* Sub-headline */}
          <p className="font-sans text-earth-600 text-sm md:text-base leading-relaxed text-center max-w-2xl mx-auto mb-20">
            Every garment is a second skin — pure silk, free sizes, pockets for freedom, and stitches that carry
            centuries-old Kantha embroidery. It is comfort without compromise, heritage without dilution, and quality without end.
          </p>

          {/* 4 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-beige-300 border border-beige-300 mb-20">
            {[
              { title: 'Second-Skin Comfort',  body: 'Pure fabrics, free sizes, no labels, no irritation.' },
              { title: 'Heritage Alive',        body: 'Kantha hand embroidery keeps culture stitched into the present.' },
              { title: 'Freedom in Form',       body: 'Pockets in every garment, impeccable finishing inside and out.' },
              { title: 'Quality Eternal',       body: 'Superior threads, heirloom-worthy pieces, crafted to last generations.' },
            ].map((p) => (
              <div key={p.title} className="bg-beige-50 px-8 py-10 flex flex-col gap-3">
                <h3 className="font-serif text-lg text-earth-900 leading-snug">{p.title}</h3>
                <p className="font-sans text-xs text-earth-500 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Closing lines */}
          <div className="text-center flex flex-col gap-4">
            <p className="font-serif italic text-earth-700 text-lg md:text-xl">
              Once a Maatir Maanush fan, always a Maatir Maanush fan.
            </p>
            <p className="font-sans text-earth-600 text-sm">
              Step into comfort. Step into culture. Step into yourself.
            </p>
            <a
              href={NEW_DROPS_PATH}
              className="inline-block mt-4 font-sans text-xs tracking-[0.2em] uppercase text-earth-900 border border-earth-900 px-8 py-3 hover:bg-earth-900 hover:text-beige-50 transition-all duration-300 self-center"
            >
              Wear the revolution. Live the poetry. →
            </a>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-earth-900 py-12 sm:py-20 px-6 lg:px-10 text-center">
        <p className="font-serif text-beige-50 text-3xl md:text-4xl mb-4">
          Find your piece.
        </p>
        <p className="font-sans text-beige-200/70 text-sm mb-8 max-w-md mx-auto">
          Every piece is one-of-a-kind. Once it finds its person, it is gone.
          Reach out and we will help you find yours.
        </p>
        <a
          href={buildGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-earth-500 text-beige-50 font-sans text-sm px-8 py-3.5 hover:bg-earth-700 transition-colors duration-300"
        >
          <MessageCircle size={16} />
          Enquire
        </a>
      </section>
      <PageFAQ type="about" />
</main>
  )
}
