import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

export function PromoBanner() {
  return (
    <section className="relative lg:items-end lg:justify-start md:justify-center flex items-end justify-end min-h-[600px] overflow-hidden bg-earth-900">
      {/* Background image */}
      <div className="absolute top-[0px] inset-0">
        <ImageWithFallback
          src="/images/hero/promo-banner6.png"
          alt="Maatir Maanush — Handcrafted Kantha"
          fill
          className="object-cover hidden sm:block"
          style={{ objectPosition: '55% 20%' }}
          priority
          fallbackBg="#4A3020"
          fallbackAccent="#C4956A"
        />
        <ImageWithFallback
          src="/images/hero/mob-promo-banner.png"
          alt="Maatir Maanush — Handcrafted Kantha"
          fill
          className="object-cover block sm:hidden"
          style={{ objectPosition: '55% top' }}
          priority
          fallbackBg="#4A3020"
          fallbackAccent="#C4956A"
        />
        {/* Darkening layers */}
        <div className="absolute inset-0 bg-gradient-to-t lg:from-earth-900/70 lg:via-earth-900/20 lg:to-transparent from-earth-900/90 via-earth-900/40 to-earth-900/10" />
      </div>
    </section>
  )
}
