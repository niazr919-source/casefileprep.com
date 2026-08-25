import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchClient from '@/components/SearchClient';
import { buildSearchIndex } from '@/lib/search';

export const metadata: Metadata = {
  title: 'Search Guides',
  description:
    'Search every CaseFilePrep guide by topic, procedure or keyword. Educational procedural information, not legal advice.',
  alternates: { canonical: '/search' },
  // Search result pages are thin and near-duplicative of the guide index, so
  // they stay out of the index while remaining crawlable for link discovery.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const docs = buildSearchIndex();
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/search' },
  ];

  return (
    <div className="mx-auto max-w-content px-4 pb-16 pt-6">
      <Breadcrumbs trail={trail} />

      <header className="mt-5">
        <h1 className="text-[30px] font-bold leading-tight text-navy-900 sm:text-[36px]">
          Search guides
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-slate-600">
          {docs.length} procedural guides across small claims, business formation and insurance
          claims. Search by procedure, document or the question you actually have.
        </p>
      </header>

      <div className="mt-8">
        <SearchClient docs={docs} />
      </div>
    </div>
  );
}
