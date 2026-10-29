import Link from 'next/link'
import { getProducts } from '@/lib/actions/products'
import { ProductCard } from '@/components/products/ProductCard'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { NEW_DROPS_PATH } from '@/lib/site-links'

export async function FeaturedCollections() {
  const all = await getProducts()
  const featured = all.filter((p: any) => p.published && p.featured).slice(0, 4)

  if (featured.length === 0) return null

  return (
    <section className="relative py-12 sm:py-24 px-10 mx-auto overflow-hidden max-w-[1600px]">
      <div className="absolute top-0 left-0 w-full h-full diwali-background">
        <img src="/images/diwali/elements/corner-designs.png" alt="Diwali background" className="absolute z-[-1] top-[-200px] right-[-200px] w-[30vw] opacity-50 object-cover object-center" />
        {/* <img src="/images/diwali/elements/corner-designs.png" alt="Diwali background" className="absolute bottom-[-100px] left-[-100px] opacity-50 w-[15vw] z-[-1] object-cover object-center" /> */}
      </div>
      <AnimatedReveal className="flex flex-row items-end justify-between gap-6 mb-8 sm:mb-14">
        <SectionHeading
          eyebrow="Curated"
          title="From Our Collections"
          subtitle="Each piece takes weeks to complete. Each stitch is placed by hand."
        />
        <Link
          href={NEW_DROPS_PATH}
          className="text-[12px] bg-[#511306] border border-[#511306] rounded-sm px-4 py-2 font-sans text-[#f5f7f4] hover:bg-[#51130678] transition-colors duration-200 shrink-0"
        >
          View all pieces →
        </Link>
      </AnimatedReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-14">
        {featured.map((product: any, i: number) => (
          <AnimatedReveal key={product.id} delay={i * 100}>
            <ProductCard product={product} cta="know-more" />
          </AnimatedReveal>
        ))}
      </div>
    </section>
  )
}
