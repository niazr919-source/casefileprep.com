import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import CookieConsent from '@/components/CookieConsent';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { adsense, siteConfig } from '@/lib/site';

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  // Only the weights actually used, to keep the font payload small.
  weight: ['400', '500', '600', '700'],
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Legal Document Prep Checklists & Filing Guides`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: `${siteConfig.name} Legal Research Team`, url: `${siteConfig.url}/about-us` }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: 'Legal information',
  keywords: [
    'legal document preparation',
    'small claims court checklist',
    'court filing guide',
    'LLC formation steps',
    'insurance claim documentation',
    'self represented litigant paperwork',
  ],
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': `${siteConfig.url}/feed.xml` },
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: '/',
    title: `${siteConfig.name} - Legal Document Prep Checklists & Filing Guides`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@casefileprep',
    creator: '@casefileprep',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/site.webmanifest',
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: '#0f1e33',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        {adsense.client ? (
          <>
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="" />
            <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="" />
            <meta name="google-adsense-account" content={adsense.client} />
          </>
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Consent Mode v2 defaults: everything denied until the reader chooses. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=window.gtag||gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`}
        </Script>

        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <DisclaimerBanner variant="bar" />
        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <CookieConsent />

        <JsonLd id="global" data={[organizationSchema(), websiteSchema()]} />

        {adsense.client ? (
          <Script
            id="adsbygoogle-init"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.client}`}
          />
        ) : null}
      </body>
    </html>
  );
}
