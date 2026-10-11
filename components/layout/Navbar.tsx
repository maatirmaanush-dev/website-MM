'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NEW_DROPS_PATH } from '@/lib/site-links'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'The Art of Kantha', href: '/the-art-of-kantha' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about-us' },
]

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    // On home page: start from current scroll position, then track
    setScrolled(window.scrollY > 60)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-premium',
        scrolled
          ? 'bg-white border-b border-beige-200 py-3 shadow-sm'
          : 'bg-white/10 backdrop-blur-md border-b border-white/10 py-5'
      )}
    >
      <div className="px-8 lg:px-14">
        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-icon.png"
              alt="Maatir Maanush"
              className={cn('h-11 w-auto transition-all duration-300', scrolled ? '' : 'brightness-0 invert')}
            />
            <span className={cn(
              'font-serif text-xl tracking-widest uppercase transition-colors duration-300',
              scrolled ? 'text-earth-900' : 'text-beige-50'
            )}>
              Maatir Maanush
            </span>
          </Link>

          {/* Right: links + social + CTA */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-xs font-sans tracking-wide transition-colors duration-200',
                  scrolled ? 'text-earth-900 hover:text-earth-500' : 'text-beige-50/90 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Social icons */}
            <div className="flex items-center gap-3 border-l pl-6"
              style={{ borderColor: scrolled ? 'rgb(var(--color-beige-300, 210 196 180) / 0.6)' : 'rgba(255,255,255,0.2)' }}>
              <a
                href="https://www.instagram.com/threadsthattease/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={cn('transition-colors duration-200', scrolled ? 'text-earth-700 hover:text-earth-900' : 'text-beige-50/70 hover:text-beige-50')}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/threadsthattease"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook - Maatir Maanush"
                className={cn('transition-colors duration-200', scrolled ? 'text-earth-700 hover:text-earth-900' : 'text-beige-50/70 hover:text-beige-50')}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.facebook.com/geeti.bhojnagarwala"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook - Geeti Bhojnagarwala"
                className={cn('transition-colors duration-200', scrolled ? 'text-earth-700 hover:text-earth-900' : 'text-beige-50/70 hover:text-beige-50')}
              >
                <FacebookIcon />
              </a>
            </div>

            <Link
              href={NEW_DROPS_PATH}
              className={cn(
                'text-xs font-sans tracking-wide border px-4 py-1.5 rounded transition-all duration-300',
                scrolled
                  ? 'border-earth-900 text-earth-900 hover:bg-earth-900 hover:text-beige-50'
                  : 'border-beige-50/70 text-beige-50 hover:bg-beige-50/10'
              )}
            >
              See Collection
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-icon.png"
              alt="Maatir Maanush"
              className={cn('h-7 w-auto transition-all duration-300', scrolled ? '' : 'brightness-0 invert')}
            />
            <span className={cn(
              'font-serif text-base tracking-widest uppercase transition-colors duration-300 leading-none',
              scrolled ? 'text-earth-900' : 'text-beige-50'
            )}>
              Maatir Maanush
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Mobile social icons */}
            <a href="https://www.instagram.com/threadsthattease/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className={cn('transition-colors duration-200', scrolled ? 'text-earth-700' : 'text-beige-50/70')}>
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/threadsthattease" target="_blank" rel="noopener noreferrer" aria-label="Facebook - Maatir Maanush"
              className={cn('transition-colors duration-200', scrolled ? 'text-earth-700' : 'text-beige-50/70')}>
              <FacebookIcon />
            </a>
            <a href="https://www.facebook.com/geeti.bhojnagarwala" target="_blank" rel="noopener noreferrer" aria-label="Facebook - Geeti Bhojnagarwala"
              className={cn('transition-colors duration-200', scrolled ? 'text-earth-700' : 'text-beige-50/70')}>
              <FacebookIcon />
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className={cn('transition-colors duration-200', scrolled ? 'text-earth-900' : 'text-beige-50')}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-beige-50 border-t border-beige-200 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-earth-900 font-sans text-sm tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={NEW_DROPS_PATH}
            onClick={() => setMenuOpen(false)}
            className="border-t border-beige-200 pt-4 text-earth-900 font-sans text-sm font-medium"
          >
            See Collection →
          </Link>
        </div>
      )}
    </header>
  )
}
