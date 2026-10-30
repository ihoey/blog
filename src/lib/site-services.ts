import { legacyPublic } from '../data/legacy-public';

declare global {
  interface Window {
    _hmt?: unknown[][];
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Existing statistics stay production-only, so previews cannot pollute visits.
if (location.hostname === 'blog.ihoey.com') {
  // A static page config sends its own page_view; do not also send one manually.
  // Keep a stable marker so executing the initializer twice cannot double-count.
  if (!document.querySelector('script[data-blog-ga4]')) {
    window.dataLayer ??= [];
    window.gtag ??= function () {
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', legacyPublic.googleAnalytics);
    const google = document.createElement('script');
    google.async = true;
    google.dataset.blogGa4 = '';
    google.src = `https://www.googletagmanager.com/gtag/js?id=${legacyPublic.googleAnalytics}`;
    document.head.append(google);
  }
  window._hmt ??= [];
  const analytics = document.createElement('script');
  analytics.async = true;
  analytics.src = `https://hm.baidu.com/hm.js?${legacyPublic.baiduAnalytics}`;
  document.head.append(analytics);
}

// Keep the authored motto as an immediate, stable fallback. Fetch once per page,
// with a short session cache; no polling or unsolicited speech while reading.
const quote = document.querySelector<HTMLElement>('.home-quote');
const storageKey = 'blog-hitokoto';
type Quote = { hitokoto: string; from: string; savedAt: number };
function valid(value: unknown): value is Quote {
  const q = value as Quote;
  return (
    !!q &&
    typeof q.hitokoto === 'string' &&
    q.hitokoto.length > 0 &&
    q.hitokoto.length <= 160 &&
    typeof q.from === 'string' &&
    q.from.length <= 80
  );
}
function apply(value: Quote) {
  if (!quote) return;
  quote.textContent = `${value.hitokoto}${value.from ? ` —— ${value.from}` : ''}`;
}
async function loadQuote() {
  if (!quote) return;
  try {
    const cached = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    if (valid(cached) && Date.now() - cached.savedAt < 5 * 60_000) {
      apply(cached);
      return;
    }
  } catch {
    /* Storage can be disabled. */
  }
  try {
    const response = await fetch('https://v1.hitokoto.cn/', {
      signal: AbortSignal.timeout(4000),
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    });
    if (!response.ok) return;
    const value = await response.json();
    if (!valid(value)) return;
    const entry = {
      hitokoto: value.hitokoto,
      from: value.from,
      savedAt: Date.now(),
    };
    apply(entry);
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(entry));
    } catch {}
  } catch {
    /* Network failure keeps the original motto. */
  }
}
void loadQuote();
