import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import { Hero } from '@/components/home/Hero'
import { FeaturedCollections } from '@/components/home/FeaturedCollections'
import { NewDropsSection } from '@/components/home/NewDropsSection'
import { UnboxingOurselves } from '@/components/home/UnboxingOurselves'
import { BrandEthos } from '@/components/home/BrandEthos'
import { PromoBanner } from '@/components/home/PromoBanner'
import { CraftProcess } from '@/components/home/CraftProcess'
import { GalleryStrip } from '@/components/home/GalleryStrip'
import { HomeBlog } from '@/components/home/HomeBlog'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { HomeFAQ } from '@/components/home/HomeFAQ'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/')
  const title = seo?.title || `Kantha Stitch Sarees & Contemporary Women's Clothing | Maatir Maanush`
  const description = seo?.description || `Discover handcrafted Kantha stitch sarees and contemporary women's clothing by Maatir Maanush. Explore artisanal fashion rooted in Bengal heritage with modern elegance.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedCollections />
      <PromoBanner />
      <NewDropsSection />
      <UnboxingOurselves />
      <BrandEthos />
      <CraftProcess />
      <GalleryStrip />
      <HomeBlog />
      <ReviewsSection />
      <HomeFAQ />
    </main>
  )
}
