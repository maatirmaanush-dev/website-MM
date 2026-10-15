import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import Link from 'next/link'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'
import { PageFAQ } from '@/components/shared/PageFAQ'
import { NEW_DROPS_PATH } from '@/lib/site-links'
import { categoryRobotsMeta } from '@/lib/category-meta'
import { getProducts } from '@/lib/actions/products'
import { ProductGrid } from '@/components/products/ProductGrid'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/skirts')
  const title = seo?.title || `Kantha Skirts - Maatir Maanush`
  const description = seo?.description || `Flowing Kantha skirts handcrafted in Bengal.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/skirts'}`,
    },
    ...(await categoryRobotsMeta('Skirts')),
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

// export default function SkirtsPage() {
//   return (
//     <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
//       <div className="max-w-3xl mx-auto text-center">
//         <AnimatedReveal>
//           <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-2">
//             <Link href={NEW_DROPS_PATH} className="hover:text-earth-900 transition-colors">New Drops</Link>
//             <span className="mx-2">&middot;</span>Skirts
//           </p>
//           <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-4">Skirts</h1>
//           <p className="font-sans text-sm text-earth-600 mb-12 leading-relaxed">
//             Flowing Kantha skirts — floor-length and knee-length silhouettes. New pieces dropping soon.
//           </p>

//           <div className="w-16 h-px bg-earth-300 mx-auto mb-12" />

//           <p className="font-serif text-2xl text-earth-900 mb-4">Coming Soon</p>
//           <p className="font-sans text-sm text-earth-600 mb-8 max-w-sm mx-auto">
//             This category is being curated. In the meantime, reach out on WhatsApp to enquire about bespoke pieces.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href={buildGeneralWhatsAppUrl()}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center justify-center gap-2 bg-earth-900 text-beige-50 font-sans text-sm tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-earth-700 transition-colors duration-300"
//             >
//               <MessageCircle size={15} />
//               Enquire
//             </a>
//             <Link
//               href={NEW_DROPS_PATH}
//               className="inline-flex items-center justify-center border border-earth-900 text-earth-900 font-sans text-sm tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-earth-900 hover:text-beige-50 transition-all duration-300"
//             >
//               All Categories
//             </Link>
//           </div>
//         </AnimatedReveal>
//       </div>
//       <PageFAQ type="collections" />
// </main>
//   )
// }

export default async function LimitedEditionsPage() {
  const all = await getProducts()
  const filtered = all.filter((p: any) => p.published && p.category === 'Skirts')
  const h1 = 'Limited Edition Clothing for Women'
  const h2 = 'Limited Edition Pieces with Timeless Appeal'

  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-2">
            <Link href={NEW_DROPS_PATH} className="hover:text-earth-900 transition-colors">New Drops</Link>
            <span className="mx-2">&middot;</span>Limited Editions
          </p>
          <h1 className="font-serif text-[34px] md:text-[35px] text-earth-900 mb-3">{h1}</h1>
          <h2 className="font-serif italic text-earth-600 text-lg mb-4">{h2}</h2>
          <p className="mt-2 text-sm font-sans text-earth-700">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
        </div>
        <div className="border-t border-beige-200 mb-14" />
        <ProductGrid products={filtered} />
      </div>
      <PageFAQ type="product" />
    </main>
  )
}