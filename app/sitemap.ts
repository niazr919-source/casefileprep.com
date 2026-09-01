import type { MetadataRoute } from 'next';
import { authors } from '@/content/authors';
import { categories } from '@/content/categories';
import { getAllPosts, getPostsByCategory } from '@/lib/posts';
import { siteConfig, LEGAL_PAGES_UPDATED } from '@/lib/site';
import { absoluteUrl } from '@/lib/format';

// Emitted as a static sitemap.xml at build time (required by output: 'export').
export const dynamic = 'force-static';

const url = (path: string) => absoluteUrl(siteConfig.url, path);

/**
 * `lastModified` must reflect when a page's content actually changed.
 *
 * This previously used `new Date()` for every non-guide URL, which stamped
 * "changed today" on twelve pages on every single deploy - including policy
 * pages nobody had touched in weeks. Search engines notice sitemaps that
 * report false freshness and start discounting the field entirely, which then
 * costs accuracy on the updates that are real.
 *
 * Listing pages now derive their date from the newest guide they contain,
 * which is genuinely when they last changed. Policy pages carry their own
 * stated revision date.
 */
function newest(dates: string[], fallback: string): Date {
  const times = dates.map((d) => new Date(d).getTime()).filter((t) => !Number.isNaN(t));
  return times.length ? new Date(Math.max(...times)) : new Date(fallback);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const allUpdated = posts.map((p) => p.frontmatter.updatedAt);
  const newestPost = newest(allUpdated, LEGAL_PAGES_UPDATED);
  const legalUpdated = new Date(LEGAL_PAGES_UPDATED);

  const listingPages: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: newestPost, changeFrequency: 'weekly', priority: 1 },
    { url: url('/guides'), lastModified: newestPost, changeFrequency: 'weekly', priority: 0.9 },
  ];

  const legalPages: MetadataRoute.Sitemap = [
    { url: url('/about-us'), lastModified: legalUpdated, changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/editorial-policy'), lastModified: legalUpdated, changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/contact'), lastModified: legalUpdated, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/privacy-policy'), lastModified: legalUpdated, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/terms-of-service'), lastModified: legalUpdated, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/disclaimer'), lastModified: legalUpdated, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: url(post.url),
    lastModified: new Date(post.frontmatter.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: url(`/category/${category.slug}`),
    // A category page changes when a guide in it changes.
    lastModified: newest(
      getPostsByCategory(category.slug).map((p) => p.frontmatter.updatedAt),
      LEGAL_PAGES_UPDATED,
    ),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
    url: url(`/authors/${author.slug}`),
    lastModified: newestPost,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...listingPages, ...legalPages, ...postPages, ...categoryPages, ...authorPages];
}
