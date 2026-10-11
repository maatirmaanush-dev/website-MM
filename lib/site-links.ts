/**
 * Canonical internal paths for pages that have been renamed via the admin SEO tab
 * (`seo_settings.slug`, applied by `middleware.ts`).
 *
 * The rename system 308-redirects the original path to the current slug, so a
 * hardcoded `/new-drops` link still *works* — but every such link costs a redirect
 * hop, and Google reports the old path under "Page with redirect". Linking to the
 * live slug keeps internal links pointing straight at the indexable URL.
 *
 * If a page is renamed again in the admin SEO tab, update the constant here — it is
 * the single place the rest of the app links through.
 */

/** "New Drops" — page_path `/new-drops`, renamed to `/kantha-embroidered-dresses`. */
export const NEW_DROPS_PATH = '/kantha-embroidered-dresses'
