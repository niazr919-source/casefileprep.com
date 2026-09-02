import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import ArticleCard from '@/components/ArticleCard';
import { categories } from '@/content/categories';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Legal Document Prep Checklists & Court Filing Guides',
  description:
    'Step-by-step document checklists for small claims court, LLC formation and insurance claims. Sourced from court rules and agency guidance. Not legal advice.',
  alternates: { canonical: '/' },
};

const TRUST_POINTS = [
  {
    title: 'Open about what we are',
    body: 'We are researchers and writers, not lawyers, and we say so on every guide. No qualification we do not hold is claimed anywhere on this site. Where a question needs a licensed professional, the guide says that plainly instead of guessing.',
  },
  {
    title: 'Checked against primary sources',
    body: 'Every procedural claim is verified against court rules, clerk instructions, statutes and agency publications. Sources are listed at the foot of each guide so you can confirm them.',
  },
  {
    title: 'Reviewed and re-reviewed on a schedule',
    body: 'Each guide carries the date it was first published and the date it was last checked against its sources. Guides are re-checked at least every six months, and sooner when a rule or fee changes.',
  },
  {
    title: 'Process information, never legal advice',
    body: 'We explain what the paperwork is and the order it goes in. We do not tell you what to argue, whether to file, or how your case should turn out - that requires a licensed attorney.',
  },
];

/**
 * Guides shown on the homepage beside the featured one.
 *
 * Ten keeps the grid filling complete rows next to the two-column lead card,
 * and keeps the page a reasonable length. Everything else lives on /guides.
 */
const HOMEPAGE_GUIDE_COUNT = 10;

export default function HomePage() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;
  const homepagePosts = rest.slice(0, HOMEPAGE_GUIDE_COUNT);
  const remaining = rest.length - homepagePosts.length;

  return (
    <>
      <div className="mx-auto max-w-shell px-4">
        <AdSlot variant="leaderboard" className="mb-2 mt-4" />
      </div>

      <section className="border-b border-slate-200 bg-gradient-to-b from-navy-50/70 to-white">
        <div className="mx-auto max-w-shell px-4 py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-600">
              Legal prep &middot; Document checklists &middot; Filing procedure
            </p>
            <h1 className="mt-3 text-[34px] font-bold leading-[1.12] text-navy-900 sm:text-[46px]">
              Get your paperwork right before you file it.
            </h1>
            <p className="mt-5 text-[18px] leading-relaxed text-slate-600">
              {siteConfig.name} publishes plain-English procedural guides for people assembling
              their own documents - small claims evidence packets, LLC formation filings, insurance
              claim files. Every guide is a checklist you can work through in order, built by
              reading the official rules and instructions and citing every source, so you can check
              our work.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/guides"
                className="rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                Browse all checklists
              </Link>
              <Link
                href="/editorial-policy"
                className="rounded-md border border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50"
              >
                How we research
              </Link>
            </div>
            <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-slate-500">
              <strong className="text-slate-700">Disclaimer:</strong> {siteConfig.disclaimer}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-4 py-12">
        <section aria-labelledby="latest">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="latest" className="font-serif text-2xl font-bold text-navy-900 sm:text-3xl">
              Latest preparation guides
            </h2>
            <Link
              href="/guides"
              className="shrink-0 text-sm font-semibold text-navy-700 hover:underline"
            >
              View all
            </Link>
          </div>

          {/*
            One grid, with the lead card spanning two columns.

            This was previously a 7/5 split: the featured guide alone on the
            left and every remaining guide stacked in the right column. That
            read fine at three guides and broke badly at thirty-nine - one card
            beside a column thirty-eight cards tall, leaving most of the page
            empty. A single flowing grid fills the row at every breakpoint
            regardless of how many guides exist.
          */}
          {lead ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2">
                <ArticleCard post={lead} variant="featured" />
              </div>
              {homepagePosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-slate-600">No guides published yet.</p>
          )}

          {remaining > 0 ? (
            <p className="mt-8 text-center">
              <Link
                href="/guides"
                className="inline-block rounded-md border border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50"
              >
                Browse all {posts.length} guides
              </Link>
            </p>
          ) : null}
        </section>

        <AdSlot variant="in-feed" className="mt-10" />

        <section aria-labelledby="topics" className="mt-14">
          <h2 id="topics" className="font-serif text-2xl font-bold text-navy-900 sm:text-3xl">
            Browse by topic
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {categories.map((category) => {
              const count = posts.filter((p) => p.frontmatter.categorySlug === category.slug).length;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-[0_6px_24px_rgba(15,30,51,0.08)]"
                >
                  <h3 className="font-serif text-lg font-bold text-navy-900 group-hover:text-navy-700">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {category.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent-600">
                    {count} {count === 1 ? 'guide' : 'guides'}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="trust"
          className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
        >
          <h2 id="trust" className="font-serif text-2xl font-bold text-navy-900 sm:text-3xl">
            Why you can rely on these checklists
          </h2>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-slate-600">
            Procedural information is only useful if it is current and honest about its limits.
            Here is how {siteConfig.name} handles both.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {TRUST_POINTS.map((point) => (
              <div key={point.title}>
                <h3 className="font-serif text-lg font-bold text-navy-900">{point.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{point.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Read the{' '}
            <Link href="/editorial-policy" className="font-semibold text-navy-700 underline underline-offset-2">
              full editorial policy
            </Link>{' '}
            or{' '}
            <Link href="/about-us" className="font-semibold text-navy-700 underline underline-offset-2">
              meet the team
            </Link>
            .
          </p>
        </section>

        {/*
          Bottom-of-page slot. Kept below the editorial content rather than
          between the guide grid and the topic cards, so it never sits between
          two things a reader is comparing - which is where accidental clicks
          come from.
        */}
        <AdSlot variant="in-feed" className="mt-14" />
      </div>
    </>
  );
}
