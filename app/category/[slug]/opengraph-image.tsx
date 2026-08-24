import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/components/OgImage';
import { categories, getCategory } from '@/content/categories';
import { getPostsByCategory } from '@/lib/posts';

export const alt = 'CaseFilePrep guide category';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamicParams = false;

/**
 * Category pages declare their own `openGraph` block in metadata, which stops
 * them inheriting the site-level card. Rather than dropping the override, each
 * category gets a card naming the topic and how many guides it holds.
 */
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  const count = category ? getPostsByCategory(category.slug).length : 0;

  return renderOgImage({
    eyebrow: 'Guide category',
    title: category?.name || 'Guides',
    footnote: count ? `${count} guide${count === 1 ? '' : 's'}` : undefined,
  });
}
