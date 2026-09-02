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
import { adsense, analytics, siteConfig } from '@/lib/site';

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
  authors: [{ name: `${siteConfig.name} Editorial Team`, url: `${siteConfig.url}/about-us` }],
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
    // Card type only - no site/creator handle is claimed, because no such
    // account exists. Add them back when a real profile is live.
    card: 'summary_large_image',
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
        {/*
          Declared here rather than via metadata.alternates.types because Next
          replaces `alternates` wholesale rather than merging it. Every page
          that sets its own canonical was silently dropping the feed link.
        */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} - latest guides`}
          href="/feed.xml"
        />

        {analytics.ga4Id ? (
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        ) : null}

        {adsense.client ? (
          <>
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="" />
            <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="" />

            {/* Site-ownership verification via the meta-tag method. */}
            <meta name="google-adsense-account" content={adsense.client} />

            {/*
              Deliberately a plain <script>, not next/script.
              `strategy="afterInteractive"` injects the tag during hydration, so
              it is not reliably present in the server-rendered HTML that the
              AdSense verification crawler reads. A plain async script in <head>
              is in the raw markup on every page, which is what both the
              verification step and the "code snippet" method require.

              Consent is handled separately: Consent Mode v2 defaults below set
              ad_storage, ad_user_data and ad_personalization to denied until
              the reader chooses, which is Google's documented pattern for
              loading the tag before consent is known.
            */}
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.client}`}
              crossOrigin="anonymous"
            />
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

        {/*
          Google Analytics 4.

          `afterInteractive` on purpose, and safe here in a way it was not for
          the AdSense tag: analytics only has to run in real browsers, it does
          not have to be visible to a verification crawler reading raw HTML.
          It also guarantees ordering - the Consent Mode defaults above use
          `beforeInteractive`, so `analytics_storage: denied` is always set
          before the first GA4 command runs.

          The tag therefore loads for everyone but stores nothing until the
          reader accepts in the consent bar, at which point CookieConsent
          fires gtag('consent','update') and measurement begins.
        */}
        {analytics.ga4Id ? (
          <>
            <Script
              id="ga4-src"
              async
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${analytics.ga4Id}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`gtag('js', new Date());gtag('config', '${analytics.ga4Id}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
