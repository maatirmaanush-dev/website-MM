export type Category =
  | 'Kantha Coats'
  | 'Kantha Kaftans'
  | 'Kantha Dresses'
  | 'Kantha Kurtas'
  | 'Kantha Jackets'

export interface Product {
  id: string
  name: string
  slug: string
  category: Category
  priceDisplay: string
  priceNumeric?: number
  shortDescription: string
  description: string
  images: string[]
  dimensions?: string
  weight?: string
  fabric?: string
  careInstructions: string[]
  featured: boolean
  tags: string[]
  createdAt: string
}
