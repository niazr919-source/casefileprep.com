export function formatDate(iso: string, locale = 'en-US'): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : date.toISOString();
}

/**
 * Builds an absolute URL that matches exactly what the site serves.
 *
 * The build runs with `trailingSlash: true`, so every page lives at `/path/`.
 * Canonical tags, JSON-LD, the sitemap and the RSS feed must all agree with
 * that form - otherwise every URL we publish 301-redirects, which wastes crawl
 * budget and splits signals between two forms of the same page.
 *
 * Files (anything with an extension, e.g. /feed.xml) keep no trailing slash.
 */
export function absoluteUrl(base: string, pathname: string): string {
  const root = base.replace(/\/$/, '');
  let path = pathname.startsWith('/') ? pathname : `/${pathname}`;

  const lastSegment = path.split('/').pop() || '';
  const isFile = lastSegment.includes('.');

  if (!isFile && !path.endsWith('/')) path = `${path}/`;

  return `${root}${path}`;
}
