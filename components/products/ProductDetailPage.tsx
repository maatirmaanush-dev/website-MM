import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getProductBySlug, getProducts } from '@/lib/data/products'
import { getProductUrl, CATEGORY_URL_MAP } from '@/lib/product-urls'
import { jsonLd, productSchema, productBreadcrumbSchema } from '@/lib/structured-data'
import { clampDescription } from '@/lib/meta-text'
import { RelatedProducts } from '@/components/products/RelatedProducts'
import { ProductImageGallery } from '@/components/products/ProductImageGallery'
import { WhatsAppEnquire } from '@/components/shared/WhatsAppEnquire'
import { ChevronRight } from 'lucide-react'
import { NEW_DROPS_PATH } from '@/lib/site-links'
import { formatIndianCurrency } from '@/lib/format-price'

const BASE = 'https://www.maatirmaanush.com'

// Each category route (e.g. /kantha-coats/[slug]) mounts this factory with its own
// category name, so a product only ever gets ONE live, statically-generated URL —
// the one matching its actual category. Requesting a product's slug under the wrong
// category folder 404s instead of rendering a duplicate copy of the page.
// (Previously every category folder re-exported the same unscoped generateStaticParams,
// which built every product under every category prefix — ~9x duplicate URLs per
// product — which is what Google Search Console was flagging as duplicate/unindexed pages.)
async function loadProduct(slug: string, category: string) {
  const product = await getProductBySlug(slug)
  if (!product || !product.published) return null
  if (product.category !== category) return null
  return product
}

