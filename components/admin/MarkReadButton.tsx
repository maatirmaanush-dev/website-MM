'use client'

import { useState, useTransition } from 'react'
import { markEnquiryRead } from '@/lib/actions/enquiries'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

export default function MarkReadButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  function handleClick() {
    setError('')
    startTransition(async () => {
      const result = await markEnquiryRead(id)
      if (result?.error) {
        setError(result.error)
      } else {
        router.refresh()
      }
    })
  }

  if (error) return <span className="text-xs text-red-500">{error}</span>

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-1 text-xs text-earth-500 hover:text-earth-900 transition disabled:opacity-50"
    >
      <Check size={12} /> {isPending ? 'Marking…' : 'Mark read'}
    </button>
  )
}
