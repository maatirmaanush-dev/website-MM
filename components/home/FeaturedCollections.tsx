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
    <section className="py-12 sm:py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <AnimatedReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-14">
        <SectionHeading
          eyebrow="Curated"
          title="From Our Collections"
          subtitle="Each piece takes weeks to complete. Each stitch is placed by hand."
        />
        <Link
          href={NEW_DROPS_PATH}
          className="text-sm font-sans text-earth-700 hover:text-earth-900 underline underline-offset-4 transition-colors duration-200 shrink-0"
        >
          View all pieces →
        </Link>
      </AnimatedReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
        {featured.map((product: any, i: number) => (
          <AnimatedReveal key={product.id} delay={i * 100}>
            <ProductCard product={product} cta="know-more" />
          </AnimatedReveal>
        ))}
      </div>
    </section>
  )
}
