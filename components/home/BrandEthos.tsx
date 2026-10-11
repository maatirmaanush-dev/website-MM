import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'

export function BrandEthos() {
  return (
    <section className="bg-beige-100 py-12 sm:py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <AnimatedReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-6">
            Our Philosophy
          </p>

          {/* Blockquote with left accent bar */}
          <div className="flex gap-5 mb-8">
            <div className="w-1 rounded-full bg-gradient-to-b from-[#8B3A2A] via-[#C4956A] to-[#3D4F7C] flex-shrink-0" />
            <blockquote
              className="font-serif text-earth-900 leading-snug"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              &ldquo;The stitch is not decoration.<br />
              It is record-keeping.&rdquo;
            </blockquote>
          </div>

          <p className="font-sans text-earth-700 text-base leading-relaxed mb-10 max-w-md">
            Every Kantha piece from Maatir Maanush is a conversation between the artisan and the cloth —
            a conversation centuries in the making. We celebrate the hands that remember what machines forget.
          </p>

          {/* Values with colored dots */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'Slow Made',          dot: '#8B3A2A' },
              { label: 'Artisan First',       dot: '#B07D2E' },
              { label: 'Zero Waste Intent',   dot: '#3D5A3E' },
            ].map(({ label, dot }) => (
              <span key={label} className="flex items-center gap-2 text-sm font-sans text-earth-700 tracking-wide">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
                {label}
              </span>
            ))}
          </div>
        </AnimatedReveal>

        {/* Image */}
        <AnimatedReveal delay={150}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <ImageWithFallback
              src="/images/about/artisan-1.jpg"
              alt="Artisan at work"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              fallbackLabel="Artisan at work"
              fallbackBg="#8B3A2A"
              fallbackAccent="#F5C5A3"
            />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
