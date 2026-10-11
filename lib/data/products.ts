// Plain (non-'use server') read-only data access for product pages that use
// generateStaticParams + dynamicParams: false (the category product-detail routes).
//
// lib/actions/products.ts is a 'use server' Server Actions file. Calling a Server
// Action directly as a data source from a route that Next.js is trying to render
// on-demand for a param OUTSIDE its static list (which happens even with
// dynamicParams: false when generateStaticParams returns an empty array — an
// empty static-params route still invokes the page instead of short-circuiting
// to a routing-layer 404) crashes with digest 'DYNAMIC_SERVER_USAGE'. Plain
// functions have no such restriction, so this module exists purely to keep those
// reads out of the Server Actions file.
import { createAdminClient } from '@/lib/supabase/server'

export async function getProducts() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to load products: ${error.message}`)
  return data ?? []
}

export async function getProductBySlug(slug: string) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}
