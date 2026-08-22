'use client';

import { useEffect, useRef } from 'react';
import { adsense } from '@/lib/site';

export type AdVariant = 'leaderboard' | 'in-article' | 'sidebar' | 'in-feed';

type AdSlotProps = {
  variant: AdVariant;
  className?: string;
  /** Optional label suffix, e.g. "Advertisement - continues below". */
  note?: string;
};

/**
 * Reserved-height ad container.
 *
 * Design rules baked in, per AdSense publisher policies:
 *  - every slot carries a visible "Advertisement" label above the creative;
 *  - the frame is visually distinct from editorial content (border + tint);
 *  - height is reserved before the creative loads, so CLS stays at 0;
 *  - generous spacing keeps ads away from navigation and buttons, which
 *    prevents accidental clicks.
 *
 * Until NEXT_PUBLIC_ADSENSE_CLIENT is set, the slot renders as an inert
 * placeholder of the exact final size. Nothing is requested from Google, so
 * the site can be crawled and reviewed before ad code goes live.
 */
const VARIANTS: Record<
  AdVariant,
  { label: string; minHeight: string; format: string; layoutKey?: string; sizeHint: string }
> = {
  leaderboard: {
    label: 'Advertisement',
    minHeight: 'min-h-[110px] md:min-h-[120px]',
    format: 'horizontal',
    sizeHint: '728 x 90 / 320 x 50 responsive',
  },
  'in-article': {
    label: 'Advertisement',
    minHeight: 'min-h-[280px]',
    format: 'fluid',
    layoutKey: 'in-article',
    sizeHint: 'Responsive in-article',
  },
  sidebar: {
    label: 'Advertisement',
    minHeight: 'min-h-[610px]',
    format: 'vertical',
    sizeHint: '300 x 600 half page',
  },
  'in-feed': {
    label: 'Advertisement',
    minHeight: 'min-h-[280px]',
    format: 'fluid',
    layoutKey: 'in-feed',
    sizeHint: 'Native in-feed',
  },
};

const SLOT_IDS: Record<AdVariant, string> = {
  leaderboard: adsense.slots.leaderboard,
  'in-article': adsense.slots.inArticle,
  sidebar: adsense.slots.sidebar,
  'in-feed': adsense.slots.inFeed,
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({ variant, className = '', note }: AdSlotProps) {
  const config = VARIANTS[variant];
  const slotId = SLOT_IDS[variant];
  const live = Boolean(adsense.client && slotId);
  const pushed = useRef(false);

  useEffect(() => {
    if (!live || pushed.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      /* AdSense script blocked or not yet loaded - nothing renders. */
    }
  }, [live]);

  /**
   * Between approval and creating ad units there is a window where the
   * publisher ID exists but slot IDs do not. Rendering a grey "Ad slot
   * reserved" box in that window makes a finished site look like scaffolding,
   * and "under construction" appearance is a documented AdSense rejection
   * reason. So the placeholder is a development aid only - in production an
   * unconfigured slot renders nothing at all.
   */
  if (!live && process.env.NODE_ENV !== 'development') return null;

  return (
    <aside
      aria-label="Advertisement"
      role="complementary"
      className={`not-prose my-8 overflow-hidden rounded-lg border border-slate-200 bg-slate-50/70 ${className}`}
    >
      <p className="border-b border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {config.label}
        {note ? <span className="ml-1 font-normal normal-case tracking-normal">{note}</span> : null}
      </p>
      <div className={`flex w-full items-center justify-center px-2 py-3 ${config.minHeight}`}>
        {live ? (
          <ins
            className="adsbygoogle block w-full"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={adsense.client}
            data-ad-slot={slotId}
            data-ad-format={config.format}
            {...(config.layoutKey ? { 'data-ad-layout': config.layoutKey } : {})}
            data-full-width-responsive="true"
          />
        ) : (
          <span className="select-none text-center text-xs leading-relaxed text-slate-400">
            Ad slot reserved
            <br />
            <span className="text-[11px]">{config.sizeHint}</span>
          </span>
        )}
      </div>
    </aside>
  );
}
