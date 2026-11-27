// Site-wide behaviour. Runs once (the header/footer persist across Astro page transitions);
// per-page setup re-runs on `astro:page-load`. Clicks are delegated on document.
import { initReveal } from './reveal';

const root = document.documentElement;
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- theme toggle: circular reveal from the button (View Transitions), else instant ---------- */
function syncTheme() {
  const dark = root.classList.contains('dark');
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(dark)));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#171717' : '#F5F4F0');
}
function setTheme(dark: boolean) {
  root.classList.toggle('dark', dark);
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  syncTheme();
}
function toggleTheme(btn: HTMLElement) {
  const next = !root.classList.contains('dark');
  if (!document.startViewTransition || reduce()) return setTheme(next);
  const r = btn.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.setAttribute('data-theme-switching', '');
  const t = document.startViewTransition(() => setTheme(next));
  t.ready.then(() => root.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
    { duration: 400, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
  )).catch(() => {});
  t.finished.finally(() => root.removeAttribute('data-theme-switching'));
}

/* ---------- mobile menu ---------- */
function menu(open?: boolean) {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.getElementById('mobile-menu');
  if (!btn || !panel) return;
  const next = open ?? btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', String(next));
  panel.toggleAttribute('data-open', next);
}

/* ---------- copy buttons ---------- */
async function copy(btn: HTMLElement) {
  const code = btn.closest('.code-block')?.querySelector('pre')?.innerText ?? '';
  try { await navigator.clipboard.writeText(code.replace(/\n$/, '')); } catch { return; }
  btn.setAttribute('data-copied', '');
  clearTimeout(Number(btn.dataset.t));
  btn.dataset.t = String(setTimeout(() => btn.removeAttribute('data-copied'), 1500));
}
/** Fenced ``` blocks in Markdown get the same chrome as <CodeBlock>. */
function enhanceFencedCode() {
  document.querySelectorAll<HTMLPreElement>('.prose > pre.astro-code').forEach((pre) => {
    const wrap = document.createElement('div');
    wrap.className = 'code-block not-prose';
    const lang = (pre.dataset.language ?? 'code').replace(/[^\w-]/g, '');
    wrap.innerHTML = `<div class="code-block__bar"><span>${lang}</span><button type="button" class="copy-btn" data-copy aria-live="polite"><span class="copy-idle">Copy</span><span class="copy-done">Copied</span></button></div>`;
    pre.replaceWith(wrap);
    wrap.append(pre);
  });
}

document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const theme = t.closest<HTMLElement>('[data-theme-toggle]');
  if (theme) return toggleTheme(theme);
  if (t.closest('[data-menu-toggle]')) return menu();
  const c = t.closest<HTMLElement>('[data-copy]');
  if (c) return void copy(c);
  if (t.closest('#mobile-menu a')) menu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('mobile-menu')?.hasAttribute('data-open')) {
    menu(false);
    document.querySelector<HTMLElement>('[data-menu-toggle]')?.focus();
  }
});
// follow the system theme unless the visitor has picked one
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved: string | null = null;
  try { saved = localStorage.getItem('theme'); } catch {}
  if (!saved) { root.classList.toggle('dark', e.matches); syncTheme(); }
});

/* ---------- header: hairline + blur once scrolled; hide on scroll down (mobile only, in CSS) ---------- */
let lastY = scrollY, ticking = false;
function onScroll() {
  ticking = false;
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;
  const y = Math.max(0, scrollY);
  header.toggleAttribute('data-scrolled', y > 8);
  const menuOpen = document.getElementById('mobile-menu')?.hasAttribute('data-open');
  const focusInHeader = header.contains(document.activeElement);
  if (menuOpen || focusInHeader || y < 96) header.removeAttribute('data-hidden');
  else if (Math.abs(y - lastY) > 6) header.toggleAttribute('data-hidden', y > lastY);
  lastY = y;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
document.addEventListener('focusin', (e) => {
  if ((e.target as HTMLElement).closest('.site-header')) document.querySelector('.site-header')?.removeAttribute('data-hidden');
});

/* ---------- per page ---------- */
function activeNav() {
  const here = location.pathname;
  document.querySelectorAll<HTMLAnchorElement>('a[data-nav]').forEach((a) => {
    const href = a.getAttribute('href')!;
    const on = href.startsWith('/') && (here.startsWith(href) || (href === '/articles/' && /^\/20\d\d\//.test(here)));
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}
document.addEventListener('astro:page-load', () => {
  syncTheme();
  activeNav();
  menu(false);
  enhanceFencedCode();
  initReveal();
  lastY = scrollY;
  onScroll();
});
