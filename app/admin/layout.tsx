// The admin always shows live data (products, enquiries, SEO), so never cache
// or prerender anything under /admin.
export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
