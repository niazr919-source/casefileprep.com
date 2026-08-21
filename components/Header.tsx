'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex max-w-shell items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-900 text-sm font-bold text-white"
          >
            CP
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-bold tracking-tight text-navy-900">
              CaseFile<span className="text-accent-500">Prep</span>
            </span>
            <span className="mt-0.5 hidden text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 sm:block">
              Legal prep &amp; filing guides
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-navy-50 text-navy-900'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-navy-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/guides"
          className="ml-auto hidden rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 lg:ml-0 lg:inline-block"
        >
          Browse checklists
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-navy-900 lg:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="mx-auto max-w-shell px-4 py-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/guides" className="block py-3 text-sm font-semibold text-navy-900">
                Browse all checklists
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
