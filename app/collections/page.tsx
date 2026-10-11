import { permanentRedirect } from 'next/navigation'
import { NEW_DROPS_PATH } from '@/lib/site-links'

// Legacy URL. Point straight at the live slug — redirecting to /new-drops would
// only 308 again from middleware, costing Google a second hop.
export default function CollectionsRedirect() {
  permanentRedirect(NEW_DROPS_PATH)
}
