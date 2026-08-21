import Link from 'next/link';
import type { Author } from '@/content/authors';
import { formatDate } from '@/lib/format';

type Props = {
  author: Author;
  reviewer: Author;
  publishedAt: string;
  updatedAt: string;
};

function Avatar({ initials, tone }: { initials: string; tone: 'navy' | 'slate' }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${
        tone === 'navy' ? 'bg-navy-800' : 'bg-slate-600'
      }`}
    >
      {initials}
    </span>
  );
}

/**
 * E-E-A-T block: names the writer, their first-hand experience, the named
 * reviewer, and the publication/review dates. Rendered at the foot of every
 * guide and mirrored in Article JSON-LD (author + reviewedBy).
 */
export default function AuthorBio({ author, reviewer, publishedAt, updatedAt }: Props) {
  return (
    <section
      aria-labelledby="about-the-author"
      className="not-prose mt-12 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <h2
        id="about-the-author"
        className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
      >
        About the author
      </h2>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Avatar initials={author.initials} tone="navy" />
        <div className="min-w-0">
          <p className="font-serif text-lg font-bold text-navy-900">
            <Link href={`/authors/${author.slug}`} className="hover:underline">
              {author.name}
            </Link>
          </p>
          <p className="text-sm font-semibold text-accent-600">{author.role}</p>
          <p className="mt-0.5 text-xs text-slate-500">{author.credentials}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{author.bio}</p>
          <p className="mt-3 rounded-md bg-slate-50 p-3 text-[13px] leading-relaxed text-slate-600">
            <span className="font-semibold text-navy-900">Relevant experience: </span>
            {author.experience}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {author.expertise.map((item) => (
              <li
                key={item}
                className="rounded-full bg-navy-50 px-2.5 py-1 text-[11px] font-semibold text-navy-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row">
        <Avatar initials={reviewer.initials} tone="slate" />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Reviewed by Legal Research Team
          </p>
          <p className="mt-1 font-serif text-base font-bold text-navy-900">
            <Link href={`/authors/${reviewer.slug}`} className="hover:underline">
              {reviewer.name}
            </Link>
          </p>
          <p className="text-sm text-slate-600">{reviewer.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{reviewer.bio}</p>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 border-t border-slate-200 pt-5 text-[13px] sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-slate-500">First published</dt>
          <dd className="text-slate-800">{formatDate(publishedAt)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Last reviewed</dt>
          <dd className="text-slate-800">{formatDate(updatedAt)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Review cycle</dt>
          <dd className="text-slate-800">
            Every 6 months, or sooner if the underlying rules change
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Our contributors are legal-procedure researchers, paralegals and former industry
        professionals. They are not acting as your attorney and nothing on this page is legal advice
        about your situation. Read our{' '}
        <Link href="/editorial-policy" className="font-semibold underline underline-offset-2">
          editorial policy
        </Link>
        .
      </p>
    </section>
  );
}
