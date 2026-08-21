import type { MetadataRoute } from 'next';
import { authors } from '@/content/authors';
import { categories } from '@/content/categories';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/site';
import { absoluteUrl } from '@/lib/format';

// Emitted as a static sitemap.xml at build time (required by output: 'export').
export const dynamic = 'force-static';

const url = (path: string) => absoluteUrl(siteConfig.url, path);

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: url('/guides'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/about-us'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/editorial-policy'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/privacy-policy'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/terms-of-service'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/disclaimer'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: url(post.url),
    lastModified: new Date(post.frontmatter.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: url(`/category/${category.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
    url: url(`/authors/${author.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...categoryPages, ...authorPages];
}
