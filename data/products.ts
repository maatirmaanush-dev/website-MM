import type { Product, Category } from '@/types'

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'The Bestiary Coat',
    slug: 'bestiary-kantha-coat',
    category: 'Kantha Coats',
    priceDisplay: '₹32,000',
    priceNumeric: 32000,
    shortDescription:
      'A patchwork long coat hand-embroidered with lions, peacocks, and wild flora — a wearable archive of Bengal\'s natural world.',
    description: `Every panel of the Bestiary Coat tells a different story. Pieced together from multiple handwoven cottons, each section carries a distinct motif tradition — the Kalamkari lion, the Kantha peacock, the Nakshi floral vine — stitched together into a single, cohesive garment that feels like a conversation between craft histories.

The coat falls below the knee with a relaxed, open silhouette. It is worn as a layer over anything — a white dress, a kurta, a pair of trousers. Its weight and structure mean it holds its shape beautifully without stiffening.

Made to order in S, M, and L. Lead time: 8–10 weeks.`,
    images: [
      '/images/products/coat-1.png',
      '/images/products/coat-2.png',
      '/images/products/coat-3.png',
      '/images/products/coat-4.png',
      '/images/products/coat-5.png',
      '/images/products/coat-6.png',
    ],
    dimensions: 'Length: 102 cm · Bust: S(88), M(94), L(100) cm',
    fabric: 'Handwoven cotton patchwork, Kantha and Kalamkari embroidery, cotton thread',
    careInstructions: [
      'Dry clean recommended for first wash',
      'Subsequent washes: hand wash cold, gentle press',
      'Store on a wide hanger to preserve shoulder shape',
      'Iron at medium heat on reverse',
    ],
    featured: true,
    tags: ['coat', 'patchwork', 'bestiary', 'lion', 'peacock', 'made-to-order', 'layering'],
    createdAt: '2026-03-01',
  },
  {
    id: 'prod-002',
    name: 'Padma — The Lotus Kaftan',
    slug: 'padma-lotus-kaftan',
    category: 'Kantha Kaftans',
    priceDisplay: '₹24,000',
    priceNumeric: 24000,
    shortDescription:
      'A hand-painted silk kaftan depicting a woman rising from lotus water — devotional in spirit, contemporary in wear.',
    description: `Padma — the lotus — is one of the oldest motifs in the visual language of Bengal. It is the flower of the goddess, the symbol of purity rising from mud, the mark of feminine power across centuries of painting, weaving, and embroidery.

This kaftan carries a hand-painted scene: a woman in the lotus pond, part of the water, part of the sky. The painting is executed on raw silk in the tradition of Pattachitra — natural pigments, fine lines, no shortcuts. Tassel details at the sleeve ends and hem echo the ceremonial textiles of eastern India.

One size fits most. Each piece is unique and unrepeatable.`,
    images: [
      '/images/products/lotus-1.png',
      '/images/products/lotus-2.png',
      '/images/products/lotus-3.png',
      '/images/products/lotus-4.png',
      '/images/products/lotus-5.png',
      '/images/products/lotus-6.png',
    ],
    dimensions: 'Length: 120 cm · Width: 140 cm (one size)',
    fabric: 'Raw silk, hand-painted natural pigments, cotton tassel trim',
    careInstructions: [
      'Dry clean only — no water wash',
      'Store flat or rolled, never folded sharply at the painted section',
      'Keep away from direct sunlight to preserve pigment',
      'Do not iron directly over painted areas',
    ],
    featured: true,
    tags: ['kaftan', 'lotus', 'hand-painted', 'silk', 'pattachitra', 'one-size'],
    createdAt: '2026-03-05',
  },
  {
    id: 'prod-003',
    name: 'Indranil — The Kantha Robe',
    slug: 'indranil-teal-kantha-robe',
    category: 'Kantha Dresses',
    priceDisplay: '₹28,000',
    priceNumeric: 28000,
    shortDescription:
      'A teal and saffron Kantha robe-dress with fish, peacock, and wave motifs — worn belted or loose, day or evening.',
    description: `Indranil — the colour of Krishna, of monsoon clouds, of the peacock's neck — is a blue that carries weight in Bengal's artistic imagination. This robe-dress is cut from that blue: a deep teal silk, bordered in saffron cotton, with a hand-stitched Kantha back panel depicting the Matsya (fish) riding the ocean wave, and the peacock in full display.

The front splits open with a belted closure, transforming between a layered robe and a structured dress. The saffron belt is included. The silhouette moves — it is designed to be worn in motion.

Made to order: S, M, L. Lead time: 10–12 weeks.`,
    images: [
      '/images/products/teal-1.jpg',
      '/images/products/teal-2.jpg',
      '/images/products/teal-3.jpg',
      '/images/products/teal-4.jpg',
      '/images/products/teal-5.jpg',
      '/images/products/teal-6.jpg',
      '/images/products/teal-7.jpg',
      '/images/products/teal-8.jpg',
    ],
    dimensions: 'Length: 110 cm · Bust: S(86), M(92), L(98) cm',
    fabric: 'Handwoven teal silk, saffron cotton trim, Kantha hand embroidery',
    careInstructions: [
      'Dry clean recommended',
      'If hand washing: cold water, mild soap, do not wring',
      'Lay flat to dry in shade',
      'Iron at low heat; do not iron embroidered sections directly',
    ],
    featured: true,
    tags: ['robe', 'dress', 'teal', 'saffron', 'kantha', 'fish-motif', 'peacock', 'made-to-order'],
    createdAt: '2026-03-08',
  },
  {
    id: 'prod-004',
    name: 'Phoolwari — The Flower Garden Kurta',
    slug: 'phoolwari-floral-kurta',
    category: 'Kantha Kurtas',
    priceDisplay: '₹18,000',
    priceNumeric: 18000,
    shortDescription:
      'A khadi kurta scattered with hand-embroidered wildflowers and owl motifs — the garden at dusk, translated into thread.',
    description: `Phoolwari — the flower garden — begins at the collar and spills downward: white stars, orange marigolds, red hibiscus, blue cornflowers — all hand-embroidered in Kantha stitch across an undyed khadi ground. At the hem, two owls sit in a row on a branch, watching. Below them, a border of folk embroidery closes the composition.

The sleeves are cut from a contrasting brick-red block-printed cotton — a quiet acknowledgement that Kantha has always lived alongside other craft traditions. Together, they do not clash. They converse.

Available in S, M, L, XL. Can be ordered in custom sizing.`,
    images: [
      '/images/products/kurta-1.jpg',
      '/images/products/kurta-2.jpg',
      '/images/products/kurta-3.png',
      '/images/products/kurta-4.png',
    ],
    dimensions: 'Length: 118 cm · Chest: S(88), M(94), L(100), XL(106) cm',
    fabric: 'Undyed khadi cotton body, block-printed cotton sleeves, Kantha hand embroidery',
    careInstructions: [
      'Hand wash cold or machine wash gentle cycle',
      'Use mild detergent, avoid bleach',
      'Dry flat in shade — khadi may shrink in a dryer',
      'Iron at medium heat while slightly damp for best results',
    ],
    featured: true,
    tags: ['kurta', 'khadi', 'floral', 'owls', 'wildflower', 'everyday', 'kantha'],
    createdAt: '2026-03-10',
  },
  {
    id: 'prod-005',
    name: 'Vana — The Forest Dress',
    slug: 'vana-forest-dress',
    category: 'Kantha Dresses',
    priceDisplay: '₹22,000',
    priceNumeric: 22000,
    shortDescription:
      'A floor-length kantha dress with hand-stitched mandalas, birds, and folk animals across a flowing undyed cotton ground.',
    description: `Vana means forest in Sanskrit — and this dress carries the forest in its stitching. Three large circular mandalas of interwoven thread anchor the front; between and below them, birds perch, animals move through undergrowth, flowers surface from the khadi ground.

The sleeves are cut from the same khadi but worked in a dense floral Chikankari-adjacent stitch — lighter than the body, a whisper where the dress is a conversation. A turquoise trim at the cuff marks the only point of colour in an otherwise natural palette.

The silhouette is generous, V-necked, and ground-grazing. It moves as a dress should — freely.`,
    images: [
      '/images/products/forest-1.png',
      '/images/products/forest-2.png',
      '/images/products/forest-3.png',
      '/images/products/forest-4.png',
      '/images/products/forest-5.png',
      '/images/products/forest-6.png',
    ],
    dimensions: 'Length: 138 cm · Bust: S(90), M(96), L(102) cm',
    fabric: 'Undyed handwoven khadi cotton, Kantha and Chikankari hand embroidery',
    careInstructions: [
      'Hand wash cold in mild detergent',
      'Do not wring — roll in a towel to remove moisture',
      'Dry flat in shade',
      'Iron at medium heat while damp',
    ],
    featured: true,
    tags: ['dress', 'forest', 'mandala', 'birds', 'khadi', 'floor-length', 'kantha'],
    createdAt: '2026-03-12',
  },
  {
    id: 'prod-006',
    name: 'Tukra — The Patchwork Jacket',
    slug: 'tukra-patchwork-jacket',
    category: 'Kantha Jackets',
    priceDisplay: '₹16,500',
    priceNumeric: 16500,
    shortDescription:
      'A cropped patchwork Kantha jacket in terracotta, indigo, and ivory — each square a different textile, each stitch a different hand.',
    description: `Tukra means fragment in Bengali — and this jacket is made entirely of fragments. Twenty-three squares of handwoven cotton, each from a different textile tradition, are pieced together and unified by the Kantha running stitch worked across every seam.

No two tukras are identical. The specific fabrics that make up your jacket — their colours, textures, and patterns — will be unique to your piece. What holds every version together is the stitch: consistent, patient, continuous.

The jacket is cropped at the hip with a collarless open front. It pairs with everything that needs weight and character added to it.`,
    images: [
      '/images/products/jacket-1.png',
      '/images/products/jacket-2.png',
    ],
    dimensions: 'Length: 58 cm · Bust: S(86), M(92), L(98) cm',
    fabric: 'Patchwork of handwoven cottons, Kantha running stitch throughout',
    careInstructions: [
      'Dry clean for first wash',
      'Subsequent: gentle hand wash cold',
      'Do not tumble dry',
      'Iron at low to medium heat',
    ],
    featured: false,
    tags: ['jacket', 'patchwork', 'cropped', 'tukra', 'indigo', 'terracotta', 'kantha'],
    createdAt: '2026-03-15',
  },
  {
    id: 'prod-007',
    name: 'Nadi — The River Kaftan',
    slug: 'nadi-river-kaftan',
    category: 'Kantha Kaftans',
    priceDisplay: '₹26,000',
    priceNumeric: 26000,
    shortDescription:
      'A hand-embroidered kaftan in deep Kalamkari ink — birds, fish, and river creatures emerge from the dark cloth like memory surfacing from water.',
    description: `Nadi — the river — is where Kantha began: in the riverside villages of Bengal, where women stitched layers of old cloth into new warmth through the cold months. This kaftan returns to that origin, drawing its imagery from the river ecosystem — herons in flight, fish schools, lotus roots, dragonflies hovering.

The ground fabric is a dense handwoven cotton in near-black, into which the embroidery is worked in contrasting threads: teal, gold, rust, white. The motifs are drawn from Kalamkari traditions — bold outlines, filled forms, a visual vocabulary that belongs to the eastern Indian artistic landscape.

One size, generous fit. A piece of rare character.`,
    images: [
      '/images/products/river-1.jpg',
    ],
    dimensions: 'Length: 90 cm · Width: 130 cm (one size)',
    fabric: 'Handwoven dark cotton, Kalamkari-inspired Kantha embroidery in cotton thread',
    careInstructions: [
      'Dry clean only',
      'Store folded in muslin, away from light',
      'Dark colours may transfer — keep away from light-coloured garments when storing',
    ],
    featured: false,
    tags: ['kaftan', 'river', 'kalamkari', 'dark', 'birds', 'fish', 'one-size'],
    createdAt: '2026-02-27',
  },
]

export const CATEGORIES: Category[] = [
  'Kantha Coats',
  'Kantha Kaftans',
  'Kantha Dresses',
  'Kantha Kurtas',
  'Kantha Jackets',
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}
