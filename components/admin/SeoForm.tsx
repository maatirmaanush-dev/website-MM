'use client'

import { useState } from 'react'
import { upsertSeo } from '@/lib/actions/seo'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'

interface Props {
  pagePath: string
  existing?: any
}

export default function SeoForm({ pagePath, existing }: Props) {
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    fd.set('page_path', pagePath)
    const result = await upsertSeo(fd)
    if (result?.error) {
      setError(result.error)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setLoading(false)
  }

  const hasData = existing?.title || existing?.description

  return (
    <div className="bg-white border border-beige-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-beige-50 transition"
      >
        <div className="flex items-center gap-3">
          <code className="text-xs bg-beige-100 px-2 py-0.5 rounded text-earth-700">{pagePath}</code>
          {hasData && <span className="text-xs text-emerald-600 font-medium">Configured</span>}
        </div>
        {open ? <ChevronUp size={14} className="text-earth-400" /> : <ChevronDown size={14} className="text-earth-400" />}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="border-t border-beige-100 px-4 py-4 space-y-3">
          {pagePath !== '/' && (
            <div>
              <label className="label">URL Slug</label>
              <input
                name="slug"
                defaultValue={existing?.slug || pagePath}
                className="input font-mono text-sm"
                placeholder={pagePath}
              />
              <p className="text-xs text-earth-400 mt-1">
                Changes the live URL for this page (e.g. <code>/our-story</code>). The old URL will automatically
                redirect to the new one, but other links on the site that point to <code>{pagePath}</code> will still
                work — they&apos;ll just redirect through one extra hop until updated.
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">H1 Heading</label>
              <input name="h1" defaultValue={existing?.h1} className="input" placeholder="Main page heading" />
            </div>
            <div>
              <label className="label">H2 Subheading</label>
              <input name="h2" defaultValue={existing?.h2} className="input" placeholder="Secondary heading or tagline" />
            </div>
          </div>
          <div>
            <label className="label">Meta Title</label>
            <input name="title" defaultValue={existing?.title} className="input" placeholder="Page title (50-60 chars)" maxLength={70} />
          </div>
          <div>
            <label className="label">Meta Description</label>
            <textarea name="description" rows={2} defaultValue={existing?.description} className="input" placeholder="Page description (150-160 chars)" maxLength={200} />
          </div>
          <div>
            <label className="label">OG Image URL</label>
            <input name="og_image" defaultValue={existing?.og_image} className="input" placeholder="https://..." />
          </div>
          <div>
            <label className="label">Keywords</label>
            <input name="keywords" defaultValue={existing?.keywords} className="input" placeholder="kantha, bengal, handmade" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-earth-900 text-white px-4 py-1.5 rounded text-sm hover:bg-earth-700 transition disabled:opacity-50"
          >
            {saved ? <><Check size={13} /> Saved</> : loading ? 'Saving…' : 'Save'}
          </button>
        </form>
      )}
    </div>
  )
}
