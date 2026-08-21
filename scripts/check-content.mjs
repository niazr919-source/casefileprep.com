/**
 * Content quality gate.
 *
 * Ad platforms and search quality raters reject thin, unattributed or
 * undated content. This runs in CI so a guide that would drag the whole
 * domain down cannot reach the live site.
 *
 * Run locally with: npm run check
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const AUTHORS_FILE = path.join(process.cwd(), 'content', 'authors.ts');
const CATEGORIES_FILE = path.join(process.cwd(), 'content', 'categories.ts');

const MIN_WORDS = 1200;
const MIN_FAQS = 3;
const MIN_SOURCES = 2;
const MIN_POSTS = 10;

const REQUIRED_FIELDS = [
  'title',
  'description',
  'slug',
  'category',
  'categorySlug',
  'author',
  'reviewer',
  'publishedAt',
  'updatedAt',
  'jurisdiction',
];

/**
 * Phrases that turn educational procedure into individual legal advice.
 * These are what a policy reviewer flags on a legal-information site, and
 * what would put the publisher on the wrong side of unauthorised-practice
 * rules. Matched case-insensitively against the article body.
 */
const ADVICE_PHRASES = [
  'you should sue',
  'we recommend you file',
  'you will win',
  'you are entitled to',
  'your case is worth',
  'i advise you',
  'we advise you to',
  'guaranteed outcome',
  'you will definitely',
];

const authorsSrc = fs.readFileSync(AUTHORS_FILE, 'utf8');
const categoriesSrc = fs.readFileSync(CATEGORIES_FILE, 'utf8');
const knownAuthors = [...authorsSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const knownCategories = [...categoriesSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));

const errors = [];
const warnings = [];
const seenSlugs = new Map();
const seenTitles = new Map();
const categoryCounts = {};

function wordCount(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>|`-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

for (const file of files) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const where = `${file}`;

  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || String(data[field]).trim() === '') {
      errors.push(`${where}: missing required frontmatter "${field}"`);
    }
  }

  if (data.slug) {
    if (seenSlugs.has(data.slug)) {
      errors.push(`${where}: duplicate slug "${data.slug}" (also in ${seenSlugs.get(data.slug)})`);
    }
    seenSlugs.set(data.slug, file);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.slug)) {
      errors.push(`${where}: slug "${data.slug}" is not lowercase-kebab-case`);
    }
  }

  if (data.title) {
    const key = String(data.title).toLowerCase().trim();
    if (seenTitles.has(key)) {
      errors.push(`${where}: duplicate title (also in ${seenTitles.get(key)})`);
    }
    seenTitles.set(key, file);
  }

  if (data.author && !knownAuthors.includes(data.author)) {
    errors.push(`${where}: unknown author "${data.author}"`);
  }
  if (data.reviewer && !knownAuthors.includes(data.reviewer)) {
    errors.push(`${where}: unknown reviewer "${data.reviewer}"`);
  }
  if (data.author && data.author === data.reviewer) {
    errors.push(`${where}: author and reviewer are the same person - review must be independent`);
  }
  if (data.categorySlug && !knownCategories.includes(data.categorySlug)) {
    errors.push(`${where}: unknown categorySlug "${data.categorySlug}"`);
  }
  if (data.categorySlug) {
    categoryCounts[data.categorySlug] = (categoryCounts[data.categorySlug] || 0) + 1;
  }

  const words = wordCount(content);
  if (words < MIN_WORDS) {
    errors.push(`${where}: ${words} words, below the ${MIN_WORDS}-word minimum`);
  }

  const faqs = Array.isArray(data.faqs) ? data.faqs.length : 0;
  if (faqs < MIN_FAQS) {
    errors.push(`${where}: ${faqs} FAQs, needs at least ${MIN_FAQS} for FAQPage schema`);
  }

  const sources = Array.isArray(data.sources) ? data.sources.length : 0;
  if (sources < MIN_SOURCES) {
    errors.push(`${where}: ${sources} sources cited, needs at least ${MIN_SOURCES}`);
  }
  if (Array.isArray(data.sources)) {
    for (const s of data.sources) {
      if (!s?.url || !/^https:\/\//.test(s.url)) {
        errors.push(`${where}: source "${s?.label ?? '?'}" must have an https URL`);
      }
    }
  }

  if (data.description) {
    const len = String(data.description).length;
    if (len < 70) warnings.push(`${where}: meta description is only ${len} chars`);
    if (len > 300) warnings.push(`${where}: meta description is ${len} chars, quite long`);
  }

  if (data.publishedAt && data.updatedAt) {
    if (new Date(data.updatedAt) < new Date(data.publishedAt)) {
      errors.push(`${where}: updatedAt is earlier than publishedAt`);
    }
  }

  const lower = content.toLowerCase();
  for (const phrase of ADVICE_PHRASES) {
    if (lower.includes(phrase)) {
      errors.push(`${where}: contains advice-like phrasing "${phrase}" - rewrite as procedure`);
    }
  }

  if (!/consult|licensed attorney|licensed lawyer|speak to a lawyer/i.test(content)) {
    warnings.push(`${where}: no pointer to consulting a licensed attorney`);
  }
}

if (files.length < MIN_POSTS) {
  errors.push(
    `Only ${files.length} guides published. Ad platforms treat thin sites as low-value content; aim for at least ${MIN_POSTS}.`,
  );
}

for (const [cat, count] of Object.entries(categoryCounts)) {
  if (count < 2) {
    warnings.push(`Category "${cat}" has only ${count} guide - categories with one entry look unfinished.`);
  }
}

console.log(`Checked ${files.length} guides.`);
for (const [cat, count] of Object.entries(categoryCounts)) {
  console.log(`  ${cat}: ${count}`);
}

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  ! ${w}`));
}

if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  x ${e}`));
  process.exit(1);
}

console.log('\nContent checks passed.');
