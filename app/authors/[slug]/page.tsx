import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { authors, authorMap } from '@/content/authors';
import { getPostsByAuthor } from '@/lib/posts';
import { breadcrumbSchema, personSchema } from '@/lib/schema';

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = authorMap[slug];
  if (!author) return {};
  return {
    title: `${author.name} - ${author.role}`,
    description: author.bio.slice(0, 155),
    alternates: { canonical: `/authors/${author.slug}` },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = authorMap[slug];
  if (!author) notFound();

  const posts = getPostsByAuthor(author.slug);
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about-us' },
    { name: author.name, href: `/authors/${author.slug}` },
  ];

  return (
    <>
      <JsonLd id="author" data={[personSchema(author), breadcrumbSchema(trail)]} />

      <div className="mx-auto max-w-shell px-4 pb-16 pt-6">
        <Breadcrumbs trail={trail} />

        <header className="mt-6 flex flex-col gap-5 sm:flex-row">
          <span
            aria-hidden="true"
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy-800 text-2xl font-bold text-white"
          >
            {author.initials}
          </span>
          <div className="max-w-2xl">
            <h1 className="text-[30px] font-bold leading-tight text-navy-900 sm:text-[36px]">
              {author.name}
            </h1>
            <p className="mt-1 text-base font-semibold text-accent-600">{author.role}</p>
            <p className="mt-1 text-sm text-slate-500">{author.credentials}</p>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-700">{author.bio}</p>
            <p className="mt-4 rounded-lg bg-slate-50 p-4 text-[15px] leading-relaxed text-slate-600">
              <span className="font-semibold text-navy-900">Experience: </span>
              {author.experience}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {author.expertise.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-800"
                >
                  {item}
                </li>
              ))}
            </ul>
            {author.linkedin ? (
              <p className="mt-4 text-sm">
                <a
                  href={author.linkedin}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="font-semibold text-navy-700 underline underline-offset-2"
                >
                  Professional profile
                </a>
              </p>
            ) : null}
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              {author.name} is not a practising attorney and does not provide legal advice or
              representation through this site. See our{' '}
              <Link href="/disclaimer" className="underline underline-offset-2">
                disclaimer
              </Link>
              .
            </p>
          </div>
        </header>

        {posts.length ? (
          <section aria-labelledby="author-posts" className="mt-12">
            <h2 id="author-posts" className="font-serif text-2xl font-bold text-navy-900">
              Guides written or reviewed by {author.name}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : null}

        <AdSlot variant="in-feed" className="mt-10" />
      </div>
    </>
  );
}
