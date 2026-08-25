'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { SearchDoc } from '@/lib/search';
import { categories } from '@/content/categories';

/**
 * Client-side search over a build-time index.
 *
 * Every term must match somewhere in the document, so "texas agent" finds the
 * registered-agent guide while "texas medical" finds nothing - which is the
 * behaviour people expect. Results are ranked by where the match landed:
 * a title hit outranks a keyword hit.
 */
function score(doc: SearchDoc, terms: string[]): number {
  const title = doc.title.toLowerCase();
  const description = doc.description.toLowerCase();

  let total = 0;
  for (const term of terms) {
    if (!doc.haystack.includes(term)) return 0;
    if (title.includes(term)) total += 10;
    else if (description.includes(term)) total += 4;
    else total += 1;
  }
  return total;
}

export default function SearchClient({ docs }: { docs: SearchDoc[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  /**
   * Seeds the box from `?q=`, which is what the SearchAction in our WebSite
   * schema points at. Read after mount rather than from searchParams so the
   * page stays statically prerendered instead of becoming dynamic.
   */
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('q');
    if (initial) setQuery(initial);
  }, []);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const pool = category ? docs.filter((d) => d.categorySlug === category) : docs;

    if (!terms.length) return pool;

    return pool
      .map((doc) => ({ doc, rank: score(doc, terms) }))
      .filter((entry) => entry.rank > 0)
      .sort((a, b) => b.rank - a.rank)
      .map((entry) => entry.doc);
  }, [query, category, docs]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="site-search" className="sr-only">
            Search guides
          </label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search guides - try 'text messages', 'EIN', 'police report'"
            autoComplete="off"
            className="w-full rounded-md border border-slate-300 bg-white py-3 pl-11 pr-4 text-[15px] text-slate-800 placeholder:text-slate-400 focus:border-navy-400"
          />
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5 18 18" strokeLinecap="round" />
          </svg>
        </div>

        <div>
          <label htmlFor="search-category" className="sr-only">
            Filter by topic
          </label>
          <select
            id="search-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white py-3 pl-3 pr-8 text-[15px] text-slate-700 sm:w-auto"
          >
            <option value="">All topics</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-slate-500">
        {query || category
          ? `${results.length} ${results.length === 1 ? 'guide' : 'guides'} found`
          : `Showing all ${results.length} guides`}
      </p>

      {results.length ? (
        <ul className="mt-4 divide-y divide-slate-200 border-t border-slate-200">
          {results.map((doc) => (
            <li key={doc.slug} className="py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-600">
                {doc.category}
              </p>
              <h2 className="mt-1 font-serif text-lg font-bold leading-snug text-navy-900">
                <Link href={doc.url} className="hover:underline">
                  {doc.title}
                </Link>
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{doc.description}</p>
              <p className="mt-1.5 text-xs text-slate-500">{doc.minutes} min read</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <p className="text-[15px] font-semibold text-navy-900">
            Nothing matched &ldquo;{query}&rdquo;
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Try a single word rather than a phrase, or browse{' '}
            <Link href="/guides" className="font-semibold text-navy-700 underline underline-offset-2">
              all guides
            </Link>
            . If we have not covered the procedure you are looking for,{' '}
            <Link href="/contact" className="font-semibold text-navy-700 underline underline-offset-2">
              tell us
            </Link>{' '}
            - suggestions genuinely shape what we write next.
          </p>
        </div>
      )}
    </div>
  );
}
