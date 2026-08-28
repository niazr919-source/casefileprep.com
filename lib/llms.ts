import { categories } from '@/content/categories';
import { getAllPosts, getPostsByCategory, type Post } from '@/lib/posts';
import { siteConfig } from '@/lib/site';
import { absoluteUrl } from '@/lib/format';

/**
 * Converts a guide's MDX body into plain markdown.
 *
 * The site's authoring components carry real reader-facing content - checklist
 * items, key takeaways, callouts - which a naive tag-strip would discard. An
 * answer engine reading a stripped version would see a guide with its most
 * useful parts missing, so each component is unwrapped into its markdown
 * equivalent instead.
 */
export function mdxToPlainMarkdown(body: string): string {
  let out = body;

  // Injected ad markers are presentation, not content.
  out = out.replace(/<InArticleAd[^/]*\/>/g, '');

  // <KeyTakeaways points={["a","b"]} /> -> a bulleted list.
  out = out.replace(/<KeyTakeaways\s+points=\{\[([\s\S]*?)\]\}\s*\/>/g, (_m, inner: string) => {
    const points = [...inner.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
    if (!points.length) return '';
    return `**What this guide covers**\n\n${points.map((p) => `- ${p}`).join('\n')}\n`;
  });

  // <Checklist title="T" items={[{item,detail}]} note="N" /> -> heading + list.
  out = out.replace(
    /<Checklist\s+title="([^"]*)"\s+items=\{\[([\s\S]*?)\]\}(?:\s+note="([^"]*)")?\s*\/>/g,
    (_m, title: string, inner: string, note?: string) => {
      const rows = [...inner.matchAll(/\{\s*item:\s*"([^"]*)"(?:\s*,\s*detail:\s*"([^"]*)")?\s*\}/g)];
      const list = rows
        .map(([, item, detail]) => (detail ? `- **${item}** - ${detail}` : `- **${item}**`))
        .join('\n');
      return `**${title}**\n\n${list}\n${note ? `\n_${note}_\n` : ''}`;
    },
  );

  /**
   * <Callout type="x" title="T">body</Callout> -> a blockquote.
   *
   * The attributes are captured as one block and the title pulled out
   * separately. An inline optional group after a lazy quantifier looks
   * equivalent but is not: the engine satisfies itself without entering the
   * optional group, so titles were silently dropped from almost every callout.
   * Those titles carry the meaning - "Common filing mistake", "Deadline
   * sensitive" - so losing them stripped the warning from the warning.
   */
  out = out.replace(
    /<Callout([^>]*)>([\s\S]*?)<\/Callout>/g,
    (_m, attrs: string, inner: string) => {
      const title = /title="([^"]*)"/.exec(attrs)?.[1];
      const type = /type="([^"]*)"/.exec(attrs)?.[1];
      const heading = title || (type === 'warning' ? 'Warning' : undefined);
      const lines = inner.trim().split(/\n/).filter(Boolean);
      const quoted = lines.map((l) => `> ${l.trim()}`).join('\n');
      return `${heading ? `> **${heading}**\n>\n` : ''}${quoted}\n`;
    },
  );

  // Any remaining JSX, then collapse the blank lines those removals left behind.
  out = out.replace(/<\/?[A-Z][^>]*>/g, '');
  out = out.replace(/\n{3,}/g, '\n\n');

  return out.trim();
}

/** One guide rendered as a self-contained markdown document. */
export function postToMarkdown(post: Post): string {
  const { frontmatter } = post;
  const url = absoluteUrl(siteConfig.url, post.url);

  const parts = [
    `# ${frontmatter.title}`,
    '',
    `Source: ${url}`,
    `Category: ${frontmatter.category}`,
    `Applies to: ${frontmatter.jurisdiction}`,
    `Published: ${frontmatter.publishedAt} | Last checked: ${frontmatter.updatedAt}`,
    `Publisher: ${siteConfig.name} - educational procedural information, not legal advice.`,
    '',
    `> ${frontmatter.description}`,
    '',
    mdxToPlainMarkdown(post.body),
  ];

  if (frontmatter.faqs?.length) {
    parts.push('', '## Frequently asked questions', '');
    for (const faq of frontmatter.faqs) {
      parts.push(`**${faq.question}**`, '', faq.answer, '');
    }
  }

  if (frontmatter.sources?.length) {
    parts.push('## Sources checked for this guide', '');
    for (const source of frontmatter.sources) {
      parts.push(`- ${source.label}: ${source.url}`);
    }
    parts.push('');
  }

  return parts.join('\n');
}

