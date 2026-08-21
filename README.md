# CaseFilePrep

Production-ready blogging platform for a legal prep & procedural information site.
Domain selected for launch: **casefileprep.com** (`.com`, `.net` and `.org` showed no
nameserver records at the time of scaffolding — confirm registrability at a registrar
before you buy).

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Deployment:** static export -> GitHub Actions -> Hostinger (see [DEPLOYMENT.md](DEPLOYMENT.md))
- **Styling:** Tailwind CSS 3.4 + `@tailwindcss/typography`, slate/navy corporate palette
- **Content:** local MDX in `content/posts/` with a typed frontmatter schema
- **Rendering:** fully static HTML export (`output: 'export'`, `trailingSlash: true`)
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

To preview exactly what gets deployed:

```bash
npm run build && npm run preview
```

`npm run build` produces a **static export** in `out/` (see Deployment below), so
there is no `next start` — `npm run preview` serves the exported files instead.

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
  authors.ts              Writer + reviewer records
  categories.ts           Topic taxonomy
lib/
  site.ts                 Site + AdSense config
  posts.ts                Frontmatter parsing, related posts, reading time
  mdx.ts                  Ad injection, TOC extraction
  schema.ts               JSON-LD generators
  format.ts               Date/URL helpers
public/
  .htaccess               Apache/LiteSpeed rules: HTTPS+www, caching, security headers
  ads.txt site.webmanifest
.github/workflows/
  deploy.yml              Build + FTPS upload to Hostinger on push to main
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
author: 'dana-whitfield'                     # must exist in content/authors.ts
reviewer: 'legal-research-team'
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
- **E-E-A-T:** named author with stated first-hand experience and credentials,
  named reviewer ("Reviewed by Legal Research Team"), published and last-reviewed
  dates, review cycle, primary-source citation list, per-author profile pages, and
  a full editorial policy describing sourcing, review, corrections and independence.

---

## SEO

- Per-page canonical URLs, Open Graph and Twitter metadata.
- JSON-LD: `Organization`, `WebSite`, `Article` (with `author`, `reviewedBy`,
  `datePublished`, `dateModified`, `wordCount`, `citation`), `FAQPage`,
  `BreadcrumbList`, `CollectionPage`, `Person`.
- `sitemap.xml` and `robots.txt` generated at build; `Mediapartners-Google` and
  `AdsBot-Google` explicitly allowed.
- RSS 2.0 at `/feed.xml`.
- Security and caching headers in `public/.htaccess` (static export has no Node
  server, so `headers()` in `next.config.mjs` does not apply).

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying — canonicals,
sitemap and schema all derive from it.

---

## Before launch

- [ ] Replace the placeholder editorial team in `content/authors.ts` with real people.
- [ ] Update `siteConfig.contactEmail` and the social handles in `lib/site.ts`.
- [ ] Have a qualified lawyer in your operating jurisdiction review the policy pages.
- [ ] Set `NEXT_PUBLIC_SITE_URL`, fill `public/ads.txt`, and configure AdSense IDs.
- [ ] Verify the site in Google Search Console and submit the sitemap.
- [ ] Publish more guides. AdSense reviews sites on content depth — three articles
      is a scaffold, not an application.
