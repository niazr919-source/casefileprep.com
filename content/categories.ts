export type Category = {
  slug: string;
  name: string;
  description: string;
  intro: string;
};

export const categories: Category[] = [
  {
    slug: 'small-claims-civil-disputes',
    name: 'Small Claims & Civil Disputes',
    description:
      'Document preparation checklists, evidence organisation and filing logistics for small claims and low-value civil disputes.',
    intro:
      'Small claims courts are designed for people without lawyers, but the paperwork rules are still real rules. These guides cover what to gather, how to order it, and what clerks routinely reject.',
  },
  {
    slug: 'small-business-legal-prep',
    name: 'Small Business Legal Prep',
    description:
      'Entity formation paperwork, registered agent requirements, operating agreements and post-formation compliance filings.',
    intro:
      'Forming a business is mostly a paperwork sequence with deadlines attached. These guides walk the sequence in order and flag the filings people forget once the entity exists.',
  },
  {
    slug: 'claims-incident-documentation',
    name: 'Claims & Incident Documentation',
    description:
      'What to record after an incident, how to request official reports, and how to keep a claim file an adjuster can actually process.',
    intro:
      'Insurance outcomes are driven by the quality of the file. These checklists cover evidence capture at the scene, official report retrieval, and ongoing expense tracking.',
  },
];

export const categoryMap: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);

export function getCategory(slug: string): Category | undefined {
  return categoryMap[slug];
}