export function createProductDetailPage(category: string) {
  async function generateStaticParams() {
    try {
      const products = await getProducts()
      return products
        .filter((p: any) => p.published && p.category === category)
        .map((p: any) => ({ slug: p.slug }))
    } catch {
      return []
    }
  }

  async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const product = await loadProduct(params.slug, category)
    if (!product) return {}
    return {
      title: product.meta_title || `${product.name} — Maatir Maanush`,
      description: product.meta_description || clampDescription(product.short_description),
      alternates: {
        canonical: `${BASE}${getProductUrl(product)}`,
      },
    }
  }

  async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const product = await loadProduct(params.slug, category)
    if (!product) notFound()
    const soldOut = product.stock_status === 'sold_out'
    // For the related-products rail below. Never let a listing failure 500 the page.
    const allProducts = await getProducts().catch(() => [])

    // Adapt snake_case DB fields to component-friendly shape
    const adapted = {
      ...product,
      priceDisplay: formatIndianCurrency(product.price_display),
      shortDescription: product.short_description,
      careInstructions: product.care_instructions || [],
      images: product.images || [],
    }

    console.log('Price display', adapted.priceDisplay)

    return (
      <main className="min-h-screen bg-beige-50 pt-28 pb-32 sm:pb-40 px-6 lg:px-10">
        {/* Product + breadcrumb schema. Nothing on these pages carried structured
            data before, so Google had no machine-readable price or availability. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(productSchema(product))}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(productBreadcrumbSchema(product))}
        />
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-sans text-earth-700 mb-10">
            <Link href={NEW_DROPS_PATH} className="hover:text-earth-900 transition-colors">
              Collections
            </Link>
            <ChevronRight size={12} className="text-earth-500" />
            {CATEGORY_URL_MAP[product.category] ? (
              <Link
                href={`/${CATEGORY_URL_MAP[product.category]}`}
                className="text-earth-500 hover:text-earth-900 transition-colors"
              >
                {product.category}
              </Link>
            ) : (
              <span className="text-earth-500">{product.category}</span>
            )}
            <ChevronRight size={12} className="text-earth-500" />
            <span className="text-earth-900">{product.name}</span>
          </nav>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left: Image Gallery */}
            <ProductImageGallery images={adapted.images} name={product.name} />

            {/* Right: Product info */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">
                {product.category}
              </p>

              <h1 className="font-serif text-2xl md:text-3xl text-earth-900 leading-tight mb-4">
                {product.name}
              </h1>

              <p className="font-sans font-semibold text-lg text-earth-900 tracking-wide">
                {adapted.priceDisplay}
              </p>
              <p className="font-sans text-xs text-earth-500 mb-6">
                Exclusive of GST
              </p>

              <p className="font-sans text-earth-700 text-base leading-relaxed mb-8 border-t border-beige-200 pt-6">
                {adapted.shortDescription}
              </p>

              {/* Stock status */}
              {soldOut ? (
                <div className="mb-4">
                  <span className="text-xs font-sans text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded">
                    Sold out — this piece was made once and won&apos;t be made again
                  </span>
                </div>
              ) : product.stock_quantity != null && (
                <div className="mb-4">
                  <span className="text-xs font-sans text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                    {product.stock_quantity} in stock
                  </span>
                </div>
              )}

              {/* WhatsApp CTA */}
              {soldOut ? (
                <div className="mb-10 border border-beige-200 bg-beige-100 rounded px-5 py-4">
                  <p className="font-sans text-sm text-earth-700 mb-3">
                    This one-of-a-kind piece has sold and will not be remade. Explore our other pieces, or ask us about something similar.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={NEW_DROPS_PATH}
                      className="inline-flex items-center justify-center font-sans tracking-[0.12em] uppercase text-xs px-4 py-2 border border-earth-900 text-earth-900 hover:bg-earth-900 hover:text-beige-50 transition-all duration-300"
                    >
                      View Collections
                    </Link>
                    <WhatsAppEnquire product={adapted} variant="outline" />
                  </div>
                </div>
              ) : (
                <WhatsAppEnquire product={adapted} size="lg" className="mb-10" />
              )}

              {/* Details */}
              <div className="border-t border-beige-200 pt-8 flex flex-col gap-6">
                {product.fabric && (
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-1">Material</p>
                    <p className="font-sans text-sm text-earth-900">{product.fabric}</p>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-1">Dimensions</p>
                    <p className="font-sans text-sm text-earth-900">{product.dimensions}</p>
                  </div>
                )}
                {product.weight && !product.weight.startsWith('[') && (
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-1">Weight</p>
                    <p className="font-sans text-sm text-earth-900">{product.weight}</p>
                  </div>
                )}

                {adapted.careInstructions.length > 0 && (
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-3">
                      Care Instructions
                    </p>
                    <ol className="flex flex-col gap-2">
                      {adapted.careInstructions.map((instruction: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm font-sans text-earth-700">
                          <span className="text-earth-500 font-serif">{i + 1}.</span>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Full description */}
              {product.description && (
                <div className="border-t border-beige-200 mt-8 pt-8">
                  <p className="text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-4">
                    About this piece
                  </p>
                  {(() => {
                    const raw: string = product.description
                    // Use explicit newlines if present, otherwise split into 2-sentence paragraphs
                    const paras: string[] = raw.includes('\n')
                      ? raw.split(/\n\n|\n/).filter((p: string) => p.trim())
                      : (() => {
                          const sentences: string[] = raw.match(/[^.!?]+[.!?]+["']?/g) || [raw]
                          const groups: string[] = []
                          for (let i = 0; i < sentences.length; i += 2) {
                            groups.push(sentences.slice(i, i + 2).join(' ').trim())
                          }
                          return groups.filter(Boolean)
                        })()
                    return paras.map((para: string, i: number) => (
                      <p key={i} className="font-sans text-sm text-earth-700 leading-relaxed mb-5">
                        {para.trim()}
                      </p>
                    ))
                  })()}
                </div>
              )}

              <Link
                href={NEW_DROPS_PATH}
                className="inline-block mt-4 text-sm font-sans text-earth-700 hover:text-earth-900 underline underline-offset-4 transition-colors"
              >
                ← Back to Collections
              </Link>
            </div>
          </div>
        </div>
        {/* Product-specific FAQs */}
        {product.weight && (() => {
          try {
            const faqs: { q: string; a: string }[] = JSON.parse(product.weight)
            if (!faqs.length) return null
            return (
              <section className="mt-16 sm:mt-24 py-20 px-6 lg:px-10 bg-beige-100 border-t border-beige-200">
                <div className="max-w-3xl mx-auto">
                  <p className="text-xs tracking-[0.25em] uppercase text-earth-500 font-sans mb-2 text-center">
                    FAQ&apos;s
                  </p>
                  <h2 className="font-serif text-2xl text-earth-900 text-center mb-12">
                    About this piece
                  </h2>
                  <div className="flex flex-col divide-y divide-beige-300">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group py-5 cursor-pointer list-none">
                        <summary className="flex items-start justify-between gap-4 font-sans text-sm font-medium text-earth-900 group-open:text-earth-700 transition-colors">
                          <span>{faq.q}</span>
                          <span className="text-earth-500 text-lg leading-none shrink-0 group-open:rotate-45 transition-transform duration-200 mt-0.5">+</span>
                        </summary>
                        <p className="mt-3 font-sans text-sm text-earth-700 leading-relaxed pr-8">
                          {faq.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            )
          } catch { return null }
        })()}

        <RelatedProducts product={product} allProducts={allProducts} />
      </main>
    )
  }

  // generateStaticParams already enumerates every valid slug for this category, so
  // any other slug is definitionally not-found — dynamicParams: false makes Next.js
  // 404 those immediately at the routing layer without ever invoking the page. This
  // also avoids on-demand fallback rendering here, which crashes with
  // DYNAMIC_SERVER_USAGE (calling the 'use server' data-fetch action outside the
  // build-time static list is incompatible with that render path).
  return { default: ProductDetailPage, generateStaticParams, generateMetadata, dynamicParams: false, revalidate: 60 }
}
