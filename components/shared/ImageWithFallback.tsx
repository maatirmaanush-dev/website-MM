'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps {
  src: string | undefined | null
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  sizes?: string
  priority?: boolean
  fallbackLabel?: string
  fallbackBg?: string
  fallbackAccent?: string
}

export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  style,
  sizes,
  priority,
  fallbackLabel,
  fallbackBg = '#DDD5C5',
  fallbackAccent = '#C4956A',
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center overflow-hidden',
          fill ? 'absolute inset-0' : '',
          className
        )}
        style={{
          background: `radial-gradient(circle at 70% 30%, ${fallbackBg}ee 0%, ${fallbackBg} 100%)`,
          ...((!fill && width && height) ? { width, height } : {}),
        }}
      >
        {/* Decorative dot grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill={fallbackAccent} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Decorative corner line */}
        <div
          className="absolute top-5 left-5 w-8 h-8 border-t border-l opacity-30"
          style={{ borderColor: fallbackAccent }}
        />
        <div
          className="absolute bottom-5 right-5 w-8 h-8 border-b border-r opacity-30"
          style={{ borderColor: fallbackAccent }}
        />

        {/* Label */}
        <span
          className="relative font-serif italic text-sm text-center px-6 leading-relaxed"
          style={{ color: fallbackAccent, opacity: 0.7 }}
        >
          {fallbackLabel ?? alt}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src!}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      style={style}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
    />
  )
}
