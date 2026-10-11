'use client'

import { useState } from 'react'
import { deleteProduct } from '@/lib/actions/products'
import { deleteBlogPost } from '@/lib/actions/blog'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  table: 'products' | 'blog_posts'
}

export default function DeleteProductButton({ id, table }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleDelete() {
    setLoading(true)
    setError('')
    const result = table === 'products'
      ? await deleteProduct(id)
      : await deleteBlogPost(id)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
      setConfirming(false)
    } else {
      router.refresh()
    }
  }

  if (error) {
    return <span className="text-xs text-red-500">{error}</span>
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2">
        <button onClick={handleDelete} disabled={loading} className="text-red-600 text-xs font-medium hover:text-red-800">
          {loading ? '…' : 'Confirm'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-earth-500 text-xs">Cancel</button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1 text-earth-400 hover:text-red-600 transition"
    >
      <Trash2 size={13} /> Delete
    </button>
  )
}
