import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { categories } from '@/content/categories';

export default function Footer() {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-shell px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-xl font-bold text-white">
              CaseFile<span className="text-accent-500">Prep</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Procedural legal prep guides, document checklists and filing walkthroughs for people
              organising their own paperwork. Educational information only.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Serving readers in the United States, United Kingdom, Canada and Australia.
            </p>
          </div>

          <nav aria-label="Guide categories">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Guide topics</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/guides" className="text-slate-400 transition-colors hover:text-white">
                  All guides
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Policies and legal">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
              Policies &amp; legal
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.footerLegal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
              Editorial contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Corrections &amp; feedback
                </Link>
              </li>
              <li>
                <Link href="/feed.xml" className="transition-colors hover:text-white">
                  RSS feed
                </Link>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              We do not accept payment for editorial coverage and we do not refer readers to specific
              law firms.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-navy-800 bg-navy-900/60 p-4">
          <p className="text-xs leading-relaxed text-slate-400">
            <span className="font-semibold text-slate-200">Legal disclaimer:</span>{' '}
            {siteConfig.disclaimer} {siteConfig.name} is not a law firm, is not a lawyer referral
            service, and does not provide legal representation, legal opinions or document review.
            Court rules, statutes, filing fees and deadlines change frequently and differ by
            jurisdiction. Verify every requirement with the relevant court, agency or a licensed
            attorney before you act.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-navy-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>
            Advertising on this site is served by third parties, including Google. See our{' '}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-white">
              Privacy Policy
            </Link>{' '}
            for cookie and personalised-ads details.
          </p>
        </div>
      </div>
    </footer>
  );
}
