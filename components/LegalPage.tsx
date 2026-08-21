import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { formatDate } from '@/lib/format';

type Props = {
  title: string;
  intro: string;
  updated: string;
  href: string;
  children: ReactNode;
};

/**
 * Shell for policy pages. Deliberately ad-free: AdSense policy discourages
 * ads on utility pages such as privacy policies, and a clean policy page
 * reads as more trustworthy during review.
 */
export default function LegalPage({ title, intro, updated, href, children }: Props) {
  const trail = [
    { name: 'Home', href: '/' },
    { name: title, href },
  ];

  return (
    <>
      <JsonLd id="legal" data={breadcrumbSchema(trail)} />
      <div className="mx-auto max-w-content px-4 pb-16 pt-6">
        <Breadcrumbs trail={trail} />
        <header className="mt-5 border-b border-slate-200 pb-6">
          <h1 className="text-[32px] font-bold leading-tight text-navy-900 sm:text-[38px]">
            {title}
          </h1>
          <p className="mt-3 text-[17px] leading-relaxed text-slate-600">{intro}</p>
          <p className="mt-3 text-sm text-slate-500">
            Last updated: <time dateTime={updated}>{formatDate(updated)}</time>
          </p>
        </header>
        <div className="article-prose mt-8">{children}</div>
      </div>
    </>
  );
}
