'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/mdx';

type Props = {
  items: TocItem[];
  className?: string;
};

export default function TableOfContents({ items, className = '' }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav aria-labelledby="toc-heading" className={`not-prose ${className}`}>
      <h2
        id="toc-heading"
        className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
      >
        On this page
      </h2>
      <ol className="mt-3 space-y-1.5 border-l border-slate-200 text-[13px]">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l-2 py-1 pl-3 leading-snug transition-colors ${
                activeId === item.id
                  ? 'border-accent-500 font-semibold text-navy-900'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-navy-800'
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
