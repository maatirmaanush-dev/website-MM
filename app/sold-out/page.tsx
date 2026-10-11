import type { Metadata } from 'next'
import { getProducts } from '@/lib/actions/products'
import { getSeoByPath } from '@/lib/actions/seo'
import { ProductGrid } from '@/components/products/ProductGrid'
import Link from 'next/link'
import { NEW_DROPS_PATH } from '@/lib/site-links'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/sold-out')
  const title = seo?.title || 'Sold Out — Maatir Maanush'
  const description = seo?.description || 'A record of pieces that have found their homes. Each was made once, worn by its maker’s hand, and will not be made again.'
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/sold-out'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default async function SoldOutPage() {
  const [all, seo] = await Promise.all([getProducts(), getSeoByPath('/sold-out')])
  const filtered = all.filter((p: any) => p.published && p.stock_status === 'sold_out')
  const h1 = seo?.h1 || 'Sold Out'
  const h2 = seo?.h2 || 'These pieces were made once, found their homes, and will not be made again — a record of what has already been.'

  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-2">
            <Link href={NEW_DROPS_PATH} className="hover:text-earth-900 transition-colors">New Drops</Link>
            <span className="mx-2">&middot;</span>Sold Out
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-earth-900 mb-4">{h1}</h1>
          <p className="font-sans text-sm text-earth-600 max-w-lg">{h2}</p>
          <p className="mt-5 text-sm font-sans text-earth-700">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
        </div>
        <div className="border-t border-beige-200 mb-14" />
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-earth-700">Nothing sold out yet — every piece is still finding its home.</p>
            <Link href={NEW_DROPS_PATH} className="inline-block mt-4 text-sm font-sans text-earth-700 hover:text-earth-900 underline underline-offset-4 transition-colors">
              Browse Collections
            </Link>
          </div>
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </main>
  )
}
