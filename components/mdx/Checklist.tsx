export type ChecklistEntry = {
  item: string;
  detail?: string;
};

/**
 * Printable, non-interactive checklist. Rendered as a semantic list rather
 * than form inputs so it stays useful when printed and adds no client JS.
 */
export default function Checklist({
  title,
  items,
  note,
}: {
  title: string;
  items: ChecklistEntry[];
  note?: string;
}) {
  return (
    <section className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200">
      <h3 className="border-b border-slate-200 bg-navy-900 px-5 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white">
        {title}
      </h3>
      <ul className="divide-y divide-slate-100 bg-white">
        {items.map((entry) => (
          <li key={entry.item} className="flex gap-3 px-5 py-3.5">
            <span
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 rounded-[3px] border-2 border-navy-300 bg-white"
            />
            <div>
              <p className="text-[15px] font-semibold leading-snug text-navy-900">{entry.item}</p>
              {entry.detail ? (
                <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{entry.detail}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      {note ? (
        <p className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-[13px] leading-relaxed text-slate-600">
          {note}
        </p>
      ) : null}
    </section>
  );
}
