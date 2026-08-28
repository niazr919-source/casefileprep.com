import { buildLlmsTxt } from '@/lib/llms';

export const dynamic = 'force-static';

/**
 * llms.txt - a short, structured description of the site for answer engines.
 *
 * The convention is young and adoption is uneven, so treat this as cheap
 * insurance rather than a guaranteed channel. What it costs is one generated
 * file; what it buys, if a crawler does read it, is that the model sees an
 * accurate statement of what this publisher is, what it is not, and how to
 * cite it - rather than inferring all three.
 */
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
