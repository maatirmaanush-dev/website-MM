import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  centered?: boolean
  subtitle?: string
  className?: string
  /**
   * Heading level. Defaults to h2, which is right for the section headings this is
   * mostly used for — but when it carries a page's MAIN heading (as on /blog) it
   * has to be an h1, or the page ships with no h1 at all.
   */
  as?: 'h1' | 'h2'
}

export function SectionHeading({
  eyebrow,
  title,
  centered = false,
  subtitle,
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <p className="text-xs align-center tracking-[0.2em] uppercase text-earth-500 font-sans mb-2">
          {eyebrow}
        </p>
      )}
      <Heading className="font-serif text-[48px] md:text-[32px] text-[#511306] leading-tight">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 text-base text-earth-700 font-sans leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
