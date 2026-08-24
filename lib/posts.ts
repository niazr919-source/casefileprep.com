import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { getAuthor, type Author } from '@/content/authors';
import { getCategory, type Category } from '@/content/categories';
import { extractToc, injectInArticleAds, type TocItem } from '@/lib/mdx';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export type Faq = { question: string; answer: string };

export type PostFrontmatter = {
  title: string;
  headline?: string;
  description: string;
  /** Short meta description (<=160 chars). Falls back to `description`. */
  metaDescription?: string;
  slug: string;
  category: string;
  categorySlug: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  jurisdiction: string;
  keywords: string[];
  tags: string[];
  featured?: boolean;
  sources?: { label: string; url: string }[];
  faqs?: Faq[];
};

export type Post = {
  frontmatter: PostFrontmatter;
  slug: string;
  url: string;
  /** Raw MDX body with in-article ad markers already injected. */
  body: string;
  toc: TocItem[];
  readingMinutes: number;
  wordCount: number;
  authorProfile: Author;
  categoryProfile?: Category;
};

function requireString(value: unknown, field: string, file: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Missing required frontmatter field "${field}" in ${file}`);
  }
  return value.trim();
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string' && value.trim()) return value.split(',').map((s) => s.trim());
  return [];
}

function parseFile(fileName: string): Post {
  const fullPath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  const slug = (typeof data.slug === 'string' && data.slug.trim()
    ? data.slug.trim()
    : fileName.replace(/\.mdx?$/, '')
  ).replace(/^\//, '');

  const frontmatter: PostFrontmatter = {
    title: requireString(data.title, 'title', fileName),
    headline: typeof data.headline === 'string' ? data.headline : undefined,
    description: requireString(data.description, 'description', fileName),
    metaDescription:
      typeof data.metaDescription === 'string' ? data.metaDescription.trim() : undefined,
    slug,
    category: requireString(data.category, 'category', fileName),
    categorySlug: requireString(data.categorySlug, 'categorySlug', fileName),
    author: requireString(data.author, 'author', fileName),
    publishedAt: requireString(data.publishedAt, 'publishedAt', fileName),
    updatedAt: requireString(data.updatedAt || data.publishedAt, 'updatedAt', fileName),
    jurisdiction: requireString(data.jurisdiction, 'jurisdiction', fileName),
    keywords: toArray(data.keywords),
    tags: toArray(data.tags),
    featured: Boolean(data.featured),
    sources: Array.isArray(data.sources) ? (data.sources as { label: string; url: string }[]) : [],
    faqs: Array.isArray(data.faqs) ? (data.faqs as Faq[]) : [],
  };

  const stats = readingTime(content);

  return {
    frontmatter,
    slug,
    url: `/${slug}`,
    body: injectInArticleAds(content),
    toc: extractToc(content),
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    wordCount: stats.words,
    authorProfile: getAuthor(frontmatter.author),
    categoryProfile: getCategory(frontmatter.categorySlug),
  };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) return [];

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parseFile)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime(),
    );

  cache = posts;
  return posts;
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.categorySlug === categorySlug);
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.author === authorSlug);
}

/** Same category first, then newest, excluding the current post. */
export function getRelatedPosts(current: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== current.slug);
  const sameCategory = others.filter(
    (p) => p.frontmatter.categorySlug === current.frontmatter.categorySlug,
  );
  const rest = others.filter((p) => p.frontmatter.categorySlug !== current.frontmatter.categorySlug);
  return [...sameCategory, ...rest].slice(0, limit);
}
