import GithubSlugger from 'github-slugger';

export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

const FENCE = /^(```|~~~)/;

/**
 * Blocks that are NOT body paragraphs: headings, lists, quotes, tables,
 * fences, JSX components, thematic breaks and frontmatter-ish markers.
 */
function isParagraphBlock(block: string): boolean {
  const first = block.trimStart();
  if (!first) return false;
  if (/^(#{1,6}\s|>|-\s|\*\s|\+\s|\d+\.\s|\||<|:::|---|===|!\[)/.test(first)) return false;
  return true;
}

/**
 * Splits raw MDX body into top-level blocks while keeping fenced code
 * blocks intact, so an ad is never injected inside a code sample.
 */
function splitBlocks(source: string): string[] {
  const lines = source.split(/\r?\n/);
  const blocks: string[] = [];
  let current: string[] = [];
  let inFence = false;

  const flush = () => {
    if (current.length) {
      const joined = current.join('\n').trim();
      if (joined) blocks.push(joined);
      current = [];
    }
  };

  for (const line of lines) {
    if (FENCE.test(line.trim())) {
      inFence = !inFence;
      current.push(line);
      continue;
    }
    if (!inFence && line.trim() === '') {
      flush();
      continue;
    }
    current.push(line);
  }
  flush();
  return blocks;
}

/**
 * Injects in-article ad slots after the Nth body paragraph.
 *
 * AdSense policy note: ads are placed after complete paragraphs of original
 * editorial content only. If the article is too short to reach a marker,
 * that slot is silently skipped rather than stacked at the end.
 */
export function injectInArticleAds(source: string, afterParagraphs: number[] = [2, 6]): string {
  const blocks = splitBlocks(source);
  const targets = new Set(afterParagraphs);
  const out: string[] = [];
  let paragraphCount = 0;
  let adIndex = 0;

  for (const block of blocks) {
    out.push(block);
    if (isParagraphBlock(block)) {
      paragraphCount += 1;
      if (targets.has(paragraphCount)) {
        adIndex += 1;
        out.push(`<InArticleAd index={${adIndex}} />`);
      }
    }
  }

  return out.join('\n\n');
}

/** Extracts h2/h3 headings for the table of contents, matching rehype-slug ids. */
export function extractToc(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of source.split(/\r?\n/)) {
    if (FENCE.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const title = match[2]
      .replace(/`/g, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/\[(.+?)\]\(.*?\)/g, '$1')
      .trim();

    items.push({ id: slugger.slug(title), title, level });
  }

  return items;
}

/** Rough word count of the body, ignoring JSX tags and markdown syntax. */
export function countWords(source: string): number {
  const text = source
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>|`-]/g, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}
