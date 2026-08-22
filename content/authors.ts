export type Author = {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  expertise: string[];
  experience: string;
  initials: string;
  linkedin?: string;
};

/**
 * A single, truthful publishing identity.
 *
 * This site does not invent bylines. Earlier scaffolding used fictional
 * contributors with fabricated professional credentials; that was removed
 * because presenting invented qualifications to readers making decisions about
 * court paperwork and insurance claims is a deception, regardless of how good
 * the underlying research is.
 *
 * What is claimed here is exactly what is true: the guides are researched from
 * primary sources, every source is cited, and no professional qualification is
 * asserted. If a named person with real credentials joins the site later, add
 * them here and set that slug on the guides they actually wrote.
 */
export const authors: Author[] = [
  {
    slug: 'casefileprep-editorial',
    name: 'CaseFilePrep Editorial Team',
    role: 'Research and editorial',
    credentials:
      'Not attorneys, paralegals or licensed professionals. No professional qualification is claimed.',
    initials: 'CP',
    experience:
      'Every guide is built by reading the controlling primary sources - statutes, court rules, clerk instructions, agency publications and official forms - and reducing them to a sequence a reader can follow. The sources consulted are listed at the foot of each guide so any statement can be checked against the authority it came from.',
    bio: 'CaseFilePrep is an independent publisher of procedural legal information. We are not lawyers and we do not hold professional credentials in law, insurance or accountancy. Our work is research and plain-English explanation: finding what the official instructions actually say, establishing the order steps happen in, and naming the points where a reader should stop and get qualified advice. Where a guide reaches the limit of what general information can safely cover, it says so rather than guessing.',
    expertise: [
      'Primary-source research',
      'Court and agency procedure',
      'Document preparation checklists',
      'Plain-English explanation',
    ],
  },
];

export const authorMap: Record<string, Author> = Object.fromEntries(
  authors.map((a) => [a.slug, a]),
);

/** The identity every guide publishes under. */
export const PRIMARY_AUTHOR_SLUG = 'casefileprep-editorial';

export function getAuthor(slug: string): Author {
  const author = authorMap[slug];
  if (!author) throw new Error(`Unknown author slug: ${slug}`);
  return author;
}
