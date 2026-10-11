'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, Package, BookOpen, Search, MessageSquare, LogOut } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/seo', label: 'SEO', icon: Search },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-earth-900 text-white flex flex-col">
      <div className="px-5 py-6 border-b border-white/10">
        <p className="font-cormorant text-xl font-semibold">Maatir Maanush</p>
        <p className="text-white/50 text-xs mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 px-5 py-2.5 text-sm transition',
              pathname.startsWith(href)
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-white/60 hover:text-white text-sm w-full transition"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
