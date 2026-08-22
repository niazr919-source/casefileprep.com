# CaseFilePrep

Production-ready blogging platform for a legal prep & procedural information site.
Domain selected for launch: **casefileprep.com** (`.com`, `.net` and `.org` showed no
nameserver records at the time of scaffolding — confirm registrability at a registrar
before you buy).

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Deployment:** Hostinger builds and runs the Next.js app from GitHub (see [DEPLOYMENT.md](DEPLOYMENT.md))
- **Styling:** Tailwind CSS 3.4 + `@tailwindcss/typography`, slate/navy corporate palette
- **Content:** local MDX in `content/posts/` with a typed frontmatter schema
- **Rendering:** all routes prerendered at build time, served by a Next.js Node server (`trailingSlash: true`)
- **Fonts:** `next/font` (Inter + Source Serif 4), self-hosted, `display: swap`, no CLS

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3011>.

To run the production build locally:

```bash
npm run build && npm run start
```

To run the content quality gate:

```bash
npm run check
```

---

## Project structure

```
app/
  layout.tsx              Root shell: fonts, metadata, consent defaults, header/footer
  page.tsx                Home
  [slug]/page.tsx         Guide template (root-level slugs, e.g. /how-to-file-llc-in-texas-guide)
  guides/page.tsx         Guide index
  category/[slug]/        Category archives
  authors/[slug]/         Author profiles (E-E-A-T)
  about-us/ contact/      Trust pages
  privacy-policy/ terms-of-service/ disclaimer/ editorial-policy/
  feed.xml/route.ts       RSS 2.0
  robots.ts sitemap.ts    Generated at build
  icon.svg                Favicon
components/
  Header Footer DisclaimerBanner CookieConsent
  AdSlot AuthorBio TableOfContents ArticleCard Breadcrumbs
  JsonLd LegalPage MdxContent SourceList
  mdx/                    Callout, Checklist, KeyTakeaways, FaqSection
content/
  posts/*.mdx             The guides
  authors.ts              The single editorial publishing identity
  categories.ts           Topic taxonomy
lib/
  site.ts                 Site + AdSense config
  posts.ts                Frontmatter parsing, related posts, reading time
  mdx.ts                  Ad injection, TOC extraction
  schema.ts               JSON-LD generators
  format.ts               Date/URL helpers
public/
  ads.txt site.webmanifest
scripts/
  check-content.mjs       Content quality gate (frontmatter, length, sources, FAQs)
.github/
  workflows/ci.yml        Type-check, build and content gate on every push
  dependabot.yml          Grouped weekly dependency updates
```

---

## Publishing a new guide

Drop a `.mdx` file into `content/posts/`. The filename is the fallback slug; guides
are served at the site root (`/your-slug`). Required frontmatter:

```yaml
---
title: 'Full SEO title'
headline: 'Shorter headline for schema'      # optional
slug: 'url-slug'
description: 'Meta description, 150-160 chars'
category: 'Small Claims & Civil Disputes'
categorySlug: 'small-claims-civil-disputes'  # must exist in content/categories.ts
author: 'casefileprep-editorial'             # must exist in content/authors.ts
publishedAt: '2026-03-11'
updatedAt: '2026-08-04'
jurisdiction: 'General US procedure (verify local rules)'
keywords: [...]
tags: [...]
sources:                                     # primary-source citations
  - label: 'California Courts Self-Help Guide'
    url: 'https://...'
faqs:                                        # drives FAQPage JSON-LD + on-page FAQ
  - question: '...'
    answer: '...'
---
```

Missing required fields throw at build time rather than shipping a broken page.

Components available inside MDX: `<KeyTakeaways points={[...]} />`,
`<Checklist title="..." items={[{item, detail}]} note="..." />`,
`<Callout type="note|warning|deadline|tip" title="...">…</Callout>`, plus GFM tables.

**Do not add ad components by hand.** `lib/mdx.ts` injects them automatically.

---

## Ad placement

`lib/mdx.ts` inserts `<InArticleAd />` after body paragraphs **2** and **6**,
skipping headings, lists, callouts, tables and code fences so a slot never lands
mid-structure. Short articles that never reach a marker simply get fewer ads
rather than stacked ones.

| Slot | Where | Reserved height |
| --- | --- | --- |
| `leaderboard` | Below header, above H1 (home, guides, category, article) | 110–120 px |
| `in-article` | After paragraphs 2 and 6 | 280 px |
| `sidebar` | Sticky, desktop only, article pages | 610 px |
| `in-feed` | Above the footer, after the editorial feed | 280 px |

Policy properties baked into `AdSlot`:

