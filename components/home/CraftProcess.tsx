import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'

const steps = [
  {
    number: '01',
    title: 'Cloth Selection',
    description:
      'We source only the finest silks and handwoven cottons — chosen for their weave density, natural sheen, and ability to hold the thread.',
    color: '#8B3A2A',   // terracotta
  },
  {
    number: '02',
    title: 'Natural Preparation',
    description:
      'Each cloth is hand-washed and air-dried before being sized with natural starch. No chemicals. No shortcuts.',
    color: '#B07D2E',   // saffron
  },
  {
    number: '03',
    title: 'Motif Drawing',
    description:
      'Artisans draw motifs freehand directly on the cloth using chalk or charcoal. Every design is original. None are printed or stamped.',
    color: '#3D5A3E',   // forest green
  },
  {
    number: '04',
    title: 'Kantha Stitching',
    description:
      'The running stitch — called Kantha — is worked by hand over six to eighteen weeks. The cloth breathes, the pattern emerges slowly.',
    color: '#3D4F7C',   // indigo
  },
]

export function CraftProcess() {
  return (
    <section className="py-12 sm:py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <AnimatedReveal className="mb-10 sm:mb-16 text-center">
        <SectionHeading
          eyebrow="The Making"
          title="How a Kantha Piece is Born"
          centered
        />
      </AnimatedReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <AnimatedReveal key={step.number} delay={i * 120}>
            <div className="flex flex-col gap-4">
              {/* Coloured number badge */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: step.color + '22', border: `1px solid ${step.color}44` }}
              >
                <span
                  className="font-serif text-xl leading-none"
                  style={{ color: step.color }}
                >
                  {step.number}
                </span>
              </div>
              <h3 className="font-serif text-xl text-earth-900">{step.title}</h3>
              <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: step.color }} />
              <p className="font-sans text-sm text-earth-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  )
}
