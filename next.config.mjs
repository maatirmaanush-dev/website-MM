/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    // Enable Next.js image optimisation (resize, compress, WebP/AVIF conversion)
    // Supabase Storage CDN + local public folder
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lyzgaopdbughrobqkosv.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // WebP only: AVIF is a little smaller but several times slower to encode,
    // which made the first (uncached) request for each large image very slow.
    formats: ['image/webp'],
    // Cache optimised images for 7 days
    minimumCacheTTL: 604800,
    // Sane set of device widths for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
  },
}

export default nextConfig
