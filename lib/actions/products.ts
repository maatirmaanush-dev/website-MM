'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'

const ALL_PRODUCT_PATHS = [
  '/admin/products',
  // The sitemap is ISR'd hourly; listing it here means a publish shows up in the
  // XML straight away rather than whenever the window happens to roll over.
  '/sitemap.xml',
  '/',
  '/new-drops',
  '/collections',
  '/kantha-stitch-sarees',
  '/kantha-embroidered-jackets',
  '/kantha-coats',
  '/kaftans-for-women',
  '/kantha-embroidered-kurtas',
  '/contemporary-womens-wear',
  '/limited-editions-clothing',
  '/tops',
  '/skirts',
  '/sold-out',
]

function revalidateAll() {
  ALL_PRODUCT_PATHS.forEach(p => revalidatePath(p))
}

export async function getProducts() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to load products: ${error.message}`)
  return data ?? []
}

export async function getProductById(id: string) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
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

export async function createProduct(formData: FormData) {
  try {
  const supabase = createAdminClient()
  const imagesRaw = formData.get('images') as string
  const careRaw = formData.get('care_instructions') as string
  const tagsRaw = formData.get('tags') as string
  const stockQty = formData.get('stock_quantity')

  const { error } = await supabase.from('products').insert({
    name: formData.get('name'),
    slug: formData.get('slug'),
    category: formData.get('category'),
    price_display: formData.get('price_display') || null,
    price_numeric: formData.get('price_numeric') ? Number(formData.get('price_numeric')) : null,
    short_description: formData.get('short_description') || '',
    description: formData.get('description') || '',
    images: imagesRaw ? imagesRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
    dimensions: formData.get('dimensions') || null,
    weight: formData.get('weight') || null,
    fabric: formData.get('fabric') || null,
    care_instructions: careRaw ? careRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
    featured: formData.get('featured') === 'true',
    tags: tagsRaw ? tagsRaw.split(',').map(s => s.trim()).filter(Boolean) : [],
    published: formData.get('published') === 'true',
    stock_quantity: stockQty ? Number(stockQty) : null,
    stock_status: formData.get('stock_status') || 'available',
    meta_title: formData.get('meta_title') || null,
    meta_description: formData.get('meta_description') || null,
  })
  if (error) return { error: error.message }
  revalidateAll()
  return { success: true }
  } catch (e: any) {
    return { error: e?.message || 'Server error creating product' }
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const supabase = createAdminClient()
    const imagesRaw = formData.get('images') as string
    const careRaw = formData.get('care_instructions') as string
    const tagsRaw = formData.get('tags') as string
    const stockQty = formData.get('stock_quantity')

    const { error } = await supabase.from('products').update({
      name: formData.get('name'),
      slug: formData.get('slug'),
      category: formData.get('category'),
      price_display: formData.get('price_display') || null,
      price_numeric: formData.get('price_numeric') ? Number(formData.get('price_numeric')) : null,
      short_description: formData.get('short_description') || '',
      description: formData.get('description') || '',
      images: imagesRaw ? imagesRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
      dimensions: formData.get('dimensions') || null,
      weight: formData.get('weight') || null,
      fabric: formData.get('fabric') || null,
      care_instructions: careRaw ? careRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
      featured: formData.get('featured') === 'true',
      tags: tagsRaw ? tagsRaw.split(',').map(s => s.trim()).filter(Boolean) : [],
      published: formData.get('published') === 'true',
      stock_quantity: stockQty ? Number(stockQty) : null,
      stock_status: formData.get('stock_status') || 'available',
      meta_title: formData.get('meta_title') || null,
      meta_description: formData.get('meta_description') || null,
    }).eq('id', id)
    if (error) return { error: error.message }
    revalidateAll()
    return { success: true }
  } catch (e: any) {
    return { error: e?.message || 'Server error updating product' }
  }
}

export async function toggleProductPublished(id: string, published: boolean) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('products').update({ published }).eq('id', id)
  if (error) return { error: error.message }
  revalidateAll()
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidateAll()
  return { success: true }
}

export async function getPublishedCategories(): Promise<string[]> {
  const supabase = createAdminClient()
  const { data } = await supabase.from('products').select('category').eq('published', true)
  const cats = Array.from(new Set((data || []).map((p: any) => p.category)))
  return cats
}

export async function getCategoryImages(): Promise<Record<string, string>> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('products')
    .select('category, images')
    .eq('published', true)
    .not('images', 'eq', '{}')
  const map: Record<string, string> = {}
  for (const p of (data || [])) {
    if (!map[p.category] && p.images?.length > 0) {
      map[p.category] = p.images[0]
    }
  }
  return map
}

export async function uploadProductImage(formData: FormData) {
  try {
    const supabase = createAdminClient()
    const file = formData.get('file') as File
    if (!file) return { error: 'No file provided' }

    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { contentType: file.type, upsert: false })

    if (error) return { error: error.message }

    const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
    return { url: data.publicUrl }
  } catch (e: any) {
    return { error: e?.message || 'Server error during upload' }
  }
}
