import { notFound, permanentRedirect } from 'next/navigation'
import { getProductBySlug } from '@/lib/actions/products'
import { getProductUrl } from '@/lib/product-urls'

export default async function ProductRedirectPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()
  permanentRedirect(getProductUrl(product))
}
