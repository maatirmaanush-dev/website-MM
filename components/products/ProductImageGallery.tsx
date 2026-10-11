'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

interface ProductImageGalleryProps {
  images: string[]
  name: string
}

export function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0)
  const src = images[selected]

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[3/4] bg-beige-100 overflow-hidden rounded-sm select-none">
        <ImageWithFallback
          src={src}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          fallbackLabel={name}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images.map((imgSrc, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                'relative w-20 aspect-square bg-beige-100 overflow-hidden rounded-sm transition-all duration-200',
                selected === i
                  ? 'ring-2 ring-earth-900 ring-offset-1'
                  : 'opacity-50 hover:opacity-100'
              )}
            >
              <ImageWithFallback
                src={imgSrc}
                alt={`${name} ${i + 1}`}
                fill
                className="object-contain"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
