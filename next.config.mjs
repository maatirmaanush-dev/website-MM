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
    // Serve modern formats — AVIF then WebP
    formats: ['image/avif', 'image/webp'],
    // Cache optimised images for 7 days
    minimumCacheTTL: 604800,
    // Sane set of device widths for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
  },
}

export default nextConfig
