import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

type Props = {
  /** Main headline. Keep it short - long strings shrink to stay in frame. */
  title: string;
  /** Small label above the title, e.g. the category. */
  eyebrow?: string;
  /** One line under the title. */
  footnote?: string;
};

/**
 * Shared Open Graph card.
 *
 * Every page declared `twitter:card = summary_large_image` while providing no
 * image, so shares rendered as blank cards. Generating these at build time
 * costs nothing at request time and makes links look like they come from a
 * real publication.
 *
 * Deliberately text-only: no remote fonts or images to fetch, so the build
 * cannot fail on a network hiccup, and the card stays legible at the small
 * sizes messaging apps actually render.
 */
export function renderOgImage({ title, eyebrow, footnote }: Props) {
  // Long titles step down in size rather than overflowing the card.
  const titleSize = title.length > 90 ? 52 : title.length > 60 ? 62 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0f1e33',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? (
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: '#b1893f',
                fontWeight: 700,
                marginBottom: 28,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: titleSize,
              lineHeight: 1.15,
              color: '#ffffff',
              fontWeight: 700,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #204573',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 52,
                height: 52,
                borderRadius: 10,
                backgroundColor: '#ffffff',
                color: '#0f1e33',
                fontSize: 24,
                fontWeight: 700,
                marginRight: 18,
              }}
            >
              CP
            </div>
            <div style={{ display: 'flex', fontSize: 32, color: '#ffffff', fontWeight: 700 }}>
              CaseFile
              <span style={{ color: '#b1893f' }}>Prep</span>
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#93b4d9' }}>
            {footnote || 'Educational information, not legal advice'}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
