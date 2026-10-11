'use client'

import { useEffect, useState } from 'react'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href={buildGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 bg-[#25D366] text-white rounded-full px-3 py-2 shadow-md hover:scale-105 transition-transform duration-300 ease-premium font-sans text-xs font-medium"
    >
      <MessageCircle size={15} />
      <span className="hidden sm:inline">Enquire</span>
    </a>
  )
}
