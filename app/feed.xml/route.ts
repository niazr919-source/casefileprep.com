import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/site';
import { absoluteUrl } from '@/lib/format';

// Emitted as a static file at build time so it can be served by Apache.
export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const posts = getAllPosts();
  const updated = posts[0]?.frontmatter.updatedAt || new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(siteConfig.url, post.url);
      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <category>${escapeXml(post.frontmatter.category)}</category>
      <dc:creator>${escapeXml(post.authorProfile.name)}</dc:creator>
      <pubDate>${new Date(post.frontmatter.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} - ${escapeXml(siteConfig.tagline)}</title>
    <link>${absoluteUrl(siteConfig.url, '/')}</link>
    <atom:link href="${absoluteUrl(siteConfig.url, '/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
    <copyright>Copyright ${new Date().getUTCFullYear()} ${escapeXml(siteConfig.legalName)}</copyright>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
