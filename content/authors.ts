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
 * E-E-A-T: every guide names a human writer and a named reviewer.
 * None of the people below are practising attorneys and the site never
 * presents them as such - they are legal-procedure researchers and editors.
 * Replace these records with your real editorial staff before launch.
 */
export const authors: Author[] = [
  {
    slug: 'dana-whitfield',
    name: 'Dana Whitfield',
    role: 'Lead Legal Procedures Researcher',
    credentials: 'B.A. Paralegal Studies, NALA Certified Paralegal (CP)',
    initials: 'DW',
    experience:
      'Eleven years as a litigation paralegal in civil and small-claims practice, preparing and indexing exhibit binders for more than 400 filed matters before moving into full-time legal research writing.',
    bio: 'Dana writes CaseFilePrep document-preparation checklists. Her focus is the unglamorous part of a case: what paperwork exists, what order it belongs in, what a clerk will reject on sight, and how a self-represented filer can assemble a clean file without guessing. She reads the current court rules and published clerk instructions for every guide and re-checks them at each scheduled review.',
    expertise: ['Small claims procedure', 'Evidence organisation', 'Court filing logistics', 'Exhibit preparation'],
    linkedin: 'https://www.linkedin.com/in/example-dana-whitfield',
  },
  {
    slug: 'marcus-oyelaran',
    name: 'Marcus Oyelaran',
    role: 'Business Formation & Compliance Writer',
    credentials: 'MBA, former state-filings compliance analyst',
    initials: 'MO',
    experience:
      'Seven years processing and auditing entity formation packets for a registered-agent service covering all fifty US states, plus three years writing compliance documentation for small-business clients.',
    bio: 'Marcus covers entity formation, registered agent requirements, franchise-tax calendars and the federal filings that follow. He has walked several thousand certificates of formation through state portals and writes from the rejection notices he has seen, not from marketing copy published by formation vendors.',
    expertise: ['LLC formation', 'Registered agent rules', 'EIN and IRS filings', 'Annual report compliance'],
    linkedin: 'https://www.linkedin.com/in/example-marcus-oyelaran',
  },
  {
    slug: 'priya-raman',
    name: 'Priya Raman',
    role: 'Claims Documentation Editor',
    credentials: 'Licensed property & casualty adjuster (inactive), CPCU coursework',
    initials: 'PR',
    experience:
      'Nine years as a first-party auto and property adjuster handling roughly 3,000 claims, followed by four years editing consumer-facing claims documentation guidance.',
    bio: 'Priya explains what an insurance carrier actually does with the file you send it. She writes CaseFilePrep incident-documentation checklists so readers capture the evidence that matters in the hours when it is still available, and understand which records a claims department will request weeks later.',
    expertise: ['Auto claims documentation', 'Police report retrieval', 'Medical records tracking', 'Claim correspondence logs'],
    linkedin: 'https://www.linkedin.com/in/example-priya-raman',
  },
  {
    slug: 'legal-research-team',
    name: 'CaseFilePrep Legal Research Team',
    role: 'Editorial Review Board',
    credentials: 'Certified paralegals, compliance analysts and professional editors',
    initials: 'LR',
    experience:
      'A standing review board that fact-checks every published guide against primary sources - statutes, court rules, clerk instructions and agency publications - before publication and on a scheduled re-review cycle.',
    bio: 'The CaseFilePrep Legal Research Team reviews each guide for procedural accuracy, currency of cited rules, and strict separation between educational process information and individual legal advice. The team removes or rewrites any passage that could read as a recommendation about a specific reader matter.',
    expertise: ['Primary-source verification', 'Court rule updates', 'Editorial compliance review'],
  },
];

export const authorMap: Record<string, Author> = Object.fromEntries(
  authors.map((a) => [a.slug, a]),
);

export function getAuthor(slug: string): Author {
  const author = authorMap[slug];
  if (!author) throw new Error(`Unknown author slug: ${slug}`);
  return author;
}
