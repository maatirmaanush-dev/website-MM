import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'

const events = [
  {
    era: 'Ancient Bengal',
    title: 'The Running Stitch is Born',
    body: 'Kantha — from the Sanskrit "kant" (rag) — emerges as a quilting tradition across Bengal. Worn sarees are layered and stitched into warm covers for the winter months.',
  },
  {
    era: '17th–18th Century',
    title: 'Ritual and Ceremony',
    body: 'Kantha quilts become gifts of love — made by mothers for daughters, brides for grooms. Motifs evolve: the lotus, the fish, the tree of life. Each family develops its own visual language.',
  },
  {
    era: '19th Century',
    title: 'Documentation & Colonial Gaze',
    body: 'British collectors begin to notice Kantha as "folk art". Museums acquire pieces. The craft is named, categorised, and to some extent frozen. But the women keep working.',
  },
  {
    era: 'Today',
    title: 'Contemporary and Alive',
    body: 'Kantha is now a living craft — not a museum relic. It is on silk sarees, cotton stoles, and structured jackets. The stitch is the same. The story grows longer.',
  },
]

export function HeritageTimeline() {
  return (
    <section className="py-12 sm:py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <AnimatedReveal className="mb-10 sm:mb-16">
        <SectionHeading eyebrow="Heritage" title="The History of Kantha" />
      </AnimatedReveal>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-beige-300 hidden md:block" />

        <div className="flex flex-col gap-12">
          {events.map((event, i) => (
            <AnimatedReveal key={event.era} delay={i * 100}>
              <div className="md:pl-10 relative">
                {/* Dot */}
                <div className="hidden md:block absolute left-0 top-1.5 w-2 h-2 rounded-full bg-earth-500 -translate-x-[4.5px]" />
                <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-1">
                  {event.era}
                </p>
                <h3 className="font-serif text-xl text-earth-900 mb-2">{event.title}</h3>
                <p className="font-sans text-sm text-earth-700 leading-relaxed max-w-2xl">
                  {event.body}
                </p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
