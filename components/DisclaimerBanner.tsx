import Link from 'next/link';
import { siteConfig } from '@/lib/site';

type Props = {
  variant?: 'bar' | 'article';
  className?: string;
};

/**
 * The sitewide legal disclaimer. The `bar` variant sits above the header on
 * every page; the `article` variant is rendered at the top of every guide,
 * above the first paragraph, where it cannot be missed.
 */
export default function DisclaimerBanner({ variant = 'bar', className = '' }: Props) {
  if (variant === 'bar') {
    return (
      <div className={`border-b border-navy-800 bg-navy-950 text-navy-100 ${className}`}>
        <div className="mx-auto max-w-shell px-4 py-2">
          <p className="text-center text-[12px] leading-snug sm:text-[13px]">
            <span className="font-semibold text-white">Disclaimer:</span>{' '}
            The information provided on this website is for general educational and informational
            purposes only and does not constitute formal legal advice. No attorney-client
            relationship is formed.{' '}
            <Link
              href="/disclaimer"
              className="whitespace-nowrap font-semibold text-navy-200 underline underline-offset-2 hover:text-white"
            >
              Read the full disclaimer
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Legal disclaimer"
      className={`not-prose rounded-lg border-l-4 border-accent-500 bg-amber-50/70 p-4 sm:p-5 ${className}`}
    >
      <h2 className="m-0 text-sm font-bold uppercase tracking-wide text-navy-900">
        Educational information, not legal advice
      </h2>
      <p className="mb-0 mt-2 text-sm leading-relaxed text-slate-700">
        {siteConfig.disclaimer} Procedures, forms, fees and deadlines change and vary by court,
        state and country. Always confirm the current requirements with the court or agency handling
        your matter, and consult a licensed attorney in your jurisdiction about your specific
        situation.{' '}
        <Link href="/disclaimer" className="font-semibold text-navy-700 underline underline-offset-2">
          Full disclaimer
        </Link>{' '}
        &middot;{' '}
        <Link
          href="/editorial-policy"
          className="font-semibold text-navy-700 underline underline-offset-2"
        >
          How we research and review
        </Link>
      </p>
    </section>
  );
}
