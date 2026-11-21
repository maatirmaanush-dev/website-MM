import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative lg:items-end lg:justify-start md:justify-center flex items-end justify-end overflow-hidden bg-earth-900">
      {/* Background image */}
      <div className="flex max-w-full w-full aspect-[8/16] lg:aspect-[16/9]">
        <ImageWithFallback
          src="/images/hero/hero-head-f3.png"
          alt="Maatir Maanush — Handcrafted Kantha"
          fill
          className="object-contain w-full h-full hidden sm:block"
          style={{ objectPosition: '70% top' }}
          priority
          fallbackBg="#4A3020"
          fallbackAccent="#C4956A"
        />
        <ImageWithFallback
          src="/images/hero/hero-head-mf2.png"
          alt="Maatir Maanush — Handcrafted Kantha"
          fill
          className="object-cover block sm:hidden"
          style={{ objectPosition: '50% 50%' }}
          priority
          fallbackBg="#4A3020"
          fallbackAccent="#C4956A"
        />
        {/* Darkening layers */}
        <div className="absolute inset-0 bg-gradient-to-t lg:from-earth-900/70 lg:via-earth-900/20 lg:to-transparent from-earth-900/60  to-earth-900/10" />
      </div>

      {/* Vertically centred text block */}
      <div className="absolute w-full inset-0 z-10 flex items-end lg:items-center pb-24 justify-start px-8 lg:px-14">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <p className="text-[10px] tracking-[0.35em] uppercase text-beige-50/50 font-sans mb-5">
            Bengal &nbsp;·&nbsp; Handcrafted &nbsp;·&nbsp; Since Generations
          </p>

          {/* Main SEO H1 */}
          <h1
            className="font-serif text-beige-50 leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', letterSpacing: '-0.02em' }}
          >
            Handcrafted Kantha &amp;<br />Contemporary<br />Women&apos;s Clothing
          </h1>

          {/* SEO H2 */}
          <h2
            className="font-serif italic text-beige-100/60 mb-8 leading-relaxed"
            style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1rem)' }}
          >
            Contemporary Women&apos;s Clothing with Artistic Elegance
          </h2>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="/new-drops"
              className="inline-block text-center bg-beige-50 text-earth-900 font-sans text-xs tracking-[0.18em] uppercase px-8 py-3.5 hover:bg-beige-200 transition-all duration-300"
            >
              <p>Explore New Drops</p>
            </Link>
            <Link
              href="/the-art-of-kantha"
              className="inline-block text-center border border-beige-50/40 text-beige-50/80 font-sans text-xs tracking-[0.18em] uppercase px-8 py-3.5 hover:border-beige-50/80 hover:text-beige-50 transition-all duration-300"
            >
              <p>The Art of Kantha</p>  
            </Link>
          </div>
        </div>
      </div>
      

      {/* Right-side scroll hint — desktop only */}
      <div className="absolute w-full bottom-28 z-10 hidden lg:flex flex-col items-center gap-3">
        <p
          className="text-[9px] tracking-[0.25em] uppercase text-beige-50/90 font-sans"
          style={{}}
        >
          Scroll to Explore
        </p>
        <div className="w-16 h-px bg-beige-50/20" />
      </div>
    </section>
  )
}
