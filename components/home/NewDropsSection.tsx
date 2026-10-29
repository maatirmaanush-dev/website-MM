import Link from 'next/link'
import Image from 'next/image'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { getPublishedCategories, getCategoryImages } from '@/lib/actions/products'
import { NEW_DROPS_PATH } from '@/lib/site-links'

const ALL_CATEGORIES = [
  { label: 'Sarees',           href: '/kantha-stitch-sarees',       dbCategory: 'Kantha Stitch Sarees', image: '/images/diwali/categories/saree.png', pinnedImage: '/images/diwali/categories/saree.png', hovName: 'Festive Saree' },
  { label: 'Jackets',          href: '/kantha-embroidered-jackets',  dbCategory: 'Kantha Jackets',        image: '/images/diwali/categories/jackets.png', pinnedImage: '/images/diwali/categories/jackets.png', hovName: 'Festive Jackets' },
  { label: 'Kaftans',          href: '/kaftans-for-women',           dbCategory: 'Kaftans',               image: '/images/diwali/categories/kaftans.png', pinnedImage: '/images/diwali/categories/kaftans.png', hovName: 'Festive Kaftans' },
  { label: 'Kurtas',           href: '/kantha-embroidered-kurtas',   dbCategory: 'Kurtas',                image: '/images/diwali/categories/kurta.png', pinnedImage: '/images/diwali/categories/kurta.png', hovName: 'Festive Kurta' },
  { label: 'Dresses',          href: '/contemporary-womens-wear',    dbCategory: 'Dresses',               image: '/images/reshuffle/dresses-hero.jpeg', pinnedImage: '/images/reshuffle/dresses-hero.jpeg', hovName: 'saree' },
  { label: 'Limited Editions', href: '/limited-editions-clothing',   dbCategory: 'Limited Editions',      image: '/images/reshuffle/lim-edi-hero.jpeg', pinnedImage: '/images/reshuffle/lim-edi-hero.jpeg', hovName: 'saree' },
  { label: 'Skirts', href: '/skirts',   dbCategory: 'Skirts',      image: '/images/reshuffle/skirt-hero.jpeg', pinnedImage: '/images/reshuffle/skirt-hero.jpeg', hovName: 'saree' },
]

export async function NewDropsSection() {
  const [published, categoryImages] = await Promise.all([
    getPublishedCategories(),
    getCategoryImages(),
  ])
  const activeCategories = ALL_CATEGORIES.filter(c => published.includes(c.dbCategory))
  // const activeCategories = ALL_CATEGORIES;

  return (
    <section className="py-12 sm:py-24 px-10 bg-beige-100">
      <div className="max-w-8xl mx-auto">
        <AnimatedReveal className="mb-8 sm:mb-14">
          <SectionHeading
            eyebrow="New Drops"
            title="Shop by Category"
            subtitle="Handcrafted Kantha pieces across every silhouette — made to order in Bengal."
          />
        </AnimatedReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-beige-100 border border-beige-100 mb-10">
          {activeCategories.map((cat, i) => (
            <AnimatedReveal key={cat.href} delay={i * 40}>
              <Link href={cat.href} className="px-1 py-1 group block bg-beige-50 hover:bg-white transition-colors duration-300">
                <div className="relative flex flex-col items-center gap-3 overflow-hidden">
                  <div className="relative w-full overflow-hidden rounded-sm h-[510px]">
                    <Image
                      src={cat.pinnedImage || categoryImages[cat.dbCategory] || cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[102%]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="absolute bottom-[-20px] transition-all duration-300 left-0 right-0 text-center flex flex-col gap-2 items-center justify-center group-hover:bottom-[0px] py-4 rounded-t-[360px] w-full text-beige-50 bg-[radial-gradient(circle,_#7d110e_0%,_transparent_100%)] backdrop-blur-sm  opacity-0 group-hover:opacity-100">
                    {/* <p className="font-serif text-sm sm:text-base text-earth-900 tracking-wide mb-1">{cat.label}</p> */}
                    <p className="text-[12px] text-bold font-sans tracking-[0.1em] uppercase ">
                      {cat.hovName || cat.label}
                    </p>
                    <p className="text-[8px] text-bold font-sans tracking-[0.1em] uppercase">
                      EXPLORE →
                    </p>
                  </div>
                  {/* <div className="text-center flex items-center justify-center py-2">
                    <p className="font-serif text-sm sm:text-base text-earth-900 tracking-wide mb-1">{cat.label}</p>
                    <p className="text-[10px] text-bold font-sans tracking-[0.1em] uppercase transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-earth-500">
                      Explore →
                    </p>
                  </div> */}
                </div>
              </Link>
            </AnimatedReveal>
          ))}

          {/* View All */}
          <AnimatedReveal delay={activeCategories.length * 40}>
            <Link href={NEW_DROPS_PATH} className="group block bg-beige-50 hover:bg-white transition-colors duration-300">
              <div className="flex flex-col items-center gap-3 py-6 px-3 sm:py-8 sm:px-4">
                <div className="w-full overflow-hidden rounded-sm" style={{ aspectRatio: '3/4' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/categories/all-drops.jpg"
                    alt="All Drops"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-center">
                  <p className="font-serif text-sm sm:text-base text-earth-900 tracking-wide mb-1">All Drops</p>
                  <p className="text-[9px] font-sans tracking-[0.2em] uppercase transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-earth-500">
                    View all pieces →
                  </p>
                </div>
              </div>
            </Link>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
