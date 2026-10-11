import { MetadataRoute } from 'next'

const BASE = 'https://www.maatirmaanush.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /account is a signed-in, per-user page — nothing there for Google to index.
      disallow: ['/admin', '/account'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
