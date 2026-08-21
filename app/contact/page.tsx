import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact & Corrections',
  description:
    'How to reach the CaseFilePrep editorial team with corrections, questions, privacy requests or press enquiries.',
  alternates: { canonical: '/contact' },
};

const UPDATED = '2026-08-01';

const REASONS = [
  {
    heading: 'Corrections',
    body: 'Found a fee, deadline, form number or step that is out of date or wrong? This is the email we most want to receive. Include the guide URL and, where you can, a link to the court or agency page that shows the correct position.',
    subject: 'Correction:',
  },
  {
    heading: 'Suggest a guide',
    body: 'Tell us the procedure and the jurisdiction. We prioritise processes where the official instructions exist but are hard to follow.',
    subject: 'Guide suggestion:',
  },
  {
    heading: 'Privacy requests',
    body: 'Access, deletion, correction, or opting out of ad personalisation under GDPR, CCPA/CPRA, PIPEDA or the Australian Privacy Act.',
    subject: 'Privacy request:',
  },
  {
    heading: 'Press and permissions',
    body: 'Republication requests, interview requests and questions about our sourcing or review process.',
    subject: 'Press:',
  },
];

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact & Corrections"
      href="/contact"
      updated={UPDATED}
      intro={`One address reaches the editorial team. We answer corrections first, usually within two business days.`}
    >
      <div className="not-prose mb-8 rounded-xl border border-navy-200 bg-navy-50/60 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Editorial inbox</p>
        <p className="mt-1.5 text-lg font-semibold text-navy-900">
          <a href={`mailto:${siteConfig.contactEmail}`} className="underline underline-offset-4">
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>

      <h2>What to write about</h2>
      <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
        {REASONS.map((reason) => (
          <div key={reason.heading} className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-serif text-base font-bold text-navy-900">{reason.heading}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{reason.body}</p>
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(reason.subject)}`}
              className="mt-3 inline-block text-sm font-semibold text-navy-700 underline underline-offset-2"
            >
              Email us about this
            </a>
          </div>
        ))}
      </div>

      <h2>What we cannot help with</h2>
      <p>
        We cannot answer questions about your own case, review your documents, tell you whether to
        file, estimate what a claim is worth, or recommend a lawyer. Those are legal services and we
        are a publisher - see our <Link href="/disclaimer">disclaimer</Link>. Please do not send us
        pleadings, medical records, policy numbers or anything else confidential: our inbox is not
        privileged and we would only have to delete it.
      </p>
      <p>
        If you need advice on a live matter, contact a licensed attorney in your jurisdiction. Court
        self-help centres, legal aid organisations, bar association referral lines and law school
        clinics are the usual routes when cost is a barrier.
      </p>

      <h2>Response times</h2>
      <ul>
        <li>Corrections: acknowledged within two business days.</li>
        <li>Privacy requests: substantively answered within one month, as GDPR requires.</li>
        <li>Everything else: as soon as we reasonably can.</li>
      </ul>

      <h2>Why there is no contact form</h2>
      <p>
        A form would mean collecting and storing your details on our infrastructure. Email keeps the
        data minimisation promise in our{' '}
        <Link href="/privacy-policy">privacy policy</Link> simple and verifiable: we hold only the
        message you chose to send us, for as long as it takes to act on it.
      </p>
    </LegalPage>
  );
}
