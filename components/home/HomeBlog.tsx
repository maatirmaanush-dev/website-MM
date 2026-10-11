import Link from 'next/link'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { getBlogPosts } from '@/lib/actions/blog'

export async function HomeBlog() {
  let posts: any[] = []
  try {
    const all = await getBlogPosts(true)
    posts = all.slice(0, 3)
  } catch {}

  if (posts.length === 0) return null

  return (
    <section className="py-12 sm:py-24 px-6 lg:px-10 bg-earth-900">
      <div className="max-w-7xl mx-auto">
        <AnimatedReveal className="mb-8 sm:mb-14">
          <SectionHeading
            eyebrow="Blog"
            title="Stories of Craft & Culture"
            subtitle="Essays, artisan profiles, and field notes from Bengal."
            className="[&_h2]:text-beige-50 [&_p]:text-beige-200/60 [&_.text-earth-500]:text-earth-500"
          />
        </AnimatedReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post: any, i: number) => {
            const color = post.color || '#8B3A2A'
            return (
              <AnimatedReveal key={post.slug} delay={i * 80}>
                <article className="group flex flex-col gap-4 h-full">
                  <div
                    className="h-0.5 w-12 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs tracking-[0.15em] uppercase font-sans" style={{ color }}>
                    {post.category}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-serif text-xl text-beige-50 leading-snug group-hover:text-beige-200 transition-colors duration-200">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="font-sans text-sm text-beige-200/50 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-sans text-xs text-beige-200/30">
                      {post.created_at
                        ? new Date(post.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
                        : ''}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-sans tracking-[0.1em] uppercase transition-colors duration-200"
                      style={{ color }}
                    >
                      Read →
                    </Link>
                  </div>
                </article>
              </AnimatedReveal>
            )
          })}
        </div>

        <AnimatedReveal delay={280}>
          <div className="border-t border-beige-50/10 pt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.15em] uppercase text-beige-200/60 hover:text-beige-50 transition-colors duration-200"
            >
              View all stories
              <span className="w-8 h-px bg-current inline-block" />
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
