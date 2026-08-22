import Link from 'next/link';
import type { Author } from '@/content/authors';
import { formatDate } from '@/lib/format';

type Props = {
  author: Author;
  publishedAt: string;
  updatedAt: string;
};

/**
 * Provenance block shown at the foot of every guide.
 *
 * This used to present a named writer and a separate named reviewer. Both were
 * invented, so both are gone. What replaces them is the part that is actually
 * true and checkable: who publishes this, what qualifications are and are not
 * held, how the guide was researched, when it was last checked, and where the
 * sources are. Transparency about limits is a stronger trust signal than a
 * credential nobody can verify.
 */
export default function AuthorBio({ author, publishedAt, updatedAt }: Props) {
  return (
    <section
      aria-labelledby="about-this-guide"
      className="not-prose mt-12 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <h2
        id="about-this-guide"
        className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
      >
        About this guide
      </h2>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-800 text-base font-bold text-white"
        >
          {author.initials}
        </span>
        <div className="min-w-0">
          <p className="font-serif text-lg font-bold text-navy-900">
            <Link href={`/authors/${author.slug}`} className="hover:underline">
              {author.name}
            </Link>
          </p>
          <p className="text-sm font-semibold text-accent-600">{author.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{author.bio}</p>

          <p className="mt-3 rounded-md bg-amber-50/70 p-3 text-[13px] leading-relaxed text-slate-700">
            <span className="font-semibold text-navy-900">What we are not: </span>
            {author.credentials} Use this guide to understand the process, then confirm the details
            with the court, agency or insurer handling your matter, and take advice from a licensed
            attorney about your own situation.
          </p>

          <p className="mt-3 rounded-md bg-slate-50 p-3 text-[13px] leading-relaxed text-slate-600">
            <span className="font-semibold text-navy-900">How this guide was researched: </span>
            {author.experience}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 border-t border-slate-200 pt-5 text-[13px] sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-slate-500">First published</dt>
          <dd className="text-slate-800">{formatDate(publishedAt)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Last checked</dt>
          <dd className="text-slate-800">{formatDate(updatedAt)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Sources</dt>
          <dd className="text-slate-800">Listed above, linked to the issuing authority</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Found something out of date or wrong?{' '}
        <Link href="/contact" className="font-semibold underline underline-offset-2">
          Tell us
        </Link>{' '}
        - corrections are the most useful message we receive. Our{' '}
        <Link href="/editorial-policy" className="font-semibold underline underline-offset-2">
          editorial policy
        </Link>{' '}
        sets out how we research, what we refuse to publish, and how we handle corrections.
      </p>
    </section>
  );
}
