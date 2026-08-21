import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing your use of CaseFilePrep, including permitted use, intellectual property, advertising, disclaimers and limitation of liability.',
  alternates: { canonical: '/terms-of-service' },
};

const UPDATED = '2026-08-01';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      href="/terms-of-service"
      updated={UPDATED}
      intro={`These terms govern your use of ${siteConfig.domain}. By using the site you accept them. If you do not accept them, please do not use the site.`}
    >
      <h2>1. Who these terms are with</h2>
      <p>
        The site is operated by {siteConfig.legalName}. &ldquo;We&rdquo; and &ldquo;us&rdquo; mean
        that publisher; &ldquo;you&rdquo; means the reader.
      </p>

      <h2>2. What the site is</h2>
      <p>
        {siteConfig.name} publishes educational guides about legal document preparation and filing
        procedure. It is an information service, not a legal service. Our{' '}
        <Link href="/disclaimer">legal disclaimer</Link> is incorporated into these terms and you
        should read it in full.
      </p>

      <h2>3. Permitted use</h2>
      <p>You may read, print and share our guides for your own personal or internal business use. You may not:</p>
      <ul>
        <li>republish, syndicate or sell our content, in whole or in substantial part, without written permission;</li>
        <li>scrape, harvest or bulk-download the site, or use it to train a commercial model, without written permission;</li>
        <li>present our content as your own, or strip attribution, disclaimers or review information from it;</li>
        <li>use the site in any way that is unlawful, interferes with its operation, or attempts to breach its security;</li>
        <li>frame the site or reproduce it in a way that suggests we endorse you or your services.</li>
      </ul>
      <p>
        Quoting a short passage with a link back to the source guide is welcome and does not require
        permission.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        All original text, checklists, structure, design and code on this site are owned by{' '}
        {siteConfig.legalName} and protected by copyright. Court forms, statutes and government
        publications referenced in our guides remain the property of, or in the public domain of,
        their respective sources. Trade marks named in our content belong to their owners and are
        used descriptively.
      </p>

      <h2>5. Corrections and reader submissions</h2>
      <p>
        We welcome corrections. If you send us feedback, a correction or a suggestion, you grant us
        a non-exclusive, royalty-free licence to use it to improve our content. Do not send us
        confidential information, and do not send us documents belonging to someone else. See our{' '}
        <Link href="/privacy-policy">privacy policy</Link> for how we handle what you send.
      </p>

      <h2>6. Advertising</h2>
      <p>
        The site is funded by advertising served by third parties including Google. Ads are labelled
        as advertisements and separated from editorial content. We do not control which ads appear
        and their presence is not an endorsement. Any dealings you have with an advertiser are
        solely between you and that advertiser.
      </p>

      <h2>7. Third-party links</h2>
      <p>
        External links are provided so you can verify procedures at their source. We do not control
        those sites, do not warrant their content, and are not liable for them.
      </p>

      <h2>8. No warranty</h2>
      <p>
        The site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        without warranty of any kind, express or implied, including implied warranties of accuracy,
        merchantability, fitness for a particular purpose and non-infringement. We do not warrant
        that the site will be uninterrupted or error-free, or that the information is current in
        every jurisdiction at every moment.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for any indirect, incidental,
        special, consequential or punitive damages, or for any loss of profits, claims, filings,
        deadlines or data, arising out of your use of or inability to use the site. Where liability
        cannot be excluded, it is limited to the greater of the amount you paid us (which is
        normally nothing) or USD 100. Nothing here excludes liability for fraud, death or personal
        injury caused by negligence, or any other liability that cannot lawfully be excluded.
      </p>

      <h2>10. Indemnity</h2>
      <p>
        You agree to indemnify us against claims arising from your misuse of the site or breach of
        these terms.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these terms; the &ldquo;last updated&rdquo; date will change and continued use
        of the site means you accept the revised terms. We may also change, suspend or discontinue
        any part of the site at any time.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Delaware, United States, without regard
        to its conflict-of-laws rules, and the courts located there have non-exclusive jurisdiction.
        If you are a consumer resident in the UK, EU, Canada or Australia, this does not deprive you
        of the protection of mandatory consumer law in your country of residence.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms:{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
