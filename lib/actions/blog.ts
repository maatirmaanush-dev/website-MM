'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'

function revalidateAll() {
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
  revalidatePath('/sitemap.xml')
}

export async function getBlogPosts(publishedOnly = false) {
  const supabase = createAdminClient()
  let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
  if (publishedOnly) query = query.eq('published', true)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getBlogPostById(id: string) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

export async function createBlogPost(formData: FormData) {
  const supabase = createAdminClient()
  const bodyRaw = formData.get('body') as string

  let body = []
  try { body = JSON.parse(bodyRaw || '[]') } catch {}

  const { error } = await supabase.from('blog_posts').insert({
    slug: formData.get('slug'),
    title: formData.get('title'),
    excerpt: formData.get('excerpt') || '',
    category: formData.get('category') || 'Craft & Culture',
    color: formData.get('color') || '#8B3A2A',
    image: formData.get('image') || null,
    body,
    read_time: formData.get('read_time') || null,
    published: formData.get('published') === 'true',
  })
  if (error) return { error: error.message }
  revalidateAll()
  return { success: true }
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = createAdminClient()
  const bodyRaw = formData.get('body') as string

  let body = []
  try { body = JSON.parse(bodyRaw || '[]') } catch {}

  const { error } = await supabase.from('blog_posts').update({
    slug: formData.get('slug'),
    title: formData.get('title'),
    excerpt: formData.get('excerpt') || '',
    category: formData.get('category') || 'Craft & Culture',
    color: formData.get('color') || '#8B3A2A',
    image: formData.get('image') || null,
    body,
    read_time: formData.get('read_time') || null,
    published: formData.get('published') === 'true',
  }).eq('id', id)
  if (error) return { error: error.message }
  revalidateAll()
  return { success: true }
}

export async function toggleBlogPublished(id: string, published: boolean) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('blog_posts').update({ published }).eq('id', id)
  if (error) return { error: error.message }
  revalidateAll()
  return { success: true }
}

export async function deleteBlogPost(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidateAll()
  return { success: true }
}

export async function uploadBlogImage(formData: FormData) {
  const supabase = createAdminClient()
  const file = formData.get('file') as File
  if (!file) return { error: 'No file provided' }
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, file, { contentType: file.type })
  if (error) return { error: error.message }
  const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName)
  return { url: data.publicUrl }
}
