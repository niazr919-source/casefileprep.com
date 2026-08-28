import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Written as a route handler rather than Next's `robots.ts` metadata export so
 * the file can carry comments and point crawlers at llms.txt - neither of
 * which the MetadataRoute.Robots shape supports.
 *
 * The AI crawlers below are listed explicitly even though `User-agent: *`
 * already permits them. Being explicit documents the intent, and protects the
 * allowance from being lost if the wildcard rule is ever tightened.
 *
 * The trade-off is deliberate and worth stating: allowing these agents means
 * this content can be used both for grounding cited answers AND for model
 * training. A publisher who wants citations has to accept being read. If that
 * calculation ever changes, the training-oriented agents (GPTBot, ClaudeBot,
 * CCBot, Google-Extended, Applebot-Extended) are the ones to disallow, while
 * keeping the user-initiated and search agents allowed.
 */
const ROBOTS = `# ${siteConfig.name} - ${siteConfig.domain}
# Educational procedural information. Not legal advice.
# Machine-readable summary for answer engines: ${siteConfig.url}/llms.txt
# Full guide text as markdown: ${siteConfig.url}/llms-full.txt

User-agent: *
Allow: /
Disallow: /api/
Disallow: /search/

# --- Google ---------------------------------------------------------------
User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: AdsBot-Google-Mobile
Allow: /

# --- OpenAI ---------------------------------------------------------------
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# --- Anthropic ------------------------------------------------------------
User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

# --- Perplexity -----------------------------------------------------------
User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# --- Other answer engines and crawlers ------------------------------------
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: cohere-ai
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
Host: ${siteConfig.url}
`;

export function GET() {
  return new Response(ROBOTS, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
