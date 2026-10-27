import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/actions/products'
import { getBlogPosts } from '@/lib/actions/blog'
import { getSeoSettings } from '@/lib/actions/seo'
import { populatedCategoryPaths } from '@/lib/category-meta'
import { getProductUrl } from '@/lib/product-urls'

const BASE = 'https://www.maatirmaanush.com'

/**
 * Regenerate hourly instead of baking at build time.
 *
 * This route used to be `○ (Static)`: whatever the catalogue looked like during
 * `next build` was frozen into the XML, so a product or post published from the
 * admin never appeared until someone redeployed. With ISR it refreshes on its own,
 * and `revalidatePath('/sitemap.xml')` in the product/blog/SEO actions pushes an
 * update through immediately on publish — so the hour is a safety net, not the
 * usual latency.
 *
 * Deliberately not `force-dynamic`: crawlers re-fetch this a lot, and there is no
 * reason to hit Supabase on every request for data that changes a few times a week.
 */
export const revalidate = 3600

type Entry = {
  path: string
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}

/**
 * Every indexable static / category route, keyed by its DEFAULT path — the same
 * `page_path` used by `seo_settings`. Custom slugs are resolved at build time
 * below, so a page renamed in the admin SEO tab is submitted under its live URL
 * instead of a path that 308-redirects.
 *
 * Deliberately excluded:
 *  - redirect stubs: /about, /collections, /kaftans, /kantha, /kantha-jackets,
 *    /kurtas, /privacy, /shipping, /kantha-embroidered-dresses (stub),
 *    /products/[slug]
 *  - /account — per-user page, nothing for Google to index
 *  - /admin/* — disallowed in robots.ts
 */
const staticRoutes: Entry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },

  // Collections / category listings
  { path: '/new-drops', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/kantha-stitch-sarees', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/kantha-embroidered-jackets', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/kantha-embroidered-kurtas', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/kaftans-for-women', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contemporary-womens-wear', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/limited-editions-clothing', priority: 0.8, changeFrequency: 'weekly' },
  // { path: '/kantha-coats', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/tops', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/skirts', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/sold-out', priority: 0.5, changeFrequency: 'weekly' },

  // Brand / editorial
  { path: '/the-art-of-kantha', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about-founder', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },

  // Support / policy
  { path: '/contact-us', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/shipping-delivery', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/returns', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // NOTE: deliberately no `.catch(() => [])` here. Swallowing a failed read used to
  // mean a transient Supabase error produced a perfectly valid-looking sitemap that
  // was silently missing every product and post — observed happening once on a cold
  // start. Throwing is better in both places it can happen: during a build it fails
  // the deploy (Vercel keeps the previous one live), and during an ISR revalidation
  // Next keeps serving the last good copy and retries later.
  const [products, blogPosts, seoSettings, populatedCategories] = await Promise.all([
    getProducts(),
    getBlogPosts(true),
    getSeoSettings(),
    populatedCategoryPaths(),
  ])

  // An empty category listing is a thin page — it is noindex until something is
  // published into it, so don't ask Google to crawl it in the meantime.
  const CATEGORY_PATHS = new Set([
    '/kantha-stitch-sarees', '/kantha-embroidered-jackets', '/kaftans-for-women',
    '/kantha-embroidered-kurtas', '/contemporary-womens-wear',
    '/limited-editions-clothing', '/kantha-coats', '/tops', '/skirts',
  ])
  const populated = new Set(populatedCategories)

  // page_path -> custom slug, for pages renamed via the admin SEO tab
  const customSlug = new Map<string, string>(
    (seoSettings ?? [])
      .filter((s: any) => s.slug)
      .map((s: any) => [s.page_path as string, s.slug as string])
  )

  // Root canonicalises to the bare origin (no trailing slash) — match it exactly.
  const toUrl = (path: string) =>
    path === '/' ? BASE : `${BASE}${customSlug.get(path) ?? path}`

  const staticEntries: MetadataRoute.Sitemap = staticRoutes
    .filter((r) => !CATEGORY_PATHS.has(r.path) || populated.has(r.path))
    .map((r) => ({
      url: toUrl(r.path),
      priority: r.priority,
      changeFrequency: r.changeFrequency,
    }))

  const productEntries: MetadataRoute.Sitemap = (products ?? [])
    .filter((p: any) => p.published && p.slug)
    .map((p: any) => ({
      url: `${BASE}${getProductUrl(p)}`,
      lastModified: p.updated_at ?? p.created_at,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    }))

  const blogEntries: MetadataRoute.Sitemap = (blogPosts ?? [])
    .filter((b: any) => b.slug)
    .map((b: any) => ({
      url: `${BASE}/blog/${b.slug}`,
      lastModified: b.updated_at ?? b.created_at,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }))

  // A slug rename could theoretically collide with another route's default path;
  // keep the first occurrence so the file never ships a duplicate <loc>.
  const seen = new Set<string>()
  return [...staticEntries, ...productEntries, ...blogEntries].filter((e) => {
    if (seen.has(e.url)) return false
    seen.add(e.url)
    return true
  })
}
