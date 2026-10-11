import { getProducts } from '@/lib/actions/products'
import { getBlogPosts } from '@/lib/actions/blog'
import { getEnquiries } from '@/lib/actions/enquiries'
import Link from 'next/link'
import { Package, BookOpen, MessageSquare, ArrowRight } from 'lucide-react'

export default async function DashboardPage() {
  const [products, posts, enquiries] = await Promise.all([
    getProducts(),
    getBlogPosts(),
    getEnquiries(),
  ])

  const unreadEnquiries = enquiries.filter((e: any) => !e.read).length
  const publishedProducts = products.filter((p: any) => p.published).length
  const publishedPosts = posts.filter((p: any) => p.published).length

  const stats = [
    {
      label: 'Products',
      value: products.length,
      sub: `${publishedProducts} published`,
      href: '/admin/products',
      icon: Package,
      color: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Blog Posts',
      value: posts.length,
      sub: `${publishedPosts} published`,
      href: '/admin/blog',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Enquiries',
      value: enquiries.length,
      sub: unreadEnquiries > 0 ? `${unreadEnquiries} unread` : 'All read',
      href: '/admin/enquiries',
      icon: MessageSquare,
      color: unreadEnquiries > 0 ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-earth-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, sub, href, icon: Icon, color }) => (
          <Link key={label} href={href} className="bg-white border border-beige-200 rounded-lg p-5 hover:shadow-sm transition group">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon size={18} />
              </div>
              <ArrowRight size={14} className="text-earth-300 group-hover:text-earth-500 transition mt-1" />
            </div>
            <p className="text-3xl font-semibold text-earth-900">{value}</p>
            <p className="text-sm text-earth-700 mt-0.5">{label}</p>
            <p className="text-xs text-earth-500 mt-1">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-beige-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-earth-900">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs text-earth-500 hover:text-earth-700">View all →</Link>
          </div>
          {enquiries.slice(0, 5).length === 0 ? (
            <p className="text-sm text-earth-500">No enquiries yet</p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 5).map((enq: any) => (
                <div key={enq.id} className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-earth-900">{enq.name}</p>
                    <p className="text-xs text-earth-500 truncate max-w-[200px]">{enq.message}</p>
                  </div>
                  {!enq.read && (
                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">New</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-beige-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-earth-900">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            <Link href="/admin/products/new" className="block w-full text-left px-3 py-2 rounded border border-beige-200 text-sm text-earth-700 hover:bg-beige-50 transition">+ New Product</Link>
            <Link href="/admin/blog/new" className="block w-full text-left px-3 py-2 rounded border border-beige-200 text-sm text-earth-700 hover:bg-beige-50 transition">+ New Blog Post</Link>
            <Link href="/admin/seo" className="block w-full text-left px-3 py-2 rounded border border-beige-200 text-sm text-earth-700 hover:bg-beige-50 transition">Manage SEO Settings</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
