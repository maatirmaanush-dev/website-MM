'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'

function normalizeSlug(input: string): string | null {
  let s = input.trim().toLowerCase()
  if (!s) return null
  if (!s.startsWith('/')) s = '/' + s
  s = s.replace(/\/+$/, '') || '/'
  if (s === '/') return null
  if (!/^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(s)) return null
  if (/^\/(admin|api|_next|images|fonts)(\/|$)/.test(s)) return null
  return s
}

export async function getSeoSettings() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('seo_settings')
    .select('*')
    .order('page_path')
  if (error) throw error
  return data
}

export async function getSeoByPath(pagePath: string) {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('seo_settings')
    .select('*')
    .eq('page_path', pagePath)
    .single()
  return data
}

export async function upsertSeo(formData: FormData) {
  const supabase = createAdminClient()
  const pagePath = formData.get('page_path') as string
  const rawSlug = ((formData.get('slug') as string) || '').trim()

  const { data: existing } = await supabase
    .from('seo_settings')
    .select('slug, previous_slug')
    .eq('page_path', pagePath)
    .maybeSingle()

  let slug: string | null = null
  if (rawSlug && rawSlug !== pagePath) {
    slug = normalizeSlug(rawSlug)
    if (!slug) {
      return { error: 'Invalid slug — use lowercase letters, numbers and hyphens only, e.g. /our-story' }
    }
    const [{ data: conflictBySlug }, { data: conflictByPath }] = await Promise.all([
      supabase.from('seo_settings').select('page_path').eq('slug', slug).neq('page_path', pagePath).maybeSingle(),
      supabase.from('seo_settings').select('page_path').eq('page_path', slug).maybeSingle(),
    ])
    if (conflictBySlug || conflictByPath) {
      return { error: 'That slug is already in use by another page.' }
    }
  }

  const oldActive = existing?.slug || pagePath
  const newActive = slug || pagePath
  const previousSlug = oldActive !== newActive ? oldActive : (existing?.previous_slug ?? null)

  const { error } = await supabase.from('seo_settings').upsert({
    page_path: pagePath,
    title: formData.get('title') || null,
    description: formData.get('description') || null,
    og_image: formData.get('og_image') || null,
    keywords: formData.get('keywords') || null,
    h1: formData.get('h1') || null,
    h2: formData.get('h2') || null,
    slug,
    previous_slug: previousSlug,
  }, { onConflict: 'page_path' })

  if (error) return { error: error.message }
  revalidatePath(pagePath)
  if (slug) revalidatePath(slug)
  // A rename changes which URL the sitemap should be submitting for this page.
  revalidatePath('/sitemap.xml')
  if (previousSlug) revalidatePath(previousSlug)
  return { success: true }
}
