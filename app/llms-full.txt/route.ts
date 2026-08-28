import { buildLlmsFullTxt } from '@/lib/llms';

export const dynamic = 'force-static';

/**
 * Every guide as plain markdown in a single file.
 *
 * Answer engines that fetch a page get HTML wrapped in navigation, ad slots
 * and consent UI. This serves the same content as clean prose, with the
 * authoring components unwrapped into markdown rather than stripped, so the
 * checklists and key points survive.
 */
export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
