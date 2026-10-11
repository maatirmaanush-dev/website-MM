import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import { getProducts } from '@/lib/actions/products'
import { ProductGrid } from '@/components/products/ProductGrid'
import Link from 'next/link'
import { PageFAQ } from '@/components/shared/PageFAQ'
import { NEW_DROPS_PATH } from '@/lib/site-links'
import { categoryRobotsMeta } from '@/lib/category-meta'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/kantha-stitch-sarees')
  const title = seo?.title || `Kantha Stitch Sarees for Women | Maatir Maanush`
  const description = seo?.description || `Kantha stitch sarees for women featuring refined Kantha embroidery and elegant embroidery saree detailing by Maatir Maanush.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/kantha-stitch-sarees'}`,
    },
    ...(await categoryRobotsMeta('Kantha Stitch Sarees')),
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default async function KanthaSareesPage() {
  const all = await getProducts()
  const filtered = all.filter((p: any) => p.published && p.category === 'Kantha Stitch Sarees')
  const h1 = 'Kantha Stitch Sarees for Women'
  const h2 = 'Kantha Embroidery Sarees Inspired by Timeless Craftsmanship'

  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-2">
            <Link href={NEW_DROPS_PATH} className="hover:text-earth-900 transition-colors">New Drops</Link>
            <span className="mx-2">&middot;</span>Sarees
          </p>
          <h1 className="font-serif text-[34px] md:text-[35px] text-earth-900 mb-3">{h1}</h1>
          <h2 className="font-serif italic text-earth-600 text-lg mb-4">{h2}</h2>
          <p className="text-sm font-sans text-earth-700">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
        </div>
        <div className="border-t border-beige-200 mb-14" />
        <ProductGrid products={filtered} />
      </div>
      <PageFAQ type="kantha" />
    </main>
  )
}
