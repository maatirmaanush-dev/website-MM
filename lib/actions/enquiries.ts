'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'

export async function getEnquiries() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function markEnquiryRead(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('enquiries')
    .update({ read: true })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/enquiries')
  return { success: true }
}

export async function submitEnquiry(formData: FormData) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('enquiries').insert({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || null,
    product_ref: formData.get('product_ref') || null,
    message: formData.get('message'),
    source: formData.get('source') || 'contact_form',
  })
  if (error) return { error: error.message }
  revalidatePath('/admin/enquiries')
  return { success: true }
}
