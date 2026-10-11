import type { Metadata } from 'next'
import { getProducts } from '@/lib/actions/products'
import { getSeoByPath } from '@/lib/actions/seo'
import { ProductGrid } from '@/components/products/ProductGrid'
import Link from 'next/link'
import { PageFAQ } from '@/components/shared/PageFAQ'
import { NEW_DROPS_PATH } from '@/lib/site-links'
import { categoryRobotsMeta } from '@/lib/category-meta'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/kantha-coats')
  const title = seo?.title || `Kantha Coats for Women | Maatir Maanush`
  const description = seo?.description || `Long layered coats in patchwork Kantha embroidery — wearable art, handcrafted in rural Bengal.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/kantha-coats'}`,
    },
    ...(await categoryRobotsMeta('Kantha Coats')),
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default async function KanthaCoatsPage() {
  const [all, seo] = await Promise.all([getProducts(), getSeoByPath('/kantha-coats')])
  const filtered = all.filter((p: any) => p.published && p.category === 'Kantha Coats')
  const h1 = seo?.h1 || 'Kantha Coats'
  const h2 = seo?.h2 || 'Long layered coats in patchwork Kantha — wearable art, made to order in rural Bengal.'

  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-2">
            <Link href={NEW_DROPS_PATH} className="hover:text-earth-900 transition-colors">New Drops</Link>
            <span className="mx-2">&middot;</span>Coats
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-earth-900 mb-4">{h1}</h1>
          <p className="font-sans text-sm text-earth-600 max-w-lg">{h2}</p>
          <p className="mt-5 text-sm font-sans text-earth-700">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
        </div>
        <div className="border-t border-beige-200 mb-14" />
        <ProductGrid products={filtered} />
      </div>
      <PageFAQ type="product" />
    </main>
  )
}
