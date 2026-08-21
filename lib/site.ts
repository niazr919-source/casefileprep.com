export const siteConfig = {
  name: 'CaseFilePrep',
  legalName: 'CaseFilePrep Media',
  domain: 'casefileprep.com',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.casefileprep.com').replace(/\/$/, ''),
  tagline: 'Procedural legal prep, checklists and filing guides',
  description:
    'CaseFilePrep publishes plain-English procedural guides, document checklists and filing walkthroughs for people preparing their own paperwork - small claims, LLC formation, insurance claims and more. Educational information only, never legal advice.',
  locale: 'en_US',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'editorial@casefileprep.com',
  founded: '2024',
  markets: ['United States', 'United Kingdom', 'Canada', 'Australia'],
  social: {
    x: 'https://x.com/casefileprep',
    linkedin: 'https://www.linkedin.com/company/casefileprep',
  },
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

export const adsense = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  slots: {
    leaderboard: process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD || '',
    inArticle: process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || '',
    sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || '',
    inFeed: process.env.NEXT_PUBLIC_AD_SLOT_IN_FEED || '',
  },
};

export type SiteConfig = typeof siteConfig;
