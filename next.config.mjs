/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static HTML export for Hostinger shared hosting (LiteSpeed/Apache, no
   * Node.js runtime). Every route in this site is already prerendered, so
   * nothing is lost by exporting.
   *
   * Consequences of `output: 'export'`, all handled elsewhere in the repo:
   *  - ISR/revalidate is unavailable: content refreshes when you push, not on a timer.
   *  - next/image optimisation is unavailable: `unoptimized` below.
   *  - `headers()` is unavailable: security and caching headers live in public/.htaccess.
   *  - Every dynamic route must set `dynamicParams = false` (they all do).
   */
  output: 'export',

  /**
   * Emits `guides/index.html` rather than `guides.html`, so Apache/LiteSpeed
   * serves clean URLs (/guides/) through DirectoryIndex with no rewrite rules.
   */
  trailingSlash: true,

  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Required for static export - there is no Node server to optimise on.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
