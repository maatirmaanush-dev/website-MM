'use client'

import { usePathname } from 'next/navigation'

// Hides the public site chrome (Navbar, Footer, WhatsApp button) on /admin.
// Done on the client with usePathname() so the root layout never has to read
// request headers — calling headers() there forces every page on the site to
// render dynamically and disables caching/ISR.
export function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <>{children}</>
}
