import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/components/OgImage';

export const alt = 'CaseFilePrep - legal document prep checklists and filing guides';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Default card used by the homepage and any page without its own image. */
export default function Image() {
  return renderOgImage({
    eyebrow: 'Legal prep & filing guides',
    title: 'Get your paperwork right before you file it.',
  });
}
