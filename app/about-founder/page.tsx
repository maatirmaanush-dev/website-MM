import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getSeoByPath } from '@/lib/actions/seo'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import { NEW_DROPS_PATH } from '@/lib/site-links'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/about-founder')
  const title = seo?.title || 'About the Founder — Geeti Bhojnagarwala | Maatir Maanush'
  const description = seo?.description || 'The story of Geeti Bhojnagarwala — artist, storyteller, and founder of Maatir Maanush, a house built on Kantha embroidery and heritage craft.'
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/about-founder'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

const bioParagraphs = [
  `I was born and raised in Bengal, a land where every breeze carries poetry and every street corner hums with art. For 53 years, Bengal's culture seeped into my veins, its music, its craft, its soul, shaping me into a tactile being who feels life through touch, texture, and thread.`,
  `My mother, a born artist, was my first muse. From her, I inherited not just a love for all things handcrafted, but also the conviction that artistry is not a profession. It is a way of living.`,
  `Life took me through many roles: a Montessorian nurturing young minds, a past life regression therapist exploring hidden journeys of the soul, a merchandiser and store manager in silk furnishings, and eventually, the proprietor of Maatir Maanush, my dream project, my ode to heritage. Each chapter was a brushstroke, adding depth to the canvas of my existence.`,
  `I have always been right-brained in my approach: intuitive, fluid, and passionate. A philanderer at heart, not in love but in curiosity, I wandered across crafts, ideas, and vocations, always returning to the one constant: my passion for life and work.`,
  `Now, in Dehradun, as twilight gathers in my godhuli bela, I stand at the threshold of fulfilment. Maatir Maanush is not just a brand. It is my soul stitched into couture, a culmination of decades of devotion to craft.`,
  `And alongside this, I authored Yes, It's Me Geeti, a book that spills the dark skeletons from my cupboard, yet redeems them by weaving a kaleidoscopic tapestry of resilience. It is my confession, my catharsis, and my celebration of life relived.`,
  `My journey is not one of perfection, but of passion. Not of straight lines, but of threads knotted, tangled, and ultimately woven into something enduring.`,
  `This is my story: a life lived with conviction, a dream pursued with courage, and a twilight embraced with gratitude.`,
]

export default function AboutFounderPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-28 pb-24 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-10">
          <Link href="/about-us" className="hover:text-earth-900 transition-colors">About</Link>
          <span className="mx-2">&middot;</span>The Founder
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,340px)_1fr] gap-12 lg:gap-16">
          {/* Portrait */}
          <AnimatedReveal>
            <div className="relative w-full overflow-hidden rounded-sm bg-beige-100" style={{ aspectRatio: '4/5' }}>
              <Image
                src="/images/about/geeti-bhojnagarwala.jpg"
                alt="Geeti Bhojnagarwala, founder of Maatir Maanush"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 340px"
                priority
              />
            </div>
          </AnimatedReveal>

          {/* Bio */}
          <div>
            <AnimatedReveal>
              <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">
                About the Founder
              </p>
              <h1 className="font-serif text-3xl md:text-4xl text-earth-900 leading-tight mb-2">
                Godhuli Bela
              </h1>
              <p className="font-serif italic text-earth-600 text-lg mb-10">
                The Story of Geeti Bhojnagarwala
              </p>
            </AnimatedReveal>

            <div className="flex flex-col gap-5">
              {bioParagraphs.map((para, i) => (
                <AnimatedReveal key={i} delay={i * 40}>
                  <p className="font-sans text-earth-700 text-base leading-relaxed">
                    {para}
                  </p>
                </AnimatedReveal>
              ))}
            </div>

            <AnimatedReveal delay={bioParagraphs.length * 40}>
              <div className="mt-12 pt-8 border-t border-beige-200 flex flex-wrap gap-6 items-center">
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-sans tracking-[0.12em] uppercase text-xs px-5 py-2.5 bg-earth-900 text-beige-50 hover:bg-earth-700 transition-all duration-300"
                >
                  Get in Touch
                </a>
                <Link
                  href={NEW_DROPS_PATH}
                  className="text-sm font-sans text-earth-700 hover:text-earth-900 underline underline-offset-4 transition-colors"
                >
                  Explore the Collections →
                </Link>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </div>
    </main>
  )
}
