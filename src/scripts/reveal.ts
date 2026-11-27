// Scroll reveals: adds .is-in once to .reveal / .reveal-stagger / .img-reveal elements as they enter the viewport.
// Never re-animates. Stagger children get --i (capped at 5 → max 6 staggered items).
// Without JS nothing is hidden (hidden states are gated on html[data-js] in motion.css).
let io: IntersectionObserver | undefined;

export function initReveal() {
  io?.disconnect();
  const els = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in), .reveal-stagger:not(.is-in), .img-reveal:not(.is-in)');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-in');
      io!.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => {
    if (el.classList.contains('reveal-stagger')) {
      [...el.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(Math.min(i, 5))));
    }
    io!.observe(el);
  });
}
