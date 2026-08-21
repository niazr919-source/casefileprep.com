import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'How CaseFilePrep researches, writes, reviews, dates and corrects its legal procedure guides, and the line we hold between procedural information and legal advice.',
  alternates: { canonical: '/editorial-policy' },
};

const UPDATED = '2026-08-01';

export default function EditorialPolicyPage() {
  return (
    <LegalPage
      title="Editorial Policy"
      href="/editorial-policy"
      updated={UPDATED}
      intro="Our guides are only worth reading if you know how they were made. This page sets out our sourcing, review, dating, correction and independence standards in full."
    >
      <h2>1. What we publish, and what we refuse to publish</h2>
      <p>
        {siteConfig.name} publishes <strong>procedural</strong> information: what a document is,
        what belongs in it, what order things happen in, who receives what, and what commonly goes
        wrong. We publish checklists, sequences and definitions.
      </p>
      <p>We do not publish, and will reject at review:</p>
      <ul>
        <li>recommendations about whether a particular reader should sue, settle, file or appeal;</li>
        <li>predictions of outcomes, damages figures, or &ldquo;what your case is worth&rdquo;;</li>
        <li>anything that interprets the law as applied to an individual&rsquo;s facts;</li>
        <li>content that would encourage a reader to skip qualified advice on a high-stakes matter.</li>
      </ul>
      <p>
        This boundary is not decoration. It is the difference between publishing and practising law
        without a licence. Read the <Link href="/disclaimer">full disclaimer</Link>.
      </p>

      <h2>2. Who writes our guides</h2>
      <p>
        Guides are written by named contributors with direct, verifiable working experience in the
        process they describe - certified paralegals, former state-filings compliance analysts,
        former insurance adjusters and professional legal editors. Every contributor has a public
        biography page listing their credentials, their relevant experience and the guides they have
        worked on. We do not publish anonymous or pseudonymous procedural content.
      </p>
      <p>
        Contributors write about processes they have personally handled. Where a guide covers a
        jurisdiction or step outside a writer&rsquo;s direct experience, that is stated in the guide
        and the section is sourced more heavily.
      </p>

      <h2>3. Sourcing standards</h2>
      <p>Procedural claims must be traceable to a primary source. In descending order of authority:</p>
      <ol>
        <li>statutes, codes and regulations;</li>
        <li>court rules, local rules and standing orders;</li>
        <li>official court, clerk and government agency instructions, forms and fee schedules;</li>
        <li>published guidance from bar associations and legal aid organisations.</li>
      </ol>
      <p>
        Commercial sites - including formation services, claim-filing services and law firm blogs -
        are not accepted as the sole source for any procedural claim. Fees, dollar thresholds,
        deadlines and form numbers must be checked against the issuing authority on the date of
        publication or review. Sources are listed at the foot of each guide.
      </p>

      <h2>4. Review before publication</h2>
      <p>
        Nothing publishes without a second person. Every guide is reviewed by the{' '}
        {siteConfig.name} Legal Research Team, whose reviewer is named on the article. The reviewer
        checks:
      </p>
      <ul>
        <li>that each procedural statement matches its cited primary source;</li>
        <li>that fees, limits, deadlines and form identifiers are current;</li>
        <li>that the jurisdiction is stated explicitly and not implied;</li>
        <li>that no passage reads as advice about an individual matter;</li>
        <li>that the guide tells the reader when to stop and consult a licensed attorney.</li>
      </ul>

      <h2>5. Dating and re-review</h2>
      <p>
        Each guide shows its first publication date and its last-reviewed date. Guides are
        re-reviewed at least every six months. We re-review immediately, out of cycle, when we learn
        that a rule, fee, form or threshold has changed. When a re-review changes substance, we
        update the last-reviewed date and note the change; cosmetic edits do not reset the date,
        because a refreshed date with no real re-check misleads readers and search engines alike.
      </p>

      <h2>6. Corrections</h2>
      <p>
        If we get something wrong, we fix it and say so. Send corrections to{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> with the guide
        URL and, if possible, a link to the authority that shows the correct position. We aim to
        acknowledge within two business days. Substantive corrections are noted on the guide with
        the date. Guides that can no longer be maintained accurately are unpublished rather than
        left to rot.
      </p>

      <h2>7. Independence and advertising</h2>
      <p>
        Our revenue comes from display advertising served by third parties, including Google. The
        editorial team has no visibility into which advertisers appear on which page and no
        advertiser is given review, approval or advance notice of content. We do not accept payment
        for coverage, do not sell links, do not publish sponsored posts as editorial, and do not
        operate a lawyer referral arrangement. Ad units are labelled &ldquo;Advertisement&rdquo; and
        kept visually distinct from editorial content.
      </p>

      <h2>8. Use of AI tools</h2>
      <p>
        We use software, including AI tools, for research assistance, outlining, and copy-editing.
        We do not publish machine-generated procedural content unverified. Every factual and
        procedural statement in a published guide is checked by a named human against a primary
        source, and a named human reviewer signs it off. Responsibility for accuracy sits with those
        people, not with a tool.
      </p>

      <h2>9. Accessibility and plain language</h2>
      <p>
        Guides are written in plain English with defined terms, semantic headings, meaningful link
        text and printable checklists. We aim to meet WCAG 2.1 AA. If something on this site is hard
        to use with a screen reader, keyboard or magnifier, tell us and we will treat it as a bug.
      </p>

      <h2>10. Reader privacy</h2>
      <p>
        We do not ask readers to create accounts to read guides and we collect as little as
        possible. See the <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
