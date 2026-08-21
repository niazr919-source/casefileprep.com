import Link from 'next/link';

export type Crumb = { name: string; href: string };

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="not-prose">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-semibold text-slate-700 line-clamp-1">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="hover:text-navy-800 hover:underline">
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-slate-300">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
