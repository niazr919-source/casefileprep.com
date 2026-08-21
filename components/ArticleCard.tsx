import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { formatDate } from '@/lib/format';

type Props = {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
};

export default function ArticleCard({ post, variant = 'default' }: Props) {
  const { frontmatter } = post;

  if (variant === 'compact') {
    return (
      <article className="border-b border-slate-200 py-4 last:border-0">
        <Link href={post.url} className="group block">
          <h3 className="font-serif text-base font-bold leading-snug text-navy-900 group-hover:text-navy-700">
            {frontmatter.title}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {frontmatter.category} &middot; {post.readingMinutes} min read
          </p>
        </Link>
      </article>
    );
  }

  const featured = variant === 'featured';

  return (
    <article
      className={`group flex flex-col rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_6px_24px_rgba(15,30,51,0.08)] ${
        featured ? 'p-6 sm:p-7' : 'p-5'
      }`}
    >
      <Link
        href={`/category/${frontmatter.categorySlug}`}
        className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-600 hover:underline"
      >
        {frontmatter.category}
      </Link>

      <h3
        className={`mt-2 font-serif font-bold leading-snug text-navy-900 ${
          featured ? 'text-2xl sm:text-[26px]' : 'text-lg'
        }`}
      >
        <Link href={post.url} className="hover:text-navy-700">
          {frontmatter.title}
        </Link>
      </h3>

      <p className={`mt-2.5 leading-relaxed text-slate-600 ${featured ? 'text-[15px]' : 'text-sm'}`}>
        {frontmatter.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 pt-3 text-xs text-slate-500 border-t border-slate-100">
        <span className="font-semibold text-slate-700">{post.authorProfile.name}</span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={frontmatter.updatedAt}>Updated {formatDate(frontmatter.updatedAt)}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{post.readingMinutes} min read</span>
        <span aria-hidden="true">&middot;</span>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600">
          {frontmatter.jurisdiction}
        </span>
      </div>
    </article>
  );
}
