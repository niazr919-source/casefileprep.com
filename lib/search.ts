import { getAllPosts } from '@/lib/posts';

export type SearchDoc = {
  slug: string;
  url: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  minutes: number;
  /** Lowercased haystack of everything searchable, built once at build time. */
  haystack: string;
};

/**
 * Builds the client search index at build time.
 *
 * Deliberately not a search library. Twenty-seven guides is a few kilobytes of
 * JSON - shipping a full-text engine to rank that many documents would cost
 * more bandwidth than the index itself. Keywords and tags are folded into the
 * haystack so a search for "screenshot" finds the text-message guide even
 * though that word is not in its title.
 */
export function buildSearchIndex(): SearchDoc[] {
  return getAllPosts().map((post) => {
    const { frontmatter } = post;
    const haystack = [
      frontmatter.title,
      frontmatter.headline,
      frontmatter.description,
      frontmatter.metaDescription,
      frontmatter.category,
      ...frontmatter.keywords,
      ...frontmatter.tags,
      ...(frontmatter.faqs || []).map((f) => f.question),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return {
      slug: post.slug,
      url: post.url,
      title: frontmatter.title,
      description: frontmatter.metaDescription || frontmatter.description,
      category: frontmatter.category,
      categorySlug: frontmatter.categorySlug,
      minutes: post.readingMinutes,
      haystack,
    };
  });
}
