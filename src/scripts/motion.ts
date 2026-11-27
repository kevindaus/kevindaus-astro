// Noir motion layer (docs/design-system.md §7). Ported from the approved UI/home-v4.html engine.
// Only transform/opacity/clip-path/filter; one rAF loop; fully disabled under prefers-reduced-motion.
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

// mobile menu
const btn = $('#menuBtn');
const menu = $('#mobileMenu');
btn?.addEventListener('click', () => btn.setAttribute('aria-expanded', String(!menu!.classList.toggle('hidden'))));

// curtain: restore on back/forward cache, close on internal navigation
const cur = $('.curtain');
addEventListener('pageshow', (e) => { if (e.persisted && cur) { cur.classList.remove('closing'); cur.classList.add('open'); } });
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest('a');
  if (!a || RM || !cur) return;
  const href = a.getAttribute('href') ?? '';
  const internal = href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#');
  if (!internal || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  if (new URL(a.href).pathname === location.pathname) return;
  e.preventDefault();
  cur.classList.remove('open'); cur.classList.add('closing');
  setTimeout(() => { location.href = a.href; }, 650);
});

// split display headings into masked words
if (!RM) $$('h1.display, h2.display').forEach((el) => {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  let i = 0;
  nodes.forEach((n) => {
    const frag = document.createDocumentFragment();
    (n.textContent ?? '').split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
      const w = document.createElement('span'), wi = document.createElement('span');
      w.className = 'w'; wi.className = 'wi'; wi.textContent = part;
      wi.style.transitionDelay = Math.min(i++ * 45, 600) + 'ms';
      w.appendChild(wi); frag.appendChild(w);
    });
    n.parentNode!.replaceChild(frag, n);
  });
  el.classList.add('split');
});

// scroll reveals, staggered per batch; start once the curtain has lifted
const io = new IntersectionObserver((entries) => {
  entries.filter((e) => e.isIntersecting)
    .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
    .forEach((e, i) => {
      const t = e.target as HTMLElement;
      if (!t.classList.contains('split')) { t.style.transitionDelay = Math.min(i * 90, 450) + 'ms'; setTimeout(() => { t.style.transitionDelay = ''; }, 1600); }
      t.classList.add('in'); io.unobserve(t);
    });
}, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
setTimeout(() => $$('.reveal, .split, .reveal-img').forEach((el) => io.observe(el)), RM ? 0 : 420);

// terminal typewriter
$$('[data-type]').forEach((el) => {
  if (RM) return;
  const out = el.nextElementSibling as HTMLElement;
  const cmd = (el.textContent ?? '').replace(/^\$\s*/, '');
  el.textContent = '$ '; el.classList.add('caret'); out.style.visibility = 'hidden'; out.classList.remove('caret');
  let i = 0;
  const type = () => {
    if (i <= cmd.length) { el.textContent = '$ ' + cmd.slice(0, i++); setTimeout(type, 70 + Math.random() * 70); }
    else setTimeout(() => { el.classList.remove('caret'); out.style.visibility = ''; out.classList.add('caret'); }, 260);
  };
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); setTimeout(type, 1100); } }).observe(el);
});

// magnetic primary buttons
if (FINE && !RM) $$('a.bg-bone, .site-header a.border-bone').forEach((b) => {
  b.classList.add('mag');
  b.addEventListener('pointermove', (e) => {
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  });
  b.addEventListener('pointerleave', () => { b.style.transform = ''; });
});

// spotlights follow the pointer
const spots = FINE && !RM ? $$('.spotlight').map((s) => {
  const o = { s, tx: 72, ty: 38, x: 72, y: 38 };
  const host = s.parentElement!;
  host.addEventListener('pointermove', (e) => { const r = host.getBoundingClientRect(); o.tx = ((e.clientX - r.left) / r.width) * 100; o.ty = ((e.clientY - r.top) / r.height) * 100; });
  host.addEventListener('pointerleave', () => { o.tx = 72; o.ty = 38; });
  return o;
}) : [];

// reading progress on posts
const article = $('article.prose-noir');
let bar: HTMLDivElement | null = null;
if (article) { bar = document.createElement('div'); bar.className = 'read-progress'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar); }

// one rAF loop: velocity marquees, nav hide, footer drift, portrait parallax, spotlight easing, progress
const header = $('.site-header');
const marquees = RM ? [] : $$('.marquee').map((m) => { m.style.animation = 'none'; return { m, x: 0, w: m.scrollWidth / 2 }; });
addEventListener('resize', () => marquees.forEach((o) => { o.w = o.m.scrollWidth / 2; }));
const footName = $('.footer-name');
const portraits = FINE && !RM ? $$('.reveal:has(.blinds) .noir-img') : [];
let prevY = scrollY, vel = 0, dir = 1;
const loop = () => {
  const y = scrollY, d = y - prevY; prevY = y;
  vel += (d - vel) * 0.12; if (d) dir = d > 0 ? 1 : -1;
  for (const o of marquees) {
    o.x -= (0.7 + Math.min(Math.abs(vel), 60) * 0.35) * dir;
    if (o.x <= -o.w) o.x += o.w; if (o.x > 0) o.x -= o.w;
    o.m.style.transform = `translate3d(${o.x}px,0,0) skewX(${clamp(-vel * 0.18, -7, 7)}deg)`;
  }
  if (header && !(menu && !menu.classList.contains('hidden'))) {
    if (y > 160 && d > 3) header.classList.add('nav-hide');
    else if (d < -3 || y < 160) header.classList.remove('nav-hide');
  }
  if (footName && !RM) {
    const r = footName.getBoundingClientRect(), p = clamp(1 - r.top / innerHeight, 0, 1);
    footName.style.transform = `translate3d(${(1 - p) * 18}%,0,0)`;
  }
  for (const img of portraits) {
    const r = img.parentElement!.getBoundingClientRect();
    img.style.transform = `translate3d(0,${((r.top + r.height / 2) - innerHeight / 2) * -0.05}px,0) scale(1.06)`;
  }
  for (const o of spots) {
    o.x += (o.tx - o.x) * 0.06; o.y += (o.ty - o.y) * 0.06;
    o.s.style.setProperty('--sx', o.x.toFixed(2) + '%'); o.s.style.setProperty('--sy', o.y.toFixed(2) + '%');
  }
  if (bar && article) {
    const r = article.getBoundingClientRect();
    bar.style.transform = `scaleX(${clamp((innerHeight * 0.35 - r.top) / r.height, 0, 1)})`;
  }
  requestAnimationFrame(loop);
};
requestAnimationFrame(loop);