- A visible **"Advertisement"** label sits above every creative.
- Each unit has its own border and background tint, so it never reads as editorial.
- Height is reserved before load — **CLS stays at 0**.
- Ads are spaced away from navigation and buttons to prevent accidental clicks.
- Policy pages (`LegalPage`) carry **no ads at all**.
- Without `NEXT_PUBLIC_ADSENSE_CLIENT`, slots render as inert placeholders and
  nothing is requested from Google — safe to crawl and submit for review.

### Going live with AdSense

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX`.
3. Create four ad units in AdSense and paste their `data-ad-slot` IDs into the
   four `NEXT_PUBLIC_AD_SLOT_*` variables.
4. Edit `public/ads.txt` — uncomment the line and insert your publisher ID.
5. Rebuild and deploy.

The AdSense script only loads when the client ID is present, and only after
interaction (`strategy="afterInteractive"`).

---

## Compliance features

- **Sitewide disclaimer bar** above the header on every page, plus a prominent
  disclaimer block at the top *and* bottom of every guide.
- **Footer** links to `/privacy-policy`, `/terms-of-service`, `/disclaimer`,
  `/editorial-policy`, `/about-us` and `/contact`.
- **Privacy policy** covering AdSense/Ad Manager cookies, web beacons, the
  DoubleClick DART cookie, vendor opt-out links (Google Ads Settings, aboutads.info,
  NAI, Your Online Choices), GDPR legal bases and rights, CCPA/CPRA opt-out,
  PIPEDA and Australian Privacy Act pointers, retention and children's privacy.
- **Cookie consent bar** implementing **Google Consent Mode v2**. Defaults are
  `denied` for `ad_storage`, `ad_user_data`, `ad_personalization` and
  `analytics_storage`; a genuine one-click reject sits beside accept; the choice
  is stored locally and replayed on every load. Rendered on idle so it never
  competes with LCP, and it is a bar rather than an interstitial.
- **E-E-A-T, honestly:** the site publishes under one editorial identity and
  claims no professional credential it does not hold. Trust is built on what can
  actually be verified - a primary-source citation list on every guide linking to
  the issuing authority, explicit publication and last-checked dates, a stated
  jurisdiction, an open statement of what the publisher is *not*, and an
  editorial policy describing sourcing, checks, corrections and independence.
  Invented bylines with fabricated qualifications were removed deliberately; do
  not reintroduce them.

---

## SEO

- Per-page canonical URLs, Open Graph and Twitter metadata.
- JSON-LD: `Organization`, `WebSite`, `Article` (with `author` as an
  Organization, `datePublished`, `dateModified`, `wordCount`, `citation`),
  `FAQPage`, `BreadcrumbList`, `CollectionPage`.
- `sitemap.xml` and `robots.txt` generated at build; `Mediapartners-Google` and
  `AdsBot-Google` explicitly allowed.
- RSS 2.0 at `/feed.xml`.
- Security headers and the bare-domain -> www redirect in `next.config.mjs`.

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying — canonicals,
sitemap and schema all derive from it.

---

## Dependency security

`npm audit` reports 3 high advisories that resolve only by moving to Next 16 (a
major upgrade). They are **not reachable in this deployment**:

| Package | Where it lives | Why it does not apply |
| --- | --- | --- |
| `sharp` | `next`'s optional image dependency | Only reachable through the Image Optimization API. The site uses no `next/image` components and sets `images.unoptimized: true`, which keeps that endpoint out of play. Revisit before introducing real images. |
| `postcss` (nested in `next`) | Next's internal CSS pipeline | Build-time only, processing our own first-party CSS on CI. The advisories require attacker-controlled CSS or `sourceMappingURL`. Nothing reaches the browser or Hostinger. |

Hostinger runs the app on Node, so these packages are present in production;
the mitigation is that neither has a reachable code path in this site as built.
Upgrading to Next 16 would clear both properly and is worth scheduling.

**Fixed already:** `next` 15.5.4 → 15.5.23 (cleared a critical RCE advisory) and
`next-mdx-remote` 5 → 6 (cleared GHSA-g4xw-jxrg-5f6m). See the note in
`components/MdxContent.tsx` about `blockJS` and why it is off for first-party MDX.

---

## Before launch

- [ ] Replace the placeholder editorial team in `content/authors.ts` with real people.
- [ ] Update `siteConfig.contactEmail` and the social handles in `lib/site.ts`.
- [ ] Have a qualified lawyer in your operating jurisdiction review the policy pages.
- [ ] Set `NEXT_PUBLIC_SITE_URL`, fill `public/ads.txt`, and configure AdSense IDs.
- [ ] Verify the site in Google Search Console and submit the sitemap.
- [ ] Publish more guides. AdSense reviews sites on content depth — three articles
      is a scaffold, not an application.
