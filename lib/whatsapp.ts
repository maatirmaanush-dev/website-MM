const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919830226429'

export function buildWhatsAppUrl(product: { name: string; [key: string]: any }): string {
  const message = encodeURIComponent(
    `Hi! I came across "${product.name}" on Maatir Maanush. Could you please share more details and availability?`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
}

export function buildGeneralWhatsAppUrl(): string {
  const message = encodeURIComponent(
    `Hi! I'm interested in Maatir Maanush handcrafted Kantha pieces. Could you help me?`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
}
