import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'

const reviews = [
  {
    name: 'Priya S.',
    location: 'Mumbai',
    rating: 5,
    text: 'The Bestiary Coat arrived beautifully packaged. The craftsmanship is extraordinary — every stitch is perfect. I have received so many compliments. Worth every rupee.',
    product: 'Kantha Coat',
  },
  {
    name: 'Ananya R.',
    location: 'Bangalore',
    rating: 5,
    text: 'I was hesitant to order online but the quality exceeded all expectations. The kaftan is stunning in person — the colours, the weight, the feel. Genuinely one-of-a-kind.',
    product: 'Kantha Kaftan',
  },
  {
    name: 'Meera T.',
    location: 'Delhi',
    rating: 5,
    text: 'Maatir Maanush is the real thing. Not mass-produced, not marketed as handmade but made in a factory. You can feel the hours of work in the fabric itself.',
    product: 'Kantha Jacket',
  },
  {
    name: 'Sujata K.',
    location: 'Kolkata',
    rating: 5,
    text: 'As a Bengali woman, seeing this craft elevated this way means everything to me. The kurta I ordered is exquisite. I have already gifted two pieces to friends abroad.',
    product: 'Kantha Kurta',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-earth-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section className="py-12 sm:py-24 px-6 lg:px-10 bg-beige-50">
      <div className="max-w-7xl mx-auto">
        <AnimatedReveal className="mb-8 sm:mb-14">
          <SectionHeading
            eyebrow="Customer Reviews"
            title="What Our Customers Say"
            subtitle="Verified Google reviews from people who wear and love Maatir Maanush."
          />
        </AnimatedReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <AnimatedReveal key={review.name} delay={i * 60}>
              <div className="bg-white p-7 h-full flex flex-col gap-4 border border-beige-100">
                <StarRating count={review.rating} />
                <p className="font-sans text-sm text-earth-700 leading-relaxed flex-1 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-beige-100 pt-4">
                  <p className="font-sans text-sm font-medium text-earth-900">{review.name}</p>
                  <p className="font-sans text-xs text-earth-400">{review.location} · {review.product}</p>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal delay={300}>
          <div className="mt-10 text-center">
            <a
              href="https://g.page/maatirmaanush/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.1em] uppercase text-earth-500 hover:text-earth-900 transition-colors duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              See all Google reviews
            </a>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
