type Side = {
  title: string;
  subtitle?: string;
  points: string[];
};

/**
 * Two options side by side.
 *
 * Several guides turn on a binary choice - member-managed or manager-managed,
 * DBA or LLC, replacement cost or actual cash value. A prose comparison makes
 * the reader hold both columns in their head; this does not. Stacks on mobile
 * rather than shrinking to unreadable columns.
 */
export default function Comparison({
  a,
  b,
  verdict,
}: {
  a: Side;
  b: Side;
  /** One line on how to actually choose, shown under both columns. */
  verdict?: string;
}) {
  const sides = [a, b];

  return (
    <figure className="not-prose my-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {sides.map((side, index) => (
          <div
            key={side.title}
            className={`rounded-xl border p-5 ${
              index === 0 ? 'border-navy-200 bg-navy-50/50' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <p className="font-serif text-lg font-bold text-navy-900">{side.title}</p>
            {side.subtitle ? (
              <p className="mt-0.5 text-[13px] font-semibold text-accent-600">{side.subtitle}</p>
            ) : null}
            <ul className="mt-3 space-y-2">
              {side.points.map((point) => (
                <li key={point} className="flex gap-2 text-[14px] leading-relaxed text-slate-700">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-navy-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {verdict ? (
        <figcaption className="mt-4 rounded-lg bg-white p-4 text-[14px] leading-relaxed text-slate-700 ring-1 ring-slate-200">
          <span className="font-semibold text-navy-900">How to choose: </span>
          {verdict}
        </figcaption>
      ) : null}
    </figure>
  );
}
