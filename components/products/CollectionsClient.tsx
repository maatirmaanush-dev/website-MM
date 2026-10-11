'use client'

import { useState } from 'react'
import { ProductGrid } from '@/components/products/ProductGrid'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  'Kantha Stitch Sarees',
  'Kantha Jackets',
  'Kantha Coats',
  'Kaftans',
  'Kurtas',
  'Tops',
  'Skirts',
]

export default function CollectionsClient({ products, h1, h2 }: { products: any[], h1?: string, h2?: string }) {
  const [selected, setSelected] = useState<string>('All')

  const filtered = selected === 'All' ? products : products.filter((p) => p.category === selected)

  return (
    <>
      <div className="mb-14">
        <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">All Pieces</p>
        <h1 className="font-serif text-5xl md:text-6xl text-earth-900 mb-8">{h1 || 'Our Collections'}</h1>
        {h2 && <h2 className="font-serif italic text-earth-600 text-lg mb-4">{h2}</h2>}
        <div className="flex flex-wrap gap-2">
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={cn(
                'px-4 py-1.5 text-sm font-sans rounded-full border transition-all duration-200',
                selected === cat
                  ? 'bg-earth-900 text-beige-50 border-earth-900'
                  : 'bg-transparent text-earth-900 border-beige-300 hover:border-earth-700 hover:text-earth-700'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm font-sans text-earth-700">
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
        </p>
      </div>

      <div className="border-t border-beige-200 mb-14" />
      <ProductGrid products={filtered} />
    </>
  )
}
