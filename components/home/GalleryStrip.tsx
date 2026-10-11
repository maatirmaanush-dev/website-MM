import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

const BASE = 'https://lyzgaopdbughrobqkosv.supabase.co/storage/v1/object/public/product-images'

const galleryImages = [
  { src: `${BASE}/wild-reverie-kantha-embroidered-saree/2.png`,    caption: 'Wild Reverie Saree',      bg: '#8B3A2A', accent: '#F5C5A3' },
  { src: `${BASE}/kantha-embroidered-jacket-jalchhobi/1.png`,       caption: 'Jalchhobi Jacket',        bg: '#2C3E5E', accent: '#A0B4CC' },
  { src: `${BASE}/silk-kaftan-rangrez/1.png`,                        caption: 'Rangrez Silk Kaftan',     bg: '#B07D2E', accent: '#F5E6B0' },
  { src: `${BASE}/long-kurta-abhigyan-shakuntalam/1.png`,            caption: 'Abhigyan Shakuntalam',    bg: '#3D4F7C', accent: '#B8C6E8' },
  { src: `${BASE}/red-floral-kantha-embroidered-dress/1.png`,        caption: 'Red Floral Kantha Dress', bg: '#7A2A2A', accent: '#F5B8B8' },
  { src: `${BASE}/kaftan-gulbaazi-pataka/1.png`,                     caption: 'Gulbaazi Pataka Kaftan',  bg: '#3D5A3E', accent: '#B8D4B2' },
]

export function GalleryStrip() {
  return (
    <section className="py-10 sm:py-16 bg-beige-100">
      <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans text-center mb-10">
        The Work
      </p>
      <div
        className="flex gap-4 overflow-x-auto no-scrollbar px-6 lg:px-10"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 h-72 w-56 overflow-hidden rounded-sm group"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ImageWithFallback
              src={img.src}
              alt={img.caption}
              fill
              className="object-cover object-top"
              sizes="224px"
              fallbackLabel={img.caption}
              fallbackBg={img.bg}
              fallbackAccent={img.accent}
            />
            {/* Caption overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="font-serif italic text-white text-sm">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
