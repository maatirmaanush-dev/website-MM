import { getProductUrl, CATEGORY_URL_MAP } from '@/lib/product-urls'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maatirmaanush.com'
const ORG_ID = `${SITE_URL}/#organization`

/** Renderable <script type="application/ld+json"> payload. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\u003c') }
}

/**
 * Organization + WebSite, emitted once site-wide. `logo` is what Google reads when
 * choosing the image for a brand's knowledge panel and search-result avatar, so it
 * points at the same brown mark as the favicon.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Maatir Maanush',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icon.png`,
          width: 192,
          height: 192,
        },
        description:
          'Handcrafted Kantha embroidery from Bengal — sarees, jackets, kurtas and contemporary womenswear, hand-stitched by artisans in West Bengal.',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Maatir Maanush',
        publisher: { '@id': ORG_ID },
      },
    ],
  }
}

type ProductLike = {
  name: string
  slug: string
  category: string
  description?: string | null
  short_description?: string | null
  price_numeric?: number | null
  stock_status?: string | null
  images?: string[] | null
  fabric?: string | null
}

/** Product + Offer. Availability maps from the admin's stock_status field. */
export function productSchema(product: ProductLike) {
  const url = `${SITE_URL}${getProductUrl(product)}`
  const soldOut = product.stock_status === 'sold_out'
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.description || undefined,
    image: (product.images ?? []).slice(0, 6),
    url,
    sku: product.slug,
    category: product.category,
    ...(product.fabric && { material: product.fabric }),
    brand: { '@type': 'Brand', name: 'Maatir Maanush' },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      ...(product.price_numeric != null && { price: product.price_numeric }),
      availability: soldOut
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
    },
  }
}

/** Home > Category > Product, matching the on-page breadcrumb. */
export function productBreadcrumbSchema(product: ProductLike) {
  const categoryPath = CATEGORY_URL_MAP[product.category]
  const items = [
    { name: 'Home', item: SITE_URL },
    ...(categoryPath
      ? [{ name: product.category, item: `${SITE_URL}/${categoryPath}` }]
      : []),
    { name: product.name, item: `${SITE_URL}${getProductUrl(product)}` },
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  }
}
