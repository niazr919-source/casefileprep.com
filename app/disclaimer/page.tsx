import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Legal Disclaimer',
  description:
    'CaseFilePrep publishes general educational information about legal procedure. It is not legal advice, no attorney-client relationship is formed, and jurisdictional rules vary.',
  alternates: { canonical: '/disclaimer' },
};

const UPDATED = '2026-08-01';

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Legal Disclaimer"
      href="/disclaimer"
      updated={UPDATED}
      intro="Read this before relying on anything published here. It sets the boundary between the general procedural information we provide and the legal advice we cannot provide."
    >
      <div className="not-prose mb-8 rounded-lg border-l-4 border-accent-500 bg-amber-50/70 p-5">
        <p className="text-[15px] font-semibold leading-relaxed text-navy-900">
          {siteConfig.disclaimer}
        </p>
      </div>

      <h2>1. No legal advice</h2>
      <p>
        The content on {siteConfig.domain} is general educational and informational material about
        how legal and administrative processes work. It describes procedures, documents, sequences
        and deadlines in the abstract. It is not, and must not be treated as, legal advice about
        your circumstances.
      </p>
      <p>
        Legal advice means applying the law to a specific person&rsquo;s specific facts and
        recommending a course of action. Only a lawyer licensed in the relevant jurisdiction, who
        has reviewed your actual documents and facts, can do that. We do not do it, and no article,
        checklist, template description or email from us should be read as doing it.
      </p>

      <h2>2. No attorney-client relationship</h2>
      <p>
        Reading this site, downloading or printing a checklist, subscribing to updates, or
        corresponding with our editorial team does not create an attorney-client relationship
        between you and {siteConfig.name}, its owners, its writers, its reviewers or its
        contributors. Communications you send us are not privileged or confidential. Please do not
        send us confidential or time-sensitive case information.
      </p>

      <h2>3. We are not a law firm</h2>
      <p>
        {siteConfig.name} is a publisher. We are not a law firm, a legal document preparation
        service, a registered agent, an insurance broker, a claims adjuster, or a lawyer referral
        service. We do not review documents, prepare filings for readers, appear in court, or
        represent anyone. Our contributors include paralegals, compliance analysts and former
        industry professionals writing in an educational capacity - not as your representative.
      </p>

      <h2>4. Jurisdiction matters</h2>
      <p>
        Court rules, statutes, filing fees, dollar limits, forms and deadlines differ between
        countries, states, provinces and often between individual courthouses within the same state.
        A procedure that is correct in one county may be wrong two counties away. Where a guide
        names a jurisdiction, it applies to that jurisdiction on the date shown, and nowhere else by
        implication.
      </p>

      <h2>5. Information can go out of date</h2>
      <p>
        We verify each guide against primary sources before publication and re-review on a schedule,
        but rules change without notice and we cannot guarantee that every detail is current at the
        moment you read it. Always confirm requirements directly with the court, agency, or
        professional handling your matter before you act. See our{' '}
        <Link href="/editorial-policy">editorial policy</Link> for how we research, review and
        correct content.
      </p>

      <h2>6. Deadlines and limitation periods</h2>
      <p>
        Many legal and insurance processes carry strict deadlines - statutes of limitations, notice
        periods, service deadlines, appeal windows. Missing one can permanently end your ability to
        pursue a claim. Nothing on this site should be used to calculate a deadline that applies to
        you. Speak to a licensed attorney about your dates.
      </p>

      <h2>7. No outcome is promised</h2>
      <p>
        Following a checklist published here does not guarantee that a filing will be accepted, that
        a claim will be paid, that a case will succeed, or that any particular result will follow.
        Outcomes depend on facts, evidence, law and decision-makers that are outside our knowledge
        and control.
      </p>

      <h2>8. Third-party links and advertising</h2>
      <p>
        We link to courts, agencies and other third-party resources for verification. We do not
        control those sites and are not responsible for their content, accuracy or availability.
      </p>
      <p>
        This site displays advertising served by third parties, including Google. Advertisements are
        labelled and are visually separated from editorial content. We do not select, endorse, or
        vet the advertisers whose ads appear, and an advertisement is never an endorsement or a
        referral. If an ad offers legal services, evaluate that provider independently. See our{' '}
        <Link href="/privacy-policy">privacy policy</Link> for how advertising cookies work.
      </p>

      <h2>9. Affiliate and financial disclosure</h2>
      <p>
        Our revenue comes from advertising. We do not accept payment to feature, recommend or review
        any law firm, filing service or insurer in our editorial content, and we do not receive
        commissions on any reader&rsquo;s legal matter. Where any commercial relationship exists
        that could affect a guide, it is disclosed inside that guide.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {siteConfig.legalName} and its contributors accept
        no liability for any loss or damage - including lost claims, missed deadlines, rejected
        filings, costs, or consequential loss - arising from reliance on material published on this
        site. The content is provided &ldquo;as is&rdquo; without warranties of any kind, express or
        implied. Nothing in this disclaimer excludes liability that cannot lawfully be excluded.
      </p>

      <h2>11. If you need legal help</h2>
      <p>
        Consult a licensed attorney in your jurisdiction. If cost is a barrier, look for a local
        legal aid organisation, a bar association referral service, a court self-help centre, or a
        law school clinic - most jurisdictions have at least one. Court clerks can explain procedure
        and forms, though they are not permitted to give legal advice either.
      </p>

      <p>
        Questions about this disclaimer:{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
