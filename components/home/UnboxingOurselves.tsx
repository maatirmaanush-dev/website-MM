import Link from 'next/link'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'

export function UnboxingOurselves() {
  return (
    <section className="py-12 sm:py-24 px-6 lg:px-10 bg-beige-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <AnimatedReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-earth-500 font-sans mb-5">
              Unboxing Ourselves
            </p>
            <h2 className="font-serif text-earth-900 mb-6 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              People of the Soil
            </h2>
            <div className="space-y-4 font-sans text-earth-700 text-sm leading-relaxed mb-8">
              <p>
                Maatir Maanush means <em>people of the soil</em> in Bengali. It is not a brand name chosen for aesthetics. It is a statement of origin — a reminder of where this craft comes from, who carries it, and what it costs to keep it alive.
              </p>
              <p>
                We work directly with artisans in rural West Bengal, women for whom Kantha is not a livelihood strategy but a mother tongue. Every piece we offer is made by them, priced to honour their skill, and presented with the context it deserves.
              </p>
              <p>
                We do not romanticise poverty or exoticise craft. We believe in fair exchange, radical transparency, and the idea that beauty has always been political.
              </p>
            </div>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.15em] uppercase text-earth-900 border-b border-earth-900 pb-0.5 hover:text-earth-500 hover:border-earth-500 transition-colors duration-200"
            >
              Our full story
              <span className="w-6 h-px bg-current inline-block" />
            </Link>
          </AnimatedReveal>

          {/* Right: stat cards */}
          <AnimatedReveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '500+', label: 'Years of Kantha tradition in Bengal' },
                { number: '100%', label: 'Handmade by artisans, not factories' },
                { number: 'GI', label: 'Tagged craft — Geographical Indication' },
                { number: '1:1', label: 'Direct artisan to customer, no middleman' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-6 bg-beige-100 flex flex-col gap-2"
                  style={{ borderTop: `2px solid ${['#8B3A2A','#B07D2E','#3D5A3E','#3D4F7C'][i]}` }}
                >
                  <span className="font-serif text-3xl text-earth-900">{stat.number}</span>
                  <span className="font-sans text-xs text-earth-600 leading-relaxed">{stat.label}</span>
                </div>
              ))}
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
