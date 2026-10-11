import type { Metadata } from 'next'
import { AnimatedReveal } from '@/components/shared/AnimatedReveal'

export const metadata: Metadata = {
  title: 'Disclaimer — Maatir Maanush',
  description: 'Disclaimer for Maatir Maanush.',
  alternates: {
    canonical: 'https://www.maatirmaanush.com/disclaimer',
  },
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-beige-50 pt-20 sm:pt-32 pb-12 sm:pb-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth-500 font-sans mb-3">Legal</p>
          <h1 className="font-serif text-3xl md:text-5xl text-earth-900 mb-4">Disclaimer</h1>
          <p className="font-sans text-sm text-earth-500 mb-12">Last updated: March 2025</p>
        </AnimatedReveal>
        <div className="space-y-10 font-sans text-sm text-earth-700 leading-relaxed">
          {[
            {
              title: 'General',
              content: `The information provided on the Maatir Maanush website is for general informational purposes only. While we make every effort to keep information accurate and up to date, we make no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, or availability of any information, products, or services on this website.`,
            },
            {
              title: 'Product Representations',
              content: `Photographs of our products are taken with care to represent colours and textures accurately. However, screen calibration varies across devices, and actual colours may differ slightly from what you see on your screen. Because all pieces are handcrafted, there is inherent variation between the product shown and the piece you receive. This is a feature of handcraft, not a misrepresentation.`,
            },
            {
              title: 'Handcraft and Natural Variation',
              content: `All Maatir Maanush pieces are made by human hands using natural or traditionally produced materials. Natural materials may have irregularities, variations in texture, and characteristics that differ from piece to piece. Thread colours may vary slightly between dye lots. These are not defects. They are evidence of the handmade nature of the work.`,
            },
            {
              title: 'External Links',
              content: `Our website may contain links to external websites. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.`,
            },
            {
              title: 'Limitation of Liability',
              content: `To the fullest extent permitted by law, Maatir Maanush excludes all liability for loss or damage (including without limitation, direct, indirect, or consequential loss or damage) arising from use of this website or from the use of information provided on it. This limitation applies whether such liability arises in contract, tort, or otherwise.`,
            },
            {
              title: 'AI-Generated Imagery',
              content: `Some images used on this website — including hero images, lifestyle photographs, and editorial visuals — are generated using artificial intelligence tools. These images are used for illustrative purposes only and do not represent real individuals, locations, or events. They are not photographs of actual Maatir Maanush products. Photographs of our actual products are clearly presented in product listings and are taken to represent the piece as accurately as possible.`,
            },
            {
              title: 'Cultural Heritage',
              content: `The Kantha embroidery tradition we draw upon belongs to the artisan communities of West Bengal. We work in respectful partnership with these communities. All cultural context provided on this website is offered in good faith for educational purposes. We acknowledge that our interpretations may be incomplete and welcome correction from community members and scholars.`,
            },
          ].map((s, i) => (
            <AnimatedReveal key={s.title} delay={i * 40}>
              <div className="border-t border-beige-200 pt-8">
                <h2 className="font-serif text-xl text-earth-900 mb-4">{s.title}</h2>
                <p>{s.content}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </main>
  )
}
