import { AnimatedReveal } from '@/components/shared/AnimatedReveal'

export function BrandStory() {
  return (
    <section className="py-24 px-6 lg:px-10 max-w-5xl mx-auto">
      <AnimatedReveal>
        <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-6">
          Who We Are
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-earth-900 leading-tight mb-12 max-w-2xl">
          People of the Soil. Keepers of the Stitch.
        </h2>
      </AnimatedReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 font-sans text-earth-700 text-base leading-relaxed">
        <AnimatedReveal delay={100}>
          <p>
            Maatir Maanush — &ldquo;People of the Soil&rdquo; — was born from a simple belief: that the
            women who make these textiles should be known by name, not just by output. That the
            craft they carry should be celebrated, not commodified.
          </p>
          <p className="mt-5">
            We work with artisan collectives across rural West Bengal — in Murshidabad, Bolpur,
            and Birbhum — where the tradition of Kantha embroidery has been passed from grandmother
            to granddaughter for centuries.
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={200}>
          <p>
            Kantha, at its origin, was an act of resourcefulness. Old sarees layered together,
            stitched with the simple running stitch, given new life. Waste transformed into warmth.
            Memory made textile.
          </p>
          <p className="mt-5">
            We carry that spirit forward. Our pieces are slow to make, expensive because they should
            be, and built to outlast every trend. When you bring one home, you bring with you the
            hands that made it and the stories they carry.
          </p>
        </AnimatedReveal>
      </div>
    </section>
  )
}
