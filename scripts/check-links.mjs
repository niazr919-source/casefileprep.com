/**
 * Link integrity check.
 *
 * Two failure modes this catches, both of which reached production once:
 *
 *  1. Cited government sources that have since 404'd. The site's whole
 *     credibility argument is that claims are attributable, so a dead
 *     citation is worse than no citation. California restructured its
 *     self-help site and silently broke seven of ours.
 *
 *  2. Internal links pointing at slugs that do not exist, which is an
 *     easy mistake to make when guides are written against a list of
 *     planned topics rather than published ones.
 *
 * External checking needs the network, so it is a separate script from
 * `npm run check` rather than part of the build gate - a flaky network
 * must never be able to block a deploy.
 *
 * Run with:  npm run check:links
 */
import fs from 'node:fs';
import path from 'node:path';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const CONCURRENCY = 10;
const TIMEOUT_MS = 10000;

/**
 * Hosts whose WAF blocks automated requests and does so inconsistently -
 * Akamai and Cloudflare in front of these return 403 to curl and 404 to
 * fetch for pages that load perfectly in a browser. A 404 from them is
 * therefore not evidence of anything, so they are reported for manual
 * checking rather than failing the run. Verify these in a real browser.
 */
const BLOCKS_AUTOMATION = new Set([
  'www.nhtsa.gov',
  'www.floodsmart.gov',
  'www.hud.gov',
  'www.txcourts.gov',
]);

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));
const slugs = new Set(files.map((f) => f.replace(/\.mdx$/, '')));

/** Pages that exist outside content/posts and are legitimate link targets. */
const STATIC_ROUTES = new Set([
  '',
  'guides',
  'search',
  'about-us',
  'contact',
  'privacy-policy',
  'terms-of-service',
  'disclaimer',
  'editorial-policy',
]);

const external = new Map(); // url -> Set(file)
const internalProblems = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');

  for (const m of raw.matchAll(/url:\s*'(https?:\/\/[^']+)'/g)) {
    if (!external.has(m[1])) external.set(m[1], new Set());
    external.get(m[1]).add(file);
  }

  for (const m of raw.matchAll(/\]\((\/[^)]*)\)/g)) {
    const target = m[1].split('#')[0].replace(/^\/+|\/+$/g, '');
    if (target.startsWith('category/')) continue;
    if (STATIC_ROUTES.has(target) || slugs.has(target)) continue;
    internalProblems.push(`${file}  ->  /${target}/`);
  }
}

async function status(url) {
  const control = new AbortController();
  const timer = setTimeout(() => control.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': UA },
      signal: control.signal,
    });
    return res.status;
  } catch {
    return 0; // unreachable from here; not proof the page is gone
  } finally {
    clearTimeout(timer);
  }
}

const urls = [...external.keys()];
const results = new Map();
let cursor = 0;

await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, urls.length) }, async () => {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      results.set(url, await status(url));
    }
  })
);

const dead = [];
const unverified = [];

for (const [url, code] of results) {
  const cites = [...external.get(url)].join(', ');
  const blocked = BLOCKS_AUTOMATION.has(new URL(url).host);
  if (code === 200) continue;
  if (blocked || code === 0 || code === 403) {
    unverified.push(`  ${code || '---'}  ${url}`);
  } else if (code === 404 || code === 410) {
    dead.push(`  ${code}  ${url}\n        cited by: ${cites}`);
  }
}

console.log(`Checked ${urls.length} cited sources and ${files.length} guides.`);

if (unverified.length) {
  console.log(
    `\n${unverified.length} source(s) could not be verified from here - blocked or unreachable,` +
      ` which is NOT proof the page is gone. Open these in a browser if in doubt:`
  );
  console.log(unverified.join('\n'));
}

let failed = false;

if (internalProblems.length) {
  console.error(`\nInternal links pointing at pages that do not exist:`);
  console.error(internalProblems.map((p) => `  ${p}`).join('\n'));
  failed = true;
}

if (dead.length) {
  console.error(`\nDead citations - these must be replaced, not removed:`);
  console.error(dead.join('\n'));
  failed = true;
}

if (failed) {
  console.error('\nLink check failed.');
  process.exit(1);
}

console.log('\nLink check passed.');
