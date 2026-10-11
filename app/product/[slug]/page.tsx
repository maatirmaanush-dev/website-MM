import { notFound, permanentRedirect } from 'next/navigation'
import { getProductBySlug } from '@/lib/actions/products'
import { getProductUrl } from '@/lib/product-urls'

// A previous version of app/sitemap.ts submitted every product as /product/{slug}
// (singular) — a route that never existed, so Google has ~47 of these on record as
// 404s. Redirect them to the real category-scoped URL instead of losing the crawl.
export default async function LegacyProductRedirectPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()
  permanentRedirect(getProductUrl(product))
}
