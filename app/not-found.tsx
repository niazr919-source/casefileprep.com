import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-shell px-4 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-600">Error 404</p>
      <h1 className="mt-2 text-[32px] font-bold leading-tight text-navy-900 sm:text-[40px]">
        We could not find that page
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-slate-600">
        The guide may have been renamed, or the link may be incomplete. Start from the guide index,
        or pick one of the checklists below.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/guides"
          className="rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800"
        >
          All guides
        </Link>
        <Link
          href="/"
          className="rounded-md border border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-50"
        >
          Home
        </Link>
      </div>

      {posts.length ? (
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
