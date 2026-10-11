import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
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
  subtitle,
  centered = false,
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">
          {eyebrow}
        </p>
      )}
      <Heading className="font-serif text-[34px] md:text-[35px] text-earth-900 leading-tight">
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
