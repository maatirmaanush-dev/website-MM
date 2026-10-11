import Link from 'next/link'
import { ProductCard } from '@/components/products/ProductCard'
import { CATEGORY_URL_MAP } from '@/lib/product-urls'

const MAX_RELATED = 4

type AnyProduct = {
  id: string
  slug: string
  name: string
  category: string
  published?: boolean
  stock_status?: string | null
  images?: string[] | null
}

/**
 * Lateral internal links from a product page.
 *
 * Before this existed a product page linked to no other product and not even to
 * its own category — most products had exactly ONE inbound internal link (their
 * category listing), which is a thin crawl path for Googlebot and a dead end for
 * a reader who is interested but not in *this* piece.
 *
 * Every piece is one-of-a-kind, so "related" is by category rather than by any
 * variant relationship. In-stock pieces are shown ahead of sold-out ones, and if
 * a category is too small to fill the row we top up from other collections
 * rather than rendering a stub.
 */
export function RelatedProducts({
  product,
  allProducts,
}: {
  product: AnyProduct
  allProducts: AnyProduct[]
}) {
  const live = allProducts.filter(
    (p) => p.published !== false && p.slug && p.id !== product.id
  )

  // Pick a *rotating* window rather than always the first N of the category.
  // Taking the same top 4 every time concentrated every inbound link on 4 pieces
  // and left the rest of a large category on one inbound link each; offsetting by
  // the product's own position sweeps the window so sibling links spread evenly.
  const categoryAll = allProducts.filter(
    (p) => p.published !== false && p.slug && p.category === product.category
  )
  const pos = Math.max(0, categoryAll.findIndex((p) => p.id === product.id))
  const rotate = <T,>(list: T[], by: number): T[] =>
    list.length ? [...list.slice(by % list.length), ...list.slice(0, by % list.length)] : list

  const sameCategory = categoryAll.filter((p) => p.id !== product.id)
  // In-stock pieces lead; sold-out ones still earn a link, just further down.
  const related = [
    ...rotate(sameCategory.filter((p) => p.stock_status !== 'sold_out'), pos),
    ...rotate(sameCategory.filter((p) => p.stock_status === 'sold_out'), pos),
  ].slice(0, MAX_RELATED)

  // Category too small to fill the row — top up from other collections.
  const toppedUp = related.length < MAX_RELATED
  if (toppedUp) {
    const others = live.filter((p) => p.category !== product.category)
    const pool = [
      ...others.filter((p) => p.stock_status !== 'sold_out'),
      ...others.filter((p) => p.stock_status === 'sold_out'),
    ]
    related.push(...rotate(pool, pos).slice(0, MAX_RELATED - related.length))
  }

  // Only surface collections that actually have something in them; linking to an
  // empty listing wastes the link and gives the reader a dead end.
  const otherCollections = Object.entries(CATEGORY_URL_MAP)
    .filter(
      ([name]) =>
        name !== product.category && live.some((p) => p.category === name)
    )
    .map(([name, path]) => ({ name, path: `/${path}` }))

  if (!related.length && !otherCollections.length) return null

  const heading =
    related.length && !toppedUp
      ? `More from ${product.category}`
      : 'You may also like'

  return (
    <section className="mt-16 sm:mt-24 pt-16 border-t border-beige-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {related.length > 0 && (
          <>
            <p className="text-xs tracking-[0.25em] uppercase text-earth-500 font-sans mb-2">
              Continue exploring
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-earth-900 mb-12">
              {heading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} cta="know-more" />
              ))}
            </div>
          </>
        )}

        {otherCollections.length > 0 && (
          <nav
            aria-label="Other collections"
            className="mt-16 pt-10 border-t border-beige-200"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-earth-500 font-sans mb-5">
              Explore other collections
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-3">
              {otherCollections.map((c) => (
                <li key={c.path}>
                  <Link
                    href={c.path}
                    className="inline-block font-sans text-xs tracking-[0.12em] uppercase px-4 py-2 border border-beige-300 text-earth-700 hover:border-earth-700 hover:text-earth-900 transition-colors duration-300"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  )
}
