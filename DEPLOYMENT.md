# Deploying CaseFilePrep to Hostinger

Target setup: **Hostinger shared/Premium/Business hosting** (LiteSpeed, no Node.js
runtime) with **GitHub Actions** building the site and uploading it over FTPS.

```
git push origin main
        │
        ▼
GitHub Actions  ──▶  npm ci  ──▶  npm run build  ──▶  /out  (static HTML)
        │
        ▼
   FTPS upload  ──▶  Hostinger public_html/  ──▶  https://www.casefileprep.com
```

Nothing is built on Hostinger. It only ever stores plain HTML, CSS, JS and
images, which is exactly what shared hosting is good at.

---

## Part 1 — Push the code to GitHub

The repository is already initialised and committed locally.

1. Create an **empty** repository on GitHub (no README, no .gitignore, no licence)
   at <https://github.com/new>. Name it `casefileprep`.

2. Connect and push:

```bash
cd "C:\Users\zaman\Desktop\Law FIrm" && git remote add origin https://github.com/YOUR_USERNAME/casefileprep.git && git branch -M main && git push -u origin main
```

If git asks who you are, set your identity once:

```bash
git config --global user.name "Your Name" && git config --global user.email "you@example.com"
```

---

## Part 2 — Get your FTP details from Hostinger

In **hPanel** → your website → **Files** → **FTP Accounts**.

Note down three values:

| Value | Looks like | Notes |
| --- | --- | --- |
| FTP hostname | `ftp.casefileprep.com` or `82.180.x.x` | Use exactly what hPanel shows |
| FTP username | `u123456789.casefileprep` | Full string including the `u` prefix |
| FTP password | — | Use **Change FTP password** to set a fresh one you can copy |

Confirm the upload directory too. For the primary domain on a Hostinger account
it is `public_html/`. If casefileprep.com is an **addon domain**, it will be
something like `domains/casefileprep.com/public_html/` — check under
**Files → File Manager** and note the exact path.

---

## Part 3 — Add the secrets to GitHub

In the GitHub repo: **Settings → Secrets and variables → Actions**.

### Secrets tab → New repository secret

| Name | Value |
| --- | --- |
| `FTP_SERVER` | The FTP hostname from Part 2 |
| `FTP_USERNAME` | The FTP username |
| `FTP_PASSWORD` | The FTP password |

Add these later, once AdSense approves you — the site deploys fine without them
and ad slots simply render as reserved placeholders:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXXXXXXXXXX` |
| `NEXT_PUBLIC_AD_SLOT_LEADERBOARD` | Ad unit ID |
| `NEXT_PUBLIC_AD_SLOT_IN_ARTICLE` | Ad unit ID |
| `NEXT_PUBLIC_AD_SLOT_SIDEBAR` | Ad unit ID |
| `NEXT_PUBLIC_AD_SLOT_IN_FEED` | Ad unit ID |

### Variables tab → New repository variable

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.casefileprep.com` |
| `FTP_SERVER_DIR` | `public_html/` — only needed if your path differs |

> **The site URL and the canonical host in `public/.htaccess` must match.**
> Both are set to `www` right now. If you switch to the bare domain, change both.

---

## Part 4 — Point the domain at Hostinger

In hPanel the domain is probably already connected. Verify:

- **Domains → DNS / Nameservers** — nameservers should be Hostinger's
  (`ns1.dns-parking.com` / `ns2.dns-parking.com`), or your A record should point
  at the Hostinger server IP shown in hPanel.
- **Websites → SSL** — install the free Let's Encrypt certificate and turn on
  **Force HTTPS**. The `.htaccess` also forces HTTPS, so this is belt and braces.
- Make sure both `casefileprep.com` and `www.casefileprep.com` resolve. The
  `.htaccess` redirects the bare domain to `www` in a single hop.

DNS changes can take a few hours to propagate.

---

## Part 5 — Deploy

Push anything to `main`, or trigger it manually:

**GitHub → Actions → "Build and deploy to Hostinger" → Run workflow.**

The run takes roughly two minutes. It will:

1. install dependencies with `npm ci`
2. build the static export into `out/`
3. copy `public/.htaccess` into `out/`
4. **verify** the export contains every expected page — the deploy aborts before
   upload if anything is missing, so a broken build can never wipe a working site
5. upload only changed files over FTPS

The first deploy uploads everything (~2–3 MB). Later deploys upload only what
changed, tracked by `.ftp-deploy-sync-state.json` on the server.

---

## Part 6 — After the first successful deploy

- [ ] Visit `https://www.casefileprep.com` and click through a guide.
- [ ] Check `https://www.casefileprep.com/sitemap.xml` and `/robots.txt` load.
- [ ] Confirm `http://casefileprep.com` redirects to `https://www.casefileprep.com`.
- [ ] Add the property in **Google Search Console** and submit the sitemap.
- [ ] Paste your publisher ID into `public/ads.txt`, uncomment the line, push.
- [ ] Apply to AdSense — but publish more guides first; three articles is a
      scaffold, not an application.

---

## Publishing a new article after this is set up

```bash
cd "C:\Users\zaman\Desktop\Law FIrm" && git add . && git commit -m "Add new guide" && git push
```

That is the whole deployment process from then on. Two minutes later it is live.

---

## Troubleshooting

**Workflow fails at the FTP step with a login error.**
The username must be the complete string from hPanel including the `u123456789.`
prefix. Re-set the FTP password in hPanel and re-copy it into the secret — the
password shown at creation is often not the one currently active.

**Deploy succeeds but the site shows Hostinger's default page.**
`FTP_SERVER_DIR` is pointing at the wrong folder. Check the real path in hPanel
File Manager and set the `FTP_SERVER_DIR` variable to match, with a trailing slash.

**Pages load but have no styling.**
The `_next` folder did not upload. Check the Actions log for FTP errors, then
re-run the workflow. To force a full re-upload, delete
`.ftp-deploy-sync-state.json` from `public_html` via File Manager.

**A page 404s but works locally.**
`.htaccess` is missing from `public_html`. It is a hidden file — enable "Show
hidden files" in File Manager to see it. Re-run the workflow to restore it.

**Changes are live but the browser shows the old version.**
HTML is served with `must-revalidate`, so a hard refresh (Ctrl+F5) should be
enough. If Hostinger's LiteSpeed cache is enabled, purge it in hPanel.

**A redirect loop.**
Hostinger's "Force HTTPS" toggle and the `.htaccess` HTTPS rule can occasionally
collide. Turn off the hPanel toggle and let `.htaccess` handle it alone.

---

## Local commands

```bash
npm run dev
```

Dev server with hot reload on <http://localhost:3011>.

```bash
npm run build && npm run preview
```

Builds the real static export and serves `out/` on <http://localhost:3011> —
this is byte-for-byte what Hostinger will serve. `next start` no longer applies,
because the site is a static export with no server.
