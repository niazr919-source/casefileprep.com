type Source = { label: string; url: string };

/**
 * Primary-source citations. Trustworthiness signal for E-E-A-T: readers can
 * verify every procedural claim against the court or agency that publishes it.
 */
export default function SourceList({ sources }: { sources: Source[] }) {
  if (!sources?.length) return null;

  return (
    <section aria-labelledby="sources" className="not-prose mt-12 rounded-xl bg-slate-50 p-5 sm:p-6">
      <h2 id="sources" className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        Sources checked for this guide
      </h2>
      <ol className="mt-3 space-y-2 text-[14px] leading-relaxed text-slate-700">
        {sources.map((source, index) => (
          <li key={source.url} className="flex gap-2">
            <span className="font-semibold text-slate-400">{index + 1}.</span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-medium text-navy-700 underline underline-offset-2 hover:text-navy-900"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Government and court websites are the controlling authority for procedure. Where this guide
        and an official source disagree, the official source governs - and we want to know, so we
        can correct it.
      </p>
    </section>
  );
}