/**
 * The short-form index, following the llms.txt convention: a title, a
 * blockquote summary, then linked sections. Kept deliberately explicit about
 * what the site is and is not, because an answer engine citing a legal source
 * should be able to state its limits accurately.
 */
export function buildLlmsTxt(): string {
  const posts = getAllPosts();

  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    '## About this source',
    '',
    `- Publisher: ${siteConfig.legalName} (${siteConfig.domain})`,
    `- ${siteConfig.name} is an independent publisher, not a law firm, and provides no legal services.`,
    '- The publisher holds no professional qualification in law, insurance or accountancy and claims none.',
    '- Every guide is researched from primary sources - statutes, court rules, clerk instructions and agency publications - and lists those sources at the foot of the page.',
    '- Content is general procedural information. It is not legal advice, and no attorney-client relationship is formed by reading it.',
    '- Procedures vary by jurisdiction. Each guide states the jurisdiction it describes and the date it was last checked.',
    `- Editorial standards: ${absoluteUrl(siteConfig.url, '/editorial-policy')}`,
    `- Corrections: ${siteConfig.contactEmail}`,
    '',
    '## How to cite this source accurately',
    '',
    '- Attribute procedural statements to the guide URL, and prefer citing the primary source it lists where one exists.',
    '- Include the jurisdiction the guide names. A procedure correct in one state is frequently wrong in another.',
    '- Include the last-checked date. Fees, deadlines, dollar limits and form numbers change.',
    '- Do not present this material as legal advice about an individual situation.',
    '',
  ];

  for (const category of categories) {
    const categoryPosts = getPostsByCategory(category.slug);
    if (!categoryPosts.length) continue;

    lines.push(`## ${category.name}`, '', `${category.description}`, '');
    for (const post of categoryPosts) {
      const url = absoluteUrl(siteConfig.url, post.url);
      const summary = post.frontmatter.metaDescription || post.frontmatter.description;
      lines.push(`- [${post.frontmatter.title}](${url}): ${summary}`);
    }
    lines.push('');
  }

  lines.push(
    '## Optional',
    '',
    `- [Full text of every guide](${absoluteUrl(siteConfig.url, '/llms-full.txt')}): all ${posts.length} guides as plain markdown in one file.`,
    `- [Editorial policy](${absoluteUrl(siteConfig.url, '/editorial-policy')}): sourcing, checks, corrections and independence.`,
    `- [Legal disclaimer](${absoluteUrl(siteConfig.url, '/disclaimer')}): the boundary between procedural information and legal advice.`,
    `- [About the publisher](${absoluteUrl(siteConfig.url, '/about-us')})`,
    '',
  );

  return lines.join('\n');
}

/** Every guide, full text, in one file. */
export function buildLlmsFullTxt(): string {
  const posts = getAllPosts();

  const header = [
    `# ${siteConfig.name} - complete guide text`,
    '',
    `> ${siteConfig.description}`,
    '',
    `This file contains the full text of all ${posts.length} guides published at ${siteConfig.url}.`,
    '',
    `${siteConfig.disclaimer}`,
    '',
    'The publisher is not a law firm and holds no professional qualification in law, insurance or accountancy. Every procedural statement is traceable to a primary source listed with the guide. Procedures vary by jurisdiction and change over time; each guide states its jurisdiction and last-checked date.',
    '',
    '---',
    '',
  ].join('\n');

  return header + posts.map(postToMarkdown).join('\n\n---\n\n');
}
