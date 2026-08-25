import { siteConfig } from '@/lib/site';
import { absoluteUrl, isoDate } from '@/lib/format';
import type { Post } from '@/lib/posts';
import type { Author } from '@/content/authors';
import type { Category } from '@/content/categories';

type Json = Record<string, unknown>;

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

export function organizationSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl(siteConfig.url, '/'),
    description: siteConfig.description,
    foundingDate: siteConfig.founded,
    sameAs: [siteConfig.social.x, siteConfig.social.linkedin],
    publishingPrinciples: absoluteUrl(siteConfig.url, '/editorial-policy'),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'editorial',
        email: siteConfig.contactEmail,
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: absoluteUrl(siteConfig.url, '/'),
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
    // Enables the sitelinks search box and tells Google the site is searchable.
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * The byline is an editorial team, not an individual, so this emits
 * Organization rather than Person. `hasCredential` is deliberately absent:
 * the credentials field now records that no professional qualification is
 * held, and asserting that as a credential would be misleading markup.
 */
export function authorSchema(author: Author): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/authors/${author.slug}#editorial`,
    name: author.name,
    url: absoluteUrl(siteConfig.url, `/authors/${author.slug}`),
    description: author.bio,
    knowsAbout: author.expertise,
    parentOrganization: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(siteConfig.url, item.href),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): Json | null {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function articleSchema(post: Post): Json {
  const url = absoluteUrl(siteConfig.url, post.url);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.frontmatter.headline || post.frontmatter.title,
    name: post.frontmatter.title,
    description: post.frontmatter.description,
    url,
    inLanguage: 'en',
    articleSection: post.frontmatter.category,
    keywords: post.frontmatter.keywords.join(', '),
    wordCount: post.wordCount,
    datePublished: isoDate(post.frontmatter.publishedAt),
    dateModified: isoDate(post.frontmatter.updatedAt),
    // Organization rather than Person: the site publishes under a single
    // editorial identity and does not assert individual authorship.
    author: {
      '@type': 'Organization',
      name: post.authorProfile.name,
      url: absoluteUrl(siteConfig.url, `/authors/${post.authorProfile.slug}`),
      knowsAbout: post.authorProfile.expertise,
    },
    publisher: { '@id': ORG_ID },
    isAccessibleForFree: true,
    creativeWorkStatus: 'Published',
    disambiguatingDescription: siteConfig.disclaimer,
    ...(post.frontmatter.sources && post.frontmatter.sources.length
      ? { citation: post.frontmatter.sources.map((s) => s.url) }
      : {}),
  };
}

export function collectionSchema(
  category: Category,
  posts: Post[],
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: absoluteUrl(siteConfig.url, `/category/${category.slug}`),
    isPartOf: { '@id': SITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(siteConfig.url, post.url),
        name: post.frontmatter.title,
      })),
    },
  };
}
