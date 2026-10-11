import { getProducts } from '@/lib/actions/products'
import { CATEGORY_URL_MAP } from '@/lib/product-urls'

/**
 * A category listing with nothing in it renders "No pieces found in this
 * collection" — a thin page Google is likely to treat as a soft 404 and log under
 * "Crawled - currently not indexed". `/tops` and `/skirts` sat in that state with
 * zero products AND zero inbound internal links.
 *
 * Rather than hardcoding which categories are empty, this checks at render time:
 * an empty collection is noindex,follow (still passing link equity onward), and
 * it becomes indexable on its own the moment a piece is published into it.
 */
export async function categoryRobotsMeta(categoryName: string) {
  if (await categoryIsEmpty(categoryName)) {
    return { robots: { index: false, follow: true } } as const
  }
  return {}
}

export async function categoryIsEmpty(categoryName: string): Promise<boolean> {
  try {
    const all = await getProducts()
    return !all.some((p: any) => p.published && p.category === categoryName)
  } catch {
    // On a data failure assume it is populated — better to leave a real page
    // indexable than to noindex the whole catalogue over a transient error.
    return false
  }
}

/** Category display names that currently have at least one published piece. */
export async function populatedCategoryPaths(): Promise<string[]> {
  try {
    const all = await getProducts()
    return Object.entries(CATEGORY_URL_MAP)
      .filter(([name]) => all.some((p: any) => p.published && p.category === name))
      .map(([, path]) => `/${path}`)
  } catch {
    return Object.values(CATEGORY_URL_MAP).map((p) => `/${p}`)
  }
}
