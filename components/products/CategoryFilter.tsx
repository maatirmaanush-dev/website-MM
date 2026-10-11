'use client'

import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/data/products'
import type { Category } from '@/types'

interface CategoryFilterProps {
  selected: Category | 'All'
  onChange: (cat: Category | 'All') => void
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const options: (Category | 'All')[] = ['All', ...CATEGORIES]

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
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
  )
}
