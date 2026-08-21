'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'cfp-consent-v1';

type ConsentValue = 'granted' | 'denied';

type StoredConsent = {
  ads: ConsentValue;
  analytics: ConsentValue;
  ts: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pushConsent(consent: StoredConsent) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  const gtag =
    window.gtag ||
    function gtagShim(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  window.gtag = gtag;
  // Google Consent Mode v2 signals.
  gtag('consent', 'update', {
    ad_storage: consent.ads,
    ad_user_data: consent.ads,
    ad_personalization: consent.ads,
    analytics_storage: consent.analytics,
  });
}

/**
 * Non-intrusive bottom consent bar.
 *
 * - Never blocks the page or covers the article body (it is a short bar, not
 *   an interstitial), which keeps it compliant with Google's intrusive
 *   interstitial guidelines.
 * - Offers a genuine one-click reject alongside accept, as required by GDPR
 *   and the UK/EU consent rules.
 * - Stores the choice locally and replays it into Consent Mode v2 on every
 *   page load, so ad personalisation stays off unless the reader opted in.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    let stored: StoredConsent | null = null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      stored = raw ? (JSON.parse(raw) as StoredConsent) : null;
    } catch {
      stored = null;
    }

    if (stored?.ads) {
      pushConsent(stored);
    } else {
      // Defer showing the bar until the browser is idle so it never competes
      // with the LCP element.
      const show = () => setVisible(true);
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(show);
      } else {
        setTimeout(show, 1200);
      }
    }
  }, []);

  const decide = useCallback((ads: ConsentValue) => {
    const consent: StoredConsent = { ads, analytics: ads, ts: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* private mode - consent applies to this page view only */
    }
    pushConsent(consent);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-300 bg-white/98 shadow-[0_-4px_20px_rgba(15,30,51,0.10)] backdrop-blur"
    >
      <div className="mx-auto flex max-w-shell flex-col gap-3 px-4 py-3.5 md:flex-row md:items-center md:gap-6">
        <div className="text-[13px] leading-relaxed text-slate-700">
          <p>
            We use cookies to run this site and, with your permission, to let Google and other
            advertising partners serve and measure personalised ads. You can decline and still read
            every guide.{' '}
            <button
              type="button"
              onClick={() => setShowDetail((v) => !v)}
              className="font-semibold text-navy-700 underline underline-offset-2"
            >
              {showDetail ? 'Hide details' : 'What is stored?'}
            </button>{' '}
            <Link href="/privacy-policy" className="font-semibold text-navy-700 underline underline-offset-2">
              Privacy Policy
            </Link>
          </p>
          {showDetail ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] text-slate-600">
              <li>
                <strong>Essential:</strong> remembers this choice. Always on, no personal data.
              </li>
              <li>
                <strong>Advertising:</strong> Google AdSense / Ad Manager cookies and web beacons
                used to select and measure ads, including the DoubleClick DART cookie.
              </li>
              <li>
                <strong>Analytics:</strong> aggregate page and traffic-source counts.
              </li>
            </ul>
          ) : null}
        </div>

        <div className="flex shrink-0 gap-2 md:ml-auto">
          <button
            type="button"
            onClick={() => decide('denied')}
            className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 md:flex-none"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className="flex-1 rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 md:flex-none"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
