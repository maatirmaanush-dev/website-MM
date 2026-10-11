'use client'

import { useState, useTransition } from 'react'
import { toggleProductPublished } from '@/lib/actions/products'
import { toggleBlogPublished } from '@/lib/actions/blog'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  published: boolean
  table: 'products' | 'blog_posts'
}

export default function TogglePublishedButton({ id, published, table }: Props) {
  const [isPublished, setIsPublished] = useState(published)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  function toggle() {
    setError('')
    startTransition(async () => {
      const next = !isPublished
      const result = table === 'products'
        ? await toggleProductPublished(id, next)
        : await toggleBlogPublished(id, next)
      if (result?.error) {
        setError(result.error)
      } else {
        setIsPublished(next)
        router.refresh()
      }
    })
  }

  return (
    <span className="flex flex-col gap-1">
      <button
        onClick={toggle}
        disabled={isPending}
        className={`px-2 py-0.5 rounded text-xs font-medium transition ${
          isPublished
            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            : 'bg-beige-100 text-earth-500 hover:bg-beige-200'
        } disabled:opacity-50`}
      >
        {isPending ? '…' : isPublished ? 'Published' : 'Draft'}
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </span>
  )
}
