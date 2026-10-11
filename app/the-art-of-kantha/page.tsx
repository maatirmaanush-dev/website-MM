import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import Link from 'next/link'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'
import { PageFAQ } from '@/components/shared/PageFAQ'
import { NEW_DROPS_PATH } from '@/lib/site-links'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/the-art-of-kantha')
  const title = seo?.title || `The Art of Kantha Embroidery | Maatir Maanush`
  const description = seo?.description || `Kantha embroidery and Kantha stitch craftsmanship rooted in Bengal heritage, celebrating the timeless art of handcrafted storytelling through textiles.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/the-art-of-kantha'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

const processSteps = [
  {
    number: '01',
    title: 'Cloth Preparation',
    body: 'Layers of old or new cotton or silk cloth are stacked and basted together. Traditionally, worn saris and dhotis were recycled — giving the fabric a second life through the hands of the artisan.',
    color: '#8B3A2A',
  },
  {
    number: '02',
    title: 'Motif Design',
    body: 'Designs are drawn freehand — no stencils, no transfers. The artisan carries the motif in memory, passed down through generations. Each motif carries meaning: the lotus for purity, the fish for fertility, the tree of life for continuity.',
    color: '#B07D2E',
  },
  {
    number: '03',
    title: 'The Running Stitch',
    body: 'The defining Kantha stitch is a simple running stitch — needle in, needle out — worked in cotton thread across the cloth. What appears simple is deceptively skilled: the tension, spacing, and rhythm determine the texture and drape of the finished piece.',
    color: '#3D5A3E',
  },
  {
    number: '04',
    title: 'Filling & Density',
    body: 'Different Kantha styles vary in stitch density. Nakshi Kantha is fully filled with fine stitching; Sujani Kantha uses sparse stitching on a pictorial ground. Each style requires weeks to months of sustained work.',
    color: '#3D4F7C',
  },
  {
    number: '05',
    title: 'Finishing',
    body: 'The finished piece is washed, pressed, and inspected. A hand-stitched Kantha develops a subtle ripple and warmth — a characteristic wrinkle that is not a defect but a signature. It cannot be replicated by machine.',
    color: '#5A3B6E',
  },
]

export default function KanthaPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-16">

      {/* Hero */}
      <div className="relative bg-earth-900 overflow-hidden" style={{ minHeight: '70vh' }}>
        {/* Background image */}
        <img
          src="/images/about/kantha-hero.jpg"
          alt="Kantha artisan at work"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '50% 5%' }}
        />
        {/* Overlays for text readability */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
        <div className="relative flex items-center justify-center px-6 lg:px-10 py-16 sm:py-24" style={{ minHeight: '70vh' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-beige-50 leading-tight"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
            The Art of Kantha Embroidery
          </h1>
        </div>
        </div>
      </div>

      {/* What is Kantha */}
      <section className="py-24 px-6 lg:px-10 max-w-5xl mx-auto">
        <AnimatedReveal>
          <SectionHeading eyebrow="The Craft" title="What is Kantha?" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans text-earth-700 text-base leading-relaxed">
            <div className="space-y-5">
              <p>
                Kantha is one of the oldest forms of embroidery in the Indian subcontinent — a craft born not from
                luxury, but from necessity. The word <em>kantha</em> comes from the Sanskrit root <em>kontha</em>,
                meaning &ldquo;rags&rdquo; or &ldquo;old cloth.&rdquo; At its origin, it was the art of mending —
                of taking worn-out cloth and, through patient stitching, giving it new life.
              </p>
              <p>
                At its most elemental, Kantha is the running stitch — a needle moving in and out of layered cloth
                in a rhythm that is meditative, precise, and deeply human. The simplicity of the stitch belies its
                power: in skilled hands, it can create shimmering textures, flowing pictorial narratives, and textiles
                that feel alive to the touch.
              </p>
            </div>
            <div className="space-y-5">
              <p>
                Today, Kantha appears on silk sarees, cotton dupattas, quilts, jackets, and stoles. But its spirit
                remains unchanged: it is cloth that has been listened to, worked with, and transformed through patience
                and intention. Each piece is unique. Each stitch is placed by a human hand. No two pieces are ever
                truly identical.
              </p>
              <p>
                At Maatir Maanush, we work exclusively with artisans who have inherited this tradition — women in
                rural Bengal for whom Kantha is not a hobby or a livelihood choice, but a language.
              </p>
            </div>
          </div>
        </AnimatedReveal>
      </section>

      {/* History & Origins */}
      <section className="bg-beige-100 py-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <AnimatedReveal>
            <SectionHeading eyebrow="History & Origins" title="Bengal Roots" className="mb-10" />
          </AnimatedReveal>
          <div className="space-y-12">
            {[
              {
                era: 'Ancient Origins',
                color: '#8B3A2A',
                text: `Kantha's origins in Bengal stretch back at least to the 5th century CE, with references found in early Buddhist texts. Women in rural Bengal quilted together worn saris and dhotis — creating layered cloth that was warmer, stronger, and more durable than any single piece of fabric. The resulting quilts were called kantha, and they served a deeply practical purpose: keeping families warm through the Bengal winter.`,
              },
              {
                era: '15th–18th Century: Devotion and Ritual',
                color: '#B07D2E',
                text: `By the medieval period, Kantha had taken on sacred dimensions. Women stitched kanthas as votive offerings to temples, as swaddling cloths for newborns, and as ceremonial covers for sacred texts. The motifs evolved: the lotus, the tree of life, the fish, the sun and moon — each loaded with meaning drawn from Hindu, Buddhist, and local folk traditions.`,
              },
              {
                era: '19th Century: Documentation & Displacement',
                color: '#3D5A3E',
                text: `The arrival of British colonial rule brought profound disruption to Bengal's textile traditions. As machine-made cloth became available and cheap, the economic logic of kantha diminished. Yet the women continued to stitch. By the late 19th century, collectors and scholars began to document the craft. Rabindranath Tagore championed Kantha as a living art form deserving of recognition alongside the great textile traditions of India.`,
              },
              {
                era: 'Post-Independence Revival',
                color: '#3D4F7C',
                text: `After 1947, a series of revival efforts — most significantly through cooperatives established by women's organisations in West Bengal and Bangladesh — brought Kantha back. Today, Kantha is a GI (Geographical Indication) tagged craft of West Bengal, and its practitioners are recognised as master artisans.`,
              },
            ].map((item, i) => (
              <AnimatedReveal key={item.era} delay={i * 100}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full mt-1.5" style={{ backgroundColor: item.color }} />
                    <div className="w-px flex-1" style={{ backgroundColor: item.color + '33' }} />
                  </div>
                  <div className="pb-8">
                    <p className="text-xs tracking-[0.15em] uppercase font-sans mb-2" style={{ color: item.color }}>
                      {item.era}
                    </p>
                    <p className="font-sans text-earth-700 text-base leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Significance */}
      <section className="py-24 px-6 lg:px-10 max-w-5xl mx-auto">
        <AnimatedReveal>
          <SectionHeading eyebrow="Culture & Meaning" title="Why Kantha Matters" className="mb-10" />
        </AnimatedReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Women's Authorship",
              body: 'Kantha is one of the few artistic traditions in South Asia where women were the primary creators, curators, and transmitters. The canon of Kantha motifs was passed mother to daughter across centuries — an oral tradition expressed in thread.',
              color: '#8B3A2A',
            },
            {
              title: 'Zero Waste Ethos',
              body: 'The original Kantha was made from reclaimed cloth — worn sarees layered and stitched into new objects. This is not a modern sustainability claim. It is an ancient practice that understood waste as a failure of imagination.',
              color: '#3D5A3E',
            },
            {
              title: 'Living Memory',
              body: 'Kantha motifs encode local knowledge — the flora and fauna of Bengal, the rituals of the agricultural calendar, the cosmology of people. To own a Kantha piece is to hold a fragment of that archive.',
              color: '#3D4F7C',
            },
          ].map((card) => (
            <AnimatedReveal key={card.title}>
              <div className="p-8 rounded-sm h-full" style={{ backgroundColor: card.color + '10', borderLeft: `3px solid ${card.color}` }}>
                <h3 className="font-serif text-xl text-earth-900 mb-4">{card.title}</h3>
                <p className="font-sans text-sm text-earth-700 leading-relaxed">{card.body}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="bg-earth-900 py-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <AnimatedReveal className="mb-16">
            <SectionHeading
              eyebrow="The Process"
              title="How a Kantha Piece is Made"
              subtitle="From raw cloth to finished textile — a journey measured in weeks, not hours."
              className="[&_h2]:text-beige-50 [&_p]:text-beige-200/70 [&_.text-earth-500]:text-earth-500"
            />
          </AnimatedReveal>
          <div className="flex flex-col gap-10">
            {processSteps.map((step, i) => (
              <AnimatedReveal key={step.number} delay={i * 80}>
                <div className="flex gap-8 items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: step.color + '33', border: `1px solid ${step.color}66` }}
                  >
                    <span className="font-serif text-base" style={{ color: step.color }}>{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-beige-50 mb-2">{step.title}</h3>
                    <div className="w-10 h-0.5 mb-4 rounded-full" style={{ backgroundColor: step.color }} />
                    <p className="font-sans text-sm text-beige-200/60 leading-relaxed max-w-2xl">{step.body}</p>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shop CTAs */}
      <section className="py-16 px-6 lg:px-10 bg-beige-100">
        <div className="max-w-5xl mx-auto">
          <AnimatedReveal>
            <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-8 text-center">Explore the Collection</p>
          </AnimatedReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Shop Kantha Sarees', href: '/kantha-stitch-sarees' },
              { label: 'Explore Kantha Jackets', href: '/kantha-embroidered-jackets' },
              { label: 'Kantha Coats', href: '/kantha-coats' },
              { label: 'Kaftans', href: '/kaftans-for-women' },
              { label: 'Kurtas', href: '/kantha-embroidered-kurtas' },
              { label: 'All New Drops', href: NEW_DROPS_PATH },
            ].map((item) => (
              <AnimatedReveal key={item.href}>
                <Link
                  href={item.href}
                  className="block text-center border border-earth-300 text-earth-900 font-sans text-xs tracking-[0.1em] uppercase px-4 py-3 hover:bg-earth-900 hover:text-beige-50 hover:border-earth-900 transition-all duration-300"
                >
                  {item.label}
                </Link>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-10 text-center bg-beige-50">
        <AnimatedReveal>
          <p className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
            Experience it for yourself.
          </p>
          <p className="font-sans text-earth-700 text-sm mb-8 max-w-md mx-auto">
            Every piece in our collection is a direct continuation of this tradition. Slow made, artisan first, built to last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={NEW_DROPS_PATH}
              className="inline-block bg-earth-900 text-beige-50 font-sans text-sm tracking-[0.12em] uppercase px-8 py-3.5 hover:bg-earth-700 transition-colors duration-300"
            >
              Explore Collection
            </Link>
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-earth-900 text-earth-900 font-sans text-sm px-8 py-3.5 hover:bg-earth-900 hover:text-beige-50 transition-all duration-300"
            >
              <MessageCircle size={15} />
              Enquire
            </a>
          </div>
        </AnimatedReveal>
      </section>
      <PageFAQ type="kantha" />
</main>
  )
}
