import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { headers } from 'next/headers'
import { jsonLd, organizationSchema } from '@/lib/structured-data'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maatirmaanush.com'),
  title: 'Maatir Maanush — Handcrafted Kantha Embroidery',
  description:
    'A living archive of soil and soul — where craft becomes contemporary, and heritage finds new rhythm. Premium Kantha embroidery sarees, dupattas, stoles and quilts from Bengal.',
  openGraph: {
    title: 'Maatir Maanush',
    description: 'Handcrafted Kantha embroidery from Bengal.',
    type: 'website',
    siteName: 'Maatir Maanush',
    images: [
      {
        url: '/images/hero/landing-main.png',
        width: 1672,
        height: 941,
        alt: 'Maatir Maanush — Handcrafted Kantha Embroidery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@maatirmaanush',
    images: ['/images/hero/landing-main.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1YYG99MQZF" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1YYG99MQZF');
        `}</Script>
        {/* Organization + WebSite schema. `logo` points at the same brown mark as
            the favicon, which is what Google reads for the brand's search avatar. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
      </head>
      <body className="bg-beige-50 text-earth-900 antialiased">
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
      </body>
    </html>
  )
}
