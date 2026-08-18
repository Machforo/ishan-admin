/**
 * Public origin of each website, used for the "View live page" link in the editor.
 *
 * Override per environment with Vite env vars, e.g. in ishan-admin/.env:
 *   VITE_SITE_URL_LEGAL=https://law.ishan.ac
 *   VITE_SITE_URL_HOSPITAL=https://hospital.ishan.ac
 *   VITE_SITE_URL_PHARMACY=https://pharmacy.ishan.ac
 *   VITE_SITE_URL_AYURVEDA=https://ayurveda.ishan.ac
 *   VITE_SITE_URL_IIMT=…
 *
 * A site with no configured URL simply does not show the link — better than
 * sending an admin to a guessed domain.
 */
const env = import.meta.env as Record<string, string | undefined>;

const DEFAULTS: Record<string, string> = {
  // Only origins evidenced in the codebase are defaulted here.
  legal: 'https://law.ishan.ac',
  pharmacy: 'https://pharmacy.ishan.ac',
  hospital: 'https://hospital.ishan.ac',
};

export function siteUrlFor(siteKey: string): string | null {
  const fromEnv = env[`VITE_SITE_URL_${siteKey.toUpperCase()}`];
  const base = (fromEnv || DEFAULTS[siteKey] || '').trim().replace(/\/$/, '');
  return base || null;
}

/** Absolute URL for a page path on a site, or null when the site URL is unknown. */
export function livePageUrl(siteKey: string, path?: string): string | null {
  if (!path) return null;
  const base = siteUrlFor(siteKey);
  if (!base) return null;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
