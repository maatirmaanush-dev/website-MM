import Link from 'next/link'
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp'
import { NEW_DROPS_PATH } from '@/lib/site-links'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  )
}

const socialLinks = [
  { href: 'https://www.instagram.com/threadsthattease/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/threadsthattease', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://www.facebook.com/geeti.bhojnagarwala', label: 'Facebook (Geeti)', Icon: FacebookIcon },
  { href: buildGeneralWhatsAppUrl(), label: 'WhatsApp', Icon: WhatsAppIcon },
]

const exploreLinks = [
  { label: 'New Drops', href: NEW_DROPS_PATH },
  { label: 'Sold Out', href: '/sold-out' },
  { label: 'The Art of Kantha', href: '/the-art-of-kantha' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about-us' },
  { label: 'About the Founder', href: '/about-founder' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Join Our Community', href: 'https://www.instagram.com/threadsthattease/' },
]

const helpLinks = [
  { label: "FAQ's", href: '/faq' },
  { label: 'Shipping & Delivery', href: '/shipping-delivery' },
  { label: 'Returns & Exchanges', href: '/returns' },
]

const legalLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
]

export function Footer() {
  return (
    <footer className="bg-beige-200 border-t border-beige-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">

          {/* Brand + social — spans 2 cols on large */}
          <div className="lg:col-span-2">
            <p className="font-serif text-xl tracking-widest uppercase text-earth-900 mb-4">
              Maatir Maanush
            </p>
            <p className="font-sans text-sm text-earth-700 leading-relaxed max-w-xs mb-6">
              A living archive of soil and soul — where craft becomes contemporary, and heritage finds new rhythm.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-earth-700 hover:text-earth-900 transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-4">Explore</p>
            <nav className="flex flex-col gap-3">
              {exploreLinks.map((link) => {
                const isExternal = link.href.startsWith('http')
                return isExternal ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-sans text-earth-700 hover:text-earth-900 transition-colors duration-200">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href}
                    className="text-sm font-sans text-earth-700 hover:text-earth-900 transition-colors duration-200">
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Help */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-4">Help</p>
            <nav className="flex flex-col gap-3">
              {helpLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-sm font-sans text-earth-700 hover:text-earth-900 transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
              <a href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
                className="text-sm font-sans text-earth-700 hover:text-earth-900 transition-colors duration-200">
                Enquire on WhatsApp
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-earth-500 font-sans mb-4">Legal</p>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-sm font-sans text-earth-700 hover:text-earth-900 transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
              {/* Plain <a>, not next/link — /sitemap.xml is a file, not a route, so
                  the client router would try to navigate to it and 404. */}
              <a href="/sitemap.xml"
                className="text-sm font-sans text-earth-700 hover:text-earth-900 transition-colors duration-200">
                Sitemap
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-beige-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-earth-700 text-sm">
            Made with <span style={{ color: '#e00' }}>❤</span> in India
          </p>
          <p className="font-sans text-xs text-earth-700">
            © {new Date().getFullYear()} Maatir Maanush. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
