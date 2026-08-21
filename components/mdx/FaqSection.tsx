import type { Faq } from '@/lib/posts';

/**
 * Renders the FAQ block that FAQPage JSON-LD mirrors. Uses native
 * details/summary so answers are in the HTML for crawlers, expandable
 * without JavaScript, and cause no layout shift on load.
 */
export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (!faqs?.length) return null;

  return (
    <section aria-labelledby="faq" className="not-prose mt-12">
      <h2 id="faq" className="font-serif text-2xl font-bold text-navy-900">
        Frequently asked questions
      </h2>
      <div className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {faqs.map((faq) => (
          <details key={faq.question} className="group px-5 py-4 open:bg-slate-50/60">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold leading-snug text-navy-900 marker:hidden">
              {faq.question}
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-45"
                fill="currentColor"
              >
                <path d="M9 4h2v12H9z M4 9h12v2H4z" />
              </svg>
            </summary>
            <p className="mt-2.5 text-[15px] leading-relaxed text-slate-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
