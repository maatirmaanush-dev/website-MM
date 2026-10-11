import type { Metadata } from 'next'
import { getSeoByPath } from '@/lib/actions/seo'
import FaqContent from '@/components/faq/FaqContent'

// This page used to be a single 'use client' file, which meant it could not export
// metadata — it inherited the site-wide title/description from the root layout and
// shipped no canonical at all. The interactive accordion now lives in FaqContent.
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPath('/faq')
  const title = seo?.title || 'Frequently Asked Questions — Maatir Maanush'
  const description =
    seo?.description ||
    'Answers on our handcrafted Kantha pieces — how they are made, fabrics, sizing, enquiries, shipping and returns.'
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.maatirmaanush.com${seo?.slug || '/faq'}`,
    },
    ...(seo?.og_image && {
      openGraph: { title, description, images: [{ url: seo.og_image, width: 1200, height: 630 }] },
    }),
  }
}

export default function FAQPage() {
  return <FaqContent />
}
