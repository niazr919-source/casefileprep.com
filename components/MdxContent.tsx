import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import AdSlot from '@/components/AdSlot';
import Callout from '@/components/mdx/Callout';
import Checklist from '@/components/mdx/Checklist';
import KeyTakeaways from '@/components/mdx/KeyTakeaways';

function SmartLink({ href = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return <a href={href} rel="noopener noreferrer nofollow" target="_blank" {...props} />;
  }
  return <Link href={href} {...props} />;
}

/**
 * Marker injected by lib/mdx.ts after body paragraphs 2 and 6. The index is
 * accepted so the injector can stay declarative, and is available if the
 * slots are ever split into separate ad units.
 */
function InArticleAd(_props: { index: number }) {
  return <AdSlot variant="in-article" />;
}

const components = {
  a: SmartLink,
  InArticleAd,
  Callout,
  Checklist,
  KeyTakeaways,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="not-prose my-7 overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-navy-900"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-slate-100 px-4 py-3 align-top text-slate-700" {...props} />
  ),
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'wrap',
                properties: { className: 'no-underline hover:underline decoration-slate-300' },
              },
            ],
          ],
        },
      }}
    />
  );
}
