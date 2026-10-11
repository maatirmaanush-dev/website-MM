import { getSeoSettings } from '@/lib/actions/seo'
import SeoForm from '@/components/admin/SeoForm'

export default async function AdminSeoPage() {
  const settings = await getSeoSettings()

  const pages = [
    '/', '/new-drops', '/the-art-of-kantha', '/about-us', '/blog',
    '/contact-us', '/shipping-delivery', '/privacy-policy', '/returns',
    '/kantha-stitch-sarees', '/kantha-embroidered-jackets', '/kantha-coats',
    '/kaftans-for-women', '/kantha-embroidered-kurtas',
    '/tops', '/skirts',
    '/contemporary-womens-wear', '/limited-editions-clothing',
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-earth-900 mb-2">SEO Settings</h1>
      <p className="text-sm text-earth-600 mb-6">Set meta title, description, and OG image for each page.</p>

      <div className="space-y-3">
        {pages.map(pagePath => {
          const existing = settings?.find((s: any) => s.page_path === pagePath)
          return (
            <SeoForm key={pagePath} pagePath={pagePath} existing={existing} />
          )
        })}
      </div>
    </div>
  )
}
