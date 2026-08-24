import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { getAllPosts } from '@/lib/posts';
import { breadcrumbSchema } from '@/lib/schema';
import { categories } from '@/content/categories';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Guides & Document Checklists',
  description:
    'Every CaseFilePrep guide in one place: small claims evidence checklists, LLC formation steps and insurance claim documentation. Not legal advice.',
  alternates: { canonical: '/guides' },
};

export default function GuidesPage() {
  const posts = getAllPosts();
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
  ];

  return (
    <>
      <JsonLd id="guides" data={breadcrumbSchema(trail)} />

      <div className="mx-auto max-w-shell px-4">
        <AdSlot variant="leaderboard" className="mb-2 mt-4" />
      </div>

      <div className="mx-auto max-w-shell px-4 pb-16">
        <Breadcrumbs trail={trail} />

        <header className="mt-4 max-w-3xl">
          <h1 className="text-[32px] font-bold leading-tight text-navy-900 sm:text-[40px]">
            All preparation guides
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
            Each guide walks one procedure end to end: what to gather, the order it goes in, where it
            gets filed, and the mistakes that cause rejections and delays. None of it is legal
            advice about your specific matter.
          </p>
        </header>

        <nav aria-label="Categories" className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-full border border-slate-300 px-3.5 py-1.5 text-[13px] font-semibold text-slate-700 transition-colors hover:border-navy-300 hover:bg-navy-50 hover:text-navy-900"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>

        <AdSlot variant="in-feed" className="mt-10" />
      </div>
    </>
  );
}
