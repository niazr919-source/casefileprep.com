const CANONICAL_HOST = 'www.casefileprep.com';
const BARE_HOST = 'casefileprep.com';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Runs as a Next.js Node application on Hostinger, which builds and serves
   * the app directly from the connected GitHub repository.
   *
   * This was briefly configured as `output: 'export'` for Apache-style shared
   * hosting. The live server proves otherwise - it returns `x-nextjs-*` headers
   * and serves RSC payloads - so the config matches the real runtime again.
   * Server mode also restores `headers()` and `redirects()`, which a static
   * export cannot provide.
   */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  /**
   * Every published URL already ends in a slash (canonical tags, sitemap,
   * JSON-LD and RSS all agree). Changing this would 301 the entire site, so it
   * stays put.
   */
  trailingSlash: true,

  images: {
    /**
     * The site uses no next/image components. Disabling the optimizer keeps
     * the /_next/image endpoint out of play, which removes the only route
     * that would exercise `sharp` and its inherited libvips advisories.
     * Turn this back on when real images are introduced - and upgrade Next
     * first if the sharp advisories are still open at that point.
     */
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      /**
       * Without this, casefileprep.com and www.casefileprep.com both answered
       * 200 with identical content - duplicate content across two hosts. The
       * canonical tag pointed at www, so www wins here too.
       */
      {
        source: '/:path*',
        has: [{ type: 'host', value: BARE_HOST }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      {
        // Google re-reads ads.txt regularly; keep it fresh rather than cached hard.
        source: '/ads.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }],
      },
    ];
  },
};

export default nextConfig;
