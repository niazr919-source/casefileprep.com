import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What CaseFilePrep collects, how Google and other ad partners use cookies here, and how to exercise your GDPR and CCPA rights.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
};

const UPDATED = '2026-08-01';

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      href="/privacy-policy"
      updated={UPDATED}
      intro={`This policy explains what ${siteConfig.name} collects when you read this site, how our advertising partners use cookies, and the choices and legal rights you have over both.`}
    >
      <h2>1. Who we are</h2>
      <p>
        {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates{' '}
        <strong>{siteConfig.domain}</strong>, a publisher of educational guides about legal document
        preparation and filing procedure. We are the data controller for the personal information
        described in this policy. You can reach us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
      <p>
        We are not a law firm and we do not provide legal services. Nothing you read here or send us
        creates an attorney-client relationship, and nothing you send us is protected by
        attorney-client privilege. Please see our{' '}
        <Link href="/disclaimer">legal disclaimer</Link>.
      </p>

      <h2>2. Information we collect</h2>
      <h3>2.1 Information you give us</h3>
      <p>
        We only receive personal information from you when you choose to send it - for example, when
        you email us a correction, a question or feedback. That typically means your email address,
        your name if you include it, and whatever you write in the message. We ask that you do not
        send confidential case details, medical records or financial account numbers. We cannot keep
        them confidential in a legal sense and we do not need them to answer a question about this
        site.
      </p>

      <h3>2.2 Information collected automatically</h3>
      <p>
        Like nearly all websites, our hosting provider and analytics tooling record technical data
        when a page is requested: your IP address (often truncated), browser type and version,
        device type, operating system, the page you requested, the referring page, and the date and
        time of the request. This data is used to keep the site running, diagnose errors, measure
        aggregate traffic, and detect abuse.
      </p>

      <h3>2.3 Information collected by advertising partners</h3>
      <p>
        This site is supported by advertising. Our advertising partners set their own cookies and
        similar technologies and receive information about your visit directly from your browser.
        Section 4 explains this in detail.
      </p>

      <h2>3. Cookies and similar technologies</h2>
      <p>
        A cookie is a small text file stored by your browser. A web beacon (also called a pixel tag
        or clear GIF) is a tiny, invisible image or snippet of code embedded in a page or an ad that
        lets a server know the content was loaded. Both are used on this site, and both can be
        controlled by you.
      </p>
      <p>We group them as follows:</p>
      <ul>
        <li>
          <strong>Strictly necessary.</strong> Required for the site to function and to remember
          your cookie choice. These cannot be switched off through our consent banner because
          without them we cannot record that you declined the others.
        </li>
        <li>
          <strong>Analytics.</strong> Aggregate measurement of page views, traffic sources and
          performance. Set only if you consent.
        </li>
        <li>
          <strong>Advertising.</strong> Used by Google and other vendors to select, cap, and measure
          ads, including personalised ads. Set only if you consent.
        </li>
      </ul>

      <h2>4. Third-party advertising, including Google</h2>
      <p>
        We display advertising served through <strong>Google AdSense</strong> and/or{' '}
        <strong>Google Ad Manager</strong>. The following disclosures are made in accordance with
        Google&rsquo;s publisher requirements.
      </p>
      <ul>
        <li>
          Third-party vendors, including Google, use cookies to serve ads based on your prior visits
          to this website or other websites.
        </li>
        <li>
          Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to you
          based on your visit to this site and/or other sites on the internet.
        </li>
        <li>
          Google uses the <strong>DoubleClick DART cookie</strong> and similar identifiers to serve
          ads. You may opt out of personalised advertising by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            Google Ads Settings
          </a>
          .
        </li>
        <li>
          You may opt out of a third-party vendor&rsquo;s use of cookies for personalised
          advertising by visiting{' '}
          <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer nofollow" target="_blank">
            www.aboutads.info/choices
          </a>
          , the{' '}
          <a href="https://optout.networkadvertising.org/" rel="noopener noreferrer nofollow" target="_blank">
            NAI opt-out page
          </a>
          , or, in Europe,{' '}
          <a href="https://www.youronlinechoices.eu/" rel="noopener noreferrer nofollow" target="_blank">
            Your Online Choices
          </a>
          .
        </li>
        <li>
          Where required, we use a consent mechanism that signals your choice to Google through
          Google Consent Mode. If you decline, we instruct Google not to use your data for ad
          personalisation; you may still see non-personalised (contextual) ads, which are selected
          from the content of the page rather than from your browsing history.
        </li>
      </ul>
      <p>
        Google&rsquo;s own handling of this data is governed by the{' '}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          Google Privacy &amp; Terms page for partner sites
        </a>
        . Other advertising vendors, if used, operate under their own privacy policies, which we
        list on request.
      </p>

      <h2>5. Why we may process your data (legal bases)</h2>
      <p>If the UK GDPR or EU GDPR applies to you, our legal bases are:</p>
      <ul>
        <li>
          <strong>Consent</strong> - for analytics and advertising cookies, and for any marketing
          email you explicitly request. You can withdraw consent at any time (see section 8).
        </li>
        <li>
          <strong>Legitimate interests</strong> - for keeping the site secure, preventing abuse, and
          understanding aggregate, non-identifying usage so we can improve our guides.
        </li>
        <li>
          <strong>Legal obligation</strong> - where we must retain or disclose information to comply
          with law.
        </li>
      </ul>

      <h2>6. How we share information</h2>
      <p>
        We do not sell personal information for money. We share data only with service providers who
        make the site work - our hosting and content delivery provider, our email provider, our
        analytics provider - and with the advertising partners described in section 4. We may
        disclose information if legally compelled to do so, or to protect our rights or the safety
        of others.
      </p>
      <p>
        Under the California Consumer Privacy Act as amended (CCPA/CPRA), the use of advertising
        cookies can qualify as &ldquo;sharing&rdquo; personal information for cross-context
        behavioural advertising. Section 8 explains how to opt out.
      </p>

      <h2>7. International transfers and retention</h2>
      <p>
        Our providers may process data in the United States and other countries. Where personal data
        is transferred out of the UK/EEA, it is done under an approved transfer mechanism such as
        the UK International Data Transfer Agreement or the EU Standard Contractual Clauses.
      </p>
      <p>
        Server logs are retained for a short operational period (typically up to 90 days) and then
        deleted or anonymised. Email correspondence is retained only as long as needed to resolve
        your query and to keep a record of corrections we have made to our guides. Advertising
        partners apply their own retention periods.
      </p>

      <h2>8. Your choices and rights</h2>
      <h3>8.1 Everyone</h3>
      <ul>
        <li>
          <strong>Change your cookie choice</strong> at any time. Clear this site&rsquo;s local
          storage in your browser settings and reload the page; the consent bar will reappear so you
          can choose again.
        </li>
        <li>
          <strong>Block or delete cookies</strong> in your browser settings. Blocking all cookies
          will not stop you reading any guide on this site.
        </li>
        <li>
          <strong>Opt out of personalised ads</strong> using the Google and industry links in
          section 4.
        </li>
      </ul>

      <h3>8.2 UK and EEA residents (GDPR)</h3>
      <p>
        You have the right to access your personal data, to have it corrected or erased, to restrict
        or object to processing, to data portability, and to withdraw consent at any time without
        affecting processing already carried out. To exercise any of these, email{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. We respond
        within one month. You may also complain to your national supervisory authority - in the UK,
        the Information Commissioner&rsquo;s Office.
      </p>

      <h3>8.3 California residents (CCPA/CPRA)</h3>
      <p>
        You have the right to know what personal information is collected and how it is used and
        shared, the right to delete it, the right to correct it, the right to opt out of sale or
        sharing for cross-context behavioural advertising, and the right not to be discriminated
        against for exercising these rights. To opt out, decline advertising cookies in our consent
        bar and use the Google Ads Settings link in section 4. To make any other request, email{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> with
        &ldquo;CCPA request&rdquo; in the subject line. We honour Global Privacy Control signals
        where our systems receive them.
      </p>

      <h3>8.4 Canada and Australia</h3>
      <p>
        Readers in Canada (PIPEDA) and Australia (Privacy Act 1988) may request access to and
        correction of personal information we hold, and may raise concerns with the Office of the
        Privacy Commissioner of Canada or the Office of the Australian Information Commissioner
        respectively.
      </p>

      <h2>9. Children</h2>
      <p>
        This site is written for adults handling their own paperwork. It is not directed to children
        and we do not knowingly collect personal information from anyone under 16. If you believe a
        child has provided us with personal information, email us and we will delete it.
      </p>

      <h2>10. Security</h2>
      <p>
        The site is served over HTTPS. We keep collected data to a minimum, which is the most
        effective protection available to a publisher of our size. No method of transmission or
        storage is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>11. External links</h2>
      <p>
        Our guides link to courts, government agencies and other third-party sites so you can verify
        procedures at the source. We do not control those sites and are not responsible for their
        content or privacy practices. Review their policies before providing information to them.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We will update this page when our practices or partners change, and we will revise the
        &ldquo;last updated&rdquo; date above. Material changes affecting your rights will be
        highlighted on the site.
      </p>

      <h2>13. Contact</h2>
      <p>
        Privacy questions, access requests and complaints:{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. See also our{' '}
        <Link href="/contact">contact page</Link>, <Link href="/terms-of-service">terms of service</Link>{' '}
        and <Link href="/editorial-policy">editorial policy</Link>.
      </p>
    </LegalPage>
  );
}
