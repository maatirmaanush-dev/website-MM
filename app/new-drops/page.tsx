import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'
import { PageFAQ } from '@/components/shared/PageFAQ'
import { getSeoByPath } from '@/lib/actions/seo'
import { getPublishedCategories, getCategoryImages } from '@/lib/actions/products'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/new-drops')
  const title = seo?.title || 'New Drops — Maatir Maanush'
  const description = seo?.description || 'Explore new Kantha embroidery drops — sarees, jackets, coats, kaftans, kurtas, tops, and skirts handcrafted in Bengal.'
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/new-drops'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

const ALL_CATEGORIES = [
  { label: 'Sarees',           
    href: '/kantha-stitch-sarees',       
    dbCategory: 'Kantha Stitch Sarees', 
    description: 'Handwoven Kantha stitch sarees in Gacchi Tussar and Katan silk',                    
    image: '/images/reshuffle/saree-hero.png', 
    pinnedImage: '/images/reshuffle/saree-hero.png' },

  { label: 'Jackets',          
    href: '/kantha-embroidered-jackets',  
    dbCategory: 'Kantha Jackets',        
    description: 'Statement Kantha jackets — patchwork, embroidered, one-of-a-kind',                   
    image: '/images/reshuffle/jackets-hero.png',
    pinnedImage: '/images/reshuffle/jackets-hero.png' },

  { label: 'Kaftans',          
    href: '/kaftans-for-women',           
    dbCategory: 'Kaftans',               
    description: 'Loose, draped Kantha kaftans in handwoven silk',                                     
    image: '/images/reshuffle/kaftans-hero.jpeg', 
    pinnedImage: '/images/reshuffle/kaftans-hero.jpeg'},

  { label: 'Kurtas',           
    href: '/kantha-embroidered-kurtas',   
    dbCategory: 'Kurtas',                
    description: 'Everyday Kantha kurtas — refined, handcrafted, effortlessly wearable',               
    image: '/images/reshuffle/kurta-hero.jpeg',
    pinnedImage: '/images/reshuffle/kurta-hero.jpeg'  },

  { label: 'Dresses',          
    href: '/contemporary-womens-wear',    
    dbCategory: 'Dresses',               
    description: 'Contemporary Kantha dresses — modern silhouettes rooted in heritage craft',           
    image: '/images/reshuffle/dresses-hero.jpeg', 
    pinnedImage: '/images/reshuffle/dresses-hero.jpeg' },

  { label: 'Limited Editions', 
    href: '/limited-editions-clothing',   
    dbCategory: 'Limited Editions',      
    description: 'Rare, collectible pieces — heirloom-worthy artistry in very limited quantities',      
    image: '/images/reshuffle/lim-edi-hero.jpeg', 
    pinnedImage: '/images/reshuffle/lim-edi-hero.jpeg'  },
  { label: 'Skirts', 
    href: '/skirts',   
    dbCategory: 'Skirts',      
    description: 'Flowing Kantha skirts — floor-length and knee-length silhouettes',      
    image: '/images/reshuffle/skirt-hero.jpeg', 
    pinnedImage: '/images/reshuffle/skirt-hero.jpeg'  },
]

export default async function NewDropsPage() {
  const [seo, published, categoryImages] = await Promise.all([
    getSeoByPath('/new-drops'),
    getPublishedCategories(),
    getCategoryImages(),
  ])
  const h1 = seo?.h1 || 'New Drops'

  const categories = ALL_CATEGORIES.filter(c => published.includes(c.dbCategory))

  return (
    <main className="min-h-screen bg-beige-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-earth-900 flex items-center justify-center px-6 lg:px-10 pt-16 lg:pt-20" style={{ minHeight: '45dvh' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/categories/new-drops-hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[35%_0%] sm:object-[50%_0%]"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative w-full text-center">
          <h1 className="font-serif text-earth-900 leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            {h1}
          </h1>
        </div>
      </div>

      {/* Category Grid */}
      <section className="py-12 sm:py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <AnimatedReveal key={cat.href} delay={i * 60}>
                <Link href={cat.href} className="group block bg-beige-100 hover:bg-white transition-colors duration-300 border border-beige-200">
                  <div className="flex flex-col items-center pt-10 px-6 pb-8">
                    {/* Illustration */}
                    <div className="relative w-full overflow-hidden rounded-sm mb-6" style={{ aspectRatio: '3/4' }}>
                      <Image
                        src={cat.pinnedImage || categoryImages[cat.dbCategory] || cat.image}
                        alt={cat.label}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    {/* Text */}
                    <h2 className="font-serif text-2xl text-earth-900 mb-2 text-center">{cat.label}</h2>
                    <p className="font-sans text-xs text-earth-500 leading-relaxed text-center mb-5">{cat.description}</p>
                    <p className="text-[10px] font-sans tracking-[0.15em] uppercase flex items-center gap-1 transition-colors duration-300 text-earth-400 group-hover:text-earth-900">
                      Shop Now <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                    </p>
                  </div>
                </Link>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>
      <PageFAQ type="collections" />
    </main>
  )
}
