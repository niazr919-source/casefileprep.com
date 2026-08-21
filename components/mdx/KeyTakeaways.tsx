export default function KeyTakeaways({ points }: { points: string[] }) {
  if (!points?.length) return null;
  return (
    <section
      aria-labelledby="key-takeaways"
      className="not-prose my-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
    >
      <h2 id="key-takeaways" className="text-sm font-bold uppercase tracking-[0.12em] text-navy-900">
        What this guide covers
      </h2>
      <ul className="mt-3 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-700">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="mt-1 h-4 w-4 shrink-0 text-accent-500"
              fill="currentColor"
            >
              <path d="M8.5 14.2 4.3 10l1.4-1.4 2.8 2.8 6-6L15.9 6z" />
            </svg>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
