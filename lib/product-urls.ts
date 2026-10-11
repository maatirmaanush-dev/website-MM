export const CATEGORY_URL_MAP: Record<string, string> = {
  'Kantha Stitch Sarees': 'kantha-stitch-sarees',
  'Kantha Jackets': 'kantha-embroidered-jackets',
  'Kaftans': 'kaftans-for-women',
  'Kurtas': 'kantha-embroidered-kurtas',
  'Dresses': 'contemporary-womens-wear',
  'Limited Editions': 'limited-editions-clothing',
  'Kantha Coats': 'kantha-coats',
  'Tops': 'tops',
  'Skirts': 'skirts',
}

export function getProductUrl(product: { category: string; slug: string }): string {
  const cat = CATEGORY_URL_MAP[product.category]
  return cat ? `/${cat}/${product.slug}` : `/products/${product.slug}`
}
