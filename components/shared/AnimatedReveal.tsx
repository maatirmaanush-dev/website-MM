'use client'

import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

interface AnimatedRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedReveal({ children, className, delay = 0 }: AnimatedRevealProps) {
  const { ref, isVisible } = useReveal()

  return (
    <div
      ref={ref}
      className={cn(isVisible ? 'reveal-visible' : 'reveal-hidden', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
