import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdSlot from '@/components/AdSlot';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { categories, getCategory } from '@/content/categories';
import { getPostsByCategory } from '@/lib/posts';
import { breadcrumbSchema, collectionSchema } from '@/lib/schema';

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    // Category names are already long; the suffix pushes the combined title
    // past the ~60 characters Google shows.
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      type: 'website',
      title: `${category.name} Guides & Checklists`,
      description: category.description,
      url: `/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
    { name: category.name, href: `/category/${category.slug}` },
  ];

  return (
    <>
      <JsonLd
        id="category"
        data={[collectionSchema(category, posts), breadcrumbSchema(trail)]}
      />

      <div className="mx-auto max-w-shell px-4">
        <AdSlot variant="leaderboard" className="mb-2 mt-4" />
      </div>

      <div className="mx-auto max-w-shell px-4 pb-16">
        <Breadcrumbs trail={trail} />

        <header className="mt-4 max-w-3xl">
          <h1 className="text-[32px] font-bold leading-tight text-navy-900 sm:text-[40px]">
            {category.name}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-600">{category.intro}</p>
          <p className="mt-3 text-sm text-slate-500">
            {posts.length} {posts.length === 1 ? 'guide' : 'guides'} in this topic. Everything here
            is general procedural information, not legal advice.
          </p>
        </header>

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
