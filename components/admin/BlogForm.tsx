'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createBlogPost, updateBlogPost, uploadBlogImage } from '@/lib/actions/blog'
import { Plus, Trash2, Upload, ImageIcon, ChevronDown, ChevronUp } from 'lucide-react'

type Block =
  | { type: 'p' | 'h2' | 'blockquote'; text: string }
  | { type: 'divider' }
  | { type: 'image'; url?: string }

interface Props {
  post?: any
}

const CATEGORIES = ['Craft & Culture', 'Stories from Bengal', 'Care Guide', 'Behind the Label', 'Style & Wear']

function defaultBlocks(raw: any): Block[] {
  if (!raw) return [{ type: 'p', text: '' }]
  if (Array.isArray(raw)) return raw
  try { return JSON.parse(raw) } catch { return [{ type: 'p', text: '' }] }
}

export default function BlogForm({ post }: Props) {
  const router = useRouter()
  const [blocks, setBlocks] = useState<Block[]>(defaultBlocks(post?.body))
  const [coverUrl, setCoverUrl] = useState<string>(post?.image || '')
  const [coverUploading, setCoverUploading] = useState(false)
  const [uploadingBlockIdx, setUploadingBlockIdx] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [published, setPublished] = useState(post?.published ?? false)
  const [seoOpen, setSeoOpen] = useState(false)

  const coverFileRef = useRef<HTMLInputElement>(null)
  const blockImageRef = useRef<HTMLInputElement>(null)
  const blockImageIdxRef = useRef<number>(-1)

  // --- helpers ---
  function autoSlug(title: string) {
    return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
  }

  function getText(b: Block): string {
    return (b as any).text ?? ''
  }

  function getUrl(b: Block): string {
    return (b as any).url ?? ''
  }

  function updateBlockText(i: number, value: string) {
    setBlocks(prev => prev.map((b, j) => j === i ? { ...b, text: value } as Block : b))
  }

  function updateBlockType(i: number, type: Block['type']) {
    setBlocks(prev => prev.map((b, j) => {
      if (j !== i) return b
      if (type === 'divider') return { type: 'divider' }
      if (type === 'image') return { type: 'image', url: getUrl(b) }
      return { type, text: getText(b) } as Block
    }))
  }

  function addBlock(type: Block['type'], after: number) {
    const newBlock: Block =
      type === 'divider' ? { type: 'divider' }
      : type === 'image' ? { type: 'image', url: '' }
      : { type, text: '' }
    setBlocks(prev => [...prev.slice(0, after + 1), newBlock, ...prev.slice(after + 1)])
  }

  function removeBlock(i: number) {
    setBlocks(prev => prev.length === 1 ? prev : prev.filter((_, j) => j !== i))
  }

  // --- uploads ---
  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const result = await uploadBlogImage(fd)
    e.target.value = ''
    if (result.error) setError(result.error)
    else setCoverUrl(result.url!)
    setCoverUploading(false)
  }

  function triggerBlockImage(i: number) {
    blockImageIdxRef.current = i
    blockImageRef.current?.click()
  }

  async function handleBlockImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const i = blockImageIdxRef.current
    setUploadingBlockIdx(i)
    const fd = new FormData()
    fd.append('file', file)
    const result = await uploadBlogImage(fd)
    e.target.value = ''
    if (result.error) setError(result.error)
    else setBlocks(prev => prev.map((b, j) => j === i ? { type: 'image', url: result.url } : b))
    setUploadingBlockIdx(null)
  }

  // --- submit ---
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    fd.set('body', JSON.stringify(blocks))
    fd.set('image', coverUrl)
    fd.set('published', published ? 'true' : 'false')
    const result = post ? await updateBlogPost(post.id, fd) : await createBlogPost(fd)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/admin/blog')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-3 py-2">{error}</div>}

      {/* Basic fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label">Title</label>
          <input
            name="title"
            required
            defaultValue={post?.title}
            className="input"
            onChange={e => {
              if (!post) {
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
            defaultValue={post?.slug}
            className="input"
            placeholder="kantha-craft-guide"
            onInput={e => { (e.currentTarget as HTMLInputElement).dataset.touched = 'true' }}
          />
        </div>
        <div>
          <label className="label">Category</label>
          <select name="category" required defaultValue={post?.category} className="input">
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className="label">Excerpt <span className="text-earth-400 font-normal">(used as meta description)</span></label>
          <textarea name="excerpt" rows={2} defaultValue={post?.excerpt} className="input" placeholder="1–2 sentence summary of the post…" />
        </div>
        <div>
          <label className="label">Read Time</label>
          <input name="read_time" defaultValue={post?.read_time} className="input" placeholder="5 min read" />
        </div>
        <div>
          <label className="label">Accent Color</label>
          <input name="color" type="color" defaultValue={post?.color || '#8B3A2A'} className="input h-10 cursor-pointer" />
        </div>
      </div>

      {/* Cover image */}
      <div>
        <label className="label mb-1 block">Cover Image <span className="text-earth-400 font-normal">(used as OG/share image)</span></label>
        {coverUrl && (
          <div className="relative w-full h-40 rounded overflow-hidden border border-beige-200 mb-3 bg-beige-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverUrl} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setCoverUrl('')}
              className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black"
            >
              Remove
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => coverFileRef.current?.click()}
          disabled={coverUploading}
          className="flex items-center gap-2 px-3 py-2 border border-beige-300 rounded text-sm text-earth-700 hover:bg-beige-50 transition"
        >
          <Upload size={14} /> {coverUploading ? 'Uploading…' : coverUrl ? 'Change Cover' : 'Upload Cover'}
        </button>
        <input ref={coverFileRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
      </div>

      {/* Content blocks */}
      <div>
        <label className="label mb-1 block">Content</label>
        <p className="text-xs text-earth-400 mb-3">Add paragraphs, headings, quotes, dividers, and images in any order.</p>

        {/* Shared hidden file input for block images */}
        <input ref={blockImageRef} type="file" accept="image/*" onChange={handleBlockImageUpload} className="hidden" />

        <div className="space-y-2">
          {blocks.map((block, i) => (
            <div key={i} className="border border-beige-200 rounded-lg p-3 bg-white">
              {/* Block header: type selector + delete */}
              <div className="flex items-center gap-2 mb-2">
                <select
                  value={block.type}
                  onChange={e => updateBlockType(i, e.target.value as Block['type'])}
                  className="text-xs border border-beige-200 rounded px-2 py-1 text-earth-600 bg-beige-50"
                >
                  <option value="p">Paragraph</option>
                  <option value="h2">Heading (H2)</option>
                  <option value="blockquote">Blockquote</option>
                  <option value="image">Image</option>
                  <option value="divider">Divider</option>
                </select>
                <span className="text-earth-300 text-xs ml-1">#{i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeBlock(i)}
                  className="ml-auto text-earth-300 hover:text-red-500 transition p-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Block content */}
              {block.type === 'p' && (
                <textarea
                  value={getText(block)}
                  onChange={e => updateBlockText(i, e.target.value)}
                  rows={3}
                  className="input text-sm"
                  placeholder="Write paragraph text…"
                />
              )}
              {block.type === 'h2' && (
                <input
                  value={getText(block)}
                  onChange={e => updateBlockText(i, e.target.value)}
                  className="input text-sm font-serif"
                  placeholder="Section heading…"
                />
              )}
              {block.type === 'blockquote' && (
                <input
                  value={getText(block)}
                  onChange={e => updateBlockText(i, e.target.value)}
                  className="input text-sm italic"
                  placeholder="Quote text…"
                />
              )}
              {block.type === 'divider' && (
                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-beige-300" />
                  <div className="w-1 h-1 rounded-full bg-earth-400" />
                  <div className="h-px flex-1 bg-beige-300" />
                </div>
              )}
              {block.type === 'image' && (
                <div className="space-y-2">
                  {getUrl(block) ? (
                    <div className="relative rounded overflow-hidden border border-beige-200 bg-beige-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getUrl(block)} alt="" className="w-full max-h-64 object-cover object-top" />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          type="button"
                          onClick={() => triggerBlockImage(i)}
                          className="bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => setBlocks(prev => prev.map((b, j) => j === i ? { type: 'image', url: '' } : b))}
                          className="bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => triggerBlockImage(i)}
                      disabled={uploadingBlockIdx === i}
                      className="w-full border-2 border-dashed border-beige-300 rounded-lg py-8 flex flex-col items-center gap-2 text-earth-400 hover:border-earth-500 hover:text-earth-500 transition"
                    >
                      <ImageIcon size={20} />
                      <span className="text-xs">{uploadingBlockIdx === i ? 'Uploading…' : 'Click to upload image'}</span>
                    </button>
                  )}
                  {uploadingBlockIdx === i && !getUrl(block) && (
                    <p className="text-xs text-earth-500 animate-pulse">Uploading…</p>
                  )}
                </div>
              )}

              {/* Add block below this one */}
              <div className="flex gap-1 mt-2 pt-2 border-t border-beige-100">
                <span className="text-[10px] text-earth-400 mr-1 self-center">+ after:</span>
                {(['p', 'h2', 'blockquote', 'image', 'divider'] as Block['type'][]).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addBlock(type, i)}
                    className="px-1.5 py-0.5 text-[10px] border border-beige-200 rounded text-earth-500 hover:bg-beige-50 transition"
                  >
                    {type === 'p' ? 'Para' : type === 'h2' ? 'H2' : type === 'blockquote' ? 'Quote' : type === 'image' ? 'Img' : '—'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add block at end */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="text-xs text-earth-500 self-center">Add block:</span>
          {(['p', 'h2', 'blockquote', 'image', 'divider'] as Block['type'][]).map(type => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type, blocks.length - 1)}
              className="flex items-center gap-1 px-2 py-1 text-xs border border-beige-200 rounded text-earth-600 hover:bg-beige-50 transition"
            >
              <Plus size={10} /> {type === 'p' ? 'Paragraph' : type === 'h2' ? 'Heading' : type === 'blockquote' ? 'Quote' : type === 'image' ? 'Image' : 'Divider'}
            </button>
          ))}
        </div>
      </div>

      {/* SEO Preview */}
      <div className="border border-beige-200 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setSeoOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-beige-50 transition"
        >
          <span className="font-medium text-earth-900">SEO Preview</span>
          {seoOpen ? <ChevronUp size={14} className="text-earth-400" /> : <ChevronDown size={14} className="text-earth-400" />}
        </button>
        {seoOpen && (
          <div className="border-t border-beige-100 px-4 py-4 space-y-4">
            <p className="text-xs text-earth-500">This is how your post will appear in Google search results. The title comes from your post title, and the description from the excerpt.</p>

            {/* Google SERP preview */}
            <div className="border border-beige-200 rounded-lg p-4 bg-white space-y-1">
              <p className="text-[11px] text-earth-400 mb-1">Google preview</p>
              <p className="text-blue-700 text-base leading-snug line-clamp-1 font-sans">
                {post?.title || 'Your post title — Maatir Maanush Journal'}
              </p>
              <p className="text-[11px] text-emerald-700 font-sans">maatirmaanush.com › blog › {post?.slug || 'your-slug'}</p>
              <p className="text-xs text-earth-600 font-sans line-clamp-2 leading-relaxed">
                {post?.excerpt || 'Your excerpt will appear here as the meta description shown in search results. Keep it under 160 characters.'}
              </p>
            </div>

            <div className="space-y-1 text-xs text-earth-600">
              <p><span className="font-medium">OG Image:</span> {coverUrl ? <span className="text-emerald-600">✓ Cover image set</span> : <span className="text-amber-600">⚠ No cover image — set one above</span>}</p>
              <p><span className="font-medium">Twitter card:</span> summary_large_image (automatic)</p>
              <p><span className="font-medium">Canonical URL:</span> /blog/{post?.slug || '[slug]'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Published toggle */}
      <div>
        <label className="flex items-center gap-2 text-sm text-earth-700 cursor-pointer select-none w-fit">
          <div
            onClick={() => setPublished((v: boolean) => !v)}
            className={`w-9 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${published ? 'bg-emerald-600' : 'bg-beige-300'}`}
          >
            <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${published ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
          {published ? 'Published' : 'Draft'}
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-earth-900 text-white px-5 py-2 rounded text-sm hover:bg-earth-700 transition disabled:opacity-50">
          {loading ? 'Saving…' : post ? 'Save Changes' : 'Create Post'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded text-sm border border-beige-300 text-earth-700 hover:bg-beige-50 transition">
          Cancel
        </button>
      </div>
    </form>
  )
}
