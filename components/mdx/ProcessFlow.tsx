export type FlowStep = {
  label: string;
  detail?: string;
  /** Optional short note shown as a warning pill, e.g. a deadline. */
  flag?: string;
};

/**
 * A numbered sequence rendered as a connected flow.
 *
 * Several guides describe processes where the *order* is the point - a filing
 * that must follow acceptance, an appeal that must exhaust one stage before
 * the next. A checklist implies items can be ticked in any order; this does
 * not. Built in HTML rather than SVG so it reflows on a phone, prints
 * legibly, and stays readable to a screen reader as an ordered list.
 */
export default function ProcessFlow({
  title,
  steps,
  note,
}: {
  title: string;
  steps: FlowStep[];
  note?: string;
}) {
  return (
    <figure className="not-prose my-8">
      <figcaption className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-navy-900">
        {title}
      </figcaption>

      <ol className="relative">
        {steps.map((step, index) => {
          const last = index === steps.length - 1;
          return (
            <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
              {/* Connector line between markers */}
              {!last ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 bg-navy-200"
                />
              ) : null}

              <span
                aria-hidden="true"
                className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[13px] font-bold text-white"
              >
                {index + 1}
              </span>

              <div className="min-w-0 pt-0.5">
                <p className="text-[15px] font-semibold leading-snug text-navy-900">
                  {step.label}
                </p>
                {step.detail ? (
                  <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{step.detail}</p>
                ) : null}
                {step.flag ? (
                  <p className="mt-2 inline-block rounded bg-amber-100 px-2 py-0.5 text-[12px] font-semibold text-amber-900">
                    {step.flag}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      {note ? (
        <p className="mt-4 border-t border-slate-200 pt-3 text-[13px] leading-relaxed text-slate-500">
          {note}
        </p>
      ) : null}
    </figure>
  );
}
