import Link from 'next/link'
import Image from 'next/image'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { getPublishedCategories, getCategoryImages } from '@/lib/actions/products'
import { NEW_DROPS_PATH } from '@/lib/site-links'

const ALL_CATEGORIES = [
  { label: 'Sarees',           href: '/kantha-stitch-sarees',       dbCategory: 'Kantha Stitch Sarees', image: '/images/diwali/categories/saree4.png', pinnedImage: '/images/diwali/categories/saree4.png', hovName: 'Festive Saree' },
  { label: 'Jackets',          href: '/kantha-embroidered-jackets',  dbCategory: 'Kantha Jackets',        image: '/images/diwali/categories/jacket3.png', pinnedImage: '/images/diwali/categories/jacket3.png', hovName: 'Festive Jackets' },
  { label: 'Dresses',          href: '/contemporary-womens-wear',    dbCategory: 'Dresses',               image: '/images/diwali/categories/dresses3.png', pinnedImage: '/images/diwali/categories/dresses3.png', hovName: 'Festive Dresses' },
  { label: 'Kurtas',           href: '/kantha-embroidered-kurtas',   dbCategory: 'Kurtas',                image: '/images/diwali/categories/kurtas4.png', pinnedImage: '/images/diwali/categories/kurtas4.png', hovName: 'Festive Kurta' },
  { label: 'Kaftans',          href: '/kaftans-for-women',           dbCategory: 'Kaftans',               image: '/images/diwali/categories/kaftan4.png', pinnedImage: '/images/diwali/categories/kaftan4.png', hovName: 'Festive Kaftans' },
  { label: 'Limited Editions', href: '/limited-editions-clothing',   dbCategory: 'Limited Editions',      image: '/images/diwali/categories/limited2.png', pinnedImage: '/images/diwali/categories/limited2.png', hovName: 'Festive Limited Editions' },
  { label: 'Skirts', href: '/skirts',   dbCategory: 'Skirts',      image: '/images/diwali/categories/skirts2.png', pinnedImage: '/images/diwali/categories/skirts2.png', hovName: 'Festive Skirts' },
]

export async function NewDropsSection() {
  const [published, categoryImages] = await Promise.all([
    getPublishedCategories(),
    getCategoryImages(),
  ])
  const activeCategories = ALL_CATEGORIES.filter(c => published.includes(c.dbCategory))
  // const activeCategories = ALL_CATEGORIES;

  return (
    <section className="py-12 sm:py-24 px-4 lg:px-10 bg-beige-50">
      <div className="max-w-8xl mx-auto">
        <AnimatedReveal className="flex items-center justify-center w-full mb-8 px-2 sm:mb-10">
          <SectionHeading
            eyebrow="New Drops"
            title="Shop by Category"
          />
        </AnimatedReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-beige-100 border border-beige-100 mb-10">
          {activeCategories.map((cat, i) => (
            <AnimatedReveal key={cat.href} delay={i * 40}>
              <Link href={cat.href} className="px-1 py-1 group block bg-beige-50 hover:bg-[#f4f5f7] transition-all duration-300">
                <div className="relative flex flex-col items-center gap-3 overflow-hidden">
                  <div className="relative w-full overflow-hidden rounded-sm h-[250px] lg:h-[510px]">
                    <Image
                      src={cat.pinnedImage || categoryImages[cat.dbCategory] || cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[102%]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="hidden lg:block absolute bottom-[-20px] transition-all duration-300 left-0 right-0 text-center flex flex-col gap-2 items-center justify-center group-hover:bottom-[0px] py-4 rounded-t-[360px] w-full text-beige-50 bg-[radial-gradient(circle,_#7d110e_0%,_transparent_100%)] backdrop-blur-sm  opacity-0 group-hover:opacity-100">
                    {/* <p className="font-serif text-sm sm:text-base text-earth-900 tracking-wide mb-1">{cat.label}</p> */}
                    <p className="text-[12px] text-bold font-sans tracking-[0.1em] uppercase ">
                      {cat.hovName || cat.label}
                    </p>
                    <p className="text-[8px] text-bold font-sans tracking-[0.1em] uppercase">
                      EXPLORE →
                    </p>
                  </div>
                  <div className="block lg:hidden text-center flex items-center justify-center ">
                    <p className="font-serif text-sm sm:text-base text-earth-900 tracking-wide mb-1">{cat.label}</p>
                  </div>
                </div>
              </Link>
            </AnimatedReveal>
          ))}

          {/* View All */}
          <AnimatedReveal delay={activeCategories.length * 40}>
            <Link href={NEW_DROPS_PATH} className="group px-1 py-1 block bg-beige-50 hover:bg-white transition-colors duration-300 h-full">
              <div className="relative flex flex-col items-center gap-3 overflow-hidden">
                <div className="relative w-full overflow-hidden rounded-sm h-[250px] lg:h-[510px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Image
                      src="/images/diwali/categories/alldrops2.png"
                      alt="All Drops"
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[102%]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                </div>
                <div className="hidden lg:block absolute bottom-[-20px] transition-all duration-300 left-0 right-0 text-center flex flex-col gap-2 items-center justify-center group-hover:bottom-[0px] py-4 rounded-t-[360px] w-full text-beige-50 bg-[radial-gradient(circle,_#7d110e_0%,_transparent_100%)] backdrop-blur-sm  opacity-0 group-hover:opacity-100">
                  {/* <p className="font-serif text-sm sm:text-base text-earth-900 tracking-wide mb-1">{cat.label}</p> */}
                  <p className="text-[12px] text-bold font-sans tracking-[0.1em] uppercase ">
                    ALL DROPS
                  </p>
                  <p className="text-[8px] text-bold font-sans tracking-[0.1em] uppercase">
                    EXPLORE →
                  </p>
                </div>
                <div className="block lg:hidden text-center flex items-center justify-center ">
                    <p className="font-serif text-sm sm:text-base text-earth-900 tracking-wide mb-1">All drops</p>
                </div>
              </div>
            </Link>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
