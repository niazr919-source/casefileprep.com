import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/components/OgImage';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

export const alt = 'CaseFilePrep guide';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamicParams = false;

// Prerender one card per guide at build time.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOgImage({
    eyebrow: post?.frontmatter.category,
    // The short `headline` where one exists, so the card is not a wall of text.
    title: post?.frontmatter.headline || post?.frontmatter.title || 'CaseFilePrep',
    footnote: post ? `${post.readingMinutes} min read` : undefined,
  });
}
