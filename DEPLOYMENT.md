# Deploying CaseFilePrep

**Live:** <https://www.casefileprep.com>

## How deployment actually works

The repository is connected to Hostinger through hPanel. Hostinger pulls from
`main`, runs the build, and serves the result as a **Next.js Node application**.

```
git push origin main
        │
        ▼
Hostinger pulls, runs npm ci && npm run build
        │
        ▼
Next.js server (node)  ──▶  Hostinger CDN  ──▶  https://www.casefileprep.com
```

Confirmed empirically: the live site returns `x-nextjs-cache` / `x-nextjs-prerender`
headers, serves RSC payloads (`content-type: text/x-component`), and issues Next's
own 308 trailing-slash redirects. It is not static files behind Apache.

**There is no FTP deployment and no `.htaccess`.** An earlier setup targeted
Apache-style shared hosting; it was removed once the real runtime was identified.
Security headers and the canonical-host redirect now live in `next.config.mjs`,
where they work in server mode.

GitHub Actions runs `.github/workflows/ci.yml`, which type-checks, builds and runs
the content gate on every push. It does **not** deploy — it exists to catch a
broken build before Hostinger picks it up.

## Publishing a new guide

```bash
cd "C:\Users\zaman\Desktop\Law FIrm" && npm run check && git add . && git commit -m "Add guide: <title>" && git push
```

Hostinger rebuilds automatically. Run `npm run check` first — it enforces the
frontmatter, word count, sourcing and review rules described in the README.

## Environment variables

Set these in hPanel under the application's environment settings, not in the repo.

| Variable | Value | Needed |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.casefileprep.com` | Now — canonicals, sitemap and schema derive from it |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Your real editorial address | Now |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-…` | After AdSense approval |
| `NEXT_PUBLIC_AD_SLOT_LEADERBOARD` | Ad unit ID | After approval |
| `NEXT_PUBLIC_AD_SLOT_IN_ARTICLE` | Ad unit ID | After approval |
| `NEXT_PUBLIC_AD_SLOT_SIDEBAR` | Ad unit ID | After approval |
| `NEXT_PUBLIC_AD_SLOT_IN_FEED` | Ad unit ID | After approval |

Until the AdSense variables are set, ad slots render as inert reserved-height
placeholders and nothing is requested from Google.

## Canonical host

`www.casefileprep.com` is canonical. Two places must agree:

1. `NEXT_PUBLIC_SITE_URL` — drives canonical tags, sitemap, JSON-LD and RSS.
2. The `redirects()` block in `next.config.mjs` — sends the bare domain to `www`.

To switch to the bare domain, change both. Changing one produces canonical tags
pointing at a URL that redirects, which wastes crawl budget and splits signals.

## Verifying a deploy

```bash
curl -sI https://www.casefileprep.com/ | grep -Ei 'x-content-type|referrer-policy|permissions-policy'
```

Three checks that catch most problems:

- Security headers present on the homepage (proves the new `next.config.mjs` is live).
- `https://casefileprep.com/` returns 308 to `https://www.casefileprep.com/`.
- `https://www.casefileprep.com/sitemap.xml` lists every guide.

## Local development

```bash
npm run dev
```

Hot reload on <http://localhost:3011>.

```bash
npm run build && npm run start
```

Production build served locally on the same port — the closest match to what
Hostinger runs. Note that `npm run dev` overwrites `.next`, so rebuild before
`npm run start`.

```bash
npm run check
```

Content gate: frontmatter completeness, minimum length, FAQ and source counts,
author validity, duplicate slugs, and advice-phrasing detection.

## Troubleshooting

**Changes pushed but the site is unchanged.**
Check the deployment log in hPanel — the build may have failed. Compare against
the GitHub Actions CI run for the same commit: if CI passed and Hostinger did
not, the problem is environment-specific (usually a missing env var or a Node
version difference).

**Security headers missing on the live site.**
The deployed build predates the `next.config.mjs` change, or Hostinger's CDN is
serving a cached response. Redeploy and re-check with a cache-busting query string.

**Bare domain does not redirect.**
Confirm both hostnames are attached to the application in hPanel. The redirect is
matched on the `Host` header, so the bare domain must reach the app to be
redirected.

**Old content still served after a deploy.**
Hostinger's CDN sits in front of the app. Purge the cache in hPanel.
