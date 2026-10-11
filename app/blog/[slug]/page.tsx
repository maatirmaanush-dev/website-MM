import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/actions/blog'

export const revalidate = 60

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maatirmaanush.com'

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts(true)
    return posts.map((p: any) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return {}

  const firstPara = Array.isArray(post.body)
    ? post.body.find((b: any) => b.type === 'p')?.text?.slice(0, 160)
    : undefined
  const description = post.excerpt || firstPara || ''
  const title = `${post.title} — Maatir Maanush Journal`
  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      ...(post.image && {
        images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(post.image && { images: [post.image] }),
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  if (!post || !post.published) notFound()

  const body: { type: string; text?: string; url?: string }[] = Array.isArray(post.body) ? post.body : []
  const color = post.color || '#8B3A2A'

  return (
    <main className="min-h-screen bg-beige-50">
      {/* Hero band */}
      <div className="relative pt-28 pb-16 px-6 lg:px-10 overflow-hidden" style={{ backgroundColor: color + '12' }}>
        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color }} />
        <div className="max-w-3xl mx-auto">
          <AnimatedReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-earth-500 hover:text-earth-900 transition-colors duration-200 mb-8"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Journal
            </Link>
            <p className="text-xs tracking-[0.2em] uppercase font-sans mb-4" style={{ color }}>
              {post.category}
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl text-earth-900 leading-tight mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-xs font-sans text-earth-500">
              {post.created_at && (
                <span>
                  {new Date(post.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </span>
              )}
              {post.read_time && <><span>·</span><span>{post.read_time}</span></>}
            </div>
          </AnimatedReveal>
        </div>
      </div>

      {/* Cover image — object-contain shows the entire image, never cropped or
          stretched, while still going through next/image so Vercel caches it
          instead of every visitor re-fetching the original from Supabase */}
      {post.image && (
        <AnimatedReveal>
          <div className="w-full max-w-3xl mx-auto px-6 lg:px-10 -mt-4 mb-14">
            <div className="relative w-full overflow-hidden rounded-sm bg-beige-100" style={{ aspectRatio: '16/9' }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </div>
        </AnimatedReveal>
      )}

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 lg:px-10 pb-24">
        <div className="space-y-7">
          {body.map((block, i) => {
            if (block.type === 'divider') {
              return (
                <AnimatedReveal key={i} delay={i * 30}>
                  <div className="flex items-center gap-4 py-4">
                    <div className="h-px flex-1 bg-beige-200" />
                    <div className="w-1.5 h-1.5 rounded-full bg-earth-500" />
                    <div className="h-px flex-1 bg-beige-200" />
                  </div>
                </AnimatedReveal>
              )
            }
            if (block.type === 'h2') {
              return (
                <AnimatedReveal key={i} delay={i * 30}>
                  <h2 className="font-serif text-2xl text-earth-900 pt-4" style={{ letterSpacing: '-0.01em' }}>
                    {block.text}
                  </h2>
                </AnimatedReveal>
              )
            }
            if (block.type === 'blockquote') {
              return (
                <AnimatedReveal key={i} delay={i * 30}>
                  <blockquote className="border-l-2 pl-6 py-2 my-2" style={{ borderColor: color }}>
                    <p className="font-serif italic text-lg text-earth-700 leading-relaxed">
                      {block.text}
                    </p>
                  </blockquote>
                </AnimatedReveal>
              )
            }
            if (block.type === 'image' && block.url) {
              return (
                <AnimatedReveal key={i} delay={i * 30}>
                  <div className="relative w-full overflow-hidden rounded-sm my-2 bg-beige-100" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={block.url}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 720px"
                    />
                  </div>
                </AnimatedReveal>
              )
            }
            if (block.type === 'p' && block.text) {
              return (
                <AnimatedReveal key={i} delay={i * 30}>
                  <p className="font-sans text-base text-earth-700 leading-[1.85]">
                    {block.text}
                  </p>
                </AnimatedReveal>
              )
            }
            return null
          })}
        </div>

        {/* Footer nav */}
        <AnimatedReveal>
          <div className="mt-16 pt-10 border-t border-beige-200 flex items-center justify-between">
            <Link
              href="/blog"
              className="text-xs font-sans tracking-[0.15em] uppercase text-earth-700 hover:text-earth-900 transition-colors duration-200"
            >
              ← All Stories
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans tracking-[0.15em] uppercase text-earth-700 hover:text-earth-900 transition-colors duration-200"
            >
              Enquire About Our Work →
            </a>
          </div>
        </AnimatedReveal>
      </div>
    </main>
  )
}
