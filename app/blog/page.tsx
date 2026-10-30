import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { PageFAQ } from '@/components/shared/PageFAQ'
import { getBlogPosts } from '@/lib/actions/blog'
import { getSeoByPath } from '@/lib/actions/seo'

export const revalidate = 60

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maatirmaanush.com'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/blog')
  const title = seo?.title || 'Blog | Kantha Fashion, Style & Craftsmanship'
  const description =
    seo?.description ||
    'Everything about Kantha stitch, Kantha embroidery, contemporary fashion, textile heritage, and artisanal craftsmanship for timeless style inspiration.'
  const url = `${SITE_URL}/blog`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      // This page always defines its own openGraph block, so it does NOT inherit
      // the layout's default image — without a fallback here it was the only page
      // on the site shipping no og:image at all.
      images: [
        seo?.og_image
          ? { url: seo.og_image, width: 1200, height: 630, alt: title }
          : { url: '/images/hero/landing-main.png', width: 1672, height: 941, alt: title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [seo?.og_image || '/images/hero/landing-main.png'],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogPage() {
  const [posts, seo] = await Promise.all([getBlogPosts(true), getSeoByPath('/blog')])
  const h1 = seo?.h1 || 'The Journal of Kantha Fashion & Style'
  const h2 = seo?.h2 || 'Contemporary Fashion Inspired by Kantha'

  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <AnimatedReveal className="mb-14">
          <SectionHeading
            as="h1"
            eyebrow="Journal"
            title={h1}
          />
        </AnimatedReveal>

        <div className="border-t border-beige-200 mb-14" />

        {posts.length === 0 ? (
          <AnimatedReveal>
            <div className="text-center py-20">
              <p className="font-serif italic text-earth-700 text-lg">
                More stories are being written. Check back soon.
              </p>
            </div>
          </AnimatedReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {posts.map((post: any, i: number) => (
              <AnimatedReveal key={post.slug} delay={i * 80}>
                <article className="group flex flex-col gap-4">
                  {/* Cover image if available */}
                  {post.image && (
                    <Link href={`/blog/${post.slug}`} className="relative block overflow-hidden rounded-sm aspect-[3/2] bg-beige-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </Link>
                  )}

                  <div
                    className="h-1 w-full rounded-full transition-all duration-300 group-hover:w-3/4"
                    style={{ backgroundColor: post.color || '#8B3A2A' }}
                  />
                  <p className="text-xs tracking-[0.15em] uppercase font-sans" style={{ color: post.color || '#8B3A2A' }}>
                    {post.category}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif text-xl text-earth-900 leading-snug group-hover:text-earth-700 transition-colors duration-200">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="font-sans text-sm text-earth-700 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-2 text-xs font-sans text-earth-500">
                    {post.created_at && (
                      <span>
                        {new Date(post.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                      </span>
                    )}
                    {post.read_time && <><span>&middot;</span><span>{post.read_time}</span></>}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-sans text-earth-900 underline underline-offset-4 hover:text-earth-500 transition-colors duration-200"
                  >
                    Read â†’
                  </Link>
                </article>
              </AnimatedReveal>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <AnimatedReveal>
            <div className="mt-20 pt-10 border-t border-beige-200 text-center">
              <p className="font-serif italic text-earth-700 text-lg">
                More stories are being written. Check back soon.
              </p>
            </div>
          </AnimatedReveal>
        )}
      </div>
      <PageFAQ type="blog" />
    </main>
  )
}
