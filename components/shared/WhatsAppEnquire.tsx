'use client'

import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

interface WhatsAppEnquireProps {
  product: { name: string; [key: string]: any }
  variant?: 'primary' | 'outline'
  size?: 'default' | 'lg'
  className?: string
}

export function WhatsAppEnquire({
  product,
  variant = 'primary',
  size = 'default',
  className,
}: WhatsAppEnquireProps) {
  return (
    <a
      href={buildWhatsAppUrl(product)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'inline-flex items-center justify-center gap-3 font-sans tracking-[0.12em] uppercase transition-all duration-300 ease-premium',
        size === 'default' && 'px-4 py-2 text-xs',
        size === 'lg' && 'px-8 py-4 text-xs w-full',
        variant === 'primary' &&
          'bg-earth-900 text-beige-50 hover:bg-earth-700',
        variant === 'outline' &&
          'border border-earth-900 text-earth-900 hover:bg-earth-900 hover:text-beige-50',
        className
      )}
    >
      {size === 'lg' ? 'Enquire About This Piece' : 'Enquire'}
    </a>
  )
}
