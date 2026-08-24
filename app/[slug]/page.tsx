import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSlot from '@/components/AdSlot';
import ArticleCard from '@/components/ArticleCard';
import AuthorBio from '@/components/AuthorBio';
import Breadcrumbs from '@/components/Breadcrumbs';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import FaqSection from '@/components/mdx/FaqSection';
import JsonLd from '@/components/JsonLd';
import MdxContent from '@/components/MdxContent';
import SourceList from '@/components/SourceList';
import TableOfContents from '@/components/TableOfContents';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { formatDate } from '@/lib/format';
import { siteConfig } from '@/lib/site';

// Required for `output: 'export'` - only the slugs below are built, anything
// else 404s. Guides regenerate on deploy rather than on a revalidate timer.
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;
  // Google truncates the title around 60 characters and the description around
  // 155. The on-page H1 and dek stay long and descriptive; these are the
  // shorter forms written for the search result itself.
  const seoTitle = frontmatter.headline || frontmatter.title;
  const seoDescription = frontmatter.metaDescription || frontmatter.description;
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: frontmatter.keywords,
    alternates: { canonical: post.url },
    authors: [
      { name: post.authorProfile.name, url: `${siteConfig.url}/authors/${post.authorProfile.slug}` },
    ],
    openGraph: {
      type: 'article',
      url: post.url,
      title: seoTitle,
      description: seoDescription,
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [post.authorProfile.name],
      section: frontmatter.category,
      tags: frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter } = post;
  const related = getRelatedPosts(post, 3);
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
    { name: frontmatter.category, href: `/category/${frontmatter.categorySlug}` },
    { name: frontmatter.title, href: post.url },
  ];

  return (
    <>
      <JsonLd
        id="article"
        data={[
          articleSchema(post),
          breadcrumbSchema(trail),
          faqSchema(frontmatter.faqs || []) as Record<string, unknown>,
        ].filter(Boolean)}
      />

      {/* Leaderboard: below the header, above the headline, clearly labelled
          and separated from navigation so it can never be mis-clicked. */}
      <div className="mx-auto max-w-shell px-4">
        <AdSlot variant="leaderboard" className="mb-2 mt-4" />
      </div>

      <div className="mx-auto max-w-shell px-4 pb-16">
        <Breadcrumbs trail={trail} />

        <header className="mt-4 max-w-content">
          <Link
            href={`/category/${frontmatter.categorySlug}`}
            className="text-xs font-bold uppercase tracking-[0.14em] text-accent-600 hover:underline"
          >
            {frontmatter.category}
          </Link>
          <h1 className="mt-2.5 text-[32px] font-bold leading-[1.15] text-navy-900 sm:text-[40px]">
            {frontmatter.title}
          </h1>
          <p className="mt-4 text-[18px] leading-relaxed text-slate-600">
            {frontmatter.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-y border-slate-200 py-3 text-[13px] text-slate-600">
            <span>
              By{' '}
              <Link
                href={`/authors/${post.authorProfile.slug}`}
                className="font-semibold text-navy-800 hover:underline"
              >
                {post.authorProfile.name}
              </Link>
            </span>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            <span>Researched from the sources listed at the foot of this guide</span>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            <time dateTime={frontmatter.updatedAt}>
              Updated {formatDate(frontmatter.updatedAt)}
            </time>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            <span>{post.readingMinutes} min read</span>
            <span className="rounded bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
              Applies to: {frontmatter.jurisdiction}
            </span>
          </div>
        </header>

        <div className="mt-8 gap-10 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-8">
            <DisclaimerBanner variant="article" className="mb-8" />

            {/* Mobile TOC: inline, collapsed, no layout shift. */}
            <details className="not-prose mb-8 rounded-lg border border-slate-200 bg-slate-50 p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.12em] text-navy-900">
                On this page
              </summary>
              <TableOfContents items={post.toc} className="mt-3" />
            </details>

            <article className="article-prose">
              <MdxContent source={post.body} />
            </article>

            <FaqSection faqs={frontmatter.faqs || []} />
            <SourceList sources={frontmatter.sources || []} />

            <AuthorBio
              author={post.authorProfile}
              publishedAt={frontmatter.publishedAt}
              updatedAt={frontmatter.updatedAt}
            />

            <DisclaimerBanner variant="article" className="mt-8" />
          </div>

          <aside className="mt-12 lg:col-span-4 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <div className="hidden rounded-xl border border-slate-200 bg-white p-5 lg:block">
                <TableOfContents items={post.toc} />
              </div>

              {/* Sticky 300x600 skyscraper, desktop only. Height reserved
                  ahead of load so the sidebar never shifts. */}
              <AdSlot variant="sidebar" className="hidden lg:block" />

              {related.length ? (
                <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
                  <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    More checklists
                  </h2>
                  <div className="mt-1">
                    {related.map((item) => (
                      <ArticleCard key={item.slug} post={item} variant="compact" />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </div>

        {related.length ? (
          <section aria-labelledby="related" className="mt-16 border-t border-slate-200 pt-10">
            <h2 id="related" className="font-serif text-2xl font-bold text-navy-900">
              Related preparation guides
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        ) : null}

        {/* In-feed native slot, above the footer and after the editorial feed. */}
        <AdSlot variant="in-feed" className="mt-10" />
      </div>
    </>
  );
}
