'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { WhatsAppEnquire } from '@/components/shared/WhatsAppEnquire'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { getProductUrl } from '@/lib/product-urls'

interface ProductCardProps {
  product: any
  cta?: 'enquire' | 'know-more'
  priority?: boolean
}

const CATEGORY_COLORS: Record<string, { bg: string; accent: string }> = {
  'Kantha Coats':         { bg: '#8B3A2A', accent: '#F5C5A3' },
  'Kaftans':              { bg: '#B07D2E', accent: '#F5E6B0' },
  'Kantha Stitch Sarees': { bg: '#3D5A3E', accent: '#B8D4B2' },
  'Kurtas':               { bg: '#3D4F7C', accent: '#B8C6E8' },
  'Kantha Jackets':       { bg: '#2C3E5E', accent: '#A0B4CC' },
  'Tops':                 { bg: '#5A3B6E', accent: '#D4B8E8' },
  'Skirts':               { bg: '#8B3A2A', accent: '#F5C5A3' },
}

const FALLBACK_COLORS = { bg: '#8B6B47', accent: '#F5E6B0' }

export function ProductCard({ product, cta = 'enquire', priority = false }: ProductCardProps) {
  const colors = CATEGORY_COLORS[product.category] ?? FALLBACK_COLORS
  // Support both camelCase (static data) and snake_case (Supabase)
  const priceDisplay = product.priceDisplay ?? product.price_display
  const soldOut = product.stock_status === 'sold_out'
  const [idx, setIdx] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const total = product.images.length

  function prev(e: React.MouseEvent) {
    e.preventDefault()
    setIdx((i) => (i - 1 + total) % total)
  }

  function next(e: React.MouseEvent) {
    e.preventDefault()
    setIdx((i) => (i + 1) % total)
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      setIdx((i) => diff > 0 ? (i + 1) % total : (i - 1 + total) % total)
    }
    touchStartX.current = null
  }

  return (
    <div className="group flex flex-col card-lift">
      {/* Image */}
      <Link href={getProductUrl(product)} className="block">
        <div
          className="relative w-full lg:w-[23vw] aspect-[3/4] overflow-hidden rounded-sm mb-4"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <ImageWithFallback
            src={product.images[idx]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 ease-premium ${soldOut ? 'grayscale-[40%] opacity-80' : ''}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority && idx === 0}
            fallbackLabel={product.name}
            fallbackBg={colors.bg}
            fallbackAccent={colors.accent}
          />

          {/* Sold out ribbon */}
          {soldOut && (
            <div className="absolute top-3 left-0 z-10 bg-earth-900 text-beige-50 text-[10px] font-sans tracking-[0.15em] uppercase px-3 py-1 shadow-sm">
              Sold Out
            </div>
          )}

          {/* Arrow buttons — visible on hover (desktop) / always visible on touch */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-beige-50/80 backdrop-blur-sm text-earth-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-beige-50/80 backdrop-blur-sm text-earth-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.images.map((_: unknown, i: number) => (
                  <span
                    key={i}
                    className={`block rounded-full transition-all duration-300 ${
                      i === idx ? 'w-3 h-1.5 bg-beige-50' : 'w-1.5 h-1.5 bg-beige-50/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-2 flex-1">
        {/* <p className="text-xs tracking-[0.15em] uppercase text-earth-500 font-sans">
          {product.category}
        </p> */}
        <Link href={getProductUrl(product)}>
          <h3 className="font-sans text-sm text-earth-900 leading-snug hover:text-earth-700 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-sans font-semibold text-earth-900 tracking-wide">
          {priceDisplay} <span className="text-[10px] font-normal text-earth-500">excl. GST</span>
        </p>
        {soldOut && (
          <p className="text-xs text-red-600 font-sans">Sold out — one-of-a-kind, won&apos;t be made again</p>
        )}
        <div className="mt-auto pt-3">
          {soldOut ? (
            <Link
              href={getProductUrl(product)}
              className="inline-flex items-center justify-center font-sans tracking-[0.12em] uppercase text-xs px-4 py-2 border border-beige-300 text-earth-500 hover:border-earth-700 hover:text-earth-700 transition-all duration-300"
            >
              View Piece
            </Link>
          ) : cta === 'know-more' ? (
            <Link
              href={getProductUrl(product)}
              className="inline-flex items-center justify-center font-sans tracking-[0.12em] uppercase text-xs px-4 py-2 border border-earth-900 text-earth-900 hover:bg-earth-900 hover:text-beige-50 transition-all duration-300"
            >
              Know More
            </Link>
          ) : (
            <WhatsAppEnquire product={product} variant="outline" />
          )}
        </div>
      </div>
    </div>
  )
}
