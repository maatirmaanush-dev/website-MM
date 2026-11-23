import { getImageProps } from 'next/image'
import Link from 'next/link'
import { NEW_DROPS_PATH } from '@/lib/site-links'

const HERO_ALT = 'Maatir Maanush — Handcrafted Kantha'

export function Hero() {
  // Art direction with <picture>: the browser downloads ONLY the image whose
  // media query matches, instead of fetching both the desktop and the mobile
  // hero and hiding one with CSS.
  const common = { alt: HERO_ALT, fill: true, sizes: '100vw', priority: true }
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: '/images/hero/hero-head-f3.png' })
  const {
    props: { style, ...mobileProps },
  } = getImageProps({ ...common, src: '/images/hero/hero-head-mf2.png' })

  return (
    <section className="relative lg:items-end lg:justify-start md:justify-center flex items-end justify-end overflow-hidden bg-earth-900">
      {/* Background image */}
      <div className="flex max-w-full w-full aspect-[8/16] lg:aspect-[16/9]">
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is in mobileProps */}
          <img
            {...mobileProps}
            style={style}
            className="object-cover object-[50%_50%] sm:object-contain sm:object-[70%_top]"
          />
        </picture>
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
              href={NEW_DROPS_PATH}
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
