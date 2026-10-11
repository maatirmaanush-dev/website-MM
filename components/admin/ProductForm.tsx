'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/lib/actions/products'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface Props {
  product?: any
}

interface FAQItem {
  q: string
  a: string
}

const CATEGORIES = [
  'Kantha Stitch Sarees',
  'Kantha Jackets',
  'Kantha Coats',
  'Kaftans',
  'Kurtas',
  'Dresses',
  'Tops',
  'Skirts',
  'Limited Editions',
]

const STOCK_STATUSES = [
  { value: 'available', label: 'Available' },
  { value: 'sold_out', label: 'Sold Out' },
]

function parseFaqs(raw: any): FAQItem[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) } catch { return [] }
  }
  return []
}

export default function ProductForm({ product }: Props) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [published, setPublished] = useState(product?.published ?? false)
  const [faqs, setFaqs] = useState<FAQItem[]>(parseFaqs(product?.weight))
  const fileRef = useRef<HTMLInputElement>(null)

  function moveImage(i: number, dir: -1 | 1) {
    setImages(prev => {
      const next = [...prev]
      const j = i + dir
      if (j < 0 || j >= next.length) return prev
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  function autoSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  function addFaq() {
    setFaqs(prev => [...prev, { q: '', a: '' }])
  }

  function removeFaq(i: number) {
    setFaqs(prev => prev.filter((_, j) => j !== i))
  }

  function updateFaq(i: number, field: 'q' | 'a', value: string) {
    setFaqs(prev => prev.map((faq, j) => j === i ? { ...faq, [field]: value } : faq))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    if (file.size > 20 * 1024 * 1024) {
      setError('Image too large — please use an image under 20MB.')
      e.target.value = ''
      return
    }
    setUploading(true)
    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, { contentType: file.type, upsert: false })
      if (error) {
        setError(`Upload failed: ${error.message}`)
      } else {
        const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
        setImages(prev => [...prev, data.publicUrl])
      }
    } catch {
      setError('Upload failed — check your connection and try again.')
    }
    setUploading(false)
    e.target.value = ''
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    fd.set('images', images.join('\n'))
    fd.set('featured', featured ? 'true' : 'false')
    fd.set('published', published ? 'true' : 'false')
    const validFaqs = faqs.filter(f => f.q.trim() && f.a.trim())
    fd.set('weight', JSON.stringify(validFaqs))
    const result = product
      ? await updateProduct(product.id, fd)
      : await createProduct(fd)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/admin/products')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-3 py-2">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label">Product Name</label>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className="input"
            onChange={e => {
              if (!product) {
                const slugInput = e.currentTarget.form?.elements.namedItem('slug') as HTMLInputElement
                if (slugInput && !slugInput.dataset.touched) slugInput.value = autoSlug(e.target.value)
              }
            }}
          />
        </div>
        <div>
          <label className="label">Slug</label>
          <input
            name="slug"
            required
            defaultValue={product?.slug}
            className="input"
            placeholder="kantha-silk-saree"
            onInput={e => { (e.currentTarget as HTMLInputElement).dataset.touched = 'true' }}
          />
        </div>
        <div>
          <label className="label">Category</label>
          <select name="category" required defaultValue={product?.category || ''} className="input">
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Price Display</label>
          <input name="price_display" defaultValue={product?.price_display} className="input" placeholder="₹28,000 or Price on enquiry" />
        </div>
        <div>
          <label className="label">Price (numeric)</label>
          <input name="price_numeric" type="number" defaultValue={product?.price_numeric} className="input" placeholder="28000" />
        </div>
        <div className="col-span-2">
          <label className="label">Short Description</label>
          <input name="short_description" defaultValue={product?.short_description} className="input" />
        </div>
        <div className="col-span-2">
          <label className="label">Full Description</label>
          <textarea name="description" rows={4} defaultValue={product?.description} className="input" />
        </div>
        <div>
          <label className="label">Dimensions</label>
          <input name="dimensions" defaultValue={product?.dimensions} className="input" placeholder="6 yards × 45 inches" />
        </div>
        <div>
          <label className="label">Fabric</label>
          <input name="fabric" defaultValue={product?.fabric} className="input" placeholder="Pure Silk" />
        </div>
        <div className="col-span-2">
          <label className="label">Tags (comma separated)</label>
          <input name="tags" defaultValue={product?.tags?.join(', ')} className="input" placeholder="kantha, saree, silk" />
        </div>
        <div className="col-span-2">
          <label className="label">Care Instructions (one per line)</label>
          <textarea name="care_instructions" rows={3} defaultValue={product?.care_instructions?.join('\n')} className="input" placeholder="Dry clean only&#10;Store in cotton bag" />
        </div>
      </div>

      {/* FAQs */}
      <div className="border border-beige-200 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-earth-900">Product FAQs</h3>
            <p className="text-xs text-earth-400 mt-0.5">Shown on the product page below the description.</p>
          </div>
          <button
            type="button"
            onClick={addFaq}
            className="flex items-center gap-1.5 text-xs font-sans text-earth-900 border border-earth-300 px-3 py-1.5 rounded hover:bg-earth-50 transition"
          >
            <Plus size={12} /> Add FAQ
          </button>
        </div>

        {faqs.length === 0 && (
          <p className="text-xs text-earth-400 italic">No FAQs yet. Click &quot;Add FAQ&quot; to add one.</p>
        )}

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-beige-50 rounded p-3 space-y-2 border border-beige-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-earth-500">FAQ {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div>
                <label className="text-xs text-earth-500 mb-1 block">Question</label>
                <input
                  type="text"
                  value={faq.q}
                  onChange={e => updateFaq(i, 'q', e.target.value)}
                  placeholder="e.g. What fabric is this made from?"
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-earth-500 mb-1 block">Answer</label>
                <textarea
                  value={faq.a}
                  onChange={e => updateFaq(i, 'a', e.target.value)}
                  placeholder="e.g. This piece is made from..."
                  rows={2}
                  className="input text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO */}
      <div className="border border-beige-200 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-earth-900">SEO</h3>
        <p className="text-xs text-earth-400">Leave blank to auto-generate from product name and short description.</p>
        <div>
          <label className="label">Meta Title <span className="text-earth-400 font-normal">(recommended: under 60 chars)</span></label>
          <input
            name="meta_title"
            defaultValue={product?.meta_title || ''}
            className="input"
            placeholder={product?.name ? `${product.name} — Maatir Maanush` : 'Product Name — Maatir Maanush'}
            maxLength={100}
          />
        </div>
        <div>
          <label className="label">Meta Description <span className="text-earth-400 font-normal">(recommended: under 160 chars)</span></label>
          <textarea
            name="meta_description"
            rows={2}
            defaultValue={product?.meta_description || ''}
            className="input"
            placeholder={product?.short_description || 'Brief description for search engines...'}
            maxLength={300}
          />
        </div>
      </div>

      {/* Inventory */}
      <div className="border border-beige-200 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-earth-900">Inventory</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Stock Status</label>
            <select name="stock_status" defaultValue={product?.stock_status || 'available'} className="input">
              {STOCK_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Stock Quantity <span className="text-earth-400 font-normal">(optional)</span></label>
            <input name="stock_quantity" type="number" min="0" defaultValue={product?.stock_quantity ?? ''} className="input" placeholder="e.g. 3" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-earth-700 cursor-pointer select-none">
          <div
            onClick={() => setFeatured((v: boolean) => !v)}
            className={`w-9 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${featured ? 'bg-earth-900' : 'bg-beige-300'}`}
          >
            <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${featured ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-earth-700 cursor-pointer select-none">
          <div
            onClick={() => setPublished((v: boolean) => !v)}
            className={`w-9 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${published ? 'bg-emerald-600' : 'bg-beige-300'}`}
          >
            <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${published ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
          {published ? 'Published' : 'Draft'}
        </label>
      </div>

      <div>
        <label className="label mb-1 block">Product Images</label>
        <p className="text-xs text-earth-400 mb-3">First image is the main product photo. Use arrows to reorder.</p>
        <div className="flex flex-wrap gap-3 mb-3">
          {images.map((url, i) => (
            <div key={url + i} className="relative w-24 rounded overflow-hidden border border-beige-200 bg-beige-50">
              <div className="relative w-24 h-24">
                <Image src={url} alt="" fill className="object-cover" unoptimized />
              </div>
              {i === 0 && (
                <div className="absolute top-0 left-0 bg-earth-900/80 text-white text-[9px] px-1 py-0.5 leading-none">
                  Cover
                </div>
              )}
              <button
                type="button"
                onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}
                className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
              >
                <X size={10} />
              </button>
              <div className="flex justify-between px-1 py-0.5 bg-beige-100">
                <button
                  type="button"
                  onClick={() => moveImage(i, -1)}
                  disabled={i === 0}
                  className="text-earth-400 hover:text-earth-900 disabled:opacity-20 transition"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(i, 1)}
                  disabled={i === images.length - 1}
                  className="text-earth-400 hover:text-earth-900 disabled:opacity-20 transition"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-24 h-24 rounded border-2 border-dashed border-beige-300 flex flex-col items-center justify-center text-earth-400 hover:border-earth-500 hover:text-earth-500 transition"
          >
            <Upload size={16} />
            <span className="text-xs mt-1">{uploading ? '…' : 'Upload'}</span>
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-earth-900 text-white px-5 py-2 rounded text-sm hover:bg-earth-700 transition disabled:opacity-50">
          {loading ? 'Saving…' : product ? 'Save Changes' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded text-sm border border-beige-300 text-earth-700 hover:bg-beige-50 transition">
          Cancel
        </button>
      </div>
    </form>
  )
}
