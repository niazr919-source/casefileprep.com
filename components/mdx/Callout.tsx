import type { ReactNode } from 'react';

type Tone = 'note' | 'warning' | 'deadline' | 'tip';

const TONES: Record<Tone, { wrapper: string; label: string; title: string }> = {
  note: {
    wrapper: 'border-navy-200 bg-navy-50/60',
    label: 'text-navy-800',
    title: 'Good to know',
  },
  warning: {
    wrapper: 'border-red-200 bg-red-50/70',
    label: 'text-red-800',
    title: 'Common filing mistake',
  },
  deadline: {
    wrapper: 'border-amber-300 bg-amber-50/70',
    label: 'text-amber-900',
    title: 'Deadline sensitive',
  },
  tip: {
    wrapper: 'border-emerald-200 bg-emerald-50/70',
    label: 'text-emerald-900',
    title: 'From the file room',
  },
};

export default function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: Tone;
  title?: string;
  children: ReactNode;
}) {
  const tone = TONES[type] ?? TONES.note;
  return (
    <aside className={`not-prose my-7 rounded-lg border p-4 sm:p-5 ${tone.wrapper}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.12em] ${tone.label}`}>
        {title || tone.title}
      </p>
      <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-slate-700 [&_a]:font-semibold [&_a]:text-navy-700 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-navy-900">
        {children}
      </div>
    </aside>
  );
}
