import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'

const artisans = [
  {
    name: 'Shefali Devi',
    location: 'Murshidabad, West Bengal',
    years: '32 years of Kantha work',
    quote:
      'My mother taught me. Her mother taught her. The stitch remembers what the tongue forgets.',
    initials: 'SD',
  },
  {
    name: 'Champa Begum',
    location: 'Bolpur, West Bengal',
    years: '18 years of Kantha work',
    quote:
      'I finish one saree in eight weeks. It is eight weeks of thought. Every flower I place, I think of the woman who will wear it.',
    initials: 'CB',
  },
]

export function ArtisanCommunity() {
  return (
    <section className="bg-beige-100 py-12 sm:py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <AnimatedReveal className="mb-8 sm:mb-14">
          <SectionHeading
            eyebrow="The Makers"
            title="The Hands Behind the Work"
            subtitle="We do not work with anonymous artisans. We work with people."
          />
        </AnimatedReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {artisans.map((artisan, i) => (
            <AnimatedReveal key={artisan.name} delay={i * 150}>
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="w-full sm:w-48 aspect-square bg-earth-900/10 rounded-sm flex-shrink-0 flex flex-col items-center justify-center gap-3">
                  <svg viewBox="0 0 80 80" width="36" height="36" fill="none">
                    <circle cx="40" cy="28" r="14" stroke="#6B4C35" strokeWidth="1.2"/>
                    <path d="M12 72c0-15.464 12.536-28 28-28s28 12.536 28 28" stroke="#6B4C35" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="font-serif text-lg text-earth-700 tracking-widest">{artisan.initials}</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-serif text-xl text-earth-900 mb-1">{artisan.name}</p>
                  <p className="text-xs font-sans text-earth-500 tracking-wide uppercase mb-4">
                    {artisan.location} &nbsp;·&nbsp; {artisan.years}
                  </p>
                  <blockquote className="font-serif italic text-earth-700 text-base leading-relaxed">
                    &ldquo;{artisan.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
