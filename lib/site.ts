export const siteConfig = {
  name: 'CaseFilePrep',
  legalName: 'CaseFilePrep Media',
  domain: 'casefileprep.com',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.casefileprep.com').replace(/\/$/, ''),
  tagline: 'Procedural legal prep, checklists and filing guides',
  description:
    'CaseFilePrep publishes plain-English procedural guides, document checklists and filing walkthroughs for people preparing their own paperwork - small claims, LLC formation, insurance claims and more. Researched from primary sources and fully cited. Educational information only, never legal advice.',
  locale: 'en_US',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'editorial@casefileprep.com',
  founded: '2024',
  markets: ['United States', 'United Kingdom', 'Canada', 'Australia'],
  /**
    * Verified public profiles only.
    *
    * These were placeholder URLs for accounts that do not exist - x.com
    * returned 404. Emitting them in Organization `sameAs` asserted an identity
    * that could not be resolved, which is a negative signal for exactly the
    * entity-resolution that search and AI answer engines run. Add entries back
    * here only once the profile actually exists and is live.
    */
  social: [] as string[],
  disclaimer:
    'Disclaimer: The information provided on this website is for general educational and informational purposes only and does not constitute formal legal advice. No attorney-client relationship is formed.',
  nav: [
    { href: '/guides', label: 'All Guides' },
    { href: '/category/small-claims-civil-disputes', label: 'Small Claims' },
    { href: '/category/small-business-legal-prep', label: 'Business Prep' },
    { href: '/category/claims-incident-documentation', label: 'Claims & Incidents' },
    { href: '/about-us', label: 'About' },
  ],
  footerLegal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/disclaimer', label: 'Legal Disclaimer' },
    { href: '/editorial-policy', label: 'Editorial Policy' },
    { href: '/about-us', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;

/**
 * AdSense publisher ID.
 *
 * Hard-coded on purpose. A publisher ID is not a secret - it is visible in the
 * page source of every AdSense site on the web, and Google requires it to be.
 * Keeping it here rather than in an env var removes an entire class of failure:
 * NEXT_PUBLIC_* values are inlined at build time, so a value set in a hosting
 * panel after the last build silently does nothing, and some platforms do not
 * expose panel env vars to the build step at all. That is exactly why the
 * verification crawler found no code on the live site.
 *
 * The env var still wins if set, so a second property can override it.
 */
const ADSENSE_PUBLISHER_ID = 'ca-pub-2716080376550479';

/**
 * Google Analytics 4 measurement ID.
 *
 * Hard-coded for the same reason as the publisher ID above: it is public by
 * design, visible in the page source of every site that uses GA4, and
 * NEXT_PUBLIC_* env vars are inlined at build time so a value set in a hosting
 * panel afterwards silently does nothing.
 *
 * Loading is gated by Consent Mode v2 - see app/layout.tsx. The tag loads but
 * `analytics_storage` starts denied, so nothing is stored until the reader
 * accepts in the consent bar.
 */
const GA4_MEASUREMENT_ID = 'G-Z5H8NRSXSS';

export const analytics = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || GA4_MEASUREMENT_ID,
};

export const adsense = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || ADSENSE_PUBLISHER_ID,
  slots: {
    leaderboard: process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD || '',
    inArticle: process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || '',
    sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || '',
    inFeed: process.env.NEXT_PUBLIC_AD_SLOT_IN_FEED || '',
  },
};

export type SiteConfig = typeof siteConfig;
