import { permanentRedirect } from 'next/navigation'

// Legacy URL — redirect to the correct Dresses category page
export default function KanthaEmbroideredDressesRedirect() {
  permanentRedirect('/contemporary-womens-wear')
}
