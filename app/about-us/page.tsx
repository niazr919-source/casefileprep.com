import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { authors } from '@/content/authors';
import { breadcrumbSchema, organizationSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Who publishes CaseFilePrep, the editorial team behind the guides, how the site is funded, and the boundary we keep between procedural information and legal advice.',
  alternates: { canonical: '/about-us' },
};

export default function AboutPage() {
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about-us' },
  ];

  return (
    <>
      <JsonLd id="about" data={[organizationSchema(), breadcrumbSchema(trail)]} />

      <div className="mx-auto max-w-shell px-4 pb-16 pt-6">
        <Breadcrumbs trail={trail} />

        <header className="mt-5 max-w-3xl">
          <h1 className="text-[32px] font-bold leading-tight text-navy-900 sm:text-[40px]">
            About {siteConfig.name}
          </h1>
          <p className="mt-4 text-[18px] leading-relaxed text-slate-600">
            We publish the procedural half of the legal system - the paperwork, the sequence, the
            deadlines - for people who are handling it themselves.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="article-prose lg:col-span-8">
            <h2>Why this site exists</h2>
            <p>
              Most people meet the legal system through paperwork, not argument. A small claims case
              is won or lost on whether you brought the invoice, the text messages and the delivery
              receipt in an order the judge can follow. An LLC is formed or rejected on whether the
              registered agent line was filled in correctly. An insurance claim is paid quickly or
              slowly depending on whether the file contains the police report number, photographs
              and receipts.
            </p>
            <p>
              That procedural layer is public, knowable and largely un-explained. Court self-help
              pages are accurate but written for someone who already knows the vocabulary.
              Commercial sites explain just enough to sell a service. We sit in the gap: complete,
              plain-English, source-checked procedure with nothing to upsell.
            </p>

            <h2>What we are not</h2>
            <p>
              {siteConfig.name} is a publisher, not a law firm. We do not give legal advice, review
              documents, prepare filings, or represent anyone. We have no referral arrangements with
              law firms and we do not take a cut of anyone&rsquo;s case. When a matter needs a
              lawyer, our guides say so plainly rather than talking you out of it - that is the
              point at which our usefulness ends. See the{' '}
              <Link href="/disclaimer">full disclaimer</Link>.
            </p>

            <h2>How we work</h2>
            <p>
              Every guide is written by a named contributor with direct experience of the process,
              checked line by line against primary sources - statutes, court rules, clerk
              instructions, agency publications - and reviewed by a second named person before it
              publishes. Each guide carries a last-reviewed date and a list of the sources checked.
              We re-review on a six-month cycle and immediately when a rule changes. The full
              standard is written down in our <Link href="/editorial-policy">editorial policy</Link>.
            </p>

            <h2>How the site is funded</h2>
            <p>
              Advertising, served by third parties including Google. That is the whole model. There
              are no paid placements in editorial content, no sponsored guides, no affiliate
              commissions on legal services, and no reader paywall. Ad units are labelled and kept
              clearly separate from the text so you always know which is which. Details of the
              cookies involved, and how to refuse them, are in our{' '}
              <Link href="/privacy-policy">privacy policy</Link>.
            </p>

            <h2>Who we write for</h2>
            <p>
              Readers in the United States, United Kingdom, Canada and Australia who are preparing
              their own documents, plus the small-business owners, office managers and support
              workers who help them. Where a procedure is jurisdiction-specific, the guide names the
              jurisdiction at the top and does not pretend to travel further than it does.
            </p>

            <h2>Talk to us</h2>
            <p>
              Corrections, questions and press:{' '}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. We treat
              a correction as the most valuable email we can receive. More ways to reach us are on
              the <Link href="/contact">contact page</Link>.
            </p>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                At a glance
              </h2>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-navy-900">Publisher</dt>
                  <dd className="text-slate-600">{siteConfig.legalName}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-900">Founded</dt>
                  <dd className="text-slate-600">{siteConfig.founded}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-900">Coverage</dt>
                  <dd className="text-slate-600">{siteConfig.markets.join(', ')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-900">Funding</dt>
                  <dd className="text-slate-600">Display advertising only</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-900">Editorial contact</dt>
                  <dd className="break-words text-slate-600">{siteConfig.contactEmail}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <section aria-labelledby="team" className="mt-14">
          <h2 id="team" className="font-serif text-2xl font-bold text-navy-900 sm:text-3xl">
            Editorial team
          </h2>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-slate-600">
            Every guide names its writer and its reviewer. None of our contributors is acting as
            your attorney.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {authors.map((author) => (
              <article key={author.slug} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white"
                  >
                    {author.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-bold text-navy-900">
                      <Link href={`/authors/${author.slug}`} className="hover:underline">
                        {author.name}
                      </Link>
                    </h3>
                    <p className="text-sm font-semibold text-accent-600">{author.role}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{author.credentials}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{author.bio}</p>
                <Link
                  href={`/authors/${author.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-navy-700 hover:underline"
                >
                  Full profile and guides
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
